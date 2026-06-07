import CraftsCard from '../components/CraftsCard';

export default function Crafts({ crafts }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="mb-8 max-w-3xl">
        <h1 className="text-4xl font-bold leading-loose">سنڌي هنر</h1>
        <p className="text-lg leading-loose text-ink/70">
          اجرڪ، سنڌي ٽوپي ۽ ڀرت نه رڳو سينگار آهن، پر مقامي سڃاڻپ، روزگار ۽ تاريخ جو حصو آهن.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {crafts.map((item) => (
          <CraftsCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
