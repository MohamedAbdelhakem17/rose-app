/*
  * Format A Date String Into A Readable Form.
  
  * "Full"       // January 12, 2025
  * "Short"      // Jan 12, 2025
  * "Numeric"    // 01/12/2025
  * "LongMonth"  // 12 January 2025
  * "Time"       // January 12, 2025, 10:30 AM
*/

export function formatDateFull(
  dateString: string | Date,
  lang: 'en' | 'ar' = 'en'
): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
