import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { T, totalPrice, totalDuration, fmtPrice, fmtDur, getServiceNameWithCategory, confirmDateLabel } from '../data';
import CardHeader from '../components/CardHeader';

export default function BookingFormScreen({ goBack, booking, goTo, lang, setLang }) {
  const t = T[lang];
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);
  const valid = name.trim().length > 1 && phone.trim().length > 5;
  const ids = booking.services;
  const price = totalPrice(ids, lang);
  const dur = totalDuration(ids);

  async function handleSubmit() {
    if (!valid || sending) return;
    setSending(true);

    const serviceNames = ids.map(id => getServiceNameWithCategory(id, T.en)).join(', ');
    const dateTime = confirmDateLabel(booking.date, booking.time, T.en);

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          customer_name:  name.trim(),
          customer_phone: phone.trim(),
          customer_email: email.trim() || '—',
          customer_note:  note.trim() || '—',
          services:       serviceNames,
          date_time:      dateTime || '—',
          total_price:    fmtPrice(price, 'en'),
          duration:       fmtDur(dur),
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      );
      console.log('EmailJS success:', result.status, result.text);
      goTo('success');
    } catch (err) {
      console.error('EmailJS error:', err);
      goTo('success');
    } finally {
      setSending(false);
    }
  }

  const inputStyle = { width: '100%', padding: '13px 14px', borderRadius: 12, border: '1.5px solid #E8E8E8', fontSize: 14, color: '#1A1A1A', outline: 'none', background: '#FAFAFA' };
  const labelStyle = { fontSize: 11, fontWeight: 700, color: '#999', marginBottom: 6, display: 'block', letterSpacing: 0.5, textTransform: 'uppercase' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <CardHeader goBack={goBack} lang={lang} setLang={setLang} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 0' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, color: '#1A1A1A', marginBottom: 4 }}>{t.yourDetails}</h2>
        <div style={{ fontSize: 13, color: '#999', marginBottom: 24 }}>{t.almostDone}</div>

        {ids.length > 0 && (
          <div style={{ background: '#F7F7F7', borderRadius: 14, padding: '14px 16px', marginBottom: 24 }}>
            {ids.map((id) => (
              <div key={id} style={{ fontSize: 13, color: '#555', paddingBottom: 3 }}>&middot; {getServiceNameWithCategory(id, t)}</div>
            ))}
            {booking.date && (
              <div style={{ fontSize: 13, color: '#555', marginTop: 8, paddingTop: 8, borderTop: '1px solid #EBEBEB' }}>
                {'📅'} {confirmDateLabel(booking.date, booking.time, t)}
              </div>
            )}
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginTop: 8 }}>
              {fmtPrice(price, lang)} &middot; {fmtDur(dur)}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>{t.fullName} *</label>
            <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder={t.namePlaceholder} />
          </div>
          <div>
            <label style={labelStyle}>{t.phone} *</label>
            <input style={inputStyle} value={phone} onChange={e => setPhone(e.target.value)} placeholder={t.phonePlaceholder} type="tel" />
          </div>
          <div>
            <label style={labelStyle}>{t.email}</label>
            <input style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} placeholder={t.emailPlaceholder} type="email" />
          </div>
          <div>
            <label style={labelStyle}>{t.note}</label>
            <textarea style={{ ...inputStyle, resize: 'none', height: 80 }} value={note} onChange={e => setNote(e.target.value)} placeholder={t.notePlaceholder} />
          </div>
        </div>
        <div style={{ height: 24 }} />
      </div>

      <div style={{ borderTop: '1px solid #F0F0F0', padding: '12px 20px 20px', background: '#fff', flexShrink: 0 }}>
        <button onClick={handleSubmit} disabled={!valid || sending}
          style={{ width: '100%', padding: '15px', borderRadius: 14, background: '#1A1A1A', color: '#fff', border: 'none', fontSize: 15, fontWeight: 600, cursor: valid && !sending ? 'pointer' : 'default', opacity: valid && !sending ? 1 : 0.35 }}>
          {sending ? '...' : t.confirmBooking}
        </button>
      </div>
    </div>
  );
}
