# Evidence Review — Chapter 42

## Scope

This review evaluates the evidentiary basis for Chapter 42, which uses documented enterprise implementations to illustrate architectural patterns. Industry cases are treated as **Industry Evidence**, not as proof of universal architectural superiority.

## Evidence Classification

### 1. Deutsche Bank — DB Lumina

Google Cloud's September 2025 customer story, authored by Deutsche Bank Applied AI Engineering and Google, documents DB Lumina's architecture, production deployment, approximate user scale, and evolution from an initial pilot. The source identifies GKE, Cloud SQL with pgvector, Cloud Storage, Dataflow, Vertex AI, Discovery Engine API, and Natural Language APIs as components. It reports approximately 5,000 users in Deutsche Bank Research at the time of publication and planned expansion. [Industry Evidence]

Source: Google Cloud, “Deutsche Bank delivers AI-powered financial research with DB Lumina,” September 23, 2025.

Important limitation: this is a vendor/customer case study. It is strong evidence that the implementation existed and that the stated architecture and outcomes were reported, but it is not independent validation of optimality.

### 2. Sun Life — Sun Life Asks

AWS's customer case study states that Sun Life conducted more than 40 GenAI experiments beginning in 2023 and that its internal assistant resolved more than 600,000 queries during its first 11 months. [Industry Evidence]

Source: AWS, “Sun Life Securely Answers 10,000+ Queries Each Week Using Amazon Bedrock.”

Limitation: reported operational outcomes are not independently audited in the cited source.

### 3. Chime Financial

AWS reports that Chime tested its call-summarization application through 2023 and launched it in production in February 2024. The case reports more than 250,000 annual hours saved and an 18-second reduction in average handling time per call. [Industry Evidence]

Source: AWS, “Chime Financial improves member experience and saves 250,000+ hours annually with AI-powered call summaries using Amazon Bedrock.”

Interpretation: this is a useful bounded-workflow case because the use case, deployment milestone, and operational metric are explicitly described. The reported savings should not be generalized without examining Chime's baseline, workload distribution, and remaining human work.

### 4. Discover Financial Services

AWS describes Discover's use of GPU-backed infrastructure for ML/GenAI workloads, including decision and credit risk management. The case also discusses scheduled workloads and exploration of event-based activation and queueing to improve compute utilization. [Industry Evidence]

Source: AWS, “Discover Financial Services Builds a Generative AI Solution on AWS for Faster Decision-Making and Time to Market.”

Interpretation: useful evidence for workload-aware compute architecture and asynchronous/event-driven optimization. It does not establish that GPU compute, AWS, or event-driven execution is universally preferable.

### 5. Robinhood

AWS documents Robinhood's use of generative AI in financial-crime investigations. [Industry Evidence]

Source: AWS, “Robinhood Transforms Financial Crimes Investigations Using Amazon Bedrock.”

Interpretation: useful evidence that generative AI can be integrated into a sensitive financial analytical workflow. The public case does not provide enough detail to independently establish the full authorization, audit, evaluation, and failure-control architecture, so the chapter intentionally uses the case to motivate questions rather than to assert control sufficiency.

### 6. Amazon Finance — Regulatory Intelligence

AWS reports that Amazon FinTech developed a generative-AI solution for monitoring VAT regulatory updates and reported more than 90% accuracy and a substantial inference-time reduction. The system identifies, analyzes, and prioritizes regulatory changes and summarizes potential impacts. [Industry Evidence]

Source: AWS, “Delivering Regulatory Insights 92 Percent Faster Using AWS with Amazon Finance Technology.”

Interpretation: useful example of evidence-oriented regulatory intelligence and decision support. The reported accuracy figure requires contextual information about evaluation design before it can be compared with another system.

### 7. Rich Data Co

AWS reports that Rich Data Co deployed AI-driven assistants for credit assessments and that development speed doubled, with two assistants reaching production in approximately three months. [Industry Evidence]

Source: AWS, “Rich Data Co Enhances Credit Decisioning with AI-Driven Assistants Using Generative AI.”

Interpretation: evidence that managed foundation-model infrastructure can support AI-assisted credit workflows. It is not evidence that managed infrastructure is universally preferable to self-hosting or other alternatives.

## Industry and Supervisory Context

BIS publications provide useful sector-level evidence. BIS has identified data governance, model risk, third-party AI service providers, concentration/dependency, human verification, and AI risk management as important issues for financial institutions. Its 2026 work on AI data use in financial services highlights data privacy, quality, security, third-party dependencies, and provider concentration as important barriers and supervisory concerns. [Industry/Supervisory Evidence]

BIS also emphasizes that financial institutions remain responsible for managing AI risk when using external providers and should understand the tools they adopt. [Industry/Supervisory Evidence]

These sources are not architecture case studies. Their value is that they provide independent sector context against which customer/vendor claims can be challenged.

## Evidence Gaps

The public industry evidence base has systematic limitations:

1. Architecture details are often proprietary.
2. Security controls are frequently summarized rather than fully documented.
3. Cost figures are often absent.
4. Negative results and failed pilots are less frequently published than successful deployments.
5. Reported ROI is rarely independently audited in customer case studies.
6. Evaluation methodology is often insufficiently detailed for replication.
7. Long-term reliability and lifecycle evidence is limited for newer GenAI systems.
8. Vendor case studies can overrepresent successful customer implementations.

Therefore, the absence of public evidence should not automatically be interpreted as evidence that an architecture is uncommon or ineffective.

## Recommended Industry-Evidence Method

For future chapters, industry evidence should be deliberately sampled across four categories:

### A. Customer / Production Cases

Evidence of what organizations actually deployed and operated.

### B. Corporate Disclosures

Annual reports, regulatory filings, investor disclosures, and official technical publications can reveal risk exposure, strategic direction, and sometimes production use without the same marketing format as vendor case studies.

### C. Supervisory / Regulatory Evidence

Central banks, regulators, and standards bodies can provide cross-institution observations about risk, governance, and operational patterns.

### D. Independent Technical Evidence

Peer-reviewed studies, independent case studies, conference material, and engineering reports can test whether vendor claims generalize.

## Evidence Quality Rule

The book should explicitly distinguish:

> **“This organization reports that it achieved X.”**

from:

> **“Independent evidence demonstrates that architecture X generally produces Y.”**

The first can be a valid industry fact. The second requires substantially stronger evidence.

## What Would Change Our Mind?

The industry evidence strategy should be revised if systematic research shows that customer case studies materially understate negative outcomes or that independent production evidence consistently contradicts vendor-reported architectural lessons.

Conversely, repeated independently corroborated production outcomes across organizations with materially different environments would justify increasing confidence in a transferable architectural pattern.

## Bottom Line

Industry evidence was previously underrepresented relative to standards and technical sources. That is a real limitation for a field manual intended to support executive technology decisions.

The correction is **not** to replace authoritative technical evidence with case studies. It is to add a structured industry-evidence layer and explicitly record:

**what was implemented → what was measured → who reported it → what was independently corroborated → what differs from our environment → what conclusion is actually justified.**
