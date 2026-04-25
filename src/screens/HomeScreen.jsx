import { T } from '../data';
import { IconPerson, IconCalendar, IconList, IconChevronRight } from '../Icons';
import LangSwitcher from '../components/LangSwitcher';

export default function HomeScreen({ goTo, lang, setLang }) {
  const t = T[lang];
  const items = [
    { icon: <IconPerson />, label: t.menuExpert, to: 'expert' },
    { icon: <IconCalendar />, label: t.menuDateTime, to: 'datetime' },
    { icon: <IconList />, label: t.menuServices, to: 'services' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 540, position: 'relative' }}>
      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 20 }}>
        <LangSwitcher lang={lang} setLang={setLang} />
      </div>

      <div style={{ padding: '44px 24px 28px', textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 auto 16px', letterSpacing: -0.5 }}>AJ</div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, color: '#1A1A1A' }}>English with Anya</div>
        <div style={{ fontSize: 13, color: '#999', marginTop: 4 }}>{t.subtitle}</div>
      </div>

      <div style={{ padding: '0 12px', flex: 1 }}>
        {items.map((item, i) => (
          <button key={i} className="menu-row" onClick={() => goTo(item.to)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', padding: '14px 12px', borderRadius: 12, border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', gap: 14, borderBottom: i < items.length - 1 ? '1px solid #F4F4F4' : 'none', transition: 'background 0.1s' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {item.icon}
            </div>
            <span style={{ fontSize: 15, color: '#1A1A1A', flex: 1 }}>{item.label}</span>
            <IconChevronRight />
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '28px 24px', color: '#C8C8C8', fontSize: 12 }}>
        {t.footer}
      </div>
    </div>
  );
}
