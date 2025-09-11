# Product Requirements Document (PRD)

## 1. Vision & Objectives

**Family Financial Shield** is a single-page React application that helps families quickly assess their financial preparedness if they lost their primary income. 

**Core MVP Goal**: Complete a 5-question assessment and receive a personalized action checklist in under 3 minutes.

**Technical Approach**: Pure client-side React + Vite with no backend dependencies, optimized for rapid development and immediate user value.

## 2. User Stories

**Primary User Story** (MVP Focus):
- As a parent, I want to answer 5 simple questions about my family's finances and immediately see a personalized checklist of actions to protect my family.

**Supporting Stories** (Post-MVP):
- As a user, I want to save or print my results so I can reference them later.
- As a planner, I want to adjust key numbers to see how my recommendations change.

## 3. Feature List

## 3.1. Core User Flow (MVP)

**Step 1: Landing** (10 seconds)
- Hero section: "Protect your family in 3 minutes"
- Single CTA button: "Start Assessment"

**Step 2: Assessment** (90 seconds)
- 5 questions with input validation
- Progress indicator (1/5, 2/5, etc.)
- "Next" button advances, "Back" allows editing

**Step 3: Results** (60 seconds)
- Traffic light status (Red: Critical gaps, Yellow: Some gaps, Green: Well protected)
- Calculated recommendation: "You need $XXX,XXX in life insurance"
- 3-5 bullet action items (prioritized by impact)

**Step 4: Next Steps** (30 seconds)
- "Save Results" button (triggers download/print)
- "Start Over" to run different scenario
- Optional: "Learn More" links (static content)

### MVP Features

**Hour 1: Core MVP (Minimum Viable Prototype)**

1. **5-Question Assessment Form**
   - Annual household income
   - Monthly essential expenses
   - Number of dependents (children under 18)
   - Current life insurance coverage
   - Emergency fund (months of expenses)

2. **Instant Results Screen**
   - Financial gap calculation (client-side)
   - 3-5 prioritized action items
   - Simple traffic light indicator (Red/Yellow/Green)

3. **Basic UI/UX**
   - Single page with form → results flow
   - Clean, mobile-friendly design
   - Progress indicator for form completion

### Stretch Goals

**Post-MVP Enhancements** (if time permits):
- Print/save results functionality
- "What-if" scenario slider (adjust income/expenses)
- Visual progress bar for financial health score
- Local storage to remember previous assessments

## 3.2. Technical Implementation Guide

**State Management**: Single React component with `useState` for form data and results
**Styling**: CSS modules or inline styles (avoid external CSS frameworks initially)
**Validation**: Simple client-side validation with error messages
**Calculations**: 
- Basic life insurance need = (Annual income × 10) + (Monthly expenses × 12 × years until youngest is 18)
- Emergency fund gap = Target (6 months expenses) - Current savings
**Data Flow**: Form inputs → calculation function → results display (all in-memory)

## 4. Success Metrics

**MVP Success Criteria**:
- ✅ Form submits without errors
- ✅ Calculations produce reasonable results
- ✅ User can complete assessment in under 3 minutes
- ✅ Results page displays clear action items
- ✅ Works on mobile and desktop browsers

**Post-Launch Metrics** (if deployed):
- Form completion rate >80%
- Average time to complete <3 minutes
- User feedback on clarity and usefulness

## 5. Constraints or Assumptions

**Development Constraints**:
- ⏱️ **Time**: Target 1-hour MVP, max 2 hours for polished version
- 🔧 **Tech Stack**: React + Vite only (no additional dependencies unless absolutely necessary)
- 💾 **Data**: All client-side, no backend, no external APIs
- 📱 **Scope**: Single-page application with minimal routing
- 🎯 **Focus**: Functional over beautiful (UX > UI for MVP)

**Assumptions**:
- Users have basic financial literacy (know their income/expenses)
- Desktop and mobile usage expected
- Modern browser support (ES6+)
- No data persistence required (session-based)

## 6. Development Roadmap

**Phase 1 (0-30 min): Foundation**
- [ ] Set up basic React component structure
- [ ] Create form with 5 input fields
- [ ] Add form validation and state management
- [ ] Test form submission and data flow

**Phase 2 (30-45 min): Core Logic**
- [ ] Implement financial calculation functions
- [ ] Create results display component
- [ ] Add traffic light status indicator
- [ ] Generate personalized action items

**Phase 3 (45-60 min): Polish & Test**
- [ ] Add basic styling and responsive design
- [ ] Implement progress indicator
- [ ] Test edge cases and validation
- [ ] Final UX review and adjustments

**Phase 4 (Optional): Enhancements**
- [ ] Add print/save functionality
- [ ] Improve visual design
- [ ] Add "what-if" scenarios
- [ ] Local storage for form data
