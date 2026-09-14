# Evidence Review — Chapter 15

## Purpose

This review tests Chapter 15 for factual accuracy, overgeneralization, and architectural recommendations that could be mistaken for universal cloud rules.

## Primary Evidence Base

1. **NIST SP 800-145 — The NIST Definition of Cloud Computing**
   - https://www.nist.gov/publications/nist-definition-cloud-computing
   - Supports the definition, five essential characteristics, three service models, and four deployment models.

2. **NIST SP 500-292 — Cloud Computing Reference Architecture**
   - https://www.nist.gov/publications/nist-cloud-computing-reference-architecture
   - Supports the vendor-neutral conceptual reference architecture and cloud actor/service framing.

3. **NIST SP 800-207A — Zero Trust Architecture Model for Access Control in Cloud-Native Applications in Multi-Cloud Environments**
   - https://csrc.nist.gov/pubs/sp/800/207/a/final
   - Supports the identity-centric access-control discussion for cloud-native applications and multi-cloud environments.

4. **NIST SP 500-332 — Cloud Federation Reference Architecture**
   - https://www.nist.gov/publications/nist-cloud-federation-reference-architecture
   - Supports the discussion of federation, trust, security, resource sharing, and multiple governance/deployment options.

5. **CISA Cloud Security Technical Reference Architecture**
   - https://www.cisa.gov/sites/default/files/publications/CISA%20Cloud%20Security%20Technical%20Reference%20Architecture_Version%201.pdf
   - Used as supplementary architecture/security evidence for cloud migration, scalable architectures, DevSecOps, and cloud security posture management.

## Claim Classification

| Chapter claim | Classification | Review |
|---|---|---|
| Cloud definition and service/deployment models | **Fact / Technical Evidence** | Directly supported by NIST SP 800-145. |
| Cloud reference architecture is vendor-neutral | **Fact / Technical Evidence** | Supported by NIST reference architecture material. |
| Deployment model is not a security rating | **Inference / Architecture Principle** | Correct; security depends on controls and implementation. |
| Shared responsibility varies by service | **Technical Evidence / Architecture Principle** | Correct; exact boundaries are service-specific. |
| Identity matters beyond network location | **Technical Evidence** | Supported by NIST SP 800-207A. |
| Cloud is not automatically cheaper | **Inference / Recommendation** | No universal economic claim is made. |
| Multi-cloud can increase complexity | **Architecture inference** | Workload and operating-model dependent; chapter avoids universal quantification. |
| Backup is not disaster recovery | **Architecture principle** | Correct distinction; recovery requires restoration objectives and operational capability. |
| Multi-cloud does not automatically eliminate lock-in | **Inference** | Dependency can remain at identity, data, managed services, operations, and skills layers. |
| Specific cloud costs/availability | **Current vendor evidence** | Explicitly excluded from static claims; must be re-verified when used. |

## Iteration 1 — Evidence Hardening

The chapter deliberately relies on stable, vendor-neutral NIST architecture material for foundational concepts. Current provider capabilities, prices, regional availability, and specific AI services are not embedded as timeless facts.

## Iteration 2 — Semantic Review

The following distinctions were checked:

- cloud vs architecture;
- deployment model vs security posture;
- provider responsibility vs customer responsibility;
- network isolation vs authorization;
- backup vs disaster recovery;
- portability vs absence of vendor dependency;
- hybrid/multi-cloud capability vs architectural justification.

These distinctions prevent the chapter from turning cloud terminology into architectural conclusions.

## Iteration 3 — AI-IDSS Consistency Review

The chapter was tested against the existing architecture spine:

```text
Data Sources
    ↓
Integration
    ↓
Governance / Lineage
    ↓
Cloud / Infrastructure
    ↓
AI / ML / LLM
    ↓
Agents / Workflows
    ↓
AI-IDSS
    ↓
Regional Director
```

The chapter preserves two earlier principles:

1. cloud infrastructure does not replace source-system authority;
2. identity and authorization remain explicit even when network boundaries exist.

## Deliberate Non-Claims

The chapter does **not** claim that:

- cloud is always cheaper;
- cloud is always more secure;
- private cloud is inherently secure;
- public cloud is inherently insecure;
- multi-cloud is inherently more resilient;
- Kubernetes is required for enterprise AI;
- every workload should be containerized;
- every AI workload requires GPU infrastructure;
- one cloud provider is universally superior;
- cloud portability should be maximized regardless of cost;
- all data must reside in one region;
- encryption alone provides adequate security;
- managed services eliminate customer responsibility;
- a particular provider service is required by the architecture.

## Advisor Review Checklist

Before approving a cloud architecture, verify:

- service/deployment model is explicit;
- responsibility boundary is documented;
- identity and authorization are enforceable;
- data location and processing location are understood;
- cross-boundary data movement is known;
- failure domains are identified;
- RPO/RTO are defined and tested;
- cost drivers are understood;
- observability is sufficient for diagnosis;
- material vendor dependencies are known;
- exit options are considered where dependency is strategically material;
- multi-cloud/hybrid complexity has a requirement-based justification.

## Confidence

**High confidence:** NIST-backed terminology and reference-architecture claims.

**Moderate confidence:** architecture recommendations such as identity-centric design, explicit failure-domain analysis, consequence-based resilience, and dependency-aware portability. These are sound architectural recommendations but not universal laws.

**Context-dependent:** exact cloud service selection, region, provider, cost, resilience topology, and regulatory controls.

## Bottom Line

Cloud architecture should be evaluated as a system of control boundaries, responsibilities, workloads, dependencies, failure modes, and economics. For the AI-IDSS, the cloud is the enabling infrastructure layer—not the authority for business data and not a substitute for governance, security, or architecture reasoning.
