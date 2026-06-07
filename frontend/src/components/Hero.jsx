import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, MapPinned } from 'lucide-react';
import SafeImage from './SafeImage';

export default function Hero({ setActivePage }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 90]);

  return (
    <section className="relative min-h-[calc(100vh-88px)] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 opacity-80">
        <div className="absolute right-[-8rem] top-12 h-72 w-72 rounded-full border-[42px] border-indigoAjrak/10" />
        <div className="absolute bottom-12 left-[-6rem] h-56 w-56 rounded-full border-[34px] border-coralThread/10" />
      </motion.div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-[1.02fr_0.98fr] md:px-8 md:py-20">
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl text-4xl font-bold leading-[2.0] text-ink md:text-6xl"
          >
            مڪلي، ڪينجھر ۽ سنڌي هنر هڪ هنڌ
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.65 }}
            className="mt-5 max-w-2xl text-lg leading-loose text-ink/72 md:text-xl"
          >
            ٺٽي جي تاريخي ماڳن، مقامي هنر، موسم، برسات ۽ ڍنڍن جي ڄاڻ کي هڪ اهڙي پورٽل ۾ ڏسو جيڪو
            مقامي ماڻهن، شاگردن ۽ سياحن لاءِ ٺهيل آهي.
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setActivePage('heritage')}
              className="flex items-center gap-2 rounded-lg bg-indigoAjrak px-5 py-3 font-semibold text-white shadow-heritage transition hover:-translate-y-0.5"
            >
              <MapPinned size={19} />
              ماڳ ڏسو
            </button>
            <button
              onClick={() => setActivePage('ask')}
              className="flex items-center gap-2 rounded-lg border border-ink/15 bg-white/70 px-5 py-3 font-semibold text-ink transition hover:bg-white"
            >
              سوال پڇو
              <ArrowLeft size={18} />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10"
        >
          <div className="overflow-hidden rounded-lg bg-indigoAjrak shadow-heritage">
            <div className="ajrak-pattern h-16 bg-indigoAjrak" />
            <div className="grid gap-4 bg-white/92 p-5 md:p-6">
              <SafeImage
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/PK_Thatta_asv2020-02_img24_Makli_Necropolis.jpg/1200px-PK_Thatta_asv2020-02_img24_Makli_Necropolis.jpg"
                alt="Makli Necropolis"
                type="heritage"
                className="h-72 w-full rounded-lg object-cover"
              />
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  ['4+', 'ماڳ'],
                  ['3', 'هنر'],
                  ['لائيو', 'موسم'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg bg-[#f4eadb] p-4">
                    <div className="latin text-2xl font-extrabold text-indigoAjrak">{value}</div>
                    <div className="text-sm text-ink/65">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
