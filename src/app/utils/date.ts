export const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const isExpiringSoon = (expiryDate: string, daysThreshold: number = 90): boolean => {
  const days = getDaysUntilExpiry(expiryDate);
  return days > 0 && days <= daysThreshold;
};

export const isExpired = (expiryDate: string): boolean => {
  return getDaysUntilExpiry(expiryDate) < 0;
};
