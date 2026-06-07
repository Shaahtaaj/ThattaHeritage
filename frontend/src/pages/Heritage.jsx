import { useState } from 'react';
import { motion } from 'framer-motion';
import HeritageCard from '../components/HeritageCard';
import MapView from '../components/MapView';
import SafeImage from '../components/SafeImage';

export default function Heritage({ heritage }) {
  const [selected, setSelected] = useState(null);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-bold leading-loose">تاريخي ماڳ</h1>
        <p className="text-lg leading-loose text-ink/70">
          مڪلي، شاھ جهان مسجد، ڪينجھر ۽ هاليجي جي ڄاڻ، تصويرون ۽ نقشي تي جڳھون.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {heritage.map((item) => (
          <HeritageCard key={item.id} item={item} onOpen={setSelected} />
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-lg shadow-heritage">
        {heritage.length > 0 && <MapView heritage={heritage} />}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] grid place-items-center bg-ink/55 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="max-w-2xl overflow-hidden rounded-lg bg-[#f8f3ea] shadow-heritage"
            onClick={(event) => event.stopPropagation()}
          >
            <SafeImage src={selected.image_url} alt={selected.name_sindhi} type="heritage" className="h-72 w-full object-cover" />
            <div className="p-6">
              <h2 className="text-3xl font-bold leading-loose">{selected.name_sindhi}</h2>
              <p className="text-lg leading-loose text-ink/72">{selected.description_sindhi}</p>
              <button onClick={() => setSelected(null)} className="mt-5 rounded-lg bg-indigoAjrak px-5 py-2 font-semibold text-white">
                بند ڪريو
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
