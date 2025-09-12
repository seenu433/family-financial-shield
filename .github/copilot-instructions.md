# Copilot Instructions — Family Financial Shield

> Purpose: Build a **Family Financial Assessment Tool** that helps parents evaluate their financial preparedness in case of income loss. Target: 3-minute user experience, 1-hour development time.

## Repo Context

- **Project**: Family Financial Shield - financial preparedness assessment tool
- **Target Users**: Parents and caregivers concerned about family financial security
- **Core Action**: Complete 5-question assessment → receive personalized financial protection checklist
- **Domain**: Personal finance, life insurance needs analysis, emergency planning
- Keep calculations simple but realistic. Focus on actionable recommendations over complex analysis.

## Guardrails

- **No backend dependencies** - All calculations must run client-side
- **Financial accuracy** - Use realistic formulas but keep them simple (e.g., life insurance = 10x income + education costs)
- **Input validation** - Numbers only for financial fields, reasonable ranges (income $1K-$1M+)
- **Mobile-first** - Parents often use phones for quick financial checks
- **Progressive disclosure** - Show one question at a time with progress indicator
- Single App.jsx component until functionality is proven, then split if needed

## Build Flow (ask the user step-by-step)

## Home Page Enhancement Requirements

### **Comprehensive Assessment Process Explanation**

Create an informational home page section that educates users about the comprehensive financial assessment process before they start. This should cover the four key financial areas:

**1. Benefits (Assets) Section**
- Life Insurance coverage and benefits
- Social Security survivor benefits  
- Retirement accounts (401K, IRA)
- Savings and investment accounts (brokerage, HSA, FSA)
- Real Estate and property values
- Accidental Death & Dismemberment coverage
- Term insurance and mortgage protection

**2. Liabilities Section**
- Outstanding mortgage debt
- Credit card balances and personal loans
- Student loans and other education debt
- Car loans and other secured debt
- Business debts and obligations
- Medical debt and ongoing expenses

**3. Tax Implications Section**
- Estate tax considerations
- Income tax on survivor benefits
- Tax treatment of different account types
- State-specific tax implications
- Strategies to minimize tax burden on survivors

**4. Legal & Administrative Expenses**
- Probate court costs and legal fees
- Estate administration expenses
- Funeral and burial costs
- Executor fees and professional services
- Document preparation and filing costs

**5. Monthly Maintenance Expenses (Ongoing Living Costs)**
- Housing costs (rent/mortgage, utilities, maintenance, property taxes)
- Food and grocery expenses
- Transportation costs (car payments, insurance, fuel, maintenance)
- Healthcare and medical expenses (insurance premiums, medications, doctor visits)
- Education expenses (tuition, supplies, childcare, extracurriculars)
- Insurance premiums (life, health, auto, home, disability)
- Clothing and personal care items
- Entertainment, recreation, and family activities
- Debt service payments (minimum payments on existing loans)
- Emergency fund replenishment (rebuilding after expenses)
- Savings and investment contributions for future goals

### **Educational Content Requirements**

**Pre-Assessment Information:**
- Clear explanation: "Benefits (A) - Liabilities (B) - Taxes (C) ≥ Monthly Maintenance Expenses (D) × Time Period"
- Visual diagram showing the assessment framework
- Importance of comprehensive financial planning
- Benefits of completing the assessment

**Process Flow Explanation:**
- Step-by-step walkthrough of what the assessment covers
- Expected time commitment (3 minutes)
- What users will receive (personalized action plan)
- Disclaimer about consulting licensed financial advisors

**Trust-Building Elements:**
- Educational disclaimer: "For education only, not financial advice"
- Encouragement to consult licensed financial advisors
- Copyright notice and professional presentation
- Clear value proposition for families

### **Home Page UI/UX Requirements**

**Layout Structure:**
1. **Hero Section** - Logo + "How secure is my family?" headline
2. **Value Proposition** - Brief explanation of assessment importance
3. **Five Pillars Section** - Visual cards for Benefits, Liabilities, Tax, Legal/Expenses, Monthly Maintenance
4. **Assessment Formula** - "A - B - C ≥ D × Years" explanation with icons and time factor
5. **Process Preview** - What to expect in the 5-question assessment
6. **Call to Action** - "Start Assessment" button
7. **Footer** - Disclaimer and educational notice

**Visual Design Requirements:**
- **Five-column grid** showcasing each assessment area (responsive to 2x3 on mobile)
- **Icons or visuals** for Benefits, Liabilities, Tax, Legal, and Monthly Maintenance sections
- **Progressive disclosure** - expandable sections for detailed information
- **Mobile-responsive** design that stacks vertically on phones
- **Professional color scheme** that builds trust for financial content
- **Clear typography hierarchy** for easy scanning

**Content Strategy:**
- **Educational tone** - inform without overwhelming
- **Jargon-free language** - accessible to all parents
- **Bullet points** - easy-to-scan lists of covered items
- **Realistic examples** - relatable scenarios for families
- **Action-oriented** - focus on what users will accomplish

### **Implementation Approach**

**Phase 1: Enhanced Landing Page**
- Add comprehensive explanation sections before CTA
- Include the five assessment pillars with brief descriptions
- Maintain existing "Start Assessment" flow

**Phase 2: Detailed Information Sections**
- Expandable/collapsible sections for each pillar
- Detailed lists of benefits, liabilities, tax considerations, and monthly maintenance expenses
- Visual formula representation (A - B - C ≥ D × Years)

**Phase 3: Educational Resources**
- "Learn More" links to static educational content
- Tooltips explaining financial terms
- Examples and scenarios relevant to families

1. **Set up the 5-question form** (income, expenses, dependents, current coverage, emergency fund)
2. **Build calculation engine** (life insurance gap, emergency fund gap, financial health score)
3. **Create results display** (traffic light status + 3-5 prioritized action items)
4. **Add progress & validation** (question navigation, input validation, mobile responsiveness)
5. **Test & polish** (edge cases, clear messaging, print-friendly results)

## Prompts to Use with Me (copy/paste)

**Financial Assessment Specific Prompts:**

**Financial Assessment Specific Prompts:**
- "Create an enhanced home page explaining the assessment process with Benefits, Liabilities, Tax, and Legal sections"
- "Build a four-pillar educational section showing what the assessment covers (A-B-C>D formula)"
- "Add expandable information cards for Benefits, Liabilities, Tax implications, and Legal expenses"
- "Create the 5-question financial assessment form with proper input validation"
- "Build the calculation logic for life insurance needs and emergency fund gaps"
- "Generate a results component with traffic light status (red/yellow/green) and action items"
- "Add form navigation with progress indicator and back/next buttons"
- "Create realistic financial scenarios for testing (single parent, dual income, retiree)"
- "Implement client-side printing/saving of results without external dependencies"

**Home Page Enhancement Prompts:**
- "Create educational content explaining Benefits (life insurance, 401k, savings, real estate)"
- "Add Liabilities section covering mortgage, credit cards, loans, and other debts"
- "Build Tax implications section explaining estate tax, survivor benefit taxation"
- "Create Legal & Administrative expenses section (probate, funeral, executor fees)"
- "Add Monthly Maintenance Expenses section (housing, food, transportation, healthcare, education)"
- "Add visual A-B-C≥D×Years formula explanation with time factor and icons"
- "Implement collapsible sections for detailed financial education content"
- "Create monthly expense calculator to determine ongoing living costs"

**General Development Prompts:**

- "Refactor App.jsx to separate form logic from calculation logic"
- "Add input validation for financial fields (currency formatting, reasonable ranges)"
- "Make this mobile-responsive for parents checking on their phones"
- "Write clear, jargon-free copy for financial recommendations"

## Quality Bar

**MVP Success Criteria:**

- ✅ All 5 assessment questions collect valid input
- ✅ Financial calculations produce reasonable results (no negative insurance needs)
- ✅ Results display clear action items prioritized by impact
- ✅ Form can be completed in under 3 minutes
- ✅ Works on mobile devices (responsive design)
- ✅ No runtime errors, builds successfully
- ✅ Uses appropriate financial terminology but stays accessible

## Stretch (only after MVP)

**Post-MVP Enhancements (only after core functionality works):**

- Add "what-if" scenarios with sliders to adjust income/expenses
- Implement local storage to save assessment data
- Add visual progress bar for financial health score
- Include educational tooltips explaining financial concepts
- Create print-optimized CSS for results page
- Add basic animations for form transitions and result reveals
