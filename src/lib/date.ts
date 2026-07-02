import { Time } from "@internationalized/date";

export function formatDatetime(input?: string): string {
  const date = input ? new Date(input) : new Date();
  const now = new Date();

  return date
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: date.getFullYear() === now.getFullYear() ? undefined : "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");
}

export function formatDate(input?: string): string {
  const date = input ? new Date(input) : new Date();
  const now = new Date();

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: date.getFullYear() === now.getFullYear() ? undefined : "numeric",
  });
}

export function formatHumans(date: Date) {
  const diff = Date.now() - date.getTime();
  const s = Math.floor(diff / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (s < 60) return "just now";
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}

export function formatAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function parseHourMinute(time: string): [number, number] {
  const [hour, minute] = time.split(":");
  return [Number(hour), Number(minute)];
}

export function calculateDuration(start_time: string, end_time: string): string {
  const [startHour, startMinute] = parseHourMinute(start_time);
  const [endHour, endMinute] = parseHourMinute(end_time);

  const startTotal = startHour * 60 + startMinute;
  const endTotal = endHour * 60 + endMinute;
  const diff = endTotal - startTotal;

  if (diff < 60) {
    return `${diff} min`;
  }

  const hours = (diff / 60).toFixed(1);
  return `${hours} hours`;
}

export function parseTimeStringToTimeObject(time: string): Time {
  const [hour, minute] = parseHourMinute(time);
  return new Time(hour, minute);
}

export const dayOfWeeks = [
  { id: "Monday", label: "Monday" },
  { id: "Tuesday", label: "Tuesday" },
  { id: "Wednesday", label: "Wednesday" },
  { id: "Thursday", label: "Thursday" },
  { id: "Friday", label: "Friday" },
  { id: "Saturday", label: "Saturday" },
  { id: "Sunday", label: "Sunday" },
];
