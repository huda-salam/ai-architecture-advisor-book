# Evidence Review — Chapter 43

## Scope

Chapter 43 examines documented AI and technology-enabled business failures to identify architectural boundary conditions and failure mechanisms. It deliberately avoids treating every business failure involving algorithms as a pure AI-model failure.

## 1. Amazon Experimental Recruiting System

Reuters reported in October 2018 that Amazon had developed an experimental machine-learning recruiting system trained on historical resumes and that the system developed gender-biased behavior. The reporting states that most historical applicants were men, that the system penalized some indicators associated with women, and that Amazon ultimately disbanded the team after attempts to neutralize specific terms did not provide sufficient assurance. [Reuters, October 10, 2018](https://www.reuters.com/article/us-amazon-com-jobs-automation-insight-idUSKCN1MK08G)

Evidence class: **Industry Evidence / Independent Reporting**.

Limitation: the public technical evidence is incomplete and relies substantially on sources familiar with the project. It should therefore support the documented failure narrative and architecture questions, not claims about the exact internal model design beyond what was reported.

Architectural inference supported by the case: historical training data can encode undesirable historical patterns; removing known proxy terms does not necessarily establish fairness or robustness against other learned correlations.

## 2. Zillow Offers

Zillow's SEC filings provide primary corporate evidence. Zillow stated that Zillow Offers used data science and proprietary algorithms to help value and price homes, while acknowledging that assessments could be inaccurate. In November 2021, the board decided to wind down the business, citing home-price unpredictability, capacity constraints, and other operational challenges. The 2021 filing reported a $407.9 million inventory write-down and additional wind-down/restructuring costs. [Zillow Group 2021 Form 10-K, SEC](https://www.sec.gov/Archives/edgar/data/1617640/000161764022000013/z-20211231.htm)

The 2022 annual filing states that the wind-down was completed in the third quarter of 2022 and resulted in approximately a 25% workforce reduction. [Zillow Group 2022 Form 10-K, SEC](https://www.sec.gov/Archives/edgar/data/1617640/000161764023000010/z-20221231.htm)

Evidence class: **Corporate Disclosure / Industry Evidence**.

Important qualification: this should not be described as proof that an AI model “failed.” Zillow's own explanation includes market unpredictability, capacity constraints, operational conditions, and business-model considerations. The case is valuable precisely because it demonstrates how predictive technology interacts with capital, inventory, financing, and market risk.

## 3. IBM Watson Health

STAT reported in 2022 that IBM sold core Watson Health data and analytics assets after the business failed to meet its ambitions. The reporting described difficulties integrating acquired health-information companies, data, and organizational cultures into a coherent business, together with missed sales targets. [STAT, January 21, 2022](https://www.statnews.com/2022/01/21/ibm-watson-health-sale-equity/)

Evidence class: **Independent Industry Reporting**.

Limitation: the case is not a controlled technical postmortem and should not be used to infer that Watson models themselves were technically incapable. Its value is as evidence that an AI business can fail because the surrounding data, organizational, product, and integration system is not viable.

## 4. Failure-Mode Research

A 2025 academic article, “Learning from AI Failures: A Critical Analysis of Enterprise AI Implementation,” analyzes an enterprise AI implementation failure and identifies data quality, system integration, and scalability as important failure points. [IJSRCSEIT, 2025](https://ijsrcseit.com/index.php/home/article/view/CSEIT251112176)

Evidence class: **Research Evidence**.

Limitation: the article describes a particular case and should not be interpreted as a statistical estimate of enterprise AI failure rates.

## 5. Financial-Services Sector Evidence

The U.S. Government Accountability Office's 2025 report on AI use and oversight in financial services documents risks including operational and cybersecurity risk, third-party and model risk, data-quality problems, and model underperformance. GAO also reports that an OCC AI-focused review of seven large banks identified observations including risk assessments that did not explicitly capture AI-specific factors and limited information on evaluation of bias and fair-lending issues. [GAO-25-107197, May 19, 2025](https://www.gao.gov/products/gao-25-107197)

Evidence class: **Government / Supervisory Evidence**.

This is not evidence that the reviewed banks experienced a specific catastrophic AI failure. It is evidence that supervisors observed governance and risk-management gaps that can become failure mechanisms.

## Cross-Case Evidence Discipline

The cases support different conclusions with different confidence:

| Case | Strongest defensible conclusion | What it does not prove |
|---|---|---|
| Amazon recruiting | Historical training data can produce unacceptable learned patterns; targeted fixes may not be sufficient | That all ML hiring systems are biased |
| Zillow Offers | Predictive systems can interact with operational, market, and capital constraints in ways that overwhelm the business model | That the valuation model alone caused the failure |
| Watson Health | AI businesses can fail through data/integration/organizational complexity | That the underlying AI models were technically useless |
| Enterprise failure study | Data quality, integration, and scalability can be failure mechanisms | A universal failure rate |
| GAO financial-services review | AI creates model, operational, cyber, data, and third-party risks requiring governance | That every financial institution has experienced material AI failure |

## Negative-Evidence Search Protocol

For future chapters, the advisor should search deliberately for:

1. discontinued AI products;
2. abandoned pilots;
3. regulatory findings;
4. postmortems;
5. financial write-downs;
6. model withdrawals;
7. provider migrations;
8. failed scaling attempts;
9. customer complaints or operational incidents;
10. published evaluation failures.

Search terms should combine the technology with failure terms such as:

**failed, abandoned, discontinued, shutdown, impairment, write-down, incident, postmortem, bias, rollback, migration, outage, inaccurate, unreliable, cost overrun.**

## Evidence Gap

Failure evidence remains substantially less complete than success evidence. Organizations have commercial and reputational incentives to disclose successful deployments while limiting disclosure of unsuccessful projects and detailed postmortems.

Therefore:

> **Absence of public failure evidence is not evidence of absence of failure.**

This is a methodological limitation, not a claim about the true prevalence of failures.

## Bottom Line

The chapter's central claim is deliberately modest:

> Failure cases are valuable because they expose boundary conditions that success stories often hide.

The advisor should use them to test assumptions, identify missing controls, and determine where evidence must become stronger before an architecture is approved.
