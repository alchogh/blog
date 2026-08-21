const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function formatDate(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;
  return dateFormatter.format(date);
}

const monthDayFormatter = new Intl.DateTimeFormat("en-US", {
  month: "2-digit",
  day: "2-digit",
});

// 목록 인덱스용 짧은 형식(MM.DD). 연도는 그룹 헤더가 알려준다.
export function formatMonthDay(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;
  return monthDayFormatter.format(date).replace("/", ".");
}
