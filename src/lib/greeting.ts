/** Client-side only — uses viewer's local clock. */
export function getTimeGreeting(now = new Date()): "Good morning" | "Good afternoon" | "Good evening" {
  const h = now.getHours();
  if (h >= 5 && h < 12) return "Good morning";
  if (h >= 12 && h < 17) return "Good afternoon";
  return "Good evening";
}
