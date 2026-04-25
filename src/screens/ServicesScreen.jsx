import { T, SERVICES, svcPrice, fmtPrice, fmtDur } from '../data';
import { IconCheck } from '../Icons';
import CardHeader from '../components/CardHeader';
import BottomBar from '../components/BottomBar';

export default function ServicesScreen({ goBack, booking, toggleService, goTo, lang, setLang }) {
  const t = T[lang];
  const hasTime = !!booking.time;
  const count = booking.services.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <CardHeader goBack={goBack} lang={lang} setLang={setLang} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 0' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, color: '#1A1A1A', marginBottom: 6 }}>{t.chooseServices}</h2>
        <div style={{ fontSize: 13, color: '#999', marginBottom: 22 }}>{t.selectSessions}</div>

        {t.serviceCategories.map((cat, ci) => (
          <div key={cat.cat} style={{ marginBottom: ci < t.serviceCategories.length - 1 ? 28 : 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #F0F0F0' }}>
              {cat.label}
            </div>
            {cat.services.map((svcT) => {
              const svc = SERVICES.find(s => s.id === svcT.id);
              const checked = booking.services.includes(svcT.id);
              const price = fmtPrice(svcPrice(svcT.id, lang), lang);
              return (
                <button key={svcT.id} className="service-row" onClick={() => toggleService(svcT.id)}
                  style={{ width: '100%', display: 'flex', alignItems: 'flex-start', gap: 14, padding: '13px 2px', borderBottom: '1px solid #F8F8F8', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 3 }}>{svcT.name}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{fmtDur(svc ? svc.duration : 60)}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginTop: 5 }}>{price}</div>
                  </div>
                  <div style={{ width: 22, height: 22, borderRadius: 6, border: checked ? 'none' : '1.5px solid #D0D0D0', background: checked ? '#1A1A1A' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, transition: 'all 0.15s' }}>
                    {checked && <IconCheck />}
                  </div>
                </button>
              );
            })}
          </div>
        ))}
        <div style={{ height: 8 }} />
      </div>

      <BottomBar
        serviceIds={booking.services} lang={lang} t={t}
        actionLabel={!hasTime ? t.menuDateTime : booking.fromExpert ? t.done : t.chooseExpert}
        onAction={() => goTo(!hasTime ? 'datetime' : booking.fromExpert ? 'bookingForm' : 'expertConfirm')}
        disabled={count === 0}
      />
    </div>
  );
}
