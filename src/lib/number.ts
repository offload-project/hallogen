interface FormatOptions {
  locale?: string;
  style?: "decimal" | "currency" | "percent";
  currency?: string;
  maximumFractionDigits?: number;
  notation?: "standard" | "scientific" | "engineering" | "compact";
  compactDisplay?: "short" | "long";
}

export function formatNumber(
  value: number,
  {
    locale = "en-US",
    style = "decimal",
    currency,
    maximumFractionDigits,
    notation,
    compactDisplay,
  }: FormatOptions = {},
): string {
  const options: Intl.NumberFormatOptions = {
    style,
    currency,
    maximumFractionDigits,
    notation,
    compactDisplay,
  };

  return new Intl.NumberFormat(locale, options).format(value);
}

export function formatCurrency(value: number, currency = "USD", locale = "en-US", maximumFractionDigits = 2): string {
  return formatNumber(value, {
    locale,
    style: "currency",
    currency,
    maximumFractionDigits,
  });
}

export function formatKilo(value: number, locale = "en-US", threshold = 10000): string {
  if (value < threshold) {
    return formatNumber(value, { locale });
  }
  return formatNumber(value, {
    locale,
    notation: "compact",
    compactDisplay: "short",
  });
}

export function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let value = bytes;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value = value / 1024;
    i++;
  }
  const maximumFractionDigits = value < 10 && i > 0 ? 2 : 1;
  return `${formatNumber(value, { maximumFractionDigits })} ${units[i]}`;
}
