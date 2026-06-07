import AskAI from '../components/AskAI';

export default function Ask() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <h1 className="text-4xl font-bold leading-loose">سوال پڇو</h1>
        <p className="text-lg leading-loose text-ink/70">
          سنڌي ۾ سوال پڇو ۽ پورٽل توهان کي ورثي، هنر يا ماحول بابت لاڳاپيل جواب ڏيندو.
        </p>
      </div>
      <AskAI />
    </section>
  );
}
