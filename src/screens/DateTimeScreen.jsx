import { useState, useMemo } from 'react';
import { T } from '../data';
import { computeAvailability } from '../schedule';
import { IconChevronDown } from '../Icons';
import CardHeader from '../components/CardHeader';

export default function DateTimeScreen({ goBack, booking, setBooking, goTo, lang, setLang, schedule }) {
  const t = T[lang];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);

  function prevMonth() {
    viewMonth === 0 ? (setViewMonth(11), setViewYear(y => y - 1)) : setViewMonth(m => m - 1);
  }
  function nextMonth() {
    viewMonth === 11 ? (setViewMonth(0), setViewYear(y => y + 1)) : setViewMonth(m => m + 1);
  }

  function buildCalendar() {
    let startDow = new Date(viewYear, viewMonth, 1).getDay();
    startDow = startDow === 0 ? 6 : startDow - 1;
    const total = new Date(viewYear, viewMonth + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < startDow; i++) days.push(null);
    for (let d = 1; d <= total; d++) days.push(d);
    return days;
  }

  function dateStr(day) {
    return `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }
  const availability = useMemo(
    () => schedule ? computeAvailability(schedule, viewYear, viewMonth) : {},
    [schedule, viewYear, viewMonth]
  );

  function isAvail(day) {
    if (!day) return false;
    const ds = dateStr(day);
    return new Date(viewYear, viewMonth, day) >= today && !!availability[ds];
  }
  function isToday(day) {
    return day && viewYear === today.getFullYear() && viewMonth === today.getMonth() && day === today.getDate();
  }

  const calDays = buildCalendar();
  const slots = selectedDate ? availability[selectedDate] : null;

  function pickTime(time) {
    setBooking(b => ({ ...b, date: selectedDate, time }));
    goTo(booking.services.length > 0 ? 'expertConfirm' : 'services');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <CardHeader goBack={goBack} lang={lang} setLang={setLang} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 24px' }}>

        {/* Month nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <button onClick={() => { setSelectedDate(null); prevMonth(); }} style={{ border: 'none', background: '#F0F0F0', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>{t.months[viewMonth]}</span>
            <IconChevronDown />
          </div>
          <button onClick={() => { setSelectedDate(null); nextMonth(); }} style={{ border: 'none', background: '#F0F0F0', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 6 }}>
          {t.days.map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: 11, color: '#ABABAB', fontWeight: 600, paddingBottom: 6, letterSpacing: 0.2 }}>{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px 0', marginBottom: 24 }}>
          {calDays.map((day, i) => {
            if (!day) return <div key={i} />;
            const ds = dateStr(day);
            const avail = isAvail(day);
            const todayFlag = isToday(day);
            const sel = selectedDate === ds;
            const past = new Date(viewYear, viewMonth, day) < today;
            return (
              <button key={i} onClick={() => avail && setSelectedDate(ds)} disabled={!avail}
                style={{
                  borderRadius: '50%', border: 'none', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36,
                  background: sel ? '#1A1A1A' : 'transparent',
                  color: sel ? '#fff' : past ? '#D0D0D0' : avail ? '#1A1A1A' : '#CCCCCC',
                  fontSize: 13, fontWeight: avail || todayFlag ? 600 : 400,
                  cursor: avail ? 'pointer' : 'default',
                  outline: todayFlag && !sel ? '1.5px solid #1A1A1A' : 'none',
                }}>
                {day}
              </button>
            );
          })}
        </div>

        {/* Time slots */}
        {selectedDate && slots && (
          <div>
            {[[t.morning, slots.morning], [t.afternoon, slots.afternoon], [t.evening, slots.evening]].map(([label, times]) => {
              if (!times || !times.length) return null;
              return (
                <div key={label} style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, color: '#888', fontWeight: 500, marginBottom: 10 }}>{label}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {times.map(slot => (
                      <button key={slot} onClick={() => pickTime(slot)} className="time-pill"
                        style={{ padding: '10px 20px', borderRadius: 100, background: '#F0F0F0', border: 'none', fontSize: 13, fontWeight: 500, color: '#1A1A1A', cursor: 'pointer', transition: 'background 0.15s' }}>
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!selectedDate && (
          <div style={{ textAlign: 'center', color: '#BDBDBD', fontSize: 13, paddingTop: 4 }}>
            {t.selectDateHint}
          </div>
        )}
      </div>
    </div>
  );
}
