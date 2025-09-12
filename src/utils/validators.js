// Input validation utilities for the Family Financial Shield application

/**
 * Validate required fields in form data
 * @param {Object} formData - The form data to validate
 * @returns {Object} Validation result with isValid flag and errors array
 */
export const validateFormData = (formData) => {
  const errors = [];
  
  // Required field validations
  if (!formData.annualIncome || formData.annualIncome <= 0) {
    errors.push('Annual income is required and must be greater than $0');
  }
  
  if (!formData.monthlyExpenses || formData.monthlyExpenses <= 0) {
    errors.push('Monthly expenses is required and must be greater than $0');
  }
  
  if (formData.dependents === undefined || formData.dependents === null || formData.dependents < 0) {
    errors.push('Number of dependents is required and cannot be negative');
  }
  
  // Range validations
  if (formData.annualIncome && (formData.annualIncome < 1000 || formData.annualIncome > 10000000)) {
    errors.push('Annual income must be between $1,000 and $10,000,000');
  }
  
  if (formData.monthlyExpenses && (formData.monthlyExpenses < 100 || formData.monthlyExpenses > 500000)) {
    errors.push('Monthly expenses must be between $100 and $500,000');
  }
  
  if (formData.dependents && formData.dependents > 20) {
    errors.push('Number of dependents cannot exceed 20');
  }
  
  // Logical validations
  if (formData.annualIncome && formData.monthlyExpenses) {
    const annualExpenses = formData.monthlyExpenses * 12;
    if (annualExpenses > formData.annualIncome * 2) {
      errors.push('Monthly expenses seem unusually high compared to annual income. Please verify your entries.');
    }
  }
  
  // Optional field validations (if provided, must be valid)
  if (formData.currentLifeInsurance !== undefined && formData.currentLifeInsurance < 0) {
    errors.push('Current life insurance cannot be negative');
  }
  
  if (formData.emergencyFund !== undefined && formData.emergencyFund < 0) {
    errors.push('Emergency fund cannot be negative');
  }
  
  if (formData.retirementAccounts !== undefined && formData.retirementAccounts < 0) {
    errors.push('Retirement accounts cannot be negative');
  }
  
  if (formData.otherInvestments !== undefined && formData.otherInvestments < 0) {
    errors.push('Other investments cannot be negative');
  }
  
  if (formData.hsaAccounts !== undefined && formData.hsaAccounts < 0) {
    errors.push('HSA accounts cannot be negative');
  }
  
  if (formData.plan529Accounts !== undefined && formData.plan529Accounts < 0) {
    errors.push('529 education plans cannot be negative');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Validate individual numeric input
 * @param {string|number} value - The value to validate
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export const validateNumericInput = (value, options = {}) => {
  const {
    min = 0,
    max = Infinity,
    required = false,
    allowZero = true
  } = options;
  
  const errors = [];
  
  // Check if required
  if (required && (value === undefined || value === null || value === '')) {
    errors.push('This field is required');
    return { isValid: false, errors };
  }
  
  // If not required and empty, it's valid
  if (!required && (value === undefined || value === null || value === '')) {
    return { isValid: true, errors: [] };
  }
  
  // Convert to number
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  // Check if it's a valid number
  if (isNaN(numValue)) {
    errors.push('Must be a valid number');
    return { isValid: false, errors };
  }
  
  // Check zero allowance
  if (!allowZero && numValue === 0) {
    errors.push('Must be greater than zero');
  }
  
  // Check minimum
  if (numValue < min) {
    errors.push(`Must be at least ${min.toLocaleString()}`);
  }
  
  // Check maximum
  if (numValue > max) {
    errors.push(`Cannot exceed ${max.toLocaleString()}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    value: numValue
  };
};

/**
 * Format currency input as user types
 * @param {string} value - Raw input value
 * @returns {string} Formatted currency string
 */
export const formatCurrencyInput = (value) => {
  if (!value) return '';
  
  // Remove all non-numeric characters except decimal point
  const numericValue = value.toString().replace(/[^0-9.]/g, '');
  
  // Handle multiple decimal points
  const parts = numericValue.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }
  
  // Parse as float and format with commas
  const num = parseFloat(numericValue);
  if (isNaN(num)) return '';
  
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
};

/**
 * Parse formatted currency string to number
 * @param {string} formattedValue - Formatted currency string
 * @returns {number} Numeric value
 */
export const parseCurrencyInput = (formattedValue) => {
  if (!formattedValue) return 0;
  
  // Remove commas and parse as float
  const cleaned = formattedValue.toString().replace(/,/g, '');
  const num = parseFloat(cleaned);
  
  return isNaN(num) ? 0 : num;
};

/**
 * Validate email format (if needed for future features)
 * @param {string} email - Email address to validate
 * @returns {boolean} True if valid email format
 */
export const validateEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Check if form is complete enough to calculate results
 * @param {Object} formData - The form data to check
 * @returns {boolean} True if form has minimum required data
 */
export const isFormReadyForCalculation = (formData) => {
  const validation = validateFormData(formData);
  return validation.isValid;
};
