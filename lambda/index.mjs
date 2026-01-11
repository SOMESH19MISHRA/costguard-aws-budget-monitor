import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const handler = async (event) => {
  console.log("Incoming SNS event:", JSON.stringify(event));

  for (const record of event.Records) {
    const message = JSON.parse(record.Sns.Message);

    const actualCost = Number(message.actualCost);
    const budgetLimit = Number(message.budgetLimit);
    const usagePercent = (actualCost / budgetLimit) * 100;

    const severity =
      usagePercent >= 100 ? "CRITICAL" :
      usagePercent >= 80  ? "MEDIUM" :
      "LOW";

    const recommendation =
      severity === "CRITICAL"
        ? "IMMEDIATE ACTION: Stop unused EC2, delete EBS, review Cost Explorer."
        : severity === "MEDIUM"
        ? "Review recent AWS usage."
        : "No action required.";

    await client.send(new PutItemCommand({
      TableName: "costguard-events-v2",
      Item: {
        eventId: { S: record.Sns.MessageId },
        timestamp: { S: message.timestamp },
        budgetName: { S: message.budgetName },
        actualCost: { N: actualCost.toString() },
        budgetLimit: { N: budgetLimit.toString() },
        threshold: { N: message.threshold.replace("%", "") },
        alertType: { S: message.alertType },
        currency: { S: message.currency },
        usagePercent: { N: usagePercent.toFixed(2) },
        severity: { S: severity },
        recommendation: { S: recommendation }
      }
    }));
  }

  return { statusCode: 200 };
};
