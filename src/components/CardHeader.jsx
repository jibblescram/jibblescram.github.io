import { IconChevronLeft } from '../Icons';
import LangSwitcher from './LangSwitcher';

export default function CardHeader({ goBack, lang, setLang }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid #F2F2F2', gap: 10, flexShrink: 0 }}>
      <button onClick={goBack} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 8, padding: 0, flexShrink: 0 }}>
        <IconChevronLeft />
      </button>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>AJ</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2 }}>Anja Jokić</div>
        <div style={{ fontSize: 11, color: '#999', marginTop: 1 }}>Language Tutor</div>
      </div>
      <LangSwitcher lang={lang} setLang={setLang} />
    </div>
  );
}
