const FALLBACKS = {
  heritage: '/photos/shah-jahan-mosque.jpg',
  craft: '/photos/ajrak-chadar.jpg',
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
