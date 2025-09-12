import React, { useState } from 'react'

export default function App() {
  // Form state
  const [currentStep, setCurrentStep] = useState('landing') // landing, assessment, results
  const [currentInstrument, setCurrentInstrument] = useState(0) // Track current subpillar instrument
  const [formData, setFormData] = useState({
    income: '',
    expenses: '',
    dependents: '',
    currentInsurance: '',
    emergencyFund: ''
  })
  const [results, setResults] = useState(null)
  
  // Home page interaction state
  const [flippedTiles, setFlippedTiles] = useState({})
  const [flippedAnalysisTiles, setFlippedAnalysisTiles] = useState({})
  const [flippedPillarTiles, setFlippedPillarTiles] = useState({})
  const [expandedInstruments, setExpandedInstruments] = useState({})
  const [productInfoModal, setProductInfoModal] = useState({ isOpen: false, product: null })

  // Enhanced assessment questions grouped by instrument (subpillar)
  const questions = [
    // BENEFITS PILLAR (A) - Life Insurance Instrument
    {
      id: 'termLifeInsurance',
      question: 'How much Term Life Insurance do you have?',
      placeholder: '250000',
      type: 'number',
      label: '$',
      pillar: 'benefits',
      instrument: 'Life Insurance',
      nationalAverage: 'US Average: $178,000 (62% of families have term life insurance)',
      helpText: 'Term life insurance is typically 10-12x your annual income'
    },
    {
      id: 'wholeLifeInsurance',
      question: 'How much Whole Life Insurance do you have?',
      placeholder: '0',
      type: 'number',
      label: '$',
      pillar: 'benefits',
      instrument: 'Life Insurance',
      nationalAverage: 'US Average: $45,000 (19% of families have whole life insurance)',
      helpText: 'Whole life combines insurance with investment savings'
    },
    {
      id: 'groupLifeInsurance',
      question: 'How much Group Life Insurance (through employer) do you have?',
      placeholder: '100000',
      type: 'number',
      label: '$',
      pillar: 'benefits',
      instrument: 'Life Insurance',
      nationalAverage: 'US Average: $75,000 (85% of employers offer group life insurance)',
      helpText: 'Usually 1-2x your annual salary, provided by your employer'
    },

    // BENEFITS PILLAR (A) - Retirement Accounts Instrument
    {
      id: 'traditional401k',
      question: 'How much do you have in Traditional 401(k) accounts?',
      placeholder: '75000',
      type: 'number',
      label: '$',
      pillar: 'benefits',
      instrument: 'Retirement Accounts',
      nationalAverage: 'US Average: $103,866 (ages 35-44), $164,742 (ages 45-54)',
      helpText: 'Pre-tax retirement savings through your employer'
    },
    {
      id: 'roth401k',
      question: 'How much do you have in Roth 401(k) accounts?',
      placeholder: '25000',
      type: 'number',
      label: '$',
      pillar: 'benefits',
      instrument: 'Retirement Accounts',
      nationalAverage: 'US Average: $42,000 (growing in popularity since 2006)',
      helpText: 'After-tax retirement savings with tax-free withdrawals'
    },
    {
      id: 'traditionalIRA',
      question: 'How much do you have in Traditional IRA accounts?',
      placeholder: '30000',
      type: 'number',
      label: '$',
      pillar: 'benefits',
      instrument: 'Retirement Accounts',
      nationalAverage: 'US Average: $65,400 (33% of households have IRAs)',
      helpText: 'Individual retirement account with tax-deferred growth'
    },
    {
      id: 'rothIRA',
      question: 'How much do you have in Roth IRA accounts?',
      placeholder: '20000',
      type: 'number',
      label: '$',
      pillar: 'benefits',
      instrument: 'Retirement Accounts',
      nationalAverage: 'US Average: $31,500 (24% of households have Roth IRAs)',
      helpText: 'After-tax IRA with tax-free growth and withdrawals'
    },

    // BENEFITS PILLAR (A) - Savings & Investments Instrument
    {
      id: 'savingsAccounts',
      question: 'How much do you have in savings accounts?',
      placeholder: '15000',
      type: 'number',
      label: '$',
      pillar: 'benefits',
      instrument: 'Savings & Investments',
      nationalAverage: 'US Average: $8,863 (Emergency fund: 3-6 months expenses)',
      helpText: 'Cash savings in banks, credit unions, or high-yield accounts'
    },
    {
      id: 'investmentAccounts',
      question: 'How much do you have in taxable investment accounts (stocks, bonds, mutual funds)?',
      placeholder: '35000',
      type: 'number',
      label: '$',
      pillar: 'benefits',
      instrument: 'Savings & Investments',
      nationalAverage: 'US Average: $63,000 (55% of Americans own stocks)',
      helpText: 'Non-retirement investment accounts for stocks, bonds, ETFs'
    },

    // BENEFITS PILLAR (A) - Real Estate Instrument
    {
      id: 'homeValue',
      question: 'What is the current value of your home?',
      placeholder: '400000',
      type: 'number',
      label: '$',
      pillar: 'benefits',
      instrument: 'Real Estate',
      nationalAverage: 'US Average: $428,700 (65% of Americans own homes)',
      helpText: 'Current market value of your primary residence'
    },

    // BENEFITS PILLAR (A) - Social Security Survivor Benefits Instrument
    {
      id: 'annualIncome',
      question: 'What is your annual household income?',
      placeholder: '75000',
      type: 'number',
      label: '$',
      pillar: 'benefits',
      instrument: 'Social Security Survivor Benefits',
      nationalAverage: 'US Average: $70,784 (median household income)',
      helpText: 'Combined gross income from all household earners before taxes'
    },

    // DEBTS PILLAR (B) - Mortgage Debt Instrument
    {
      id: 'primaryMortgage',
      question: 'What is your remaining primary mortgage balance?',
      placeholder: '280000',
      type: 'number',
      label: '$',
      pillar: 'debts',
      instrument: 'Mortgage Debt',
      nationalAverage: 'US Average: $236,443 (62% of homeowners have mortgages)',
      helpText: 'Outstanding balance on your primary home mortgage'
    },
    {
      id: 'homeEquityLoans',
      question: 'How much do you owe on home equity loans/HELOC?',
      placeholder: '0',
      type: 'number',
      label: '$',
      pillar: 'debts',
      instrument: 'Mortgage Debt',
      nationalAverage: 'US Average: $74,450 (8% of homeowners have HELOCs)',
      helpText: 'Home equity line of credit or second mortgage debt'
    },

    // DEBTS PILLAR (B) - Credit Card Debt Instrument
    {
      id: 'creditCardDebt',
      question: 'What is your total credit card debt?',
      placeholder: '8000',
      type: 'number',
      label: '$',
      pillar: 'debts',
      instrument: 'Credit Card Debt',
      nationalAverage: 'US Average: $6,194 (45% of Americans carry credit card debt)',
      helpText: 'Total outstanding balances across all credit cards'
    },

    // DEBTS PILLAR (B) - Student Loans Instrument
    {
      id: 'federalStudentLoans',
      question: 'How much do you owe in federal student loans?',
      placeholder: '25000',
      type: 'number',
      label: '$',
      pillar: 'debts',
      instrument: 'Student Loans',
      nationalAverage: 'US Average: $37,338 (43% of college graduates have student debt)',
      helpText: 'Federal student loans (Direct, PLUS, Perkins, etc.)'
    },
    {
      id: 'privateStudentLoans',
      question: 'How much do you owe in private student loans?',
      placeholder: '0',
      type: 'number',
      label: '$',
      pillar: 'debts',
      instrument: 'Student Loans',
      nationalAverage: 'US Average: $54,921 (14% of students have private loans)',
      helpText: 'Student loans from banks, credit unions, or private lenders'
    },

    // DEBTS PILLAR (B) - Auto Loans Instrument
    {
      id: 'autoLoans',
      question: 'How much do you owe on auto loans?',
      placeholder: '18000',
      type: 'number',
      label: '$',
      pillar: 'debts',
      instrument: 'Auto Loans',
      nationalAverage: 'US Average: $20,137 (85% of new cars are financed)',
      helpText: 'Outstanding balances on car, truck, or motorcycle loans'
    },

    // DEBTS PILLAR (B) - Business & Medical Debt Instrument
    {
      id: 'personalLoans',
      question: 'How much do you owe in personal loans and medical debt?',
      placeholder: '0',
      type: 'number',
      label: '$',
      pillar: 'debts',
      instrument: 'Business & Medical Debt',
      nationalAverage: 'US Average: $6,194 personal loans, $429 medical debt',
      helpText: 'Personal loans, medical bills, business debt, other unsecured debt'
    },

    // EXPENSES PILLAR (D) - Housing Costs Instrument
    {
      id: 'housingCosts',
      question: 'What are your monthly housing costs (rent/mortgage, taxes, utilities)?',
      placeholder: '2500',
      type: 'number',
      label: '$',
      pillar: 'expenses',
      instrument: 'Housing Costs',
      nationalAverage: 'US Average: $2,025 (30% of income recommended)',
      helpText: 'Rent/mortgage, property taxes, utilities, HOA fees, maintenance'
    },

    // EXPENSES PILLAR (D) - Food & Essential Living Instrument
    {
      id: 'foodExpenses',
      question: 'What are your monthly food and grocery expenses?',
      placeholder: '800',
      type: 'number',
      label: '$',
      pillar: 'expenses',
      instrument: 'Food & Essential Living',
      nationalAverage: 'US Average: $779/month (12% of income)',
      helpText: 'Groceries, dining out, food delivery services'
    },

    // EXPENSES PILLAR (D) - Transportation Expenses Instrument
    {
      id: 'transportationCosts',
      question: 'What are your monthly transportation expenses (car payments, gas, insurance)?',
      placeholder: '600',
      type: 'number',
      label: '$',
      pillar: 'expenses',
      instrument: 'Transportation Expenses',
      nationalAverage: 'US Average: $813/month (16% of income)',
      helpText: 'Car payments, gas, insurance, maintenance, public transit'
    },

    // EXPENSES PILLAR (D) - Healthcare & Insurance Instrument
    {
      id: 'healthcareCosts',
      question: 'What are your monthly healthcare expenses (insurance, copays, medications)?',
      placeholder: '500',
      type: 'number',
      label: '$',
      pillar: 'expenses',
      instrument: 'Healthcare & Insurance',
      nationalAverage: 'US Average: $456/month (8% of income)',
      helpText: 'Health insurance premiums, copays, medications, dental, vision'
    },

    // EXPENSES PILLAR (D) - Education & Development Instrument
    {
      id: 'childcareEducation',
      question: 'What are your monthly childcare and education expenses?',
      placeholder: '1200',
      type: 'number',
      label: '$',
      pillar: 'expenses',
      instrument: 'Education & Development',
      nationalAverage: 'US Average: $1,230/month childcare (varies by state)',
      helpText: 'Childcare, preschool, school fees, tutoring, extracurriculars'
    },

    // LEGAL PLANNING PILLAR - Document Preparation Instrument
    {
      id: 'hasWill',
      question: 'Do you have a current will?',
      type: 'select',
      options: [
        { value: 'yes', label: 'Yes, updated within 3 years' },
        { value: 'outdated', label: 'Yes, but over 3 years old' },
        { value: 'no', label: 'No' }
      ],
      pillar: 'legal',
      instrument: 'Document Preparation',
      nationalAverage: 'US Statistic: Only 32% of Americans have a will',
      helpText: 'Legal document that specifies how your assets will be distributed'
    },
    {
      id: 'hasTrust',
      question: 'Do you have trust documents?',
      type: 'select',
      options: [
        { value: 'yes', label: 'Yes, have trust documents' },
        { value: 'no', label: 'No trust documents' }
      ],
      pillar: 'legal',
      instrument: 'Document Preparation',
      nationalAverage: 'US Statistic: 23% of Americans have a trust',
      helpText: 'Legal arrangement for managing assets, often for tax benefits'
    },
    {
      id: 'hasPowerOfAttorney',
      question: 'Do you have power of attorney documents?',
      type: 'select',
      options: [
        { value: 'yes', label: 'Yes, have POA documents' },
        { value: 'no', label: 'No POA documents' }
      ],
      pillar: 'legal',
      instrument: 'Document Preparation',
      nationalAverage: 'US Statistic: 29% of Americans have power of attorney',
      helpText: 'Legal authority for someone to act on your behalf financially'
    },
    {
      id: 'hasHealthcareDirectives',
      question: 'Do you have healthcare directives (living will, healthcare proxy)?',
      type: 'select',
      options: [
        { value: 'yes', label: 'Yes, have healthcare directives' },
        { value: 'no', label: 'No healthcare directives' }
      ],
      pillar: 'legal',
      instrument: 'Document Preparation',
      nationalAverage: 'US Statistic: 37% of Americans have healthcare directives',
      helpText: 'Legal documents for medical decisions if you become incapacitated'
    },

    // GENERAL PLANNING DATA - Family Planning Instrument
    {
      id: 'dependents',
      question: 'How many children under 18 depend on you?',
      placeholder: '2',
      type: 'number',
      label: '',
      pillar: 'general',
      instrument: 'Family Planning',
      nationalAverage: 'US Average: 1.94 children per family',
      helpText: 'Children under 18 who depend on your income for support'
    },
    {
      id: 'yearsToProtect',
      question: 'For how many years do you need income protection (until youngest child is independent)?',
      placeholder: '15',
      type: 'number',
      label: 'years',
      pillar: 'general',
      instrument: 'Family Planning',
      nationalAverage: 'US Average: 18 years (until college graduation)',
      helpText: 'Years until your youngest child becomes financially independent'
    }
  ]

  // Detailed pillar data with instruments
  const pillarData = {
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
  }

  // Detailed product information database
  const productInfo = {
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

  // Enhanced financial calculations using instrument-level detail
  const calculateFinancialNeeds = () => {
    // BENEFITS PILLAR (A) - Sum all protection sources
    const lifeInsuranceTotal = (
      parseFloat(formData.termLifeInsurance) || 0) +
      (parseFloat(formData.wholeLifeInsurance) || 0) +
      (parseFloat(formData.groupLifeInsurance) || 0
    )
    
    const retirementAccountsTotal = (
      parseFloat(formData.traditional401k) || 0) +
      (parseFloat(formData.roth401k) || 0) +
      (parseFloat(formData.traditionalIRA) || 0) +
      (parseFloat(formData.rothIRA) || 0
    )
    
    const savingsInvestmentsTotal = (
      parseFloat(formData.savingsAccounts) || 0) +
      (parseFloat(formData.investmentAccounts) || 0
    )
    
    const realEstateValue = parseFloat(formData.homeValue) || 0
    const annualIncome = parseFloat(formData.annualIncome) || 0
    
    // Total Benefits (A)
    const totalBenefits = lifeInsuranceTotal + retirementAccountsTotal + savingsInvestmentsTotal + realEstateValue
    
    // DEBTS PILLAR (B) - Sum all outstanding obligations
    const mortgageDebtTotal = (
      parseFloat(formData.primaryMortgage) || 0) +
      (parseFloat(formData.homeEquityLoans) || 0
    )
    
    const creditCardDebt = parseFloat(formData.creditCardDebt) || 0
    
    const studentLoansTotal = (
      parseFloat(formData.federalStudentLoans) || 0) +
      (parseFloat(formData.privateStudentLoans) || 0
    )
    
    const autoLoans = parseFloat(formData.autoLoans) || 0
    const personalLoans = parseFloat(formData.personalLoans) || 0
    
    // Total Debts (B)
    const totalDebts = mortgageDebtTotal + creditCardDebt + studentLoansTotal + autoLoans + personalLoans
    
    // TAX IMPLICATIONS (C) - Tax impact on different account types
    const traditionalAccountTaxImpact = (
      (parseFloat(formData.traditional401k) || 0) +
      (parseFloat(formData.traditionalIRA) || 0)
    ) * 0.25 // Assume 25% tax rate on traditional accounts
    
    const realEstateTaxImpact = realEstateValue * 0.06 // 6% selling costs
    const taxImplications = traditionalAccountTaxImpact + realEstateTaxImpact
    
    // MONTHLY EXPENSES (D) - Sum all living costs
    const monthlyExpensesTotal = (
      parseFloat(formData.housingCosts) || 0) +
      (parseFloat(formData.foodExpenses) || 0) +
      (parseFloat(formData.transportationCosts) || 0) +
      (parseFloat(formData.healthcareCosts) || 0) +
      (parseFloat(formData.childcareEducation) || 0
    )
    
    // PLANNING VARIABLES
    const dependents = parseFloat(formData.dependents) || 0
    const yearsToProtect = parseFloat(formData.yearsToProtect) || 18
    
    // LEGAL PLANNING SCORE
    const legalDocuments = [
      formData.hasWill === 'yes' ? 25 : formData.hasWill === 'outdated' ? 15 : 0,
      formData.hasTrust === 'yes' ? 25 : 0,
      formData.hasPowerOfAttorney === 'yes' ? 25 : 0,
      formData.hasHealthcareDirectives === 'yes' ? 25 : 0
    ]
    const legalScore = legalDocuments.reduce((sum, score) => sum + score, 0)
    
    // ENHANCED CALCULATIONS
    
    // Education costs for children
    const educationCosts = dependents * 100000 // $100k per child
    
    // Annual living expenses × years to protect
    const totalExpenseNeed = (monthlyExpensesTotal * 12) * yearsToProtect
    
    // Total protection needed: A + B + C ≥ D × Years + Education
    const totalProtectionNeeded = totalDebts + taxImplications + totalExpenseNeed + educationCosts
    const currentProtection = totalBenefits
    const protectionGap = Math.max(0, totalProtectionNeeded - currentProtection)
    
    // Emergency fund calculation (6 months of expenses)
    const targetEmergencyFund = monthlyExpensesTotal * 6
    const currentEmergencyFund = parseFloat(formData.savingsAccounts) || 0
    const emergencyGap = Math.max(0, targetEmergencyFund - currentEmergencyFund)
    
    // DETAILED PILLAR SCORING WITH SAFEGUARDS
    const benefitsScore = totalProtectionNeeded === 0 ? 100 : 
      Math.min(100, Math.max(0, (currentProtection / totalProtectionNeeded) * 100))
    
    const emergencyScore = targetEmergencyFund === 0 ? 100 : 
      Math.min(100, Math.max(0, (currentEmergencyFund / targetEmergencyFund) * 100))
    
    const debtScore = totalDebts === 0 ? 100 : 
      annualIncome === 0 ? 0 : Math.max(0, 100 - (totalDebts / annualIncome) * 15)
    
    const taxScore = annualIncome === 0 ? 0 : 
      Math.min(90, Math.max(0, (retirementAccountsTotal / annualIncome) * 90))
    
    const overallScore = (benefitsScore + emergencyScore + debtScore + legalScore + taxScore) / 5

    // Status determination
    let status = 'green'
    let statusText = 'Well Protected'
    if (overallScore < 40) {
      status = 'red'
      statusText = 'Critical Gaps'
    } else if (overallScore < 70) {
      status = 'yellow'
      statusText = 'Some Gaps'
    }

    // Generate comprehensive action items based on detailed instrument analysis
    const actionItems = []
    
    // Benefits & Protection gaps - detailed recommendations
    if (protectionGap > 0) {
      if (lifeInsuranceTotal < protectionGap * 0.7) {
        const additionalNeeded = Math.round(protectionGap * 0.7 - lifeInsuranceTotal)
        actionItems.push(`🛡️ Critical: Increase life insurance by $${additionalNeeded.toLocaleString()} (currently have $${lifeInsuranceTotal.toLocaleString()}, need $${Math.round(protectionGap * 0.7).toLocaleString()})`)
      } else if (lifeInsuranceTotal < protectionGap) {
        const additionalNeeded = Math.round(protectionGap - lifeInsuranceTotal)
        actionItems.push(`🛡️ Consider additional life insurance: $${additionalNeeded.toLocaleString()} to fully cover protection gap`)
      }
    }
    
    // Emergency fund gaps - specific to savings
    if (emergencyGap > 0) {
      const currentMonths = Math.floor(currentEmergencyFund / (monthlyExpensesTotal || 1))
      const targetMonths = Math.ceil(targetEmergencyFund / (monthlyExpensesTotal || 1))
      const monthlyContribution = Math.round(emergencyGap / 12)
      
      actionItems.push(`💰 Priority: Build emergency fund from ${currentMonths} to ${targetMonths} months of expenses. Save $${monthlyContribution.toLocaleString()}/month for 1 year to reach goal.`)
    }
    
    // Debt management - specific debt type recommendations
    const debtRecommendations = []
    if (creditCardDebt > annualIncome * 0.1) {
      debtRecommendations.push(`Credit cards: $${creditCardDebt.toLocaleString()} (${Math.round(creditCardDebt/annualIncome*100)}% of income)`)
    }
    if ((parseFloat(formData.personalLoans) || 0) > 0) {
      debtRecommendations.push(`Personal loans: $${(parseFloat(formData.personalLoans) || 0).toLocaleString()}`)
    }
    if ((parseFloat(formData.studentLoans) || 0) > annualIncome * 0.5) {
      debtRecommendations.push(`Student loans: $${(parseFloat(formData.studentLoans) || 0).toLocaleString()} (consider income-driven repayment)`)
    }
    
    if (debtRecommendations.length > 0) {
      actionItems.push(`💳 Pay down high-interest debt: ${debtRecommendations.join(', ')}`)
    }
    
    if (totalDebts > annualIncome * 3) {
      const debtToIncomeRatio = (totalDebts/annualIncome).toFixed(1)
      actionItems.push(`📉 Your debt-to-income ratio is ${debtToIncomeRatio}x (above recommended 3x) - consider debt consolidation or credit counseling`)
    }
    
    // Legal planning gaps - specific document recommendations
    const missingDocs = []
    if (formData.hasWill !== 'yes') missingDocs.push('Will')
    if (formData.hasTrust !== 'yes') missingDocs.push('Trust')
    if (formData.hasPowerOfAttorney !== 'yes') missingDocs.push('Power of Attorney')
    if (formData.hasHealthcareDirectives !== 'yes') missingDocs.push('Healthcare Directives')
    
    if (missingDocs.length > 0) {
      actionItems.push(`📋 Complete missing legal documents: ${missingDocs.join(', ')} - essential for family protection`)
    }
    
    // Tax optimization - specific account recommendations
    if (retirementAccountsTotal < annualIncome) {
      actionItems.push(`🏦 Maximize employer 401(k) match and increase retirement contributions`)
    }
    if ((parseFloat(formData.rothIRA) || 0) + (parseFloat(formData.roth401k) || 0) < retirementAccountsTotal * 0.3 && retirementAccountsTotal > 0) {
      actionItems.push(`🔄 Consider increasing Roth account allocation for tax diversification (currently ${Math.round(((parseFloat(formData.rothIRA) || 0) + (parseFloat(formData.roth401k) || 0))/retirementAccountsTotal*100)}% Roth)`)
    }
    
    // Specific expense optimization
    if (monthlyExpensesTotal > annualIncome / 12 * 0.8) {
      actionItems.push(`💡 Review monthly expenses ($${monthlyExpensesTotal.toLocaleString()}) - they're ${Math.round(monthlyExpensesTotal / (annualIncome/12) * 100)}% of monthly income, target 70-80%`)
    }
    
    // Children-specific recommendations
    if (dependents > 0) {
      const educationSavings = (parseFloat(formData.educationSavings) || 0)
      const targetEducation = dependents * 100000 // $100k per child estimate
      
      if (educationSavings < targetEducation * 0.5) {
        const monthlyEducation = Math.round((targetEducation - educationSavings) / (18 * 12))
        actionItems.push(`🎓 Start/increase 529 education savings: $${monthlyEducation.toLocaleString()}/month for ${dependents} ${dependents === 1 ? 'child' : 'children'} (currently: $${educationSavings.toLocaleString()})`)
      }
    }
    
    // Income replacement analysis
    const monthlyIncome = annualIncome / 12
    const incomeReplacementNeeded = monthlyIncome * 0.7 // 70% replacement ratio
    const currentMonthlyProtection = (lifeInsuranceTotal + retirementAccountsTotal) / 240 // 20-year payout assumption
    
    if (currentMonthlyProtection < incomeReplacementNeeded && lifeInsuranceTotal > 0) {
      actionItems.push(`📊 Income replacement gap: Current protection provides $${Math.round(currentMonthlyProtection).toLocaleString()}/month, need $${Math.round(incomeReplacementNeeded).toLocaleString()}/month`)
    }
    
    // Additional recommendations for well-protected families
    if (actionItems.length === 0) {
      actionItems.push('🎉 Excellent! Your family is well-protected across all financial pillars')
      actionItems.push('📊 Consider annual review with a fee-only financial advisor to optimize strategy')
      
      if (retirementAccountsTotal > annualIncome * 3) {
        actionItems.push('💎 Consider tax-loss harvesting and asset allocation optimization in taxable accounts')
      }
      
      if (dependents > 0 && (parseFloat(formData.educationSavings) || 0) > 50000) {
        actionItems.push('🎓 Well-funded education savings - consider age-based investment allocation adjustments')
      }
    }
    
    // Professional guidance for complex situations
    if (annualIncome > 150000 || totalDebts > 500000 || realEstateValue > 1000000) {
      actionItems.push(`💼 Consider comprehensive financial planning with a certified financial planner`)
    }

    return {
      // Current protection analysis
      totalProtectionNeeded,
      currentProtection: totalBenefits,
      protectionGap,
      
      // Emergency fund analysis  
      targetEmergencyFund,
      currentEmergencyValue: currentEmergencyFund,
      emergencyGap,
      
      // Detailed breakdowns
      lifeInsuranceTotal,
      retirementAccountsTotal,
      totalDebts,
      monthlyExpensesTotal,
      taxImplications,
      
      // Pillar scores
      benefitsScore: Math.round(benefitsScore),
      emergencyScore: Math.round(emergencyScore), 
      debtScore: Math.round(debtScore),
      legalScore: Math.round(legalScore),
      taxScore: Math.round(taxScore),
      
      // Overall assessment
      status,
      statusText,
      overallScore: Math.round(overallScore),
      actionItems: actionItems.slice(0, 8) // Show top 8 priorities for detailed analysis
    }
  }

  // Get unique instruments in order
  const getInstruments = () => {
    const uniqueInstruments = []
    const seen = new Set()
    
    questions.forEach(question => {
      if (!seen.has(question.instrument)) {
        uniqueInstruments.push({
          name: question.instrument,
          pillar: question.pillar,
          questions: questions.filter(q => q.instrument === question.instrument)
        })
        seen.add(question.instrument)
      }
    })
    
    return uniqueInstruments
  }

  // Get current instrument data
  const getCurrentInstrumentData = () => {
    const instruments = getInstruments()
    return instruments[currentInstrument] || null
  }

  // Calculate completion percentage for current instrument
  const getInstrumentCompletion = (instrumentQuestions) => {
    const completed = instrumentQuestions.filter(q => formData[q.id]).length
    return (completed / instrumentQuestions.length) * 100
  }

  // Calculate overall completion percentage
  const getOverallCompletion = () => {
    const completed = questions.filter(q => formData[q.id]).length
    return (completed / questions.length) * 100
  }

  // Helper function to get instrument progress info
  const getInstrumentProgress = (currentQuestionIndex) => {
    const currentQuestion = questions[currentQuestionIndex]
    const currentInstrument = currentQuestion?.instrument
    
    // Find all questions for current instrument
    const instrumentQuestions = questions.filter(q => q.instrument === currentInstrument)
    const currentInstrumentIndex = instrumentQuestions.findIndex(q => q.id === currentQuestion.id)
    
    // Check if this is the first question of a new instrument
    const prevQuestion = currentQuestionIndex > 0 ? questions[currentQuestionIndex - 1] : null
    const isNewInstrument = !prevQuestion || prevQuestion.instrument !== currentInstrument
    
    return {
      currentInstrument,
      instrumentQuestions: instrumentQuestions.length,
      currentInstrumentIndex: currentInstrumentIndex + 1,
      isNewInstrument,
      isLastInstrumentQuestion: currentInstrumentIndex === instrumentQuestions.length - 1
    }
  }

  // Event handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Extract numerical value from national average text
  const extractNationalAverageValue = (nationalAverageText) => {
    if (!nationalAverageText) return 0
    
    // Handle special cases with multiple values or calculations
    if (nationalAverageText.includes('personal loans, $429 medical debt')) {
      return 6194 // Use the personal loans amount as primary debt
    }
    
    // Extract the first dollar amount from the text
    const match = nationalAverageText.match(/\$([0-9,]+)/)
    if (match) {
      return parseInt(match[1].replace(/,/g, ''))
    }
    
    // Handle monthly amounts (convert to annual if needed)
    const monthlyMatch = nationalAverageText.match(/\$([0-9,]+)\/month/)
    if (monthlyMatch) {
      return parseInt(monthlyMatch[1].replace(/,/g, ''))
    }
    
    return 0
  }

  // Handle "Use National Average" button click
  const useNationalAverage = (questionId) => {
    const question = questions.find(q => q.id === questionId)
    if (question && question.nationalAverage) {
      const value = extractNationalAverageValue(question.nationalAverage)
      handleInputChange(questionId, value.toString())
    }
  }

  // Toggle analysis tile flip
  const toggleAnalysisTile = (tileId) => {
    setFlippedAnalysisTiles(prev => ({
      ...prev,
      [tileId]: !prev[tileId]
    }))
  }

  // Toggle pillar tile flip
  const togglePillarTile = (pillarId) => {
    setFlippedPillarTiles(prev => ({
      ...prev,
      [pillarId]: !prev[pillarId]
    }))
  }

  // Get pillar percentage explanations
  const getPillarExplanation = (pillarId, results) => {
    switch (pillarId) {
      case 'benefits':
        return {
          title: '💰 Benefits Score Explanation',
          calculation: `Your benefits coverage is ${results.benefitsScore}% of optimal protection`,
          breakdown: [
            `Life Insurance: $${(parseFloat(formData.termLifeInsurance) || 0) + (parseFloat(formData.wholeLifeInsurance) || 0) + (parseFloat(formData.groupLifeInsurance) || 0)}`,
            `Retirement Accounts: $${(parseFloat(formData.traditional401k) || 0) + (parseFloat(formData.roth401k) || 0) + (parseFloat(formData.traditionalIRA) || 0) + (parseFloat(formData.rothIRA) || 0)}`,
            `Savings & Investments: $${(parseFloat(formData.savingsAccounts) || 0) + (parseFloat(formData.investmentAccounts) || 0)}`,
            `Real Estate Value: $${parseFloat(formData.homeValue) || 0}`
          ],
          explanation: 'This score measures how well your current assets would protect your family. Higher scores mean better protection coverage.'
        }
      case 'debt':
        return {
          title: '💳 Debt Management Score Explanation',
          calculation: `Your debt management is ${results.debtScore}% optimized`,
          breakdown: [
            `Mortgage Debt: $${(parseFloat(formData.primaryMortgage) || 0) + (parseFloat(formData.homeEquityLoans) || 0)}`,
            `Credit Card Debt: $${parseFloat(formData.creditCardDebt) || 0}`,
            `Student Loans: $${(parseFloat(formData.federalStudentLoans) || 0) + (parseFloat(formData.privateStudentLoans) || 0)}`,
            `Auto & Personal Loans: $${(parseFloat(formData.autoLoans) || 0) + (parseFloat(formData.personalLoans) || 0)}`
          ],
          explanation: 'Lower debt levels mean more resources available for family protection. Focus on paying down high-interest debt first.'
        }
      case 'tax':
        return {
          title: '🏛️ Tax Planning Score Explanation',
          calculation: `Your tax efficiency is ${results.taxScore}% optimized`,
          breakdown: [
            'Tax-advantaged accounts reduce family tax burden',
            'Estate planning minimizes transfer taxes',
            'Strategic asset location improves after-tax returns',
            'Roth accounts provide tax-free income for survivors'
          ],
          explanation: 'Effective tax planning preserves more wealth for your family by minimizing unnecessary tax obligations.'
        }
      case 'emergency':
        return {
          title: '🏠 Emergency Fund Score Explanation',
          calculation: `Your emergency fund covers ${results.emergencyScore}% of recommended 6-month expenses`,
          breakdown: [
            `Monthly Expenses: $${results.monthlyExpensesTotal.toLocaleString()}`,
            `6-Month Target: $${(results.monthlyExpensesTotal * 6).toLocaleString()}`,
            `Current Emergency Fund: $${parseFloat(formData.emergencyFund) || 0}`,
            `Gap: $${Math.max(0, (results.monthlyExpensesTotal * 6) - (parseFloat(formData.emergencyFund) || 0)).toLocaleString()}`
          ],
          explanation: 'Emergency funds provide immediate financial stability when income is disrupted, preventing debt accumulation.'
        }
      case 'legal':
        return {
          title: '📋 Legal Planning Score Explanation',
          calculation: `Your legal documents are ${results.legalScore}% complete`,
          breakdown: [
            `Will: ${formData.hasWill === 'yes' ? '✅ Complete (25%)' : formData.hasWill === 'outdated' ? '⚠️ Outdated (15%)' : '❌ Missing (0%)'}`,
            `Trust: ${formData.hasTrust === 'yes' ? '✅ Complete (25%)' : '❌ Missing (0%)'}`,
            `Power of Attorney: ${formData.hasPowerOfAttorney === 'yes' ? '✅ Complete (25%)' : '❌ Missing (0%)'}`,
            `Healthcare Directives: ${formData.hasHealthcareDirectives === 'yes' ? '✅ Complete (25%)' : '❌ Missing (0%)'}`
          ],
          explanation: 'Proper legal documents ensure your wishes are followed and reduce administrative costs for your family.'
        }
      case 'documentation':
        return {
          title: '📋 Documentation Score Explanation',
          calculation: `Your legal documents are ${results?.legalScore || 0}% complete`,
          breakdown: [
            `Will & Testament: ${formData.hasWill === 'yes' ? '✅ Current' : formData.hasWill === 'outdated' ? '⚠️ Needs Update' : '❌ Missing'}`,
            `Trust Documents: ${formData.hasTrust === 'yes' ? '✅ Established' : '❌ Not Created'}`,
            `Power of Attorney: ${formData.hasPowerOfAttorney === 'yes' ? '✅ Signed' : '❌ Missing'}`,
            `Healthcare Directives: ${formData.hasHealthcareDirectives === 'yes' ? '✅ Complete' : '❌ Missing'}`,
            'Beneficiary Designations: Review annually for all accounts'
          ],
          explanation: 'Complete documentation protects your family by ensuring your wishes are legally enforceable and reduces administrative burden during difficult times.'
        }
      default:
        return null
    }
  }

  // Get calculation details for each tile
  const getCalculationDetails = (tileId, results) => {
    switch (tileId) {
      case 'benefits':
        return {
          title: 'Benefits Calculation (A)',
          items: [
            { label: 'Term Life Insurance', value: `$${(parseFloat(formData.termLifeInsurance) || 0).toLocaleString()}` },
            { label: 'Whole Life Insurance', value: `$${(parseFloat(formData.wholeLifeInsurance) || 0).toLocaleString()}` },
            { label: 'Group Life Insurance', value: `$${(parseFloat(formData.groupLifeInsurance) || 0).toLocaleString()}` },
            { label: '401(k) Balance', value: `$${(parseFloat(formData.employerRetirement) || 0).toLocaleString()}` },
            { label: 'HSA Balance', value: `$${(parseFloat(formData.healthSavingsAccount) || 0).toLocaleString()}` },
            { label: 'IRA Balance', value: `$${(parseFloat(formData.traditionalIRA) || 0).toLocaleString()}` },
            { label: 'Roth IRA Balance', value: `$${(parseFloat(formData.rothIRA) || 0).toLocaleString()}` },
            { label: 'Savings Accounts', value: `$${(parseFloat(formData.savingsAccounts) || 0).toLocaleString()}` },
            { label: 'Investment Accounts', value: `$${(parseFloat(formData.investmentAccounts) || 0).toLocaleString()}` },
            { label: 'Home Value', value: `$${(parseFloat(formData.primaryResidence) || 0).toLocaleString()}` }
          ]
        }
      case 'debts':
        return {
          title: 'Debts Calculation (B)',
          items: [
            { label: 'Primary Mortgage', value: `$${(parseFloat(formData.primaryMortgage) || 0).toLocaleString()}` },
            { label: 'Home Equity Loans', value: `$${(parseFloat(formData.homeEquityLoans) || 0).toLocaleString()}` },
            { label: 'Credit Card Debt', value: `$${(parseFloat(formData.creditCardDebt) || 0).toLocaleString()}` },
            { label: 'Federal Student Loans', value: `$${(parseFloat(formData.federalStudentLoans) || 0).toLocaleString()}` },
            { label: 'Private Student Loans', value: `$${(parseFloat(formData.privateStudentLoans) || 0).toLocaleString()}` },
            { label: 'Auto Loans', value: `$${(parseFloat(formData.autoLoans) || 0).toLocaleString()}` },
            { label: 'Other Debts', value: `$${(parseFloat(formData.otherDebts) || 0).toLocaleString()}` }
          ]
        }
      case 'expenses':
        return {
          title: 'Monthly Expenses Calculation (D)',
          items: [
            { label: 'Housing Costs', value: `$${(parseFloat(formData.housingCosts) || 0).toLocaleString()}/month` },
            { label: 'Food Expenses', value: `$${(parseFloat(formData.foodExpenses) || 0).toLocaleString()}/month` },
            { label: 'Transportation', value: `$${(parseFloat(formData.transportationCosts) || 0).toLocaleString()}/month` },
            { label: 'Healthcare Costs', value: `$${(parseFloat(formData.healthcareCosts) || 0).toLocaleString()}/month` },
            { label: 'Childcare/Education', value: `$${(parseFloat(formData.childcareEducation) || 0).toLocaleString()}/month` },
            { label: 'Total Monthly', value: `$${results.monthlyExpensesTotal.toLocaleString()}/month` },
            { label: 'Annual Expenses', value: `$${(results.monthlyExpensesTotal * 12).toLocaleString()}/year` }
          ]
        }
      case 'protection':
        return {
          title: 'Protection Analysis Calculation',
          items: [
            { label: 'Total Debts (B)', value: `$${results.totalDebts.toLocaleString()}` },
            { label: 'Tax Implications (C)', value: `$${results.taxImplications.toLocaleString()}` },
            { label: 'Living Expenses (D × Years)', value: `$${(results.monthlyExpensesTotal * 12 * (parseFloat(formData.yearsToProtect) || 18)).toLocaleString()}` },
            { label: 'Education Costs', value: `$${((parseFloat(formData.dependents) || 0) * 100000).toLocaleString()}` },
            { label: 'Total Protection Needed', value: `$${results.totalProtectionNeeded.toLocaleString()}` },
            { label: 'Current Protection (A)', value: `$${results.currentProtection.toLocaleString()}` },
            { label: 'Protection Gap', value: `$${results.protectionGap.toLocaleString()}` }
          ]
        }
      default:
        return { title: 'Calculation', items: [] }
    }
  }

  // Use national averages for all questions in current instrument
  const useAllNationalAverages = () => {
    const instrumentData = getCurrentInstrumentData()
    if (instrumentData) {
      instrumentData.questions.forEach(question => {
        if (question.nationalAverage) {
          const value = extractNationalAverageValue(question.nationalAverage)
          handleInputChange(question.id, value.toString())
        }
      })
    }
  }

  const handleNext = () => {
    const instruments = getInstruments()
    if (currentInstrument < instruments.length - 1) {
      setCurrentInstrument(currentInstrument + 1)
    } else {
      // All instruments completed, calculate results
      const calculatedResults = calculateFinancialNeeds()
      setResults(calculatedResults)
      setCurrentStep('results')
    }
  }

  const handleBack = () => {
    if (currentInstrument > 0) {
      setCurrentInstrument(currentInstrument - 1)
    }
  }

  const isCurrentInstrumentComplete = () => {
    const instrumentData = getCurrentInstrumentData()
    if (!instrumentData) return false
    
    return instrumentData.questions.every(q => formData[q.id])
  }

  const handleCancelAssessment = () => {
    // Show confirmation dialog before canceling
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel the assessment? All progress will be lost.'
    )
    
    if (confirmCancel) {
      // Reset form data and return to home
      setFormData({})
      setCurrentInstrument(0)
      setCurrentStep('landing')
      setResults(null)
    }
  }

  const startAssessment = () => {
    setCurrentStep('assessment')
    setCurrentInstrument(0)
  }

  const startOver = () => {
    setCurrentStep('landing')
    setCurrentInstrument(0)
    setFormData({
      income: '',
      expenses: '',
      dependents: '',
      currentInsurance: '',
      emergencyFund: ''
    })
    setResults(null)
  }

  // Tile interaction handlers
  const handleTileFlip = (pillarKey) => {
    setFlippedTiles(prev => ({
      ...prev,
      [pillarKey]: !prev[pillarKey]
    }))
  }

  const handleInstrumentExpand = (pillarKey, instrumentIndex) => {
    const key = `${pillarKey}-${instrumentIndex}`
    setExpandedInstruments(prev => {
      // Close all other expanded instruments and only open the clicked one
      const isCurrentlyExpanded = prev[key]
      return isCurrentlyExpanded ? {} : { [key]: true }
    })
  }

  const handleProductInfo = (productName) => {
    const product = productInfo[productName]
    if (product) {
      setProductInfoModal({ isOpen: true, product })
    } else {
      // Show generic information for products without detailed info
      const genericProduct = {
        name: productName,
        description: `${productName} is an important financial product for family protection.`,
        howItWorks: 'Detailed information about this product is coming soon. Please consult with a financial advisor for specific guidance.',
        pros: ['Important for financial planning', 'Can provide family protection'],
        cons: ['Detailed information not yet available'],
        bestFor: 'Families looking to enhance their financial security'
      }
      setProductInfoModal({ isOpen: true, product: genericProduct })
    }
  }

  const closeProductInfo = () => {
    setProductInfoModal({ isOpen: false, product: null })
  }

  // Render pillar card with flip functionality
  const renderPillarCard = (pillarKey, pillarInfo) => {
    const isFlipped = flippedTiles[pillarKey]
    
    return (
      <div key={pillarKey} style={styles.pillarCardContainer}>
        <div 
          style={{
            ...styles.pillarCard,
            ...(isFlipped ? styles.pillarCardFlipped : {}),
            cursor: 'pointer'
          }}
          onClick={() => handleTileFlip(pillarKey)}
        >
          {!isFlipped ? (
            // Front side - summary view
            <>
              <div style={styles.pillarIcon}>{pillarInfo.icon}</div>
              <h4 style={styles.pillarTitle}>{pillarInfo.title}</h4>
              <div style={styles.pillarList}>
                {pillarInfo.summary.map((item, index) => (
                  <div key={index} style={styles.pillarListItem}>
                    <span style={styles.pillarBullet}>•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p style={styles.flipHint}>Click to see details</p>
            </>
          ) : (
            // Back side - detailed instruments
            <div style={styles.pillarDetailView}>
              <div style={styles.pillarDetailHeader}>
                <span style={styles.pillarIcon}>{pillarInfo.icon}</span>
                <h4 style={styles.pillarTitle}>{pillarInfo.title}</h4>
              </div>
              <div style={styles.instrumentsList}>
                {pillarInfo.instruments.map((instrument, index) => {
                  const expandKey = `${pillarKey}-${index}`
                  const isExpanded = expandedInstruments[expandKey]
                  
                  return (
                    <div key={index} style={styles.instrumentItem}>
                      <div 
                        style={styles.instrumentHeader}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleInstrumentExpand(pillarKey, index)
                        }}
                      >
                        <span style={styles.instrumentName}>{instrument.name}</span>
                        <span style={styles.expandIcon}>
                          {isExpanded ? '−' : '+'}
                        </span>
                      </div>
                      {isExpanded && (
                        <div style={styles.instrumentDetails}>
                          <p style={styles.instrumentDescription}>
                            {instrument.description}
                          </p>
                          <div style={styles.relatedProducts}>
                            <strong>Related Products:</strong>
                            <div style={styles.productsList}>
                              {instrument.relatedProducts.map((product, idx) => (
                                <div key={idx} style={styles.productItem}>
                                  <span style={styles.bulletPoint}>•</span>
                                  <span style={styles.productName}>{product}</span>
                                  <button
                                    style={styles.infoIcon}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleProductInfo(product)
                                    }}
                                    title={`Learn more about ${product}`}
                                  >
                                    ℹ️
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              <p style={styles.flipHint}>Click anywhere to go back</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const printResults = () => {
    // Function to remove emojis for PDF compatibility
    const removeEmojis = (text) => {
      return text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
    };

    // Generate PDF using jsPDF
    try {
      // Dynamic import of jsPDF to avoid bundle size issues
      import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js').then(() => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Set up document properties
        doc.setProperties({
          title: 'Family Financial Shield Assessment Results',
          creator: 'Family Financial Shield',
          author: 'Financial Assessment Tool'
        });
        
        // Title and header
        doc.setFontSize(20);
        doc.setTextColor(0, 123, 255); // Blue color
        doc.text('Family Financial Shield', 20, 20);
        
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0); // Black color
        doc.text('Your Family Financial Protection Assessment', 20, 35);
        
        doc.setFontSize(10);
        doc.setTextColor(102, 102, 102); // Gray color
        doc.text(`Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 20, 45);
        
        // Status Badge
        let yPosition = 60;
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        const statusColor = results?.status === 'green' ? [40, 167, 69] : results?.status === 'yellow' ? [255, 193, 7] : [220, 53, 69];
        doc.setFillColor(...statusColor);
        doc.rect(20, yPosition - 5, 170, 15, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text(`${results?.statusText || 'Not calculated'} - ${Math.round(results?.overallScore || 0)}% Protected`, 25, yPosition + 5);
        
        // Five Pillar Analysis
        yPosition += 25;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.text('Five Pillar Analysis', 20, yPosition);
        
        yPosition += 10;
        doc.setFontSize(10);
        
        const pillars = [
          { name: 'Benefits', score: results?.benefitsScore || 0 },
          { name: 'Debt Management', score: results?.debtScore || 0 },
          { name: 'Tax Planning', score: results?.taxScore || 0 },
          { name: 'Emergency Fund', score: results?.emergencyScore || 0 },
          { name: 'Legal Planning', score: results?.legalScore || 0 }
        ];
        
        pillars.forEach((pillar, index) => {
          const xPos = 20 + (index % 3) * 60;
          const yPos = yPosition + Math.floor(index / 3) * 20;
          
          doc.text(pillar.name, xPos, yPos);
          doc.text(`${pillar.score}%`, xPos, yPos + 8);
          
          // Score bar
          const barWidth = 40;
          const fillWidth = (pillar.score / 100) * barWidth;
          const barColor = pillar.score >= 70 ? [40, 167, 69] : pillar.score >= 40 ? [255, 193, 7] : [220, 53, 69];
          
          doc.setDrawColor(200, 200, 200);
          doc.rect(xPos, yPos + 10, barWidth, 3);
          doc.setFillColor(...barColor);
          doc.rect(xPos, yPos + 10, fillWidth, 3, 'F');
        });
        
        // Key Financial Numbers
        yPosition += 60;
        doc.setFontSize(14);
        doc.text('Key Financial Numbers', 20, yPosition);
        
        yPosition += 10;
        doc.setFontSize(10);
        
        const financialData = [
          ['Current Protection:', `$${(results?.currentProtection || 0).toLocaleString()}`],
          ['Total Protection Needed:', `$${(results?.totalProtectionNeeded || 0).toLocaleString()}`],
          ['Protection Gap:', `$${(results?.protectionGap || 0).toLocaleString()}`],
          ['Emergency Fund Gap:', `$${(results?.emergencyGap || 0).toLocaleString()}`]
        ];
        
        financialData.forEach((item, index) => {
          const yPos = yPosition + (index * 8);
          doc.text(item[0], 20, yPos);
          doc.text(item[1], 120, yPos);
        });
        
        // Action Items
        yPosition += 50;
        doc.setFontSize(14);
        doc.text('Prioritized Action Items', 20, yPosition);
        
        yPosition += 10;
        doc.setFontSize(10);
        
        results?.actionItems?.slice(0, 8).forEach((item, index) => {
          const yPos = yPosition + (index * 12);
          const cleanItem = removeEmojis(item);
          
          // Check if we need a new page
          if (yPos > 270) {
            doc.addPage();
            yPosition = 20;
            const newYPos = yPosition + (index * 12);
            
            // Wrap long text
            const lines = doc.splitTextToSize(`${index + 1}. ${cleanItem}`, 170);
            lines.forEach((line, lineIndex) => {
              doc.text(line, 20, newYPos + (lineIndex * 6));
            });
          } else {
            // Wrap long text
            const lines = doc.splitTextToSize(`${index + 1}. ${cleanItem}`, 170);
            lines.forEach((line, lineIndex) => {
              doc.text(line, 20, yPos + (lineIndex * 6));
            });
          }
        });
        
        // Footer
        const pageCount = doc.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(8);
          doc.setTextColor(102, 102, 102);
          doc.text('Disclaimer: This assessment is for educational purposes only and is not financial advice.', 20, 285);
          doc.text('Please consult with a licensed financial advisor for personalized recommendations.', 20, 290);
          doc.text(`Family Financial Shield | Page ${i} of ${pageCount}`, 20, 295);
        }
        
        // Generate and download PDF
        const filename = `Family-Financial-Assessment-${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(filename);
        
      }).catch(error => {
        console.error('Error loading jsPDF:', error);
        // Fallback to simple text download
        fallbackTextDownload();
      });
      
    } catch (error) {
      console.error('PDF generation error:', error);
      fallbackTextDownload();
    }
  };
  
  const fallbackTextDownload = () => {
    // Function to remove emojis for better compatibility
    const removeEmojis = (text) => {
      return text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
    };

    // Fallback: Generate a text file with results
    const textContent = `
FAMILY FINANCIAL SHIELD ASSESSMENT RESULTS
Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}

OVERALL STATUS: ${results?.statusText || 'Not calculated'} - ${Math.round(results?.overallScore || 0)}% Protected

FIVE PILLAR ANALYSIS:
• Benefits: ${results?.benefitsScore || 0}%
• Debt Management: ${results?.debtScore || 0}%
• Tax Planning: ${results?.taxScore || 0}%
• Emergency Fund: ${results?.emergencyScore || 0}%
• Legal Planning: ${results?.legalScore || 0}%

KEY FINANCIAL NUMBERS:
• Current Protection: $${(results?.currentProtection || 0).toLocaleString()}
• Total Protection Needed: $${(results?.totalProtectionNeeded || 0).toLocaleString()}
• Protection Gap: $${(results?.protectionGap || 0).toLocaleString()}
• Emergency Fund Gap: $${(results?.emergencyGap || 0).toLocaleString()}

PRIORITIZED ACTION ITEMS:
${(results?.actionItems || []).map((item, index) => `${index + 1}. ${removeEmojis(item)}`).join('\n')}

DISCLAIMER:
This assessment is for educational purposes only and is not financial advice.
Please consult with a licensed financial advisor for personalized recommendations.

Family Financial Shield | Financial Protection Assessment Tool
Visit: https://delightful-ocean-0f14ce90f.1.azurestaticapps.net
`;
    
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Family-Financial-Assessment-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Styles
  const styles = {
    container: {
      maxWidth: currentStep === 'landing' ? '1000px' : '600px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.5'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '30px',
      padding: '10px 0'
    },
    logo: {
      height: '48px',
      width: 'auto',
      marginRight: '15px'
    },
    headerTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#333',
      margin: 0
    },
    hero: {
      textAlign: 'center',
      marginBottom: '50px',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      borderRadius: '12px',
      border: '1px solid #dee2e6'
    },
    heroTitle: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '16px',
      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
    },
    heroSubtitle: {
      fontSize: '20px',
      color: '#34495e',
      marginBottom: '24px',
      fontWeight: '500'
    },
    heroDescription: {
      fontSize: '16px',
      color: '#5a6c7d',
      lineHeight: '1.7',
      marginBottom: '0',
      maxWidth: '700px',
      margin: '0 auto'
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
      marginRight: '10px'
    },
    secondaryButton: {
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
      marginRight: '10px'
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      border: '2px solid #ddd',
      borderRadius: '6px',
      marginTop: '10px',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      border: '2px solid #ddd',
      borderRadius: '6px',
      marginTop: '10px',
      boxSizing: 'border-box',
      backgroundColor: 'white',
      cursor: 'pointer'
    },
    progress: {
      marginBottom: '30px',
      textAlign: 'center'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e9ecef',
      borderRadius: '4px',
      overflow: 'hidden',
      margin: '10px 0'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#007bff',
      transition: 'width 0.3s ease'
    },
    statusBadge: {
      padding: '10px 20px',
      borderRadius: '20px',
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: '20px 0'
    },
    actionItem: {
      padding: '10px',
      backgroundColor: '#f8f9fa',
      borderLeft: '4px solid #007bff',
      margin: '10px 0',
      borderRadius: '4px'
    },
    formulaSection: {
      margin: '40px 0',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      textAlign: 'center'
    },
    formulaBox: {
      padding: '15px',
      backgroundColor: 'white',
      borderRadius: '6px',
      border: '2px solid #007bff',
      display: 'inline-block'
    },
    formulaText: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#007bff',
      fontFamily: 'monospace'
    },
    pillarsSection: {
      margin: '40px 0'
    },
    pillarsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    pillarCard: {
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e9ecef',
      textAlign: 'center'
    },
    pillarIcon: {
      fontSize: '32px',
      marginBottom: '15px'
    },
    pillarTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '15px',
      margin: '0 0 15px 0'
    },
    pillarList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      fontSize: '14px',
      color: '#666'
    },
    pillarListItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '6px',
      paddingLeft: '0'
    },
    pillarBullet: {
      color: '#007bff',
      marginRight: '8px',
      fontSize: '12px'
    },
    processSection: {
      margin: '40px 0',
      padding: '30px',
      backgroundColor: '#e7f3ff',
      borderRadius: '8px'
    },
    processSteps: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px'
    },
    processStep: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      fontSize: '16px'
    },
    stepNumber: {
      backgroundColor: '#007bff',
      color: 'white',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      flexShrink: 0
    },
    disclaimer: {
      margin: '30px 0',
      padding: '15px',
      backgroundColor: '#fff3cd',
      borderRadius: '6px',
      border: '1px solid #ffeaa7'
    },
    pillarCardContainer: {
      perspective: '1000px'
    },
    pillarCardFlipped: {
      backgroundColor: '#f8f9fa',
      minHeight: '400px',
      maxHeight: '500px',
      overflow: 'auto'
    },
    flipHint: {
      fontSize: '12px',
      color: '#6c757d',
      fontStyle: 'italic',
      marginTop: '10px',
      margin: '10px 0 0 0'
    },
    pillarDetailView: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    },
    pillarDetailHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '15px',
      borderBottom: '2px solid #007bff',
      paddingBottom: '10px'
    },
    instrumentsList: {
      flex: 1,
      overflow: 'auto'
    },
    instrumentItem: {
      marginBottom: '10px',
      border: '1px solid #dee2e6',
      borderRadius: '4px',
      overflow: 'hidden'
    },
    instrumentHeader: {
      padding: '10px',
      backgroundColor: '#e9ecef',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: 'bold'
    },
    instrumentName: {
      color: '#333'
    },
    expandIcon: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#007bff'
    },
    instrumentDetails: {
      padding: '15px',
      backgroundColor: 'white'
    },
    instrumentDescription: {
      fontSize: '13px',
      color: '#666',
      marginBottom: '10px',
      lineHeight: '1.4',
      margin: '0 0 10px 0'
    },
    relatedProducts: {
      fontSize: '12px'
    },
    productsList: {
      margin: '8px 0 0 0'
    },
    productItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '4px',
      color: '#666',
      fontSize: '12px',
      textAlign: 'left'
    },
    productName: {
      flex: 1,
      marginLeft: '0'
    },
    bulletPoint: {
      color: '#007bff',
      fontWeight: 'bold',
      marginRight: '8px',
      width: '12px',
      textAlign: 'center',
      fontSize: '14px',
      lineHeight: '1'
    },
    infoIcon: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      marginLeft: '6px',
      padding: '2px',
      fontSize: '12px',
      opacity: 0.7,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '18px',
      height: '18px'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '8px',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '80vh',
      overflow: 'auto',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
    },
    modalHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 20px 10px 20px',
      borderBottom: '2px solid #007bff'
    },
    modalTitle: {
      margin: 0,
      color: '#333',
      fontSize: '20px'
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#666',
      padding: '0',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalBody: {
      padding: '20px'
    },
    modalSection: {
      marginBottom: '20px'
    },
    sectionTitle: {
      margin: '0 0 8px 0',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#007bff'
    },
    sectionText: {
      margin: '0',
      lineHeight: '1.5',
      color: '#333'
    },
    proConsList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    proItem: {
      color: '#28a745',
      marginBottom: '4px',
      fontSize: '14px'
    },
    conItem: {
      color: '#dc3545',
      marginBottom: '4px',
      fontSize: '14px'
    },
    pillarScore: {
      textAlign: 'center',
      padding: '10px',
      backgroundColor: 'white',
      borderRadius: '6px',
      border: '1px solid #ddd'
    },
    scoreBar: {
      width: '100%',
      height: '8px',
      backgroundColor: '#e9ecef',
      borderRadius: '4px',
      margin: '8px 0',
      overflow: 'hidden'
    },
    scoreFill: {
      height: '100%',
      transition: 'width 0.3s ease',
      borderRadius: '4px'
    },
    questionContext: {
      display: 'flex',
      gap: '10px',
      marginBottom: '15px',
      alignItems: 'center'
    },
    pillarBadge: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    instrumentBadge: {
      backgroundColor: '#f8f9fa',
      color: '#666',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      border: '1px solid #ddd'
    },
    instrumentIntro: {
      backgroundColor: '#e7f3ff',
      padding: '15px',
      borderRadius: '8px',
      margin: '20px 0',
      border: '1px solid #007bff20'
    },
    cancelButton: {
      backgroundColor: 'transparent',
      color: '#dc3545',
      border: '1px solid #dc3545',
      padding: '8px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      cursor: 'pointer',
      fontWeight: 'normal',
      transition: 'all 0.2s ease'
    },
    headerCancelButton: {
      backgroundColor: 'transparent',
      color: '#666',
      border: '1px solid #ddd',
      padding: '6px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer',
      fontWeight: 'normal',
      transition: 'all 0.2s ease'
    },
    privacyDisclaimer: {
      backgroundColor: '#e8f5e8',
      border: '1px solid #c3e6c3',
      borderRadius: '6px',
      padding: '12px 16px',
      marginBottom: '20px',
      fontSize: '13px',
      color: '#2d5016',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    questionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      marginBottom: '30px'
    },
    questionCard: {
      backgroundColor: 'white',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      padding: '20px',
      transition: 'all 0.2s ease',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    questionHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '15px',
      marginBottom: '15px'
    },
    questionNumber: {
      minWidth: '30px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: '#007bff',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      flexShrink: 0
    },
    questionTitle: {
      margin: 0,
      fontSize: '16px',
      fontWeight: '600',
      color: '#333',
      lineHeight: '1.4'
    },
    instrumentProgress: {
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '25px',
      border: '1px solid #dee2e6'
    },
    completionFeedback: {
      marginTop: '8px',
      fontSize: '14px',
      color: '#28a745',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    nationalAverage: {
      fontSize: '13px',
      color: '#007bff',
      margin: '5px 0 2px 0',
      fontWeight: '500',
      lineHeight: '1.3'
    },
    helpText: {
      fontSize: '12px',
      color: '#666',
      margin: '2px 0 0 0',
      lineHeight: '1.4',
      fontStyle: 'italic'
    },
    // Analysis tile flip styles
    analysisTileContainer: {
      perspective: '1000px',
      height: 'auto',
      minHeight: '120px'
    },
    analysisTile: {
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '120px',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.6s ease',
      cursor: 'pointer'
    },
    analysisTileFlipped: {
      transform: 'rotateY(180deg)'
    },
    analysisTileFront: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '6px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    analysisTileBack: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      backgroundColor: '#f8f9fa',
      padding: '15px',
      borderRadius: '6px',
      transform: 'rotateY(180deg)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      overflow: 'auto'
    },
    flipHintText: {
      fontSize: '11px',
      color: '#6c757d',
      fontStyle: 'italic',
      marginTop: '8px',
      textAlign: 'center'
    },
    calculationHeader: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '10px',
      borderBottom: '1px solid #dee2e6',
      paddingBottom: '5px'
    },
    calculationItem: {
      fontSize: '12px',
      color: '#666',
      marginBottom: '4px',
      display: 'flex',
      justifyContent: 'space-between'
    },
    // Pillar tile flip styles
    pillarTileContainer: {
      perspective: '1000px',
      height: '180px',
      minHeight: '180px'
    },
    pillarTile: {
      position: 'relative',
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
      transition: 'transform 0.6s ease',
      cursor: 'pointer'
    },
    pillarTileFlipped: {
      transform: 'rotateY(180deg)'
    },
    pillarTileFront: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      backgroundColor: 'white',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e9ecef',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      boxSizing: 'border-box'
    },
    pillarTileBack: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden',
      backgroundColor: '#f8f9fa',
      padding: '12px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e9ecef',
      transform: 'rotateY(180deg)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      overflow: 'auto',
      boxSizing: 'border-box'
    },
    pillarFlipHint: {
      fontSize: '10px',
      color: '#6c757d',
      fontStyle: 'italic',
      marginTop: '8px',
      textAlign: 'center'
    },
    pillarExplanationTitle: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px',
      textAlign: 'center'
    },
    pillarCalculation: {
      fontSize: '12px',
      color: '#007bff',
      marginBottom: '10px',
      textAlign: 'center',
      fontWeight: '500'
    },
    pillarBreakdownList: {
      fontSize: '11px',
      color: '#666',
      lineHeight: '1.4',
      margin: '0',
      padding: '0',
      listStyle: 'none'
    },
    pillarBreakdownItem: {
      marginBottom: '3px',
      paddingLeft: '8px',
      borderLeft: '2px solid #dee2e6'
    },
    pillarExplanationText: {
      fontSize: '11px',
      color: '#495057',
      marginTop: '8px',
      fontStyle: 'italic',
      lineHeight: '1.3'
    }
  }

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'red': return { backgroundColor: '#f8d7da', color: '#721c24' }
      case 'yellow': return { backgroundColor: '#fff3cd', color: '#856404' }
      case 'green': return { backgroundColor: '#d4edda', color: '#155724' }
      default: return { backgroundColor: '#e9ecef', color: '#495057' }
    }
  }

  // Render landing page
  if (currentStep === 'landing') {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Family Financial Shield Logo" style={styles.logo} />
            <h1 style={styles.headerTitle}>Family Financial Shield</h1>
          </div>
        </div>
        
        {/* Hero Section */}
        <div style={styles.hero}>
          <h2 style={styles.heroTitle}>
            How secure is my family?
          </h2>
          <p style={styles.heroSubtitle}>
            Protect your family's financial future in just 3 minutes
          </p>
          <p style={styles.heroDescription}>
            Financial planning after loss is one of life's most important considerations. Taking time to prepare helps you come to terms with mortality while ensuring your family's security. Our comprehensive assessment evaluates your family's financial protection across five critical areas: benefits, liabilities, taxes, legal planning, and ongoing expenses.
          </p>
        </div>

        {/* Assessment Formula */}
        <div style={styles.formulaSection}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
            Financial Security Formula
          </h3>
          <div style={styles.formulaBox}>
            <span style={styles.formulaText}>
              Benefits (A) - Liabilities (B) - Taxes (C) ≥ Monthly Expenses (D) × Years
            </span>
          </div>
          <p style={{ marginTop: '15px', color: '#666', fontSize: '14px' }}>
            Our assessment evaluates whether your current financial protection can cover your family's needs,
            plus the legal documentation required to ensure the protection is accessible
          </p>
        </div>

        {/* Six Pillars Section */}
        <div style={styles.pillarsSection}>
          <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
            What We Assess
          </h3>
          <div style={styles.pillarsGrid}>
            {renderPillarCard('benefits', pillarData.benefits)}
            {renderPillarCard('liabilities', pillarData.liabilities)}
            {renderPillarCard('taxes', pillarData.taxes)}
            {renderPillarCard('legal', pillarData.legal)}
            {renderPillarCard('expenses', pillarData.expenses)}
            {renderPillarCard('documentation', pillarData.documentation)}
          </div>
        </div>

        {/* Process Overview */}
        <div style={styles.processSection}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
            Your Assessment Process
          </h3>
          <div style={styles.processSteps}>
            <div style={styles.processStep}>
              <span style={styles.stepNumber}>1</span>
              <span>Answer questions about your finances (use national averages if unsure)</span>
            </div>
            <div style={styles.processStep}>
              <span style={styles.stepNumber}>2</span>
              <span>Get instant analysis of your financial gaps</span>
            </div>
            <div style={styles.processStep}>
              <span style={styles.stepNumber}>3</span>
              <span>Receive personalized action plan</span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <button style={styles.button} onClick={startAssessment}>
            Start Your 3-Minute Assessment
          </button>
          
          {/* Helpful Tip */}
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#e8f5e8',
            borderRadius: '8px',
            border: '1px solid #28a745',
            maxWidth: '500px',
            margin: '20px auto 0',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '16px' }}>💡</span>
              <strong style={{ color: '#28a745' }}>Pro Tip:</strong>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#2d5a32', lineHeight: '1.4' }}>
              Don't know your exact numbers? No problem! Each question includes US national averages 
              that you can use with one click. This gives you a starting point for your assessment.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={styles.disclaimer}>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
            <strong>Disclaimer:</strong> The content discussed above is for education only. This is not a comprehensive list and completely depends on your individual situation. You should always consult with a licensed financial advisor.
          </p>
          <p style={{ margin: 0, fontSize: '13px', color: '#28a745', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <span>🔒</span>
            <strong>Privacy Protected:</strong> All information stays on your device. No data is stored or shared.
          </p>
        </div>

        {/* Product Info Modal */}
        {productInfoModal.isOpen && (
          <div style={styles.modalOverlay} onClick={closeProductInfo}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>{productInfoModal.product.name}</h3>
                <button style={styles.closeButton} onClick={closeProductInfo}>×</button>
              </div>
              <div style={styles.modalBody}>
                <div style={styles.modalSection}>
                  <h4 style={styles.sectionTitle}>What is it?</h4>
                  <p style={styles.sectionText}>{productInfoModal.product.description}</p>
                </div>
                <div style={styles.modalSection}>
                  <h4 style={styles.sectionTitle}>How it works</h4>
                  <p style={styles.sectionText}>{productInfoModal.product.howItWorks}</p>
                </div>
                <div style={styles.modalSection}>
                  <h4 style={styles.sectionTitle}>Pros</h4>
                  <ul style={styles.proConsList}>
                    {productInfoModal.product.pros.map((pro, index) => (
                      <li key={index} style={styles.proItem}>✓ {pro}</li>
                    ))}
                  </ul>
                </div>
                <div style={styles.modalSection}>
                  <h4 style={styles.sectionTitle}>Cons</h4>
                  <ul style={styles.proConsList}>
                    {productInfoModal.product.cons.map((con, index) => (
                      <li key={index} style={styles.conItem}>✗ {con}</li>
                    ))}
                  </ul>
                </div>
                <div style={styles.modalSection}>
                  <h4 style={styles.sectionTitle}>Best for</h4>
                  <p style={styles.sectionText}>{productInfoModal.product.bestFor}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Render assessment form
  if (currentStep === 'assessment') {
    const instruments = getInstruments()
    const instrumentData = getCurrentInstrumentData()
    const overallProgress = getOverallCompletion()
    const instrumentCompletion = instrumentData ? getInstrumentCompletion(instrumentData.questions) : 0

    if (!instrumentData) {
      return <div>Loading...</div>
    }

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <img src="/logo.png" alt="Family Financial Shield Logo" style={styles.logo} />
            <h1 style={styles.headerTitle}>Family Financial Shield</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              {Math.round(overallProgress)}% Complete
            </span>
            <button
              style={styles.headerCancelButton}
              onClick={handleCancelAssessment}
              title="Cancel assessment and return to home"
            >
              ✕ Exit
            </button>
          </div>
        </div>

        {/* Privacy Disclaimer */}
        <div style={styles.privacyDisclaimer}>
          <span style={{ fontSize: '16px' }}>🔒</span>
          <span>
            <strong>Your privacy is protected:</strong> All information entered remains on your device only. 
            No data is stored, transmitted, or shared with any external systems.
          </span>
        </div>

        {/* Overall Progress Bar */}
        <div style={styles.progress}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <p style={{ margin: 0 }}>Instrument {currentInstrument + 1} of {instruments.length}: {instrumentData.name}</p>
            <button
              onClick={useAllNationalAverages}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
              title="Fill all fields with US national averages"
            >
              📊 Use All Averages
            </button>
          </div>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${overallProgress}%` }}></div>
          </div>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
            Overall Progress: {Math.round(overallProgress)}% • This Section: {Math.round(instrumentCompletion)}%
          </p>
        </div>

        {/* Pillar and Instrument Context */}
        <div style={styles.questionContext}>
          <span style={styles.pillarBadge}>
            {instrumentData.pillar === 'benefits' && '💰 Benefits (A)'}
            {instrumentData.pillar === 'debts' && '💳 Debts (B)'}
            {instrumentData.pillar === 'taxes' && '🏛️ Taxes (C)'}
            {instrumentData.pillar === 'expenses' && '🏠 Expenses (D)'}
            {instrumentData.pillar === 'legal' && '📋 Legal Planning'}
            {instrumentData.pillar === 'general' && '👨‍👩‍👧‍👦 Family Planning'}
          </span>
          <span style={styles.instrumentBadge}>{instrumentData.name}</span>
        </div>

        {/* Instrument Progress Visualization */}
        <div style={styles.instrumentProgress}>
          <h3 style={{ margin: '0 0 15px 0', color: '#007bff' }}>
            📋 {instrumentData.name}
          </h3>
          <div style={styles.progressBar}>
            <div style={{ 
              ...styles.progressFill, 
              width: `${instrumentCompletion}%`,
              backgroundColor: instrumentCompletion === 100 ? '#28a745' : '#007bff'
            }}></div>
          </div>
          <p style={{ fontSize: '14px', color: '#666', margin: '5px 0 20px 0' }}>
            {instrumentData.questions.filter(q => formData[q.id]).length} of {instrumentData.questions.length} questions completed
          </p>
        </div>

        {/* All Questions for Current Instrument */}
        <div style={styles.questionsContainer}>
          {instrumentData.questions.map((question, index) => {
            const isCompleted = !!formData[question.id]
            return (
              <div key={question.id} style={{
                ...styles.questionCard,
                borderLeft: isCompleted ? '4px solid #28a745' : '4px solid #dee2e6'
              }}>
                <div style={styles.questionHeader}>
                  <div style={styles.questionNumber}>
                    {isCompleted ? '✅' : `${index + 1}`}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={styles.questionTitle}>{question.question}</h4>
                    {/* National averages and help text */}
                    {question.nationalAverage && (
                      <div style={styles.nationalAverage}>
                        📊 {question.nationalAverage}
                        <button
                          onClick={() => useNationalAverage(question.id)}
                          style={{
                            marginLeft: '10px',
                            padding: '4px 8px',
                            fontSize: '12px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                        >
                          Use This Value
                        </button>
                      </div>
                    )}
                    {question.helpText && (
                      <div style={styles.helpText}>
                        💡 {question.helpText}
                      </div>
                    )}
                  </div>
                </div>
                
                <div style={{ position: 'relative' }}>
                  {question.type === 'select' ? (
                    <select
                      value={formData[question.id] || ''}
                      onChange={(e) => handleInputChange(question.id, e.target.value)}
                      style={{
                        ...styles.select,
                        backgroundColor: isCompleted ? '#f8f9fa' : 'white'
                      }}
                    >
                      <option value="">Select an option...</option>
                      {question.options.map((option, idx) => (
                        <option key={idx} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <>
                      {question.label && (
                        <span style={{ 
                          position: 'absolute', 
                          left: '12px', 
                          top: '22px', 
                          color: '#666', 
                          fontSize: '16px' 
                        }}>
                          {question.label}
                        </span>
                      )}
                      <input
                        type={question.type}
                        placeholder={question.placeholder}
                        value={formData[question.id] || ''}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        style={{
                          ...styles.input,
                          paddingLeft: question.label ? '30px' : '12px',
                          backgroundColor: isCompleted ? '#f8f9fa' : 'white'
                        }}
                        min="0"
                      />
                    </>
                  )}
                </div>

                {/* Real-time validation feedback */}
                {isCompleted && (
                  <div style={styles.completionFeedback}>
                    ✓ Complete
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Navigation Buttons */}
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            style={styles.secondaryButton}
            onClick={handleBack}
            disabled={currentInstrument === 0}
          >
            ← Back
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {instrumentCompletion < 100 && (
              <span style={{ fontSize: '14px', color: '#dc3545' }}>
                Complete all questions to proceed
              </span>
            )}
            <button
              style={{
                ...styles.button,
                opacity: isCurrentInstrumentComplete() ? 1 : 0.6
              }}
              onClick={handleNext}
              disabled={!isCurrentInstrumentComplete()}
            >
              {currentInstrument === instruments.length - 1 ? 'Get Results' : 'Next Section →'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render results page
  if (currentStep === 'results' && results) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Family Financial Shield Logo" style={styles.logo} />
            <h1 style={styles.headerTitle}>Family Financial Shield</h1>
          </div>
        </div>
        <h2>Your Family Financial Protection Assessment</h2>

        <div style={{ ...styles.statusBadge, ...getStatusColor(results.status) }}>
          {results.statusText} - {Math.round(results.overallScore)}% Protected
        </div>

        {/* Five Pillar Score Breakdown */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h3>Five Pillar Analysis (A + B + C ≥ D × Years):</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '15px', 
            marginTop: '15px',
            alignItems: 'start'
          }}>
            {/* Benefits Pillar */}
            <div style={styles.pillarTileContainer}>
              <div 
                style={{
                  ...styles.pillarTile,
                  ...(flippedPillarTiles.benefits ? styles.pillarTileFlipped : {})
                }}
                onClick={() => togglePillarTile('benefits')}
              >
                {/* Front of tile */}
                <div style={styles.pillarTileFront}>
                  <strong>💰 Benefits (A)</strong>
                  <div style={styles.scoreBar}>
                    <div style={{ ...styles.scoreFill, width: `${results.benefitsScore}%`, backgroundColor: results.benefitsScore >= 70 ? '#28a745' : results.benefitsScore >= 40 ? '#ffc107' : '#dc3545' }}></div>
                  </div>
                  <span>{results.benefitsScore}%</span>
                  <div style={styles.pillarFlipHint}>Click to see details</div>
                </div>
                {/* Back of tile */}
                <div style={styles.pillarTileBack}>
                  {(() => {
                    const explanation = getPillarExplanation('benefits', results)
                    return explanation ? (
                      <>
                        <div style={styles.pillarExplanationTitle}>{explanation.title}</div>
                        <div style={styles.pillarCalculation}>{explanation.calculation}</div>
                        <ul style={styles.pillarBreakdownList}>
                          {explanation.breakdown.map((item, idx) => (
                            <li key={idx} style={styles.pillarBreakdownItem}>{item}</li>
                          ))}
                        </ul>
                        <div style={styles.pillarExplanationText}>{explanation.explanation}</div>
                      </>
                    ) : null
                  })()}
                </div>
              </div>
            </div>

            {/* Debt Management Pillar */}
            <div style={styles.pillarTileContainer}>
              <div 
                style={{
                  ...styles.pillarTile,
                  ...(flippedPillarTiles.debt ? styles.pillarTileFlipped : {})
                }}
                onClick={() => togglePillarTile('debt')}
              >
                {/* Front of tile */}
                <div style={styles.pillarTileFront}>
                  <strong>💳 Debt Management (B)</strong>
                  <div style={styles.scoreBar}>
                    <div style={{ ...styles.scoreFill, width: `${results.debtScore}%`, backgroundColor: results.debtScore >= 70 ? '#28a745' : results.debtScore >= 40 ? '#ffc107' : '#dc3545' }}></div>
                  </div>
                  <span>{results.debtScore}%</span>
                  <div style={styles.pillarFlipHint}>Click to see details</div>
                </div>
                {/* Back of tile */}
                <div style={styles.pillarTileBack}>
                  {(() => {
                    const explanation = getPillarExplanation('debt', results)
                    return explanation ? (
                      <>
                        <div style={styles.pillarExplanationTitle}>{explanation.title}</div>
                        <div style={styles.pillarCalculation}>{explanation.calculation}</div>
                        <ul style={styles.pillarBreakdownList}>
                          {explanation.breakdown.map((item, idx) => (
                            <li key={idx} style={styles.pillarBreakdownItem}>{item}</li>
                          ))}
                        </ul>
                        <div style={styles.pillarExplanationText}>{explanation.explanation}</div>
                      </>
                    ) : null
                  })()}
                </div>
              </div>
            </div>

            {/* Tax Planning Pillar */}
            <div style={styles.pillarTileContainer}>
              <div 
                style={{
                  ...styles.pillarTile,
                  ...(flippedPillarTiles.tax ? styles.pillarTileFlipped : {})
                }}
                onClick={() => togglePillarTile('tax')}
              >
                {/* Front of tile */}
                <div style={styles.pillarTileFront}>
                  <strong>🏛️ Tax Planning (C)</strong>
                  <div style={styles.scoreBar}>
                    <div style={{ ...styles.scoreFill, width: `${results.taxScore}%`, backgroundColor: results.taxScore >= 70 ? '#28a745' : results.taxScore >= 40 ? '#ffc107' : '#dc3545' }}></div>
                  </div>
                  <span>{results.taxScore}%</span>
                  <div style={styles.pillarFlipHint}>Click to see details</div>
                </div>
                {/* Back of tile */}
                <div style={styles.pillarTileBack}>
                  {(() => {
                    const explanation = getPillarExplanation('tax', results)
                    return explanation ? (
                      <>
                        <div style={styles.pillarExplanationTitle}>{explanation.title}</div>
                        <div style={styles.pillarCalculation}>{explanation.calculation}</div>
                        <ul style={styles.pillarBreakdownList}>
                          {explanation.breakdown.map((item, idx) => (
                            <li key={idx} style={styles.pillarBreakdownItem}>{item}</li>
                          ))}
                        </ul>
                        <div style={styles.pillarExplanationText}>{explanation.explanation}</div>
                      </>
                    ) : null
                  })()}
                </div>
              </div>
            </div>

            {/* Emergency Fund Pillar */}
            <div style={styles.pillarTileContainer}>
              <div 
                style={{
                  ...styles.pillarTile,
                  ...(flippedPillarTiles.emergency ? styles.pillarTileFlipped : {})
                }}
                onClick={() => togglePillarTile('emergency')}
              >
                {/* Front of tile */}
                <div style={styles.pillarTileFront}>
                  <strong>🏠 Emergency Fund</strong>
                  <div style={styles.scoreBar}>
                    <div style={{ ...styles.scoreFill, width: `${results.emergencyScore}%`, backgroundColor: results.emergencyScore >= 70 ? '#28a745' : results.emergencyScore >= 40 ? '#ffc107' : '#dc3545' }}></div>
                  </div>
                  <span>{results.emergencyScore}%</span>
                  <div style={styles.pillarFlipHint}>Click to see details</div>
                </div>
                {/* Back of tile */}
                <div style={styles.pillarTileBack}>
                  {(() => {
                    const explanation = getPillarExplanation('emergency', results)
                    return explanation ? (
                      <>
                        <div style={styles.pillarExplanationTitle}>{explanation.title}</div>
                        <div style={styles.pillarCalculation}>{explanation.calculation}</div>
                        <ul style={styles.pillarBreakdownList}>
                          {explanation.breakdown.map((item, idx) => (
                            <li key={idx} style={styles.pillarBreakdownItem}>{item}</li>
                          ))}
                        </ul>
                        <div style={styles.pillarExplanationText}>{explanation.explanation}</div>
                      </>
                    ) : null
                  })()}
                </div>
              </div>
            </div>

            {/* Legal Planning Pillar */}
            <div style={styles.pillarTileContainer}>
              <div 
                style={{
                  ...styles.pillarTile,
                  ...(flippedPillarTiles.legal ? styles.pillarTileFlipped : {})
                }}
                onClick={() => togglePillarTile('legal')}
              >
                {/* Front of tile */}
                <div style={styles.pillarTileFront}>
                  <strong>📋 Legal Planning</strong>
                  <div style={styles.scoreBar}>
                    <div style={{ ...styles.scoreFill, width: `${results.legalScore}%`, backgroundColor: results.legalScore >= 70 ? '#28a745' : results.legalScore >= 40 ? '#ffc107' : '#dc3545' }}></div>
                  </div>
                  <span>{results.legalScore}%</span>
                  <div style={styles.pillarFlipHint}>Click to see details</div>
                </div>
                {/* Back of tile */}
                <div style={styles.pillarTileBack}>
                  {(() => {
                    const explanation = getPillarExplanation('legal', results)
                    return explanation ? (
                      <>
                        <div style={styles.pillarExplanationTitle}>{explanation.title}</div>
                        <div style={styles.pillarCalculation}>{explanation.calculation}</div>
                        <ul style={styles.pillarBreakdownList}>
                          {explanation.breakdown.map((item, idx) => (
                            <li key={idx} style={styles.pillarBreakdownItem}>{item}</li>
                          ))}
                        </ul>
                        <div style={styles.pillarExplanationText}>{explanation.explanation}</div>
                      </>
                    ) : null
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Financial Summary */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h3>Detailed Financial Protection Summary:</h3>
          <div style={{
            textAlign: 'center',
            marginBottom: '15px',
            padding: '10px',
            backgroundColor: '#e7f3ff',
            borderRadius: '6px',
            border: '1px solid #007bff20'
          }}>
            <div style={{ fontSize: '14px', color: '#007bff', fontWeight: 'bold' }}>
              💡 Click any section below to expand and see detailed calculations
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            
            {/* Benefits Breakdown */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #dee2e6' }}>
              <div 
                style={{ 
                  padding: '15px', 
                  cursor: 'pointer',
                  borderBottom: flippedAnalysisTiles.benefits ? '1px solid #dee2e6' : 'none',
                  transition: 'background-color 0.2s ease'
                }}
                onClick={() => toggleAnalysisTile('benefits')}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <h4 style={{ color: '#007bff', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  💰 Benefits (A) - ${results.currentProtection.toLocaleString()}
                  <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
                    {flippedAnalysisTiles.benefits ? '▼' : '▶'}
                  </span>
                </h4>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Life Insurance: ${results.lifeInsuranceTotal.toLocaleString()}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Retirement Accounts: ${results.retirementAccountsTotal.toLocaleString()}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Savings & Investments: ${(results.currentProtection - results.lifeInsuranceTotal - results.retirementAccountsTotal).toLocaleString()}</p>
              </div>
              {flippedAnalysisTiles.benefits && (
                <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
                  <h5 style={{ margin: '0 0 10px 0', color: '#333' }}>Detailed Breakdown:</h5>
                  <div style={{ fontSize: '13px', color: '#666' }}>
                    <p style={{ margin: '3px 0' }}>• Term Life Insurance: ${(parseFloat(formData.termLifeInsurance) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Whole Life Insurance: ${(parseFloat(formData.wholeLifeInsurance) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Group Life Insurance: ${(parseFloat(formData.groupLifeInsurance) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Traditional 401(k): ${(parseFloat(formData.traditional401k) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Roth 401(k): ${(parseFloat(formData.roth401k) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Traditional IRA: ${(parseFloat(formData.traditionalIRA) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Roth IRA: ${(parseFloat(formData.rothIRA) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Savings Accounts: ${(parseFloat(formData.savingsAccounts) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Investment Accounts: ${(parseFloat(formData.investmentAccounts) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Real Estate Value: ${(parseFloat(formData.homeValue) || 0).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Debts Breakdown */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #dee2e6' }}>
              <div 
                style={{ 
                  padding: '15px', 
                  cursor: 'pointer',
                  borderBottom: flippedAnalysisTiles.debts ? '1px solid #dee2e6' : 'none',
                  transition: 'background-color 0.2s ease'
                }}
                onClick={() => toggleAnalysisTile('debts')}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <h4 style={{ color: '#dc3545', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  💳 Debts (B) - ${results.totalDebts.toLocaleString()}
                  <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
                    {flippedAnalysisTiles.debts ? '▼' : '▶'}
                  </span>
                </h4>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Mortgage & Home Equity: ${((parseFloat(formData.primaryMortgage) || 0) + (parseFloat(formData.homeEquityLoans) || 0)).toLocaleString()}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Credit Cards: ${(parseFloat(formData.creditCardDebt) || 0).toLocaleString()}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Student & Auto Loans: ${((parseFloat(formData.federalStudentLoans) || 0) + (parseFloat(formData.privateStudentLoans) || 0) + (parseFloat(formData.autoLoans) || 0) + (parseFloat(formData.personalLoans) || 0)).toLocaleString()}</p>
              </div>
              {flippedAnalysisTiles.debts && (
                <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
                  <h5 style={{ margin: '0 0 10px 0', color: '#333' }}>Detailed Breakdown:</h5>
                  <div style={{ fontSize: '13px', color: '#666' }}>
                    <p style={{ margin: '3px 0' }}>• Primary Mortgage: ${(parseFloat(formData.primaryMortgage) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Home Equity Loans: ${(parseFloat(formData.homeEquityLoans) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Credit Card Debt: ${(parseFloat(formData.creditCardDebt) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Federal Student Loans: ${(parseFloat(formData.federalStudentLoans) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Private Student Loans: ${(parseFloat(formData.privateStudentLoans) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Auto Loans: ${(parseFloat(formData.autoLoans) || 0).toLocaleString()}</p>
                    <p style={{ margin: '3px 0' }}>• Personal Loans: ${(parseFloat(formData.personalLoans) || 0).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Monthly Expenses Breakdown */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #dee2e6' }}>
              <div 
                style={{ 
                  padding: '15px', 
                  cursor: 'pointer',
                  borderBottom: flippedAnalysisTiles.expenses ? '1px solid #dee2e6' : 'none',
                  transition: 'background-color 0.2s ease'
                }}
                onClick={() => toggleAnalysisTile('expenses')}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <h4 style={{ color: '#28a745', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  🏠 Monthly Expenses (D) - ${results.monthlyExpensesTotal.toLocaleString()}
                  <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
                    {flippedAnalysisTiles.expenses ? '▼' : '▶'}
                  </span>
                </h4>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Housing: ${(parseFloat(formData.housingCosts) || 0).toLocaleString()}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Food & Transportation: ${((parseFloat(formData.foodExpenses) || 0) + (parseFloat(formData.transportationCosts) || 0)).toLocaleString()}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Healthcare & Childcare: ${((parseFloat(formData.healthcareCosts) || 0) + (parseFloat(formData.childcareEducation) || 0)).toLocaleString()}</p>
              </div>
              {flippedAnalysisTiles.expenses && (
                <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
                  <h5 style={{ margin: '0 0 10px 0', color: '#333' }}>Detailed Breakdown:</h5>
                  <div style={{ fontSize: '13px', color: '#666' }}>
                    <p style={{ margin: '3px 0' }}>• Housing Costs: ${(parseFloat(formData.housingCosts) || 0).toLocaleString()}/month</p>
                    <p style={{ margin: '3px 0' }}>• Food Expenses: ${(parseFloat(formData.foodExpenses) || 0).toLocaleString()}/month</p>
                    <p style={{ margin: '3px 0' }}>• Transportation: ${(parseFloat(formData.transportationCosts) || 0).toLocaleString()}/month</p>
                    <p style={{ margin: '3px 0' }}>• Healthcare Costs: ${(parseFloat(formData.healthcareCosts) || 0).toLocaleString()}/month</p>
                    <p style={{ margin: '3px 0' }}>• Childcare/Education: ${(parseFloat(formData.childcareEducation) || 0).toLocaleString()}/month</p>
                  </div>
                  <div style={{ marginTop: '10px', padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                    <strong>Emergency Fund Target:</strong> ${(results.monthlyExpensesTotal * 6).toLocaleString()} (6 months of expenses)
                  </div>
                </div>
              )}
            </div>

            {/* Protection Summary */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid #dee2e6' }}>
              <div 
                style={{ 
                  padding: '15px', 
                  cursor: 'pointer',
                  borderBottom: flippedAnalysisTiles.protection ? '1px solid #dee2e6' : 'none',
                  transition: 'background-color 0.2s ease',
                  backgroundColor: 'white'
                }}
                onClick={() => toggleAnalysisTile('protection')}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <h4 style={{ color: '#6f42c1', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  🛡️ Protection Analysis
                  <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
                    {flippedAnalysisTiles.protection ? '▼' : '▶'}
                  </span>
                </h4>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Total Protection Needed: ${results.totalProtectionNeeded.toLocaleString()}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}>Current Protection: ${results.currentProtection.toLocaleString()}</p>
                {results.protectionGap > 0 ? (
                  <p style={{ margin: '5px 0', fontSize: '14px', color: '#dc3545', fontWeight: 'bold' }}>
                    Protection Gap: ${results.protectionGap.toLocaleString()}
                  </p>
                ) : (
                  <p style={{ margin: '5px 0', fontSize: '14px', color: '#28a745', fontWeight: 'bold' }}>
                    ✅ Fully Protected!
                  </p>
                )}
              </div>
              {flippedAnalysisTiles.protection && (
                <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
                  {(() => {
                    const details = getCalculationDetails('protection', results)
                    return (
                      <>
                        <h5 style={{ margin: '0 0 10px 0', color: '#333' }}>{details.title}:</h5>
                        <div style={{ fontSize: '13px', color: '#666' }}>
                          {details.items.map((item, idx) => (
                            <p key={idx} style={{ margin: '3px 0', display: 'flex', justifyContent: 'space-between' }}>
                              <span>{item.label}:</span>
                              <span style={{ fontWeight: 'bold' }}>{item.value}</span>
                            </p>
                          ))}
                        </div>
                        <div style={{ marginTop: '10px', padding: '8px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                          <strong>Formula:</strong> A (Benefits) - B (Debts) - C (Taxes) ≥ D (Monthly Expenses) × Years
                        </div>
                      </>
                    )
                  })()}
                </div>
              )}
            </div>

          </div>
        </div>

        <h3>Your Prioritized Action Plan:</h3>
        {results.actionItems.map((item, index) => (
          <div key={index} style={styles.actionItem}>
            <strong>{index + 1}.</strong> {item}
          </div>
        ))}

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <button style={styles.button} onClick={printResults}>
            📄 Export to PDF
          </button>
          <button style={styles.secondaryButton} onClick={startOver}>
            Start Over
          </button>
        </div>

        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '6px' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#0066cc' }}>
            💡 <strong>Next Steps:</strong> This assessment covers all five pillars of family financial protection. 
            Consider speaking with a financial advisor to implement these recommendations and review annually.
          </p>
        </div>
      </div>
    )
  }

  return null
}
