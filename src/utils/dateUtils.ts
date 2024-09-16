

export const formatDate = (date: Date) => {
  if (!date) return '';

  return date.toLocaleDateString('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
