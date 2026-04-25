import { useState } from 'react';
import { LANG_OPTIONS } from '../data';
import { IconChevronDown } from '../Icons';

export default function LangSwitcher({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const current = LANG_OPTIONS.find(o => o.code === lang);

  return (
    <div style={{ position: 'relative', zIndex: 20 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 10px 6px 8px', borderRadius: 20, border: '1.5px solid #E8E8E8', background: '#fff', cursor: 'pointer', fontSize: 12, color: '#555', fontWeight: 600, letterSpacing: 0.2, lineHeight: 1 }}>
        <span style={{ fontSize: 15 }}>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <IconChevronDown />
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 19 }} />
          <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 6px)', background: '#fff', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.13)', border: '1px solid #F0F0F0', overflow: 'hidden', zIndex: 30, minWidth: 148 }}>
            {LANG_OPTIONS.map(opt => (
              <button key={opt.code} className="lang-opt"
                onClick={() => { setLang(opt.code); setOpen(false); }}
                style={{ width: '100%', padding: '11px 16px', border: 'none', background: opt.code === lang ? '#F5F5F5' : '#fff', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#1A1A1A', fontWeight: opt.code === lang ? 700 : 400 }}>
                <span style={{ fontSize: 18 }}>{opt.flag}</span>
                <span>{opt.label}</span>
                {opt.code === lang && (
                  <span style={{ marginLeft: 'auto' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5 6.5-6.5" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
