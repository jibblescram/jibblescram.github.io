import { T } from '../data';
import CardHeader from '../components/CardHeader';

const POLICY = {
  en: [
    {
      title: '1. Data Controller',
      body: 'Anja Jokić is the controller of the personal data you provide through this booking form. Contact: anja.jokic41@gmail.com',
    },
    {
      title: '2. What We Collect',
      body: 'When you submit a booking we collect your full name and phone number (required), and optionally your email address and a note.',
    },
    {
      title: '3. Purpose & Legal Basis',
      body: 'Your data is used solely to confirm and manage your tutoring session. The legal basis for processing is your explicit consent (Art. 6(1)(a) GDPR).',
    },
    {
      title: '4. Data Processor — EmailJS',
      body: 'Booking notifications are delivered via EmailJS, Inc. (United States). EmailJS acts as a data processor under Standard Contractual Clauses, which provide adequate safeguards for transfers of personal data outside the EU/EEA. EmailJS Privacy Policy: emailjs.com/legal/privacy-policy',
    },
    {
      title: '5. Retention',
      body: 'Your personal data is kept for up to 12 months after your session and then permanently deleted.',
    },
    {
      title: '6. Your Rights',
      body: 'If you are located in the EU/EEA you have the right to access, correct, delete, restrict, or receive a portable copy of your data. You may withdraw consent at any time without affecting the lawfulness of prior processing. You also have the right to lodge a complaint with your local data protection authority.',
    },
    {
      title: '7. Contact',
      body: 'To exercise any of these rights or to ask questions about this policy, contact: anja.jokic41@gmail.com',
    },
  ],
  es: [
    {
      title: '1. Responsable del tratamiento',
      body: 'Anja Jokić es la responsable del tratamiento de los datos personales que proporcionas a través de este formulario de reserva. Contacto: anja.jokic41@gmail.com',
    },
    {
      title: '2. Datos que recopilamos',
      body: 'Al enviar una reserva, recopilamos tu nombre completo y número de teléfono (obligatorios), y opcionalmente tu dirección de correo electrónico y una nota.',
    },
    {
      title: '3. Finalidad y base legal',
      body: 'Tus datos se utilizan exclusivamente para confirmar y gestionar tu sesión de tutoría. La base legal para el tratamiento es tu consentimiento explícito (Art. 6(1)(a) RGPD).',
    },
    {
      title: '4. Encargado del tratamiento — EmailJS',
      body: 'Las notificaciones de reserva se envían a través de EmailJS, Inc. (Estados Unidos). EmailJS actúa como encargado del tratamiento bajo Cláusulas Contractuales Tipo, que proporcionan garantías adecuadas para las transferencias de datos personales fuera del EEE. Política de privacidad de EmailJS: emailjs.com/legal/privacy-policy',
    },
    {
      title: '5. Conservación',
      body: 'Tus datos personales se conservan durante un máximo de 12 meses tras tu sesión y luego se eliminan de forma permanente.',
    },
    {
      title: '6. Tus derechos',
      body: 'Si estás ubicado en la UE/EEE tienes derecho a acceder, rectificar, suprimir, limitar o recibir una copia portable de tus datos. Puedes retirar tu consentimiento en cualquier momento sin que ello afecte la licitud del tratamiento previo. También tienes derecho a presentar una reclamación ante tu autoridad de protección de datos.',
    },
    {
      title: '7. Contacto',
      body: 'Para ejercer cualquiera de estos derechos o realizar consultas sobre esta política, contacta: anja.jokic41@gmail.com',
    },
  ],
  sr: [
    {
      title: '1. Rukovalac podacima',
      body: 'Anja Jokić je rukovalac ličnim podacima koje dostavljate putem ovog formulara za rezervaciju. Kontakt: anja.jokic41@gmail.com',
    },
    {
      title: '2. Koji podaci se prikupljaju',
      body: 'Kada pošaljete rezervaciju, prikupljamo vaše ime i prezime i broj telefona (obavezno), a opciono i email adresu i napomenu.',
    },
    {
      title: '3. Svrha i pravni osnov',
      body: 'Vaši podaci koriste se isključivo za potvrdu i upravljanje vašom sesijom. Pravni osnov za obradu je vaš izričit pristanak (čl. 6(1)(a) GDPR).',
    },
    {
      title: '4. Obrađivač podataka — EmailJS',
      body: 'Obaveštenja o rezervaciji šalju se putem EmailJS, Inc. (Sjedinjene Države). EmailJS postupa kao obrađivač podataka na osnovu standardnih ugovornih klauzula, koje obezbeđuju odgovarajuće zaštitne mere za prenos ličnih podataka izvan EEP. Politika privatnosti EmailJS-a: emailjs.com/legal/privacy-policy',
    },
    {
      title: '5. Čuvanje podataka',
      body: 'Vaši lični podaci čuvaju se do 12 meseci nakon sesije, a zatim se trajno brišu.',
    },
    {
      title: '6. Vaša prava',
      body: 'Ako se nalazite u EU/EEP, imate pravo da pristupite, ispravite, izbrišete, ograničite ili dobijete prenosiv primerak svojih podataka. Možete povući pristanak u bilo kom trenutku bez uticaja na zakonitost prethodne obrade. Imate i pravo da podnesete pritužbu nadležnom organu za zaštitu podataka.',
    },
    {
      title: '7. Kontakt',
      body: 'Za ostvarivanje bilo kog od ovih prava ili pitanja o ovoj politici, kontaktirajte: anja.jokic41@gmail.com',
    },
  ],
};

export default function PrivacyScreen({ goBack, lang, setLang }) {
  const t = T[lang];
  const sections = POLICY[lang] || POLICY.en;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <CardHeader goBack={goBack} lang={lang} setLang={setLang} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px 32px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.4, color: '#1A1A1A', marginBottom: 20 }}>
          {t.privacyTitle}
        </h2>
        {sections.map((s) => (
          <div key={s.title} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: '#555', lineHeight: 1.65 }}>{s.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
