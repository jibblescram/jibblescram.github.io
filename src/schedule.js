const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1BGevmHlGg74f9efk1TpvsHCl89PvR71-1Tc8ScWPgjM/export?format=csv';

const DAY_ORDER = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_TO_DOW = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function expandDayRange(range) {
  const [from, to] = range.split('-');
  const start = DAY_ORDER.indexOf(from);
  const end = DAY_ORDER.indexOf(to);
  return DAY_ORDER.slice(start, end + 1);
}

function parseOfficeHours(str) {
  // e.g. "Mon-Fri 09:00-20:00"
  const [daysPart, timePart] = str.trim().split(' ');
  const days = expandDayRange(daysPart);
  const [start, end] = timePart.split('-');
  return { days, start, end };
}

export async function fetchSchedule() {
  const res = await fetch(SHEET_CSV_URL);
  const text = await res.text();
  const rows = text.split('\n').map(r => r.split(',')[0].trim()).filter(Boolean);
  const [officeHoursRaw, ...takenRaw] = rows;
  return {
    officeHours: parseOfficeHours(officeHoursRaw),
    taken: takenRaw,
  };
}

function toMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function fmtTime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${m === 0 ? '00' : String(m).padStart(2, '0')}`;
}

function dateStr(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function computeAvailability(schedule, year, month) {
  const { officeHours, taken } = schedule;
  const allowedDows = officeHours.days.map(d => DAY_TO_DOW[d]);
  const takenSet = new Set(taken);
  const startMin = toMinutes(officeHours.start);
  const endMin = toMinutes(officeHours.end);
  const result = {};

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= daysInMonth; d++) {
    const dow = new Date(year, month, d).getDay();
    if (!allowedDows.includes(dow)) continue;

    const ds = dateStr(year, month, d);
    if (takenSet.has(ds)) continue;

    const morning = [], afternoon = [], evening = [];

    for (let m = startMin; m + 60 <= endMin; m += 60) {
      const time = fmtTime(m);
      if (takenSet.has(`${ds} ${time}`)) continue;
      const h = Math.floor(m / 60);
      if (h < 12) morning.push(time);
      else if (h < 17) afternoon.push(time);
      else evening.push(time);
    }

    if (morning.length || afternoon.length || evening.length) {
      result[ds] = { morning, afternoon, evening };
    }
  }

  return result;
}

export function getNearestAvailableDate(schedule) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 90; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const avail = computeAvailability(schedule, year, month);
    const ds = dateStr(year, month, day);
    if (avail[ds]) return ds;
  }
  return null;
}

export function getNearestSlots(schedule, date) {
  if (!date) return [];
  const [year, month, day] = date.split('-').map(Number);
  const avail = computeAvailability(schedule, year, month - 1);
  const d = avail[date];
  if (!d) return [];
  return [...d.morning, ...d.afternoon, ...d.evening].slice(0, 4);
}
