// Detailed product information database for Family Financial Shield assessment
export const productInfo = {
  'Term Life Insurance': {
    name: 'Term Life Insurance',
    description: 'Temporary life insurance that provides coverage for a specific period (10, 20, or 30 years) at a lower cost.',
    howItWorks: 'You pay premiums for the term period. If you die during the term, your beneficiaries receive the death benefit. If you outlive the term, coverage ends unless renewed.',
    pros: ['Most affordable life insurance', 'Simple and straightforward', 'Can convert to permanent insurance'],
    cons: ['Temporary coverage only', 'Premiums increase with age at renewal', 'No cash value'],
    bestFor: 'Young families with temporary needs like mortgage protection or income replacement during child-rearing years.'
  },
  'Whole Life Insurance': {
    name: 'Whole Life Insurance',
    description: 'Permanent life insurance with guaranteed death benefit and cash value that grows over time.',
    howItWorks: 'You pay fixed premiums for life. Part goes to insurance cost, part builds cash value you can borrow against. Death benefit is guaranteed.',
    pros: ['Lifelong coverage', 'Guaranteed cash value growth', 'Fixed premiums', 'Tax-advantaged growth'],
    cons: ['Much more expensive than term', 'Lower returns than investments', 'Complex product'],
    bestFor: 'High-income individuals who have maxed out other tax-advantaged accounts and need permanent coverage.'
  },
  'Universal Life': {
    name: 'Universal Life Insurance',
    description: 'Flexible permanent life insurance where you can adjust premiums and death benefits within limits.',
    howItWorks: 'Premiums go into an account that earns interest. Insurance costs are deducted monthly. You can vary premium payments and adjust death benefit.',
    pros: ['Flexible premiums', 'Adjustable death benefit', 'Cash value growth potential', 'Tax advantages'],
    cons: ['Complex to manage', 'Market risk on cash value', 'Could lapse if underfunded'],
    bestFor: 'Sophisticated investors who want permanent coverage with flexibility and are comfortable managing the policy.'
  },
  'Spousal Benefits': {
    name: 'Social Security Spousal Benefits',
    description: 'Benefits paid to surviving spouses and children based on the deceased worker\'s earnings record.',
    howItWorks: 'Surviving spouse can receive up to 100% of deceased spouse\'s benefit at full retirement age, or reduced benefits as early as age 60 (50 if disabled).',
    pros: ['Guaranteed government benefit', 'Inflation-adjusted', 'No investment risk', 'Family coverage'],
    cons: ['Limited to Social Security wage base', 'Subject to government changes', 'May not replace full income'],
    bestFor: 'All families as a foundation of survivor protection, but shouldn\'t be the only source of income replacement.'
  },
  'Primary Mortgage': {
    name: 'Primary Mortgage',
    description: 'The main loan used to purchase your home, secured by the property itself.',
    howItWorks: 'You borrow money to buy a home and pay it back over 15-30 years with interest. The home serves as collateral - if you don\'t pay, the lender can foreclose.',
    pros: ['Enables homeownership', 'Tax-deductible interest', 'Builds equity over time', 'Fixed payments with fixed-rate loans'],
    cons: ['Long-term debt obligation', 'Risk of foreclosure', 'Interest costs over life of loan', 'Ties up capital'],
    bestFor: 'Families who want to own their home and have stable income to support monthly payments for decades.'
  },
  'Federal Student Loans': {
    name: 'Federal Student Loans',
    description: 'Government-backed loans for education expenses with borrower protections and flexible repayment options.',
    howItWorks: 'Government loans money for education. Repayment typically begins 6 months after graduation. Various repayment plans available based on income.',
    pros: ['Lower interest rates', 'Income-driven repayment plans', 'Loan forgiveness programs', 'Deferment options'],
    cons: ['Debt burden after graduation', 'May not discharge in bankruptcy', 'Interest accrues during school', 'Limits on amounts'],
    bestFor: 'Students who need financing for education and want the protections and flexibility of federal programs.'
  },
  'Roth IRA': {
    name: 'Roth IRA',
    description: 'Individual retirement account funded with after-tax dollars that grows tax-free.',
    howItWorks: 'You contribute after-tax money (up to annual limits). Money grows tax-free and withdrawals in retirement are tax-free. No required distributions.',
    pros: ['Tax-free growth and withdrawals', 'No required distributions', 'Contributions can be withdrawn penalty-free', 'Tax diversification'],
    cons: ['Income limits for contributions', 'Annual contribution limits', 'No immediate tax deduction'],
    bestFor: 'Young savers in lower tax brackets now who expect to be in higher brackets in retirement, or high earners wanting tax diversification.'
  },
  'HSA': {
    name: 'Health Savings Account (HSA)',
    description: 'Triple tax-advantaged account for medical expenses, available with high-deductible health plans.',
    howItWorks: 'Contribute pre-tax dollars, money grows tax-free, withdrawals for qualified medical expenses are tax-free. After age 65, can withdraw for any purpose (taxed as income).',
    pros: ['Triple tax advantage', 'No "use it or lose it"', 'Investment options for growth', 'Retirement healthcare planning'],
    cons: ['Requires high-deductible health plan', 'Limited to medical expenses before 65', 'Annual contribution limits'],
    bestFor: 'Anyone with a qualifying high-deductible health plan, especially those who can afford to pay medical expenses out-of-pocket and let HSA grow.'
  }
  // Add more products as needed
}
