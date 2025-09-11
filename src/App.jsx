import React, { useState } from 'react'
import logoImage from '/logo.png'

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
    
    // DETAILED PILLAR SCORING
    const benefitsScore = currentProtection >= totalProtectionNeeded ? 100 : (currentProtection / totalProtectionNeeded) * 100
    const emergencyScore = currentEmergencyFund >= targetEmergencyFund ? 100 : (currentEmergencyFund / targetEmergencyFund) * 100
    const debtScore = totalDebts === 0 ? 100 : Math.max(0, 100 - (totalDebts / annualIncome) * 15)
    const taxScore = retirementAccountsTotal > annualIncome ? 90 : (retirementAccountsTotal / annualIncome) * 90
    
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
        actionItems.push(`🛡️ Consider additional life insurance: $${Math.round(protectionGap * 0.7).toLocaleString()} (currently have $${lifeInsuranceTotal.toLocaleString()})`)
      }
      if (retirementAccountsTotal < annualIncome * 2) {
        actionItems.push(`🏦 Increase retirement savings to $${(annualIncome * 2).toLocaleString()} (currently have $${retirementAccountsTotal.toLocaleString()})`)
      }
    }
    
    // Emergency fund gaps - specific to savings
    if (emergencyGap > 0) {
      actionItems.push(`💰 Build emergency fund by $${emergencyGap.toLocaleString()} (need ${Math.ceil(targetEmergencyFund / monthlyExpensesTotal)} months, have ${Math.floor(currentEmergencyFund / monthlyExpensesTotal)} months)`)
    }
    
    // Debt management - specific debt type recommendations
    if (creditCardDebt > 0) {
      actionItems.push(`💳 Pay down high-interest credit card debt: $${creditCardDebt.toLocaleString()}`)
    }
    if (totalDebts > annualIncome * 4) {
      actionItems.push(`📉 Your debt-to-income ratio is high (${(totalDebts/annualIncome).toFixed(1)}x income) - consider debt consolidation`)
    }
    
    // Legal planning gaps - specific document recommendations
    const missingDocs = []
    if (formData.hasWill !== 'yes') missingDocs.push('Will')
    if (formData.hasTrust !== 'yes') missingDocs.push('Trust')
    if (formData.hasPowerOfAttorney !== 'yes') missingDocs.push('Power of Attorney')
    if (formData.hasHealthcareDirectives !== 'yes') missingDocs.push('Healthcare Directives')
    
    if (missingDocs.length > 0) {
      actionItems.push(`📋 Complete missing legal documents: ${missingDocs.join(', ')}`)
    }
    
    // Tax optimization - specific account recommendations
    if (retirementAccountsTotal < annualIncome) {
      actionItems.push(`� Maximize employer 401(k) match and increase retirement contributions`)
    }
    if ((parseFloat(formData.rothIRA) || 0) + (parseFloat(formData.roth401k) || 0) < retirementAccountsTotal * 0.3) {
      actionItems.push(`🔄 Consider increasing Roth account allocation for tax diversification`)
    }
    
    // Specific expense optimization
    if (monthlyExpensesTotal > annualIncome / 12 * 0.8) {
      actionItems.push(`💡 Review monthly expenses ($${monthlyExpensesTotal.toLocaleString()}) - they're ${Math.round(monthlyExpensesTotal / (annualIncome/12) * 100)}% of monthly income`)
    }
    
    // Additional recommendations for well-protected families
    if (actionItems.length === 0) {
      actionItems.push('🎉 Excellent! Your family is well protected across all areas')
      actionItems.push('📊 Consider annual review with financial advisor to optimize strategy')
      if (dependents > 0) {
        actionItems.push('🎓 Look into 529 education savings plans for tax-advantaged college funding')
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

  const saveResults = () => {
    // Create a simple text version for saving/printing
    const resultText = `
Family Financial Shield Assessment Results

Status: ${results.statusText}
Overall Score: ${Math.round(results.overallScore)}%

Recommended Life Insurance: $${results.recommendedInsurance.toLocaleString()}
Insurance Gap: $${results.insuranceGap.toLocaleString()}
Emergency Fund Gap: $${results.emergencyGap.toLocaleString()}

Action Items:
${results.actionItems.map((item, index) => `${index + 1}. ${item}`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
    `.trim()

    // Create and download as text file
    const blob = new Blob([resultText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'family-financial-assessment.txt'
    a.click()
    URL.revokeObjectURL(url)
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
      marginBottom: '40px'
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
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
          <img src={logoImage} alt="Family Financial Shield Logo" style={styles.logo} />
          <h1 style={styles.headerTitle}>Family Financial Shield</h1>
        </div>
        
        {/* Hero Section */}
        <div style={styles.hero}>
          <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '15px' }}>
            How secure is my family?
          </h2>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
            Protect your family in 3 minutes
          </p>
          <p style={{ marginBottom: '30px', lineHeight: '1.6' }}>
            Managing finances after death is an important part of life. Planning for it helps you get to terms with your own mortality and helps your family after you are gone. Our assessment evaluates your family's financial security using a comprehensive framework.
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
        </div>

        {/* Five Pillars Section */}
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
              <span>Answer 5 simple questions about your finances</span>
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
        </div>

        {/* Disclaimer */}
        <div style={styles.disclaimer}>
          <p style={{ margin: 0, fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
            <strong>Disclaimer:</strong> The content discussed above is for education only. This is not a comprehensive list and completely depends on your individual situation. You should always consult with a licensed financial advisor.
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
            <img src={logoImage} alt="Family Financial Shield Logo" style={styles.logo} />
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

        {/* Overall Progress Bar */}
        <div style={styles.progress}>
          <p>Instrument {currentInstrument + 1} of {instruments.length}: {instrumentData.name}</p>
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
          <img src={logoImage} alt="Family Financial Shield Logo" style={styles.logo} />
          <h1 style={styles.headerTitle}>Family Financial Shield</h1>
        </div>
        <h2>Your Family Financial Protection Assessment</h2>

        <div style={{ ...styles.statusBadge, ...getStatusColor(results.status) }}>
          {results.statusText} - {Math.round(results.overallScore)}% Protected
        </div>

        {/* Five Pillar Score Breakdown */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h3>Five Pillar Analysis (A + B + C ≥ D × Years):</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
            <div style={styles.pillarScore}>
              <strong>💰 Benefits (A)</strong>
              <div style={styles.scoreBar}>
                <div style={{ ...styles.scoreFill, width: `${results.benefitsScore}%`, backgroundColor: results.benefitsScore >= 70 ? '#28a745' : results.benefitsScore >= 40 ? '#ffc107' : '#dc3545' }}></div>
              </div>
              <span>{results.benefitsScore}%</span>
            </div>
            <div style={styles.pillarScore}>
              <strong>💳 Debt Management (B)</strong>
              <div style={styles.scoreBar}>
                <div style={{ ...styles.scoreFill, width: `${results.debtScore}%`, backgroundColor: results.debtScore >= 70 ? '#28a745' : results.debtScore >= 40 ? '#ffc107' : '#dc3545' }}></div>
              </div>
              <span>{results.debtScore}%</span>
            </div>
            <div style={styles.pillarScore}>
              <strong>🏛️ Tax Planning (C)</strong>
              <div style={styles.scoreBar}>
                <div style={{ ...styles.scoreFill, width: `${results.taxScore}%`, backgroundColor: results.taxScore >= 70 ? '#28a745' : results.taxScore >= 40 ? '#ffc107' : '#dc3545' }}></div>
              </div>
              <span>{results.taxScore}%</span>
            </div>
            <div style={styles.pillarScore}>
              <strong>🏠 Emergency Fund</strong>
              <div style={styles.scoreBar}>
                <div style={{ ...styles.scoreFill, width: `${results.emergencyScore}%`, backgroundColor: results.emergencyScore >= 70 ? '#28a745' : results.emergencyScore >= 40 ? '#ffc107' : '#dc3545' }}></div>
              </div>
              <span>{results.emergencyScore}%</span>
            </div>
            <div style={styles.pillarScore}>
              <strong>📋 Legal Planning</strong>
              <div style={styles.scoreBar}>
                <div style={{ ...styles.scoreFill, width: `${results.legalScore}%`, backgroundColor: results.legalScore >= 70 ? '#28a745' : results.legalScore >= 40 ? '#ffc107' : '#dc3545' }}></div>
              </div>
              <span>{results.legalScore}%</span>
            </div>
          </div>
        </div>

        {/* Detailed Financial Summary */}
        <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
          <h3>Detailed Financial Protection Summary:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            
            {/* Benefits Breakdown */}
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px' }}>
              <h4 style={{ color: '#007bff', margin: '0 0 10px 0' }}>💰 Benefits (A) - ${results.currentProtection.toLocaleString()}</h4>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>Life Insurance: ${results.lifeInsuranceTotal.toLocaleString()}</p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>Retirement Accounts: ${results.retirementAccountsTotal.toLocaleString()}</p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>Savings & Investments: ${(results.currentProtection - results.lifeInsuranceTotal - results.retirementAccountsTotal).toLocaleString()}</p>
            </div>

            {/* Debts Breakdown */}
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px' }}>
              <h4 style={{ color: '#dc3545', margin: '0 0 10px 0' }}>💳 Debts (B) - ${results.totalDebts.toLocaleString()}</h4>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>Mortgage & Home Equity: ${((parseFloat(formData.primaryMortgage) || 0) + (parseFloat(formData.homeEquityLoans) || 0)).toLocaleString()}</p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>Credit Cards: ${(parseFloat(formData.creditCardDebt) || 0).toLocaleString()}</p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>Student & Auto Loans: ${((parseFloat(formData.federalStudentLoans) || 0) + (parseFloat(formData.privateStudentLoans) || 0) + (parseFloat(formData.autoLoans) || 0)).toLocaleString()}</p>
            </div>

            {/* Monthly Expenses Breakdown */}
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px' }}>
              <h4 style={{ color: '#28a745', margin: '0 0 10px 0' }}>🏠 Monthly Expenses (D) - ${results.monthlyExpensesTotal.toLocaleString()}</h4>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>Housing: ${(parseFloat(formData.housingCosts) || 0).toLocaleString()}</p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>Food & Transportation: ${((parseFloat(formData.foodExpenses) || 0) + (parseFloat(formData.transportationCosts) || 0)).toLocaleString()}</p>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>Healthcare & Childcare: ${((parseFloat(formData.healthcareCosts) || 0) + (parseFloat(formData.childcareEducation) || 0)).toLocaleString()}</p>
            </div>

            {/* Protection Summary */}
            <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px' }}>
              <h4 style={{ color: '#6f42c1', margin: '0 0 10px 0' }}>🛡️ Protection Analysis</h4>
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

          </div>
        </div>

        <h3>Your Prioritized Action Plan:</h3>
        {results.actionItems.map((item, index) => (
          <div key={index} style={styles.actionItem}>
            <strong>{index + 1}.</strong> {item}
          </div>
        ))}

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <button style={styles.button} onClick={saveResults}>
            Save Results
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
