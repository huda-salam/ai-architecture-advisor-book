# 15. Cloud Architecture

## 15.1 Why Cloud Architecture Matters

Cloud is not an architecture by itself. It is a way of delivering computing capabilities through a defined service and deployment model.

NIST defines cloud computing as a model for on-demand network access to a shared pool of configurable computing resources that can be rapidly provisioned and released with limited management effort. NIST identifies five essential characteristics, three service models, and four deployment models. [NIST SP 800-145](https://www.nist.gov/publications/nist-definition-cloud-computing)

For the advisor, the relevant question is therefore not:

> “Should we use cloud?”

but:

> **“Which cloud capabilities, deployment model, control model, and operating responsibilities produce the required business and technical outcomes at acceptable risk and cost?”**

---

## 15.2 Cloud Is a Means, Not an Architecture Principle

Cloud adoption does not automatically produce:

- scalability,
- security,
- reliability,
- lower cost,
- lower operational complexity,
- better AI performance, or
- portability.

These properties depend on architecture and operating discipline.

**Recommendation:** Evaluate cloud as an architectural option against explicit requirements rather than treating “cloud-first” as sufficient design reasoning.

---

## 15.3 NIST Cloud Service Models

NIST identifies three service models:

| Model | Simplified responsibility boundary |
|---|---|
| SaaS | Consume a provider-managed application |
| PaaS | Consume a provider-managed application platform |
| IaaS | Consume virtualized infrastructure capabilities |

The practical distinction is the division of operational responsibility between provider and consumer.

A lower-level service generally leaves more infrastructure responsibility with the consumer; a higher-level managed service transfers more responsibility to the provider. The exact boundary depends on the service.

**Advisor rule:** Never assess a cloud service without identifying the actual responsibility boundary.

---

## 15.4 Deployment Models

NIST's classic deployment taxonomy includes:

- public cloud,
- private cloud,
- community cloud,
- hybrid cloud.

These are deployment classifications, not security ratings.

A private environment is not automatically secure, and a public cloud service is not automatically insecure. Security depends on controls, configuration, identity, data handling, provider capabilities, and operating processes.

---

## 15.5 Cloud Architecture Reference Model

NIST's cloud reference architecture provides a vendor-neutral conceptual model for discussing cloud actors, roles, services, and responsibilities. It is intended as a reference framework rather than a specific vendor implementation. [NIST SP 500-292](https://www.nist.gov/publications/nist-cloud-computing-reference-architecture)

For enterprise AI, a useful abstraction is:

```text
Users / Systems
      ↓
Application / AI-IDSS
      ↓
AI / ML / Data Services
      ↓
Application Platform
      ↓
Compute / Storage / Network
      ↓
Physical / Provider Infrastructure
```

Cross-cutting:

```text
Identity · Security · Governance · Observability · Cost · Reliability
```

This is an architectural abstraction, not a mandatory cloud implementation.

---

## 15.6 The Advisor's First Cloud Question: What Must Be Controlled?

Before choosing a provider or service, identify control requirements:

- data location,
- data classification,
- identity,
- authorization,
- encryption,
- key management,
- network exposure,
- logging,
- retention,
- recovery,
- availability,
- operational access,
- regulatory/contractual constraints,
- model and workload portability.

Only after these are understood should service options be compared.

---

## 15.7 Shared Responsibility

Cloud does not eliminate operational responsibility. It redistributes it.

A useful conceptual model is:

```text
Provider responsibilities
        ↕
Service boundary
        ↕
Customer responsibilities
        ↕
Application / data / identity controls
```

The exact boundary varies by service model and provider service.

**Technical evidence:** NIST's cloud reference and security material emphasize distinct roles and responsibilities across cloud actors and service models. [NIST SP 500-292](https://www.nist.gov/publications/nist-cloud-computing-reference-architecture)

**Technical challenge:** Ask a vendor to identify precisely which controls are provided by the service and which remain the customer's responsibility.

---

## 15.8 Cloud Architecture Layers

For an enterprise AI platform, review at least these layers:

1. **Organization/account/subscription layer** — ownership, billing, policy boundaries.
2. **Identity layer** — users, services, roles, workload identities.
3. **Network layer** — connectivity, segmentation, ingress, egress.
4. **Compute layer** — VMs, containers, serverless, accelerators.
5. **Storage layer** — object, block, file, databases.
6. **Data layer** — governed datasets, pipelines, warehouses/lakehouses.
7. **AI/ML layer** — models, inference, evaluation, registries.
8. **Application layer** — APIs, orchestration, AI-IDSS.
9. **Operations layer** — logging, monitoring, incident response, backup.
10. **Governance layer** — policy, cost, security, compliance, audit.

A cloud architecture review should identify the control plane and failure modes at each layer.

---

## 15.9 Landing Zone and Organizational Boundaries

A landing zone is a governed starting environment for workloads. The exact implementation varies by cloud provider and organization.

A mature landing-zone design commonly addresses:

- account/project/subscription structure,
- identity integration,
- network topology,
- logging,
- security controls,
- policy enforcement,
- cost allocation,
- workload separation.

**Recommendation:** Establish organizational and security boundaries before rapidly adding AI workloads.

The goal is not to create maximum hierarchy. It is to create boundaries that support security, operations, accountability, and independent change.

---

## 15.10 Network Architecture

Cloud networking should be designed around actual communication requirements.

Important questions include:

- Which components must communicate?
- Which components must never communicate directly?
- Which services require inbound access?
- Which services require outbound internet access?
- Where does sensitive data cross a boundary?
- How is administrative access performed?
- How is traffic observed?

A useful abstraction is:

```text
Internet / External Systems
          ↓
     Controlled Edge
          ↓
   Application Services
          ↓
   Data / AI Services
          ↓
     Restricted Data
```

**Recommendation:** Avoid equating network isolation with complete security. Identity and authorization must remain explicit.

---

## 15.11 Identity-Centric Cloud Security

Modern cloud-native architectures increasingly require policies based on identities rather than implicit trust from network location.

NIST SP 800-207A describes a zero-trust model for cloud-native applications in multi-cloud environments and emphasizes application and service identities alongside user identities. [NIST SP 800-207A](https://csrc.nist.gov/pubs/sp/800/207/a/final)

For AI-IDSS, this means distinguishing identities such as:

```text
RD user
   ↓
AI-IDSS application identity
   ↓
Retrieval service identity
   ↓
Data service identity
   ↓
Model/inference service identity
```

Each identity should have only the permissions required for its role.

---

## 15.12 Compute Choices

Cloud compute may include:

- virtual machines,
- containers,
- managed container platforms,
- serverless functions,
- specialized accelerators,
- managed AI inference services.

No option is universally superior.

Evaluate:

- workload duration,
- latency,
- concurrency,
- statefulness,
- startup time,
- scaling behavior,
- GPU/accelerator requirements,
- operational burden,
- cost,
- portability.

**Recommendation:** Select compute from workload characteristics rather than organizational fashion.

---

## 15.13 Storage Architecture

Different storage types serve different access patterns.

| Storage | Typical role |
|---|---|
| Object storage | Documents, files, datasets, archives |
| Block storage | VM/application disks |
| File storage | Shared filesystem workloads |
| Relational database | Transactional structured data |
| Analytical store | Large-scale analytical queries |
| Vector/search index | Retrieval-oriented workloads |

A cloud architecture should avoid using one storage technology merely because it is already available.

For AI-IDSS, distinguish:

- authoritative source data,
- analytical copies,
- document stores,
- retrieval indexes,
- model artifacts,
- operational state,
- logs and audit records.

This preserves the Chapter 14 authority principle.

---

## 15.14 Data Residency and Data Location

“Where is the data?” is not a single question.

The advisor should ask:

- Where is primary data stored?
- Where are backups stored?
- Where is data processed?
- Where are logs stored?
- Where are encryption keys managed?
- Where can provider personnel access the service?
- Where do support operations occur?
- Where can derived data or model inputs be processed?

**Recommendation:** Translate residency requirements into explicit architectural controls rather than relying on a broad “regional cloud” label.

---

## 15.15 Encryption and Key Management

Encryption should be considered for:

- data in transit,
- data at rest,
- backups,
- sensitive intermediate artifacts,
- service-to-service communication where appropriate.

Key questions include:

- Who controls the keys?
- Where are keys stored?
- How are keys rotated?
- Who can administer them?
- Can access be audited?
- What happens if a key is revoked?

**Architecture principle:** Encryption is one control in a broader security architecture; encryption alone does not establish authorization or prevent misuse by an already-authorized process.

---

## 15.16 Secrets and Workload Identity

Application credentials should not be treated as ordinary configuration.

Prefer managed identity or workload-identity mechanisms where the platform supports them, subject to the organization's security requirements.

Avoid architectures where:

```text
Application
   ↓
Hard-coded long-lived credential
   ↓
Database / API
```

A stronger conceptual pattern is:

```text
Workload identity
      ↓
Authorization policy
      ↓
Short-lived / managed credential mechanism
      ↓
Target service
```

The exact mechanism is provider- and platform-dependent.

---

## 15.17 Availability and Failure Domains

Availability is an architectural property, not simply a cloud-provider marketing number.

Ask:

- What can fail?
- What is the failure domain?
- Can the workload survive a component failure?
- What happens during regional disruption?
- What dependencies remain outside the primary cloud environment?
- What is the recovery objective?

Distinguish:

- component redundancy,
- zone-level resilience,
- regional resilience,
- cross-provider resilience.

**Recommendation:** Match resilience architecture to business impact rather than maximizing redundancy by default.

---

## 15.18 Backup and Disaster Recovery

Backup is not the same as disaster recovery.

A backup may provide a copy of data; disaster recovery concerns restoring an acceptable service after a disruption.

Define at least:

- Recovery Point Objective (RPO): how much data loss is acceptable.
- Recovery Time Objective (RTO): how long recovery may take.
- dependencies required for recovery,
- restoration procedure,
- test frequency,
- recovery ownership.

**Architecture rule:** An untested recovery procedure is an assumption, not demonstrated resilience.

---

## 15.19 Observability

Cloud AI systems need visibility into:

- availability,
- latency,
- errors,
- resource consumption,
- data pipeline failures,
- model/inference failures,
- security events,
- cost anomalies.

Observability should support diagnosis, not merely dashboard creation.

For AI-IDSS, useful correlation identifiers can connect:

```text
RD request
   ↓
AI-IDSS request ID
   ↓
Agent/workflow
   ↓
Data retrieval
   ↓
Model invocation
   ↓
Recommendation
```

This complements the lineage architecture in Chapter 14.

---

## 15.20 Cost Architecture

Cloud cost should be modeled as an architectural variable.

Possible cost drivers include:

- compute hours,
- accelerators,
- storage,
- data transfer,
- managed services,
- databases,
- observability,
- security services,
- support,
- engineering effort.

The relevant question is not merely:

> “What is the cloud bill?”

but:

> **“What architectural behavior causes the bill, and which design choices control that behavior?”**

Examples:

- excessive model calls,
- unnecessary data movement,
- overprovisioned compute,
- inefficient storage tiers,
- uncontrolled logging,
- duplicate data copies.

Chapter 35 will address AI TCO in greater depth.

---

## 15.21 Portability and Vendor Dependency

Cloud portability is multidimensional.

A workload may be portable at one layer but deeply dependent at another:

```text
Application code        → potentially portable
Containers              → often portable
Managed database        → migration effort
Managed AI service      → potentially high dependency
Identity integration    → organization-specific
Operational processes   → highly contextual
```

**Recommendation:** Do not demand theoretical portability everywhere. Identify which dependencies are strategically material and design exit options for those.

This connects directly to Chapter 9's vendor-dependency analysis.

---

## 15.22 Hybrid and Multi-Cloud

Hybrid cloud combines environments; multi-cloud uses services from more than one cloud provider.

These approaches can be justified by:

- regulatory requirements,
- existing investments,
- workload characteristics,
- geographic needs,
- resilience requirements,
- contractual constraints,
- specialized services.

But they also introduce:

- identity complexity,
- networking complexity,
- observability fragmentation,
- skills requirements,
- duplicated controls,
- data movement,
- operational overhead.

**Recommendation:** Multi-cloud should be an explicit response to a requirement, not a generic synonym for strategic flexibility.

NIST's cloud federation reference architecture describes federation as having multiple possible deployment and governance options with corresponding trust, security, and resource-sharing considerations. [NIST SP 500-332](https://www.nist.gov/publications/nist-cloud-federation-reference-architecture)

---

## 15.23 Cloud Architecture for AI-IDSS

A reference pattern for the organization's AI-IDSS could be:

```text
                    Regional Director
                           ↓
                       AI-IDSS
                           ↓
                    Agent / Workflow
                           ↓
              ┌────────────┴────────────┐
              ↓                         ↓
       Analytical Models            LLM Service
              ↓                         ↓
              └────────────┬────────────┘
                           ↓
                  Governed Data Layer
                           ↓
                     Integration
                           ↓
                    Source Systems

Cloud foundation across all layers:
Identity · Network · Security · Observability · Cost · Recovery
```

The cloud layer should support the AI-IDSS; it should not become the source of business authority.

---

## 15.24 Common Cloud Anti-Patterns

### Anti-pattern 1 — “Cloud is automatically cheaper.”
Cost depends on architecture, workload, utilization, data movement, and operational model.

### Anti-pattern 2 — “Private cloud means secure.”
Deployment model does not establish security quality.

### Anti-pattern 3 — “One region is enough because the provider is reliable.”
Reliability requirements must be mapped to actual failure domains and recovery objectives.

### Anti-pattern 4 — “Multi-cloud eliminates lock-in.”
It may reduce some dependencies while increasing operational and integration complexity.

### Anti-pattern 5 — “Managed means no responsibility.”
Managed services transfer responsibilities; they do not eliminate them.

### Anti-pattern 6 — “Network isolation is sufficient.”
Identity and authorization remain necessary.

### Anti-pattern 7 — “Backups mean disaster recovery.”
Recovery requires tested restoration and defined objectives.

### Anti-pattern 8 — “Every workload needs Kubernetes.”
Compute orchestration should follow workload and operational requirements.

---

## 15.25 Technical Challenge Questions

When reviewing a cloud architecture, ask:

1. What requirements force the use of cloud?
2. What requirements constrain where data may be stored or processed?
3. Which responsibilities remain with the organization?
4. Where is the security boundary?
5. Which identities access which resources?
6. Where is authorization enforced?
7. What happens if the primary cloud region fails?
8. What are the RPO and RTO?
9. Has recovery actually been tested?
10. Which workloads require accelerators?
11. What drives the expected cloud cost?
12. Which data crosses network or provider boundaries?
13. Which services create strategic vendor dependency?
14. What is the exit path if a critical service becomes unavailable or unacceptable?
15. Does multi-cloud solve a demonstrated requirement or merely express preference?
16. Which architectural assumptions would fail if AI-IDSS usage increased tenfold?

---

## 15.26 Architecture Review Checklist

### Architecture
- [ ] Service and deployment model explicitly selected
- [ ] Responsibility boundaries documented
- [ ] Workload requirements mapped to cloud services

### Security
- [ ] Identity architecture defined
- [ ] Authorization enforced at resource/data boundaries
- [ ] Network exposure minimized and understood
- [ ] Encryption and key-management model defined
- [ ] Secrets/workload identity managed appropriately

### Data
- [ ] Data location understood
- [ ] Backup location understood
- [ ] Processing location understood
- [ ] Data authority preserved
- [ ] Cross-boundary movement documented

### Reliability
- [ ] Failure domains identified
- [ ] RPO/RTO defined
- [ ] Recovery dependencies identified
- [ ] Recovery tested

### Operations
- [ ] Logging and observability defined
- [ ] Incident responsibilities defined
- [ ] Capacity/scaling behavior understood
- [ ] Cost monitoring defined

### Strategic
- [ ] Material vendor dependencies identified
- [ ] Exit strategy considered where necessary
- [ ] Multi-cloud/hybrid complexity justified by requirements

### AI-IDSS
- [ ] Cloud services do not replace source-system authority
- [ ] Model/inference boundaries explicit
- [ ] AI workload identity explicit
- [ ] Retrieval and model calls auditable
- [ ] Human decision boundary preserved

---

## 15.27 Evidence Discipline

| Statement | Classification |
|---|---|
| NIST cloud definition | **Fact / Technical Evidence** |
| NIST service/deployment taxonomy | **Fact / Technical Evidence** |
| Cloud reference architecture | **Technical Evidence** |
| Identity-centric zero-trust architecture | **Technical Evidence** |
| “Cloud is not automatically cheaper” | **Inference / Recommendation** |
| “Multi-cloud increases complexity” | **Architecture inference; workload-dependent** |
| Specific provider service | **Implementation evidence / current product fact** |
| Specific cost | **Current vendor evidence; must be re-verified** |
| Specific regulatory residency requirement | **Requirement-dependent; verify jurisdiction and contract** |

Cloud products, prices, regional availability, model services, and provider capabilities change frequently. Such claims must be re-verified from current primary provider documentation before being used in an actual investment or architecture decision.

---

## 15.28 What Would Change Our Mind?

A cloud recommendation should remain conditional.

Examples:

- If on-premises infrastructure provides materially better economics and required control at the relevant workload scale, reconsider cloud placement.
- If a managed cloud service introduces unacceptable dependency without a viable exit path, reconsider that service.
- If regulatory or contractual requirements prohibit a proposed processing location, redesign the deployment.
- If measured workload behavior contradicts projected cost or performance assumptions, update the architecture.
- If resilience testing shows that the recovery design does not meet the required RTO/RPO, the architecture is not production-ready.
- If a multi-cloud design adds more operational risk than the requirement justifies, simplify it.

The advisor should defend requirements and risk boundaries, not a predetermined cloud vendor or deployment ideology.

---

## 15.29 Field Rule

> **Choose cloud architecture from control requirements, workload characteristics, failure consequences, operating responsibility, cost behavior, and strategic dependency—not from the popularity of a provider or the label “cloud-first.”**

For AI-IDSS, the practical chain is:

> **Requirements → control boundaries → identity → network → compute/storage → data/AI services → observability/recovery → cost → exit options.**

The cloud should make the AI-IDSS more reliable, secure, scalable, and economically defensible—not make the architecture harder to understand.
