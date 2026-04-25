import { useState, useEffect } from 'react';
import { fetchSchedule } from './schedule';
import HomeScreen from './screens/HomeScreen';
import ExpertScreen from './screens/ExpertScreen';
import ServicesScreen from './screens/ServicesScreen';
import DateTimeScreen from './screens/DateTimeScreen';
import ExpertConfirmScreen from './screens/ExpertConfirmScreen';
import BookingFormScreen from './screens/BookingFormScreen';
import SuccessScreen from './screens/SuccessScreen';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [history, setHistory] = useState([]);
  const [booking, setBooking] = useState({ services: [], date: null, time: null, fromExpert: false });
  const [lang, setLang] = useState('es');
  const [schedule, setSchedule] = useState(null);

  useEffect(() => { fetchSchedule().then(setSchedule); }, []);

  function goTo(s) {
    setHistory(h => [...h, screen]);
    setScreen(s);
  }

  function goBack() {
    if (!history.length) return;
    setScreen(history[history.length - 1]);
    setHistory(h => h.slice(0, -1));
  }

  function toggleService(id) {
    setBooking(b => ({
      ...b,
      services: b.services.includes(id)
        ? b.services.filter(x => x !== id)
        : [...b.services, id],
    }));
  }

  function resetAndGoHome() {
    setHistory([]);
    setBooking({ services: [], date: null, time: null, fromExpert: false });
    setScreen('home');
  }

  const shared = { lang, setLang, goTo, goBack };

  const screens = {
    home: <HomeScreen {...shared} />,
    expert: <ExpertScreen {...shared} booking={booking} setBooking={setBooking} schedule={schedule} />,
    services: <ServicesScreen {...shared} booking={booking} toggleService={toggleService} />,
    datetime: <DateTimeScreen {...shared} booking={booking} setBooking={setBooking} schedule={schedule} />,
    expertConfirm: <ExpertConfirmScreen {...shared} booking={booking} />,
    bookingForm: <BookingFormScreen {...shared} booking={booking} />,
    success: <SuccessScreen lang={lang} setLang={setLang} booking={booking} goTo={resetAndGoHome} />,
  };

  return (
    <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 4px 40px rgba(0,0,0,0.10)', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 560 }}>
      {screens[screen] || screens.home}
    </div>
  );
}
