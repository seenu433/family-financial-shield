// Enhanced assessment questions grouped by instrument (subpillar)
export const questions = [
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
    {
      id: 'hsaAccounts',
      question: 'How much do you have in Health Savings Account (HSA)?',
      placeholder: '8000',
      type: 'number',
      label: '$',
      pillar: 'benefits',
      instrument: 'Savings & Investments',
      nationalAverage: 'US Average: $4,300 (28% of eligible employees contribute to HSA)',
      helpText: 'Triple tax-advantaged account for healthcare expenses (requires high-deductible health plan)'
    },
    {
      id: 'educationSavings529',
      question: 'How much do you have in 529 Education Savings Plans?',
      placeholder: '12000',
      type: 'number',
      label: '$',
      pillar: 'benefits',
      instrument: 'Savings & Investments',
      nationalAverage: 'US Average: $25,664 (34% of families use 529 plans)',
      helpText: 'Tax-advantaged savings for qualified education expenses'
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
];
