# CostGuard – AWS Budget Monitoring & Alert Intelligence

CostGuard is a serverless AWS cost-monitoring system that captures AWS Budget alerts, processes them via Lambda, classifies cost severity, and stores enriched cost events in DynamoDB for analysis and auditing.

This project demonstrates real-world cloud cost governance patterns using managed AWS services.

---

## Architecture Overview

AWS Budgets → SNS → Lambda → DynamoDB

- **AWS Budgets** triggers alerts based on cost thresholds
- **Amazon SNS** delivers budget alert messages
- **AWS Lambda** parses, enriches, and classifies cost data
- **Amazon DynamoDB** stores cost events with severity and recommendations

---

## Services Used

- AWS Budgets
- Amazon SNS
- AWS Lambda (Node.js 18+, ES Modules)
- Amazon DynamoDB (On-Demand)
- AWS IAM

---

## Lambda Function Logic

The Lambda function:
1. Receives SNS budget alerts
2. Parses cost data
3. Calculates usage percentage
4. Classifies severity (LOW / MEDIUM / CRITICAL)
5. Adds human-readable recommendations
6. Persists enriched events in DynamoDB

---

## Severity Classification

| Usage % | Severity | Action |
|------|---------|--------|
| < 80% | LOW | No action required |
| 80–99% | MEDIUM | Review recent AWS usage |
| ≥ 100% | CRITICAL | Immediate cost remediation |

---

## DynamoDB Schema

| Attribute | Type |
|--------|------|
| eventId | String (Partition Key) |
| timestamp | String |
| budgetName | String |
| actualCost | Number |
| budgetLimit | Number |
| threshold | Number |
| alertType | String |
| currency | String |
| usagePercent | Number |
| severity | String |
| recommendation | String |

---

## IAM Permissions

The Lambda function follows least-privilege access and is allowed only to write items to the DynamoDB table.

---

## Cost Control

The system is currently **paused** by removing SNS subscriptions.  
Infrastructure is preserved for demonstration without ongoing execution costs.

---

## Screenshots

Screenshots showing:
- Budget alert configuration
- SNS topic
- Lambda execution logs
- DynamoDB stored events

---

## Future Enhancements

- Auto-remediation (stop EC2, notify Slack)
- Cost trend visualization
- Multi-account support
- Terraform/IaC deployment

---

## Author

**Somesh Mishra**  
B.Tech CSE, Bennett University  
Interested in Cloud Engineering, AWS Cost Optimization, and Serverless Systems

