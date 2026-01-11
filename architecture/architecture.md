CostGuard uses an event-driven serverless architecture.

AWS Budgets emits cost threshold alerts.
SNS decouples alert generation from processing.
Lambda enriches raw alerts with business logic.
DynamoDB persists cost intelligence for auditing and analysis.

This design is scalable, low-cost, and production-aligned.
