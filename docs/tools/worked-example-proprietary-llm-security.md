# Worked Example — “More Secure Because It Is Proprietary”

> This example demonstrates the advisory method. It does not conclude that proprietary or non-proprietary technology is inherently more secure.

## The Claim

> **“The proprietary model is more secure, so we should select it.”**

The first advisor response should not be acceptance or rejection.

Ask:

> **What security property is being claimed, against which threat, under which controls?**

## Decompose the Claim

“Security” may refer to:

- data confidentiality;
- data residency;
- retention and deletion;
- access control;
- isolation;
- encryption;
- identity integration;
- operational security;
- supply-chain exposure;
- model abuse resistance;
- auditability;
- incident response;
- availability and recovery.

## What Must Be True?

Evidence would need to establish that:

1. The identified threat is material to the workload.
2. The proposed architecture provides controls against that threat.
3. Those controls are actually enforced.
4. The control boundary is understood.
5. Residual risks are acceptable for the intended use.
6. Equivalent controls are not available through another viable architecture.

## Evidence to Request

| Question | Evidence |
|---|---|
| Where is sensitive data processed? | Architecture / data-flow evidence |
| Is customer data retained? | Provider documentation / contract terms |
| Who can access it? | IAM model / access controls |
| Is data used for model improvement? | Explicit service terms / configuration |
| How is isolation implemented? | Architecture / security documentation |
| How are incidents handled? | Operational / security assurance evidence |
| Can consequential outputs be audited? | Audit design / logs |
| What happens if the provider is unavailable? | Resilience / fallback design |

## What the Evidence Does Not Establish

Even strong provider security controls do not automatically establish:

- suitability for the workload;
- correct authorization design;
- safe application integration;
- production readiness;
- acceptable TCO;
- reversibility.

Security is a system property, not merely a model property.

## Compare Alternatives

| Dimension | Alternative A | Alternative B |
|---|---|---|
| Data boundary | [...] | [...] |
| Identity | [...] | [...] |
| Authorization | [...] | [...] |
| Encryption | [...] | [...] |
| Operational control | [...] | [...] |
| Auditability | [...] | [...] |
| Availability / recovery | [...] | [...] |
| Dependency | [...] | [...] |
| Cost | [...] | [...] |

Do not compare “secure” versus “insecure.” Compare **specific controls, threats, residual risks, and evidence**.

## Technical Position

A defensible position can take this form:

> The security claim cannot be accepted at face value. The relevant decision depends on the identified threat model, control implementation, evidence quality, residual risk, and the controls available in credible alternatives. Selection should therefore be conditional on validating the material security requirements rather than on the proprietary status of the model alone.

## Advisor Lesson

**Claim → Threat → Control → Evidence → Residual Risk → Comparison → Technical Position**
