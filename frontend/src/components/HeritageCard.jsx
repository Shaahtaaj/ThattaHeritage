import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import SafeImage from './SafeImage';

export default function HeritageCard({ item, onOpen }) {
  return (
    <motion.article
      whileHover={{ y: -8, rotate: -0.6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="group overflow-hidden rounded-lg bg-white/82 shadow-heritage ring-1 ring-ink/5"
    >
      <SafeImage
        src={item.image_url}
        alt={item.name_sindhi}
        type="heritage"
        className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold leading-loose text-ink">{item.name_sindhi}</h3>
        <p className="line-clamp-3 min-h-[6rem] text-base leading-loose text-ink/70">{item.description_sindhi}</p>
        <button
          onClick={() => onOpen(item)}
          className="mt-4 flex items-center gap-2 rounded-lg bg-lake px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigoAjrak"
        >
          <MapPin size={17} />
          نقشو ۽ تفصيل
        </button>
      </div>
    </motion.article>
  );
}
