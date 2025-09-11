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

1. **Set up the 5-question form** (income, expenses, dependents, current coverage, emergency fund)
2. **Build calculation engine** (life insurance gap, emergency fund gap, financial health score)
3. **Create results display** (traffic light status + 3-5 prioritized action items)
4. **Add progress & validation** (question navigation, input validation, mobile responsiveness)
5. **Test & polish** (edge cases, clear messaging, print-friendly results)

## Prompts to Use with Me (copy/paste)

**Financial Assessment Specific Prompts:**
- "Create the 5-question financial assessment form with proper input validation"
- "Build the calculation logic for life insurance needs and emergency fund gaps"
- "Generate a results component with traffic light status (red/yellow/green) and action items"
- "Add form navigation with progress indicator and back/next buttons"
- "Create realistic financial scenarios for testing (single parent, dual income, retiree)"
- "Implement client-side printing/saving of results without external dependencies"

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
