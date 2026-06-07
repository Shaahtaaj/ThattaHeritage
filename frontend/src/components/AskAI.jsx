import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { askQuestion } from '../api';

export default function AskAI() {
  const [question, setQuestion] = useState('مڪلي بابت ٻڌايو');
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    const response = await askQuestion(question);
    setAnswer(response);
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <form onSubmit={submit} className="rounded-lg bg-white/86 p-4 shadow-heritage ring-1 ring-ink/5 md:p-6">
        <label htmlFor="question" className="mb-3 block text-xl font-bold">
          پنهنجي ٻولي ۾ سوال لکو
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            className="min-h-14 flex-1 rounded-lg border border-ink/15 bg-[#fbf7ef] px-4 text-lg outline-none transition focus:border-lake focus:ring-4 focus:ring-lake/15"
            placeholder="مثال: ڪينجھر ڍنڍ ڪٿي آهي؟"
          />
          <button className="flex min-h-14 items-center justify-center gap-2 rounded-lg bg-indigoAjrak px-5 font-semibold text-white transition hover:bg-lake">
            <Send size={18} />
            موڪليو
          </button>
        </div>
      </form>

      <motion.div
        initial={false}
        animate={{ opacity: answer || loading ? 1 : 0.55, y: answer || loading ? 0 : 8 }}
        className="mt-5 rounded-lg bg-indigoAjrak p-5 text-white shadow-heritage"
      >
        {loading ? (
          <p className="animate-pulse text-lg leading-loose">جواب تيار ٿي رهيو آهي...</p>
        ) : answer ? (
          <>
            <p className="text-lg leading-loose">{answer.answer}</p>
            <p className="latin mt-4 text-xs text-white/65">Source: {answer.source}</p>
          </>
        ) : (
          <p className="text-lg leading-loose">سوال پڇو ته پورٽل لاڳاپيل جواب ڏيکاريندو.</p>
        )}
      </motion.div>
    </div>
  );
}
