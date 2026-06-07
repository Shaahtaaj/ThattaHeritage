import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import SafeImage from './SafeImage';

export default function CraftsCard({ item }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ scale: 1.025, rotate: 0.7 }}
      className="overflow-hidden rounded-lg bg-white/82 shadow-heritage ring-1 ring-ink/5"
    >
      <div className="relative">
        <SafeImage src={item.image_url} alt={item.name_sindhi} type="craft" className="h-64 w-full object-cover" />
        <div className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-lg bg-coralThread text-white">
          <Sparkles size={19} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-bold leading-loose">{item.name_sindhi}</h3>
        <p className="text-base leading-loose text-ink/70">{item.description_sindhi}</p>
      </div>
    </motion.article>
  );
}
