import { totalPrice, totalDuration, fmtPrice, fmtDur } from '../data';
import { IconPencil } from '../Icons';

export default function BottomBar({ serviceIds, lang, t, actionLabel, onAction, disabled }) {
  const count = (serviceIds || []).length;
  const price = totalPrice(serviceIds || [], lang);
  const dur = totalDuration(serviceIds || []);

  return (
    <div style={{ borderTop: '1px solid #F0F0F0', padding: '12px 20px 20px', background: '#fff', flexShrink: 0 }}>
      {count > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: '#777' }}>
            {count} {count === 1 ? t.service : t.services} &nbsp;&middot;&nbsp; {fmtDur(dur)}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#1A1A1A' }}>
            {fmtPrice(price, lang)} <IconPencil />
          </span>
        </div>
      )}
      <button onClick={onAction} disabled={disabled}
        style={{ width: '100%', padding: '15px', borderRadius: 14, background: '#1A1A1A', color: '#fff', border: 'none', fontSize: 15, fontWeight: 600, cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.35 : 1, letterSpacing: 0.1 }}>
        {actionLabel}
      </button>
    </div>
  );
}
