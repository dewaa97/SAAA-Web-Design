export function matchesSearch<T extends Record<string, unknown>>(
  item: T,
  query: string,
  fields: (keyof T)[],
) {
  if (!query) return true;
  const normalized = query.toLowerCase();
  return fields.some((field) => {
    const value = item[field];
    return value && String(value).toLowerCase().includes(normalized);
  });
}

export function matchesDateRange(isoDate: string, fromValue: string, toValue: string) {
  if (!isoDate) return true;
  const date = new Date(`${isoDate}T00:00:00`);
  if (fromValue) {
    const from = new Date(`${fromValue}T00:00:00`);
    if (date < from) return false;
  }
  if (toValue) {
    const to = new Date(`${toValue}T23:59:59`);
    if (date > to) return false;
  }
  return true;
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    page: safePage,
    totalPages,
    totalItems: items.length,
  };
}
