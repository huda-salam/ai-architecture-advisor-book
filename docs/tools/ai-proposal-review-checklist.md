# AI Proposal Review Checklist

> A practical first-pass checklist for reviewing an AI proposal before deeper technical investigation.

## 1. Decision

- [ ] What decision is being requested?
- [ ] Who owns the decision?
- [ ] What is the decision deadline?
- [ ] What happens if the decision is deferred?
- [ ] What happens if nothing is changed?

## 2. Problem and AI Suitability

- [ ] Is the business problem explicitly defined?
- [ ] Is the current baseline measurable?
- [ ] Has a credible non-AI alternative been considered?
- [ ] Is a specific AI capability actually required?
- [ ] Is the proposed level of autonomy justified?
- [ ] Is incremental value defined?

## 3. Requirements and Constraints

- [ ] Functional requirements are explicit.
- [ ] Quality requirements are measurable.
- [ ] Latency / throughput requirements are defined.
- [ ] Availability / reliability requirements are defined.
- [ ] Security and data constraints are explicit.
- [ ] Regulatory / governance constraints are explicit.
- [ ] Budget and operational constraints are explicit.

## 4. Architecture

- [ ] Major components are identified.
- [ ] Deterministic and probabilistic responsibilities are distinguished.
- [ ] Trust boundaries are visible.
- [ ] Identity and authorization boundaries are explicit.
- [ ] Data and knowledge flows are understood.
- [ ] Failure and degraded modes are defined.
- [ ] External dependencies are inventoried.
- [ ] Reversibility has been considered.

## 5. Evidence

For every material claim:

- [ ] Claim is clearly stated.
- [ ] Evidence source is identified.
- [ ] Evidence type is understood.
- [ ] Applicability to this workload is established.
- [ ] Important limitations are recorded.
- [ ] Independent validation is considered where material.

Classify the conclusion as:

**Fact · Assumption · Inference · Technical Judgment · Recommendation · Unknown**

## 6. AI / Model

- [ ] Model choice has a defined rationale.
- [ ] Alternatives were evaluated.
- [ ] Evaluation data represents the intended workload.
- [ ] Failure cases are understood.
- [ ] Quality is measured using task-relevant metrics.
- [ ] Cost is measured per useful outcome, not only per request/token.
- [ ] Model/runtime/service dependencies are distinguished.

## 7. Security and Control

- [ ] Threat model exists.
- [ ] Sensitive data flows are known.
- [ ] Authorization is enforced independently of model output.
- [ ] Tool/action permissions are bounded.
- [ ] Secrets and credentials are protected.
- [ ] AI-specific threats have been considered.
- [ ] Monitoring and incident response exist.

## 8. Human Decision Boundary

- [ ] AI role is explicit: inform / recommend / decide / act.
- [ ] Human authority is explicit.
- [ ] Human review is meaningful rather than ceremonial.
- [ ] AI errors have defined handling.
- [ ] Consequential decisions can be reconstructed.

## 9. Production Readiness

- [ ] Evaluation completed.
- [ ] Architecture reviewed.
- [ ] Operational ownership assigned.
- [ ] Monitoring exists.
- [ ] Failure detection exists.
- [ ] Rollback / recovery exists where applicable.
- [ ] Incident process exists.
- [ ] Auditability is adequate for consequential actions.

## 10. Economics and Dependency

- [ ] Full lifecycle cost is understood.
- [ ] Workload assumptions are explicit.
- [ ] Scaling economics are understood.
- [ ] Operational capability cost is included.
- [ ] Migration cost is considered.
- [ ] Exit dependencies are known.
- [ ] Vendor dependency is deliberate rather than accidental.

## 11. Final Challenge

1. What assumption carries the decision?
2. What evidence would falsify it?
3. What failure mode matters most?
4. What alternative has not been seriously considered?
5. What would make us change the technical position?
6. What must be validated before commitment?

## Position gate

Do not issue a strong recommendation when material unknowns remain unbounded.

Use:

> **Support / Conditional Support / Second Opinion / Dissent / Insufficient Evidence**

The label describes the technical advisory position, not the executive decision.
