import { T, totalPrice, totalDuration, fmtPrice, fmtDur, getServiceNameWithCategory, confirmDateLabel } from '../data';

export default function SuccessScreen({ booking, goTo, lang }) {
  const t = T[lang];
  const ids = booking.services;
  const price = totalPrice(ids, lang);
  const dur = totalDuration(ids);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '40px 28px', textAlign: 'center', minHeight: 500 }}>
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M7 16l6 6 12-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, color: '#1A1A1A', marginBottom: 8 }}>{t.bookingConfirmed}</div>
      <div style={{ fontSize: 14, color: '#888', lineHeight: 1.6, marginBottom: 28, maxWidth: 280 }}>{t.bookingMsg}</div>

      <div style={{ width: '100%', background: '#F7F7F7', borderRadius: 16, padding: '18px', textAlign: 'left', marginBottom: 28 }}>
        {ids.map((id) => (
          <div key={id} style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 4 }}>{getServiceNameWithCategory(id, t)}</div>
        ))}
        {booking.date && (
          <div style={{ fontSize: 13, color: '#666', marginTop: 8 }}>{confirmDateLabel(booking.date, booking.time, t)}</div>
        )}
        {ids.length > 0 && (
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginTop: 10, paddingTop: 10, borderTop: '1px solid #EBEBEB' }}>
            {fmtPrice(price, lang)} &middot; {fmtDur(dur)}
          </div>
        )}
      </div>

      <button
        onClick={() => goTo('home')}
        style={{ width: '100%', padding: '15px', borderRadius: 14, background: '#1A1A1A', color: '#fff', border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
        {t.backToHome}
      </button>
    </div>
  );
}
