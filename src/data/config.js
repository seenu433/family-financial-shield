// Detailed pillar data with instruments
export const pillarData = {
  benefits: {
    title: 'Benefits (A)',
    icon: '💰',
    summary: ['Life Insurance', 'Social Security', 'Retirement (401K, IRA)', 'Savings & Investments', 'Real Estate'],
    instruments: [
      {
        name: 'Life Insurance',
        description: 'Death benefit paid to beneficiaries to replace income and cover expenses',
        relatedProducts: ['Term Life Insurance', 'Whole Life Insurance', 'Universal Life', 'Group Life Insurance', 'Accidental Death & Dismemberment']
      },
      {
        name: 'Social Security Survivor Benefits',
        description: 'Monthly payments to eligible spouses and children based on your earnings record',
        relatedProducts: ['Spousal Benefits', 'Child Benefits', 'Lump-Sum Death Payment', 'Disability Benefits']
      },
      {
        name: 'Retirement Accounts',
        description: 'Tax-advantaged savings accounts that can provide income to survivors',
        relatedProducts: ['401(k)', 'IRA (Traditional & Roth)', '403(b)', 'SEP-IRA', 'Pension Plans']
      },
      {
        name: 'Savings & Investment Accounts',
        description: 'Liquid assets and investments that can be accessed by survivors',
        relatedProducts: ['Savings Accounts', 'Brokerage Accounts', 'HSA Accounts', 'FSA Accounts', 'Money Market Accounts']
      },
      {
        name: 'Real Estate',
        description: 'Property value that can provide ongoing income or be liquidated',
        relatedProducts: ['Primary Residence', 'Rental Properties', 'REITs', 'Mortgage Protection Insurance']
      }
    ]
  },
  liabilities: {
    title: 'Liabilities (B)',
    icon: '📊',
    summary: ['Mortgage Debt', 'Credit Cards', 'Student Loans', 'Car Loans', 'Other Debts'],
    instruments: [
      {
        name: 'Mortgage Debt',
        description: 'Outstanding balance on home loans that survivors must pay or face foreclosure',
        relatedProducts: ['Primary Mortgage', 'Home Equity Loans', 'HELOC', 'Reverse Mortgage', 'PMI']
      },
      {
        name: 'Credit Card Debt',
        description: 'High-interest revolving debt that can quickly compound if not managed',
        relatedProducts: ['Credit Cards', 'Store Cards', 'Personal Lines of Credit', 'Balance Transfer Cards']
      },
      {
        name: 'Student Loans',
        description: 'Education debt that may or may not be discharged upon death depending on loan type',
        relatedProducts: ['Federal Student Loans', 'Private Student Loans', 'Parent PLUS Loans', 'Graduate PLUS Loans']
      },
      {
        name: 'Auto Loans',
        description: 'Vehicle financing that survivors must continue or face repossession',
        relatedProducts: ['Car Loans', 'Motorcycle Loans', 'RV Loans', 'Boat Loans', 'Lease Agreements']
      },
      {
        name: 'Business & Medical Debt',
        description: 'Professional and healthcare-related obligations that may impact the estate',
        relatedProducts: ['Business Loans', 'Medical Bills', 'Personal Loans', 'Tax Debt', 'Legal Judgments']
      }
    ]
  },
  taxes: {
    title: 'Taxes (C)',
    icon: '🏛️',
    summary: ['Estate Taxes', 'Income Tax on Benefits', 'State Tax Implications', 'Account Tax Treatment', 'Tax Optimization'],
    instruments: [
      {
        name: 'Federal Estate Tax',
        description: 'Tax on the transfer of property at death (2024 exemption: $13.61 million)',
        relatedProducts: ['Estate Tax Return', 'Generation-Skipping Tax', 'Gift Tax', 'Trust Structures']
      },
      {
        name: 'Income Tax on Benefits',
        description: 'Taxes owed on retirement account distributions and other taxable benefits',
        relatedProducts: ['Traditional IRA/401k Withdrawals', 'Pension Distributions', 'Investment Gains', 'Interest Income']
      },
      {
        name: 'State Tax Implications',
        description: 'State-level taxes that vary significantly by jurisdiction',
        relatedProducts: ['State Estate Tax', 'State Income Tax', 'Inheritance Tax', 'Property Tax']
      },
      {
        name: 'Tax-Advantaged Accounts',
        description: 'Accounts with special tax treatment that can minimize tax burden',
        relatedProducts: ['Roth IRA', 'Roth 401k', 'HSA', 'Life Insurance (tax-free death benefit)', '529 Plans']
      },
      {
        name: 'Tax Planning Strategies',
        description: 'Methods to minimize tax burden on survivors and maximize after-tax benefits',
        relatedProducts: ['Trust Planning', 'Charitable Giving', 'Tax Loss Harvesting', 'Asset Location Strategy']
      }
    ]
  },
  legal: {
    title: 'Legal Expenses',
    icon: '⚖️',
    summary: ['Probate Costs', 'Legal Fees', 'Funeral Expenses', 'Executor Fees', 'Administrative Costs'],
    instruments: [
      {
        name: 'Probate Court Costs',
        description: 'Legal process fees for validating wills and distributing assets',
        relatedProducts: ['Court Filing Fees', 'Probate Attorney Fees', 'Appraisal Costs', 'Publication Fees']
      },
      {
        name: 'Estate Administration',
        description: 'Professional services needed to settle the estate and distribute assets',
        relatedProducts: ['Executor Fees', 'Trustee Fees', 'Accounting Services', 'Tax Preparation', 'Asset Valuation']
      },
      {
        name: 'Funeral & Burial Costs',
        description: 'End-of-life expenses that can range from $7,000 to $15,000 or more',
        relatedProducts: ['Funeral Services', 'Burial Plot', 'Cremation', 'Memorial Services', 'Funeral Insurance']
      },
      {
        name: 'Document Preparation',
        description: 'Legal documents needed to protect family and facilitate asset transfer',
        relatedProducts: ['Will', 'Trust Documents', 'Power of Attorney', 'Healthcare Directives', 'Beneficiary Designations']
      },
      {
        name: 'Ongoing Legal Support',
        description: 'Continued legal assistance that survivors may need',
        relatedProducts: ['Estate Litigation', 'Tax Disputes', 'Insurance Claims', 'Business Succession', 'Guardian Appointments']
      }
    ]
  },
  expenses: {
    title: 'Monthly Expenses (D)',
    icon: '🏠',
    summary: ['Housing & Utilities', 'Food & Groceries', 'Transportation', 'Healthcare', 'Education & Childcare'],
    instruments: [
      {
        name: 'Housing Costs',
        description: 'Ongoing costs to maintain the family home and living situation',
        relatedProducts: ['Rent/Mortgage Payments', 'Property Taxes', 'Homeowners Insurance', 'Utilities', 'Maintenance & Repairs']
      },
      {
        name: 'Food & Essential Living',
        description: 'Basic necessities required to maintain the family\'s standard of living',
        relatedProducts: ['Groceries', 'Dining Out', 'Household Supplies', 'Clothing', 'Personal Care Items']
      },
      {
        name: 'Transportation Expenses',
        description: 'Costs to maintain mobility and transportation for the family',
        relatedProducts: ['Car Payments', 'Auto Insurance', 'Fuel & Maintenance', 'Public Transportation', 'Vehicle Registration']
      },
      {
        name: 'Healthcare & Insurance',
        description: 'Medical expenses and insurance premiums to maintain family health coverage',
        relatedProducts: ['Health Insurance Premiums', 'Medical Copays', 'Prescription Medications', 'Dental & Vision Care', 'Mental Health Services']
      },
      {
        name: 'Education & Development',
        description: 'Costs to maintain children\'s education and development opportunities',
        relatedProducts: ['Childcare', 'School Tuition', 'School Supplies', 'Extracurricular Activities', 'College Savings']
      }
    ]
  },
  documentation: {
    title: 'Documentation',
    icon: '📋',
    summary: ['Will & Testament', 'Trust Documents', 'Power of Attorney', 'Healthcare Directives', 'Beneficiary Updates'],
    instruments: [
      {
        name: 'Will & Testament',
        description: 'Legal document specifying how assets should be distributed and who should care for minor children',
        relatedProducts: ['Last Will & Testament', 'Pour-Over Will', 'Living Will', 'Ethical Will', 'Codicil (Will Amendment)']
      },
      {
        name: 'Trust Documents',
        description: 'Legal structures that hold assets for beneficiaries and can avoid probate',
        relatedProducts: ['Revocable Living Trust', 'Irrevocable Trust', 'Special Needs Trust', 'Charitable Trust', 'Family Trust']
      },
      {
        name: 'Power of Attorney',
        description: 'Legal authorization for someone to make financial decisions if you become incapacitated',
        relatedProducts: ['Durable Power of Attorney', 'Financial Power of Attorney', 'Limited Power of Attorney', 'Springing Power of Attorney']
      },
      {
        name: 'Healthcare Directives',
        description: 'Documents that specify medical wishes and authorize someone to make healthcare decisions',
        relatedProducts: ['Healthcare Power of Attorney', 'Living Will', 'Advance Healthcare Directive', 'DNR Orders', 'HIPAA Authorization']
      },
      {
        name: 'Beneficiary Designations',
        description: 'Updated beneficiary information on all accounts and policies to ensure proper asset transfer',
        relatedProducts: ['Retirement Account Beneficiaries', 'Life Insurance Beneficiaries', 'Bank Account Payable-on-Death', 'Investment Account TOD', 'IRA Beneficiary Forms']
      }
    ]
  }
};

// Detailed product information database
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
};
