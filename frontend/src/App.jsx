import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Compass, Droplets, Landmark, MessageCircle, Palette } from 'lucide-react';
import { getCrafts, getEnvironment, getHeritage } from './api';
import Home from './pages/Home';
import Heritage from './pages/Heritage';
import Crafts from './pages/Crafts';
import Environment from './pages/Environment';
import Ask from './pages/Ask';

const navItems = [
  { id: 'home', label: 'گهر', icon: Compass },
  { id: 'heritage', label: 'ماڳ', icon: Landmark },
  { id: 'crafts', label: 'هنر', icon: Palette },
  { id: 'environment', label: 'ماحول', icon: Droplets },
  { id: 'ask', label: 'سوال پڇو', icon: MessageCircle },
];

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [heritage, setHeritage] = useState([]);
  const [crafts, setCrafts] = useState([]);
  const [environment, setEnvironment] = useState([]);

  useEffect(() => {
    Promise.all([getHeritage(), getCrafts(), getEnvironment()]).then(([h, c, e]) => {
      setHeritage(h);
      setCrafts(c);
      setEnvironment(e);
    });
  }, []);

  const pages = {
    home: <Home heritage={heritage} crafts={crafts} environment={environment} setActivePage={setActivePage} />,
    heritage: <Heritage heritage={heritage} />,
    crafts: <Crafts crafts={crafts} />,
    environment: <Environment environment={environment} />,
    ask: <Ask />,
  };

  return (
    <div className="min-h-screen overflow-x-hidden text-ink">
      <header className="sticky top-0 z-50 border-b border-white/45 bg-[#f8f3ea]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <button
            onClick={() => setActivePage('home')}
            className="flex items-center gap-3 text-right"
            aria-label="ٺٽو ورثو"
          >
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-indigoAjrak text-lg font-bold text-white shadow-heritage">
              ٺ
            </span>
            <span>
              <span className="block text-xl font-bold leading-loose">ٺٽو ورثو</span>
              <span className="latin block text-xs font-semibold uppercase tracking-wide text-ink/55">
                Heritage & Environment
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActivePage(id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  activePage === id
                    ? 'bg-indigoAjrak text-white shadow-lg shadow-indigoAjrak/20'
                    : 'text-ink/70 hover:bg-white/70 hover:text-ink'
                }`}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 pb-3 md:hidden">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              className={`flex min-w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${
                activePage === id ? 'bg-indigoAjrak text-white' : 'bg-white/60 text-ink/70'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>
      </header>

      <AnimatePresence mode="wait">
        <motion.main
          key={activePage}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {pages[activePage]}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
