const FALLBACKS = {
  heritage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/PK_Thatta_asv2020-02_img24_Makli_Necropolis.jpg/1200px-PK_Thatta_asv2020-02_img24_Makli_Necropolis.jpg',
  craft: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Ajrak_Chadar.jpg/1200px-Ajrak_Chadar.jpg',
};

export default function SafeImage({ src, alt, type = 'heritage', className = '' }) {
  const fallback = FALLBACKS[type] || FALLBACKS.heritage;

  return (
    <span className={`safe-image-shell ${className}`}>
      <img
        src={src || fallback}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={(event) => {
          event.currentTarget.closest('.safe-image-shell')?.classList.add('is-loaded');
        }}
        onError={(event) => {
          if (event.currentTarget.dataset.fallbackApplied !== 'true') {
            event.currentTarget.dataset.fallbackApplied = 'true';
            event.currentTarget.src = fallback;
          } else {
            event.currentTarget.closest('.safe-image-shell')?.classList.add('is-failed');
          }
        }}
      />
    </span>
  );
}
