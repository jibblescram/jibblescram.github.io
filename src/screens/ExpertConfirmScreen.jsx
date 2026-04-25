import { T, totalPrice, fmtPrice, confirmDateLabel } from '../data';
import CardHeader from '../components/CardHeader';
import BottomBar from '../components/BottomBar';

export default function ExpertConfirmScreen({ goBack, booking, goTo, lang, setLang }) {
  const t = T[lang];
  const ids = booking.services;
  const price = totalPrice(ids, lang);
  const dateTab = confirmDateLabel(booking.date, booking.time, t);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <CardHeader goBack={goBack} lang={lang} setLang={setLang} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 0' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, color: '#1A1A1A', marginBottom: 20 }}>{t.chooseExpert}</h2>

        {/* Date tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #F0F0F0', marginBottom: 20 }}>
          <button style={{ flex: 1, padding: '10px 8px', fontSize: 13, fontWeight: 600, color: '#1A1A1A', background: 'transparent', border: 'none', borderBottom: '2px solid #1A1A1A', cursor: 'default', textAlign: 'center' }}>
            {dateTab}
          </button>
          <button onClick={() => goTo('datetime')}
            style={{ flex: 1, padding: '10px 8px', fontSize: 13, color: '#888', background: 'transparent', border: 'none', cursor: 'pointer', borderBottom: '2px solid transparent', textAlign: 'center' }}>
            {t.anotherTime}
          </button>
        </div>

        {/* Expert card */}
        <div style={{ borderRadius: 16, border: '1px solid #EFEFEF', padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#fff', flexShrink: 0 }}>A</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>Anja Jokić</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 1 }}>Language Tutor</div>
            </div>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#1A1A1A' }} />
          </div>
          {ids.length > 0 && (
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', marginTop: 12, paddingTop: 12, borderTop: '1px solid #F4F4F4' }}>
              {fmtPrice(price, lang)}
            </div>
          )}
        </div>
      </div>

      <BottomBar
        serviceIds={ids} lang={lang} t={t}
        actionLabel={t.done}
        onAction={() => goTo('bookingForm')}
        disabled={false}
      />
    </div>
  );
}
