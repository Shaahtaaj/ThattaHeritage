import { motion } from 'framer-motion';
import { CloudRain, ThermometerSun, Waves } from 'lucide-react';
import EnvironmentChart from '../components/EnvironmentChart';

export default function Environment({ environment }) {
  const latest = environment[0] || {};
  const stats = [
    { label: 'گرمي پد', value: `${latest.temperature ?? '--'}°C`, icon: ThermometerSun, color: 'bg-coralThread' },
    { label: 'نمي', value: `${latest.humidity ?? '--'}٪`, icon: CloudRain, color: 'bg-lake' },
    { label: 'ڍنڍ سطح', value: latest.lake_level == null ? 'فيڊ نه آهي' : `${latest.lake_level}m`, icon: Waves, color: 'bg-indigoAjrak' },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-bold leading-loose">ماحولياتي ڄاڻ</h1>
        <p className="text-lg leading-loose text-ink/70">
          ٺٽي جي موسم، برسات ۽ پاڻي بابت ڊيٽا گرافن ۾ ڏسو.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <motion.div
            key={label}
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/82 p-5 shadow-heritage ring-1 ring-ink/5"
          >
            <div className={`grid h-11 w-11 place-items-center rounded-lg ${color} text-white`}>
              <Icon size={21} />
            </div>
            <p className="mt-4 text-base text-ink/60">{label}</p>
            <p className="latin mt-2 text-3xl font-extrabold text-ink">{value}</p>
          </motion.div>
        ))}
      </div>

      {environment.length > 0 && <EnvironmentChart data={environment} />}
    </section>
  );
}
