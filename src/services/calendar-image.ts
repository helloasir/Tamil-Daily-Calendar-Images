/**
 * Asynchronously retrieves the URL of the daily Tamil calendar image for a given day.
 *
 * @param dayOfYear The day of the year (1-365) for which to retrieve the image URL.
 * @returns A promise that resolves to the URL of the calendar image.
 */
export async function getDailyCalendarImageUrl(dayOfYear: number): Promise<string> {
  return `https://dailytamilcalander.web.app/images/${String(dayOfYear).padStart(3, '0')}.jpg`;
}
