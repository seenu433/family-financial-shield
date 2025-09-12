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
        relatedProducts: ['Federal Estate Tax', 'Generation-Skipping Tax', 'Gift Tax Annual Exclusion', 'Estate Tax Planning', 'Tax-Efficient Trusts']
      },
      {
        name: 'State Estate Tax',
        description: 'State-level taxes on inheritance that vary by jurisdiction',
        relatedProducts: ['State Estate Tax', 'State Inheritance Tax', 'Property Tax Implications', 'State Tax Planning']
      },
      {
        name: 'Income Tax on Survivor Benefits',
        description: 'Tax implications of benefits received by survivors from various sources',
        relatedProducts: ['Social Security Taxation', 'Life Insurance Proceeds', 'Retirement Account Distributions', 'Investment Account Gains']
      },
      {
        name: 'Retirement Account Tax Treatment',
        description: 'Complex tax rules governing inherited retirement accounts',
        relatedProducts: ['Traditional IRA Distributions', 'Roth IRA Rules', 'Required Minimum Distributions', 'Stretch Provisions', 'Tax-Deferred Growth']
      },
      {
        name: 'Tax Optimization Strategies',
        description: 'Legal methods to minimize tax burden on survivors',
        relatedProducts: ['Tax-Loss Harvesting', 'Charitable Giving', 'Trust Structures', 'Asset Location Strategy', 'Step-Up in Basis']
      }
    ]
  },
  legal: {
    title: 'Legal Expenses',
    icon: '⚖️',
    summary: ['Probate Costs', 'Estate Administration', 'Legal Documentation', 'Court Fees', 'Professional Services'],
    instruments: [
      {
        name: 'Probate Court Costs',
        description: 'Legal fees and court costs required to validate and execute a will',
        relatedProducts: ['Court Filing Fees', 'Publication Costs', 'Appraisal Fees', 'Inventory Costs', 'Final Accounting Fees']
      },
      {
        name: 'Estate Administration',
        description: 'Professional fees for managing and distributing the estate',
        relatedProducts: ['Executor Fees', 'Administrator Fees', 'Trustee Fees', 'Guardian Fees', 'Estate Management']
      },
      {
        name: 'Legal Documentation',
        description: 'Costs for preparing and updating essential legal documents',
        relatedProducts: ['Will Preparation', 'Trust Documents', 'Power of Attorney', 'Healthcare Directives', 'Beneficiary Updates']
      },
      {
        name: 'Funeral & Final Expenses',
        description: 'End-of-life costs that families face during difficult times',
        relatedProducts: ['Funeral Services', 'Burial or Cremation', 'Memorial Services', 'Death Certificates', 'Transportation Costs']
      },
      {
        name: 'Ongoing Legal Support',
        description: 'Continued legal assistance that survivors may need',
        relatedProducts: ['Estate Litigation', 'Tax Disputes', 'Insurance Claims', 'Business Succession', 'Guardian Appointments']
      }
    ]
  },
  emergency: {
    title: 'Emergency Fund',
    icon: '🚨',
    summary: ['6-Month Expense Reserve', 'Liquid Savings', 'Easy Access Funds', 'Financial Safety Net', 'Unexpected Costs Buffer'],
    instruments: [
      {
        name: 'High-Yield Savings Account',
        description: 'FDIC-insured savings account with competitive interest rates for emergency funds',
        relatedProducts: ['Online High-Yield Savings', 'Credit Union Savings', 'Money Market Accounts', 'FDIC Insurance Protection']
      },
      {
        name: 'Money Market Account',
        description: 'Higher interest account with limited monthly transactions and check-writing privileges',
        relatedProducts: ['Bank Money Market', 'Credit Union Money Market', 'Tiered Interest Rates', 'Debit Card Access']
      },
      {
        name: 'Certificates of Deposit (CDs)',
        description: 'Time deposits with fixed interest rates, suitable for portion of emergency fund',
        relatedProducts: ['Short-Term CDs', 'CD Ladders', 'Bump-Up CDs', 'No-Penalty CDs']
      },
      {
        name: 'Treasury Bills',
        description: 'Short-term government securities that are highly liquid and safe',
        relatedProducts: ['4-Week T-Bills', '13-Week T-Bills', '26-Week T-Bills', 'TreasuryDirect Account']
      },
      {
        name: 'Roth IRA (Emergency Access)',
        description: 'Roth IRA contributions can be withdrawn penalty-free for emergencies',
        relatedProducts: ['Roth IRA Contributions', 'Early Withdrawal Rules', 'Tax-Free Growth', 'Retirement + Emergency Dual Purpose']
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
