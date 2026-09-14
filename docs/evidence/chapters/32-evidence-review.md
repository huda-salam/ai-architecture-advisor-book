# Evidence Review — Chapter 32: Fine-Tuning vs RAG vs Prompting

## Review purpose

This review hardens the chapter against a common enterprise-AI error: treating prompting, retrieval-augmented generation (RAG), and fine-tuning as competing maturity levels rather than mechanisms that address different architectural problems.

The chapter's central recommendation is deliberately conditional: choose the smallest architectural intervention that solves the observed failure, then validate the choice against representative workload evidence.

---

## 1. Primary authoritative basis

### NIST AI RMF 1.0

NIST AI RMF 1.0 is a voluntary, use-case-agnostic framework for organizations designing, developing, deploying, or using AI systems. It frames trustworthiness across the AI lifecycle rather than as a property of a model in isolation.

Source:
- NIST, *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*, 2023.
- https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10

Use in chapter:
- supports system-level risk and evaluation framing;
- does **not** establish a universal preference for prompting, RAG, or fine-tuning.

### NIST AI RMF Generative AI Profile

NIST AI 600-1 explicitly includes fine-tuning and retrieval-augmented generation among model/system details that should be documented, alongside data provenance, data quality, architecture, optimization objectives, and evaluation data.

Source:
- NIST, *Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile*, July 2024.
- https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence

Use in chapter:
- supports treating fine-tuning and RAG as distinct documented architectural choices;
- supports explicit documentation of data provenance, evaluation data, and model details.

Important qualification:
- NIST does not say that RAG is always preferable to fine-tuning or that fine-tuning is required for domain adaptation.

---

## 2. Prompting

### Classification

The chapter describes prompting as changing runtime instructions/context rather than changing model parameters. This is a technical description of standard inference-time prompting.

### Evidence status

**Technical fact:** prompting supplies instructions/context to the model at inference time.

**Recommendation:** treat production prompts as versioned application artifacts.

The latter is an architecture recommendation rather than a claim that every organization must implement a specific prompt-management product.

### Important boundary

The chapter deliberately avoids claiming that prompting can solve arbitrary capability limitations. Whether prompting is sufficient is workload-dependent and should be established through evaluation.

---

## 3. RAG

### Classification

RAG is an architecture pattern in which external information is retrieved and supplied to a generative model as context. It is particularly relevant when the system needs access to information outside the model's static parameters.

Research literature supports the general RAG concept, but individual RAG implementations vary substantially. Retrieval quality, context construction, authorization, source quality, and generation behavior all affect the final result.

### Evidence status

**Technical fact:** RAG can provide external information at inference time.

**Inference:** RAG is often a natural architectural fit for current/private enterprise knowledge.

**Recommendation:** authoritative enterprise records should remain in governed source/data systems rather than being treated as model memory.

The last point follows from data-architecture principles and is not a claim that training data can never contain proprietary information.

### Important non-claim

The chapter does **not** claim:

- RAG guarantees factuality;
- RAG always outperforms fine-tuning;
- RAG is always cheaper;
- vector databases are mandatory;
- every enterprise workload requires RAG.

---

## 4. Fine-tuning

### Classification

Fine-tuning changes model parameters using additional training under a specified objective. Its usefulness is task- and model-dependent.

### Evidence status

**Technical fact:** fine-tuning creates a model artifact whose behavior may differ from the base model.

**Recommendation:** evaluate fine-tuning when a stable behavioral/task adaptation is demonstrated to be the actual bottleneck.

### Important non-claims

The chapter does **not** claim:

- fine-tuning automatically creates domain expertise;
- fine-tuning is a reliable database mechanism;
- fine-tuning always improves factuality;
- fine-tuning always reduces inference cost;
- a particular training-set size is universally sufficient;
- fine-tuning is always more secure or less secure than RAG.

---

## 5. Knowledge vs behavior distinction

The chapter uses “knowledge problem vs behavior problem” as a first-pass diagnostic.

This is an **architectural heuristic**, not a formal taxonomy.

The distinction is useful because:

- current enterprise facts can often be supplied through retrieval;
- learned behavioral adaptation can sometimes be addressed through fine-tuning;
- instruction and workflow behavior can often be changed without either.

However, real systems can contain all three problem types simultaneously.

Therefore the chapter explicitly requires diagnosis and evaluation rather than a deterministic rule.

---

## 6. “Do not fine-tune proprietary knowledge by default”

This is a recommendation, not an empirical universal law.

The architectural reasoning is:

1. enterprise facts may change;
2. access rights may differ by user or entity;
3. source records may need correction or deletion;
4. users may require provenance/citations;
5. source systems may remain authoritative.

These properties are naturally represented in data and retrieval architecture.

This does **not** imply that proprietary data can never be used in model training. Fine-tuning can be appropriate when data rights, security, governance, lifecycle, and evaluation requirements are satisfied and the desired behavior genuinely benefits from training.

NIST's GenAI Profile explicitly calls for documentation of data provenance, data quality, fine-tuning or RAG approaches, and evaluation data.

---

## 7. “RAG does not solve everything”

This is an inference from the architecture of RAG systems.

If retrieval is correct but the generator systematically fails to perform a task, improving retrieval alone cannot logically guarantee that the behavioral problem disappears.

Conversely, if retrieval is poor, fine-tuning the generator may not address the root cause.

The chapter therefore recommends diagnosing the failure path:

**data → retrieval → prompt/context → model capability → tools → validation → human workflow**

This is an architecture diagnostic, not a formally standardized causal model.

---

## 8. Combination architectures

The chapter states that fine-tuning and RAG can be complementary.

This is supported by current research literature in which RAG pipelines may themselves use fine-tuned retrievers or generators, and by the architectural fact that learned model behavior and runtime external context are different mechanisms.

Example research:
- Lee et al., *Finetune-RAG: Fine-Tuning Language Models to Resist Hallucination in Retrieval-Augmented Generation*, 2025.
- https://arxiv.org/abs/2505.10792
- Lawton et al., *A Comparison of Independent and Joint Fine-tuning Strategies for Retrieval-Augmented Generation*, EMNLP 2025 Findings.
- https://arxiv.org/abs/2510.01600

These papers are research evidence, not proof that a combined architecture is optimal for every enterprise system.

---

## 9. Comparative evidence

A comparative study of fine-tuning, RAG, and soft prompting found materially different outcomes across approaches in an experimental question-answering setting, with RAG outperforming the tested alternatives under that study's conditions.

Source:
- Dodgson et al., *Establishing Performance Baselines in Fine-Tuning, Retrieval-Augmented Generation and Soft-Prompting for Non-Specialist LLM Users*, 2023.
- https://arxiv.org/abs/2311.05903

Interpretation:

**Industry/research evidence:** comparative experiments demonstrate that relative performance can depend on the task and configuration.

**Not established:** a universal ranking of prompting, RAG, and fine-tuning.

This distinction is important enough to preserve in the chapter.

---

## 10. Evaluation as the decision mechanism

The strongest common principle across the three techniques is not preference for one technique; it is comparative evaluation.

For a material architecture decision, compare a baseline and credible alternatives under the same target metrics.

Recommended experimental candidates may include:

- baseline prompt;
- improved prompt;
- prompt + RAG;
- fine-tuned model;
- fine-tuned model + RAG;
- alternative base model;
- alternative retrieval configuration.

This follows the same evaluation discipline established in Chapter 31.

NIST's AI RMF emphasizes testing and evaluation throughout the AI lifecycle and encourages evidence-based measurement of relevant trustworthiness characteristics.

Source:
- NIST AI RMF 1.0.
- https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10

---

## 11. Security and authorization

The chapter states that the model should not be the sole authorization mechanism.

This is an **architecture recommendation** grounded in the broader principle that authorization should be enforced by deterministic system controls.

For RAG specifically, this implies that retrieval should respect the authorization context before protected content is placed into model context.

The chapter intentionally avoids claiming that any particular retrieval technology automatically enforces authorization.

---

## 12. Data lifecycle differences

The chapter distinguishes the update mechanisms:

- prompting → configuration/application change;
- RAG → source/index/context change;
- fine-tuning → new model artifact.

This distinction is architecturally significant because different update mechanisms create different reproducibility, rollback, governance, and operational requirements.

These are architecture observations rather than claims about one universal implementation pattern.

---

## 13. Cost claims

The chapter deliberately avoids generic claims such as:

- RAG is cheaper;
- fine-tuning is cheaper at scale;
- prompting is always cheapest.

Instead it recommends comparing total system economics, including inference, retrieval, storage, training, evaluation, operations, retries, and human review where applicable.

This is a recommendation consistent with the book's broader TCO principle: compare the cost of achieving the useful outcome, not the price of one component in isolation.

---

## 14. Security and training-data leakage

Fine-tuning introduces training-data risks that should be assessed rather than assumed away.

NIST's adversarial machine learning taxonomy discusses information-extraction risks involving training data and notes that fine-tuning interfaces can introduce additional extraction considerations.

Source:
- NIST AI 100-2e2025, *Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations*, 2025.
- https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-2e2025.pdf

The chapter therefore appropriately treats training-data provenance, sensitive information, data rights, and evaluation as explicit concerns.

This does **not** establish that RAG is immune to information leakage. RAG systems also require authorization, isolation, logging, and data-protection controls.

---

## 15. Editorial hardening performed

The chapter was checked against the following failure modes:

- [x] no universal “RAG always wins” claim;
- [x] no universal “fine-tuning is better” claim;
- [x] no claim that fine-tuning is merely a more advanced prompt;
- [x] no claim that RAG is a database;
- [x] no claim that model weights are an authoritative source of enterprise facts;
- [x] no generic training-data-size threshold presented as fact;
- [x] no generic cost ranking presented as fact;
- [x] no claim that self-hosting or fine-tuning automatically improves security;
- [x] no delegation of authorization to the model;
- [x] research examples are identified as research evidence rather than universal proof;
- [x] recommendations are labeled as recommendations or heuristics where appropriate;
- [x] reversal conditions are explicitly stated.

---

## 16. Confidence assessment

**High confidence:**

- prompting, retrieval, and fine-tuning are technically distinct mechanisms;
- RAG can provide external runtime context;
- fine-tuning changes model parameters and produces a model artifact;
- source systems and model weights serve different architectural roles;
- authorization should not depend solely on probabilistic model behavior;
- evaluation should determine whether an intervention materially improves the target workload.

**Moderate confidence / workload-dependent:**

- RAG may be preferable for current/private enterprise knowledge;
- fine-tuning may be preferable for stable specialized behavior;
- combined RAG + fine-tuning may outperform either alone for some tasks;
- one approach may be more economical than another at scale.

**Low confidence without workload-specific evidence:**

- any universal cost ranking;
- any universal quality ranking;
- any universal dataset-size requirement;
- any universal security superiority;
- any claim that a particular architecture is optimal across model families.

---

## 17. What would change the recommendation?

The chapter's default separation would need revision if controlled evidence showed that:

- a target workload consistently benefits more from learned behavior than runtime retrieval;
- retrieval cannot meet required evidence, latency, or cost objectives;
- a fine-tuned model satisfies governance and lifecycle requirements while materially improving the target metric;
- prompting alone closes the behavioral gap;
- a different model architecture eliminates the need for either intervention.

The correct advisor position is therefore not loyalty to a technique. It is loyalty to evidence, architecture constraints, and the decision requirement.

---

## 18. Bottom line

The strongest defensible rule is:

> **Do not ask which technique is most sophisticated. Ask which architectural layer contains the problem, change that layer first, and require comparative evidence before adding complexity.**

For AI-IDSS, a strong default separation is:

**authoritative data → governed retrieval → controlled prompt/context → model behavior → validation/evidence → human decision**

Fine-tuning should enter that architecture when there is evidence that learned behavioral adaptation is required—not merely because the organization's data is proprietary or because RAG has become fashionable.
