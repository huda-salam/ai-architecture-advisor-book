# AI Evaluation Worksheet

> A practical structure for evaluating an AI capability without confusing benchmark performance with system readiness.

## 1. Evaluation Objective

**Decision being informed:** [...]

**Task under evaluation:** [...]

**Intended workload:** [...]

**Failure consequence:** [...]

## 2. Requirements

| Requirement | Metric | Target / threshold | Why it matters |
|---|---|---:|---|
| [Quality] | [Metric] | [Threshold] | [Reason] |

## 3. Evaluation Dataset

- Source:
- Size:
- Representative of production?:
- Important edge cases:
- Data freshness:
- Data leakage controls:
- Ground truth / reference method:

## 4. Baseline

**Baseline system:** [...]

**Why this baseline is credible:** [...]

## 5. Test Method

- [ ] Offline evaluation
- [ ] Representative workload test
- [ ] Adversarial / edge-case testing
- [ ] Load / performance testing
- [ ] Security testing
- [ ] Human evaluation
- [ ] Production shadow / pilot evidence

## 6. Results

| Metric | Baseline | Candidate | Target | Interpretation |
|---|---:|---:|---:|---|
| [Metric] | | | | |

## 7. Failure Analysis

| Failure case | Frequency / severity | Cause hypothesis | Control | Residual risk |
|---|---|---|---|---|
| [Case] | | | | |

## 8. Interpretation

Distinguish:

- **Measured result** — what the test observed.
- **Inference** — what the result suggests.
- **Unknown** — what the test did not establish.
- **Technical judgment** — what the advisor concludes from the evidence.

## 9. Production Readiness Boundary

The evaluation does **not** by itself establish:

- production readiness;
- security adequacy;
- operational readiness;
- auditability;
- governance adequacy;
- lifecycle sustainability.

## 10. Decision

**Technical position:** [...]

**Conditions:** [...]

**Required follow-up validation:** [...]

**Revisit trigger:** [...]
