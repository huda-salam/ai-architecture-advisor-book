# Worked Case — Cloud vs Self-Hosted AI

**Decision stage:** Selecting / Architecture approval

“Self-hosting is more secure” and “cloud is more secure” are not sufficiently precise architecture claims.

Convert the debate into controls:

| Dimension | Questions |
|---|---|
| Data boundary | Where is data processed and stored? |
| Identity | Who authenticates and how? |
| Authorization | Where is access enforced? |
| Network | What paths exist? |
| Operations | Who patches, monitors, and responds? |
| Availability | What recovery options exist? |
| Cost | What is lifecycle cost? |
| Dependency | What is difficult to migrate? |
| Evidence | Which claims are actually supported? |

## What Must Be True

The selected deployment model must satisfy the required threat model and control objectives with an operating model the organization can actually sustain.

## Technical Position

Select against the threat model, control requirements, operating capability, workload, economics, and dependency tolerance. Cloud and self-hosted are deployment categories, not security conclusions.

**Advisor lesson:** Compare controls and residual risks, not slogans.
