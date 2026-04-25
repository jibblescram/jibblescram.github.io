import { T, dateLabel } from '../data';
import { getNearestAvailableDate, getNearestSlots } from '../schedule';
import CardHeader from '../components/CardHeader';

export default function ExpertScreen({ goBack, booking, setBooking, goTo, lang, setLang, schedule }) {
  const t = T[lang];
  const nearestDate = schedule ? getNearestAvailableDate(schedule) : null;
  const nearestSlots = schedule ? getNearestSlots(schedule, nearestDate) : [];

  function pickTime(time) {
    setBooking(b => ({ ...b, time, date: nearestDate, fromExpert: true }));
    goTo(booking.services.length > 0 ? 'bookingForm' : 'services');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <CardHeader goBack={goBack} lang={lang} setLang={setLang} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 0' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, color: '#1A1A1A', marginBottom: 20 }}>{t.chooseExpert}</h2>

        <div style={{ borderRadius: 16, border: '1px solid #EFEFEF', padding: '18px', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#fff', flexShrink: 0 }}>A</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>Anja Jokić</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 1 }}>Language Tutor</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 10 }}>
            {t.nearestTime} &nbsp;<strong style={{ color: '#1A1A1A' }}>{dateLabel(nearestDate, t)}:</strong>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {nearestSlots.map(slot => (
              <button key={slot} className="time-pill" onClick={() => pickTime(slot)}
                style={{ padding: '8px 16px', borderRadius: 100, background: '#F0F0F0', border: 'none', fontSize: 13, fontWeight: 500, color: '#1A1A1A', cursor: 'pointer', transition: 'background 0.15s' }}>
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 20px 24px', borderTop: '1px solid #F0F0F0', flexShrink: 0 }}>
        <button onClick={() => goTo('services')} style={{ width: '100%', padding: '15px', borderRadius: 14, background: '#1A1A1A', color: '#fff', border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
          {t.chooseServicesBtn}
        </button>
      </div>
    </div>
  );
}
