# Evidence Review — Chapter 31: Model Evaluation

## 1. Review Objective

This review checks the chapter's claims about AI evaluation against current authoritative sources and distinguishes facts from recommendations and inference.

## 2. Primary Sources

- [NIST AI Risk Management Framework 1.0](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST AI RMF Measure](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)
- [NIST AI RMF Playbook — Measure](https://airc.nist.gov/airmf-resources/playbook/measure/)
- [NIST AI 800-3 — Expanding the AI Evaluation Toolbox with Statistical Models](https://www.nist.gov/publications/expanding-ai-evaluation-toolbox-statistical-models)
- [NIST ARIA Pilot Evaluation Report](https://www.nist.gov/publications/assessing-risks-and-impacts-ai-aria-pilot-evaluation-report)
- [NIST Artificial Intelligence Technology Evaluation (AITE)](https://www.nist.gov/news-events/news/2026/07/announcing-nists-artificial-intelligence-technology-evaluation-aite)
- [NIST GenAI Evaluation Program](https://www.nist.gov/programs-projects/generative-artificial-intelligence-evaluation-program-genai)
- [ISO/IEC 25059:2023 — Quality model for AI systems](https://www.iso.org/standard/80655.html)

## 3. Claim Classification

### Evaluation Before and During Operation

**Claim:** AI systems should be tested before deployment and evaluated regularly in operation.

**Status:** Fact.

**Basis:** NIST AI RMF Measure describes pre-deployment testing and regular evaluation/monitoring.

### Validity, Reliability, and Generalization

**Claim:** Evaluation should address validity and reliability and document limitations of generalizability.

**Status:** Fact.

**Basis:** NIST AI RMF Measure 2.5.

### Uncertainty

**Claim:** Evaluation results should include appropriate treatment of uncertainty.

**Status:** Fact.

**Basis:** NIST AI RMF calls for measures of uncertainty; NIST AI 800-3 demonstrates that benchmark analyses can make different assumptions about the target quantity and uncertainty.

### Benchmark Accuracy vs Generalized Accuracy

**Claim:** Performance on a fixed benchmark and performance generalized to a broader population are distinct evaluation targets.

**Status:** Fact.

**Basis:** NIST AI 800-3 explicitly distinguishes benchmark accuracy and generalized accuracy.

### Evaluation Is Use-Case Dependent

**Claim:** There is no universal AI evaluation metric that is appropriate for every use case.

**Status:** Supported principle / inference.

**Basis:** NIST's evaluation programs use task-specific evaluation designs and metrics; ISO/IEC 25059 defines a multidimensional AI quality model rather than a single universal score.

### System-Level Evaluation

**Claim:** Evaluating only the foundation model is insufficient for an enterprise AI application.

**Status:** Architecture recommendation.

**Reasoning:** The deployed system includes data, retrieval, orchestration, tools, controls, and user interaction. A model benchmark cannot by itself establish the behavior of that complete system.

### Representative Test Data

**Claim:** Evaluation data should be relevant to the deployment conditions and decision task.

**Status:** Fact/principle with architectural application.

**Basis:** NIST AI RMF Measure 2.3 requires performance or assurance criteria to be demonstrated for conditions similar to deployment settings.

### Independent Evaluation

**Claim:** Independent or non-front-line assessment can improve evaluation effectiveness and mitigate some internal bias or conflict.

**Status:** Fact.

**Basis:** NIST AI RMF Measure 1.3.

## 4. AI-IDSS Recommendations

### Layered Evaluation

**Recommendation:** Evaluate model capability, retrieval, generation, tools/agents, security, performance, cost, and human utility as separate but connected dimensions.

This is an architecture recommendation derived from treating AI-IDSS as a system rather than a model.

### Probability Outputs

**Recommendation:** A probability shown to decision makers should have defined semantics and evidence of calibration or other appropriate validation.

This does not imply that every AI system must use calibration metrics. It means that a numeric probability should not be treated as meaningful merely because the model produced a number.

### RAG Evaluation

**Recommendation:** Separate retrieval evaluation from generation evaluation.

Reasoning: the system can fail because the correct evidence was not retrieved or because the model misused evidence that was retrieved. Separating these failure modes improves diagnosis.

### Agent Evaluation

**Recommendation:** Evaluate agent actions and tool calls, not only the final textual answer.

Reasoning: an agent may produce an acceptable final answer while taking an unauthorized, unsafe, or unnecessarily costly intermediate action.

## 5. Important Non-Claims

The chapter deliberately does not claim that:

- public benchmarks are useless;
- one benchmark metric is always invalid;
- human evaluation is always superior to automated evaluation;
- model-as-judge evaluation is inherently unreliable;
- a particular statistical method is mandatory;
- every AI application requires the same evaluation suite;
- every model upgrade requires identical revalidation depth;
- ISO/IEC 25059 is a certification requirement;
- NIST AI RMF is legally mandatory for all organizations;
- a high evaluation score proves that an AI system is safe;
- pre-deployment evaluation can eliminate the need for production monitoring.

## 6. Evidence Quality

| Topic | Evidence quality | Basis |
|---|---|---|
| Pre-deployment and regular evaluation | High | NIST AI RMF |
| Validity and reliability | High | NIST AI RMF Measure 2.5 |
| Uncertainty in benchmark evaluation | High | NIST AI 800-3 |
| Benchmark vs generalized accuracy | High | NIST AI 800-3 |
| Multidimensional AI quality | High | ISO/IEC 25059 |
| Independent assessment | High | NIST AI RMF Measure 1.3 |
| System-level evaluation recommendation | High conceptual basis | AI system architecture reasoning |
| Retrieval-before-generation evaluation split | Moderate-to-high | Architecture recommendation based on RAG failure decomposition |
| Agent-action evaluation | Moderate-to-high | Architecture recommendation based on agent/tool behavior and consequential side effects |

## 7. Current-State Caveat

NIST AI evaluation science is actively evolving. In 2026, NIST published AI 800-3 on statistical approaches to benchmark evaluation and introduced additional evaluation programs and frameworks, including AITE and the draft TEVV-Athlon framework. These should be treated as current evidence and evolving practice, not as proof that one evaluation methodology has become universally mandatory. [NIST AI 800-3](https://www.nist.gov/publications/expanding-ai-evaluation-toolbox-statistical-models) · [NIST AITE](https://www.nist.gov/news-events/news/2026/07/announcing-nists-artificial-intelligence-technology-evaluation-aite) · [TEVV-Athlon](https://www.nist.gov/artificial-intelligence/ai-research/tevv-athlon-framework-evaluating-ai-systems)

ISO/IEC 25059:2023 is published, while a revised edition is under development. The chapter therefore cites the published standard for the current quality model and does not treat the draft revision as a finalized requirement. [ISO/IEC 25059](https://www.iso.org/standard/80655.html)

## 8. Falsifiability

The evaluation framework should be revised if evidence shows that:

- a simpler evaluation protocol predicts production performance equally well;
- the chosen metrics are poorly correlated with actual decision quality;
- a supposedly representative test set is not representative;
- production monitoring identifies failure modes not captured by pre-deployment tests;
- statistical assumptions used in evaluation are not justified;
- an alternative model or architecture provides equivalent assurance at materially lower cost or complexity.

## 9. Bottom Line

The strongest model evaluation is not the one with the most benchmarks. It is the one that produces credible evidence about the behavior that matters for the intended decision, under conditions sufficiently similar to deployment, with uncertainty and limitations made explicit.

For AI-IDSS:

> **Evaluation is evidence for a deployment decision, not a leaderboard exercise.**
