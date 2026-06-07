import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import EnvironmentChart from '../components/EnvironmentChart';
import MapView from '../components/MapView';

export default function Home({ heritage, crafts, environment, setActivePage }) {
  return (
    <>
      <Hero setActivePage={setActivePage} />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 md:grid-cols-[1.1fr_0.9fr] md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg bg-white/78 p-5 shadow-heritage ring-1 ring-ink/5"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold leading-loose">ٺٽي جا زنده ماڳ</h2>
            <button onClick={() => setActivePage('heritage')} className="rounded-lg bg-lake px-4 py-2 text-sm font-semibold text-white">
              سڀ ڏسو
            </button>
          </div>
          {heritage.length > 0 && <MapView heritage={heritage} />}
        </motion.div>

        <div className="grid gap-6">
          <div className="rounded-lg bg-indigoAjrak p-5 text-white shadow-heritage">
            <h2 className="text-2xl font-bold leading-loose">ماحول جي تازي تصوير</h2>
            <p className="leading-loose text-white/78">
              گرمي پد، برسات ۽ ڍنڍ جي سطح کي گڏ ڏسي مقامي آبادي ۽ سياح بهتر فيصلو ڪري سگهن ٿا.
            </p>
          </div>
          {environment.length > 0 && <EnvironmentChart data={environment.slice(0, 4)} />}
        </div>
      </section>

      <section className="bg-[#18222a] px-4 py-14 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold leading-loose">سنڌي هنر جي گيلري</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {crafts.slice(0, 3).map((craft) => (
              <button
                key={craft.id}
                onClick={() => setActivePage('crafts')}
                className="rounded-lg bg-white/8 p-4 text-right transition hover:-translate-y-1 hover:bg-white/12"
              >
                <h3 className="text-xl font-bold leading-loose">{craft.name_sindhi}</h3>
                <p className="line-clamp-2 leading-loose text-white/70">{craft.description_sindhi}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
