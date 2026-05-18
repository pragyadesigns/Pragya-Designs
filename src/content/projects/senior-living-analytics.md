# Passive Reporting to Proactive Insights

**Tagline:** Modernizing senior living analytics to drive site-level adoption and operational velocity
**Role:** Product Designer and PM
**Timeline:** Oct 2025 – Present
**Company:** Client
## We will not mention the client name pulically
**Tools:** Figma, Power BI, React

---

## Metrics
- 2× more users reached (exapnding from C-suite operators to property-level directors)
- 60 pages redesigned under a unified design system
- Increased engagement — product actively used in new operator onboarding demos and reengagement sessions

---

## Problem
The client's operational data was trapped in a massive, four-vertical Power BI report (CRM, Revenue, Clinical, Financials). While functional for C-suite executives, it explained only the "what", not the "how" or "why". The data was not actionable for operators to meet monthly targets.

---

## Process

### Design
Built a React web app with embedded Power BI pages to go beyond Power BI's native restrictions. Key design work:

#### Web app design system
 Used customized MUI components with a minimal white and blue color theme.

 diagram: web-app-design-system


#### Power BI design system
Reduced visual noise by reducing the amount of color in charts, using a primary navy blue to call out data points of most criticality. Customized interactive Power BI components like buttons and toggles to appear more clickable, along with defining various interactive states.

diagram: powerbi-design-system


#### Working with design constraint
Pages are limited to 4–5 visuals with no vertical scroll on the page, thus every page tells a contained story or links out to another page for more details.

diagram: design-constraints


### Understanding the business
We began by mapping out real estate operational objectives (within each vertical) into 4 main pillars - maximize occupancy, Optimize Revenue, Minimize Expenses, and Provide High Quality Care and Maintain Resident Satisfaction.

diagram: business-pillars

We started with the persona of an operator CEO, and mapped out what insights he looks for from the overview page and what possible cause and effect routes he could branch into.

diagram: flow chart


### Redesigning key pages: Active Prospects

#### One Liner Description
The Active Prospects page was a key page which showed how prospective residents move through different stages of the sales pipeline.

#### Insights Operators Need
Things an operator should be able to say to property managers under him:
- “Your team is spending time on inactive leads.” 
- “Your outreach cadence doesn’t match prospect availability.”"
- “Follow-up is happening days later, not hours.”
- “You’re calling the right leads, but no one is picking up.”

#### Insights We Have and Dont Have
Insights we currently had:
##### Number of prospects in each stage
What we need:
- How long are prospects sitting in each stage?
- Which stages are prospects dropping off?

##### Move-ins per sales staff
What we need:
- How long on average are sales staff on the phone?
- How many of those calls to people in the Connected stage convert to tours?

##### Number of outbound and inbound activities (calls, texts, emails)
What we need:
- Are sales staff reaching out in time?
- How much of outreach is attempts at outreach rather than trying to meet quotas?
- How long are calls on average by stage?

#### Final Page Structure for the People Vertical:

1. Lead Stages: This pages starts as the launch point to delve deeper either into pipeline issues and examine where and why prospects are stuck(through the Prospects by Days in Stage) or to examine the effectiveness of the sale sstaff and see if their mode and feequency of communication is resulting in tours being scheduled.

2. Touchpoints: Provides a detailed, interaction-level view of sales touchpoints to help leadership understand who is driving outreach patterns and which prospects are being engaged. While the Lead Stages page surfaces aggregate signals (e.g., call duration distributions, total call minutes), the Touchpoints page exists to answer, “What is actually happening on these calls?”

3. Active Prospects:
This page helps operators understand:
- Which counselors are performing above or below expectations?
- Are some counselors overloaded while others are underutilized?
- Are follow-ups and outreach consistent across the team?

4. Events: A detailed view of tours (how many are scheulded, cancelled, completed), a list of prospects touring and upcoming tours as well as deposits collected

5. Lost Prospects: Lets operator analyze deactivated prospects by lead source, stage, and key trends to understand where leads are being lost.

diagram: people-vertical-pages

#### Challenges

##### Challenge 1 — Data consistency
Discovered that key fields in Yardi were optional or inconsistently filled. Example: call minutes (sales effectiveness proxy) were often blank or rounded. Pipeline stage transitions were sometimes missed by sales staff, causing incorrect funnel data. Adapted designs to not rely on incomplete fields and surfaced data quality caveats in the UI.


---

### Redesigning KPIs for better insights

#### The Problem
KPIs were spatially isolated from their supporting visuals, that led to a fragmented layout, requiring users to manually synthesize data points scattered across the canvas. Status indicators beneath the values lacked visual weight and modern affordance.

- Up and down indicators were not enough to signify good or bad - sometimes up was good and sometimes it was bad.
- Red and green were not accessible to colorblind folks.
- The abbreviation PM felt very default, so we spelled it out.

### The Redesign
We positioned KPIs within related charts and wrote out a single takeaway from the charts to help launch operators into further pages. This helped chunk the pages into logical sections.

diagram: CRM-page-before-and-after

---

### Resources 
#### One Liner Description
We needed user guides to orient new users with the embedded Power BI as well as how to interpret and get the most from their data. We created a final solution and an interim solution.

#### Final Solution
We put interaction tips, data definitions and next steps that the user could access from the page itself at the moment of confusion.

diagram: Resources-sidepane

#### Interim Solution
We created a PDF versions of resources for each vertical, as well as a beginner essentials guide that users can download from the Resources page.

---

## Outcome
Improved operator adoption — the client now uses the web app as a live demo in new operator onboarding conversations. Operators report that data is easier to interpret and act on. Next steps include a rollout to property-level management.


