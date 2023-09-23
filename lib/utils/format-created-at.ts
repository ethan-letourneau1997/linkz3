export function formatCreatedAt(inputDate: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const date = new Date(inputDate);
  return date.toLocaleDateString("en-US", options);
}
