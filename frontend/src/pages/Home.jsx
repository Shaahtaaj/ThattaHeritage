import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import EnvironmentChart from '../components/EnvironmentChart';
import MapView from '../components/MapView';
import SafeImage from '../components/SafeImage';

export default function Home({ heritage, crafts, environment, setActivePage }) {
  const oldestPlaces = heritage.slice(0, 6);
  const gujjoPoints = heritage.filter((item) => item.name_sindhi.includes('گجو'));

  return (
    <>
      <Hero setActivePage={setActivePage} />
      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ['17+', 'ماڳ ۽ مقامي نقطا'],
            ['3', 'گجو جا نقطا'],
            ['6', 'سنڌي هنر'],
            ['لائيو', 'موسم ۽ برسات'],
          ].map(([value, label]) => (
            <div key={label} className="rounded-lg bg-white/82 p-5 shadow-heritage ring-1 ring-ink/5">
              <div className="latin text-3xl font-extrabold text-indigoAjrak">{value}</div>
              <div className="mt-2 text-base leading-loose text-ink/68">{label}</div>
            </div>
          ))}
        </div>
      </section>

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

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
        <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-bold leading-loose">قديم ۽ اهم ماڳ</h2>
            <p className="max-w-3xl text-lg leading-loose text-ink/68">
              پورٽل ۾ يونيسڪو مڪلي، شاهجهاني مسجد، ڀنڀور، ڪينجھر، هاليجي ۽ مقامي ڳوٺاڻا نقطا گڏ رکيا ويا آهن.
            </p>
          </div>
          <button onClick={() => setActivePage('heritage')} className="rounded-lg bg-indigoAjrak px-5 py-3 font-semibold text-white shadow-heritage">
            ماڳ کوليو
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {oldestPlaces.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage('heritage')}
              className="group overflow-hidden rounded-lg bg-white/82 text-right shadow-heritage ring-1 ring-ink/5 transition hover:-translate-y-1"
            >
              <SafeImage src={item.image_url} alt={item.name_sindhi} className="h-52 w-full" />
              <div className="p-5">
                <h3 className="text-2xl font-bold leading-loose">{item.name_sindhi}</h3>
                <p className="line-clamp-2 leading-loose text-ink/66">{item.description_sindhi}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {gujjoPoints.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
          <div className="rounded-lg bg-[#f4eadb] p-5 shadow-heritage md:p-7">
            <h2 className="text-3xl font-bold leading-loose">گجو ۽ مقامي ڄاڻ</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {gujjoPoints.map((item) => (
                <div key={item.id} className="rounded-lg bg-white/78 p-4 ring-1 ring-ink/5">
                  <h3 className="text-xl font-bold leading-loose">{item.name_sindhi}</h3>
                  <p className="line-clamp-3 leading-loose text-ink/66">{item.description_sindhi}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#18222a] px-4 py-14 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold leading-loose">سنڌي هنر جي گيلري</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {crafts.slice(0, 3).map((craft) => (
              <button
                key={craft.id}
                onClick={() => setActivePage('crafts')}
                className="overflow-hidden rounded-lg bg-white/8 text-right transition hover:-translate-y-1 hover:bg-white/12"
              >
                <SafeImage src={craft.image_url} alt={craft.name_sindhi} type="craft" className="h-48 w-full" />
                <div className="p-4">
                  <h3 className="text-xl font-bold leading-loose">{craft.name_sindhi}</h3>
                  <p className="line-clamp-2 leading-loose text-white/70">{craft.description_sindhi}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
