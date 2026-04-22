const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function formatDate(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;
  return dateFormatter.format(date);
}
