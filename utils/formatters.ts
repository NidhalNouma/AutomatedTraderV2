export const formatCurrency = (amount: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatPercentage = (value: number, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

export const formatDateTime = (timestamp: number | string | Date) => {
  const date =
    typeof timestamp === 'string' || typeof timestamp === 'number'
      ? new Date(timestamp)
      : timestamp;
  return date.toLocaleString();
};

export const formatTime = (timestamp: number | string | Date) => {
  const date =
    typeof timestamp === 'string' || typeof timestamp === 'number'
      ? new Date(timestamp)
      : timestamp;
  return date.toLocaleTimeString();
};

export const formatDate = (timestamp: string | Date) => {
  const date =
    typeof timestamp === 'string' || typeof timestamp === 'number'
      ? new Date(timestamp)
      : timestamp;
  return date.toLocaleDateString();
};

export const formatNumber = (num: number, decimals = 0) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatCompactNumber = (num: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
};