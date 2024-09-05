

export const formatCurrency = (amount: number) => {
  // Format the amount as currency with no decimal digits
  return new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
}
