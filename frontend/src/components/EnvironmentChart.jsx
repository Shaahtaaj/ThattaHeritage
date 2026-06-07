import Chart from 'react-apexcharts';

export default function EnvironmentChart({ data }) {
  const ordered = [...data].reverse();
  const labels = ordered.map((item) =>
    new Intl.DateTimeFormat('sd-PK', { month: 'short', day: 'numeric' }).format(new Date(item.timestamp)),
  );

  const options = {
    chart: {
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
      animations: { enabled: true, easing: 'easeinout', speed: 850 },
    },
    stroke: { curve: 'smooth', width: [3, 3, 3] },
    colors: ['#c95b45', '#1d9aa2', '#1f3d68'],
    xaxis: {
      categories: labels,
      labels: { style: { colors: '#46525c' } },
    },
    yaxis: {
      labels: { style: { colors: '#46525c' } },
    },
    grid: { borderColor: 'rgba(24,34,42,0.1)' },
    legend: { position: 'top', horizontalAlign: 'left' },
    tooltip: { shared: true },
  };

  const hasLakeData = ordered.some((item) => item.lake_level !== null && item.lake_level !== undefined);
  const series = [
    { name: 'گرمي پد °C', data: ordered.map((item) => item.temperature) },
    { name: 'برسات mm', data: ordered.map((item) => item.rainfall) },
    ...(hasLakeData ? [{ name: 'ڍنڍ سطح m', data: ordered.map((item) => item.lake_level) }] : []),
  ];

  return (
    <div className="rounded-lg bg-white/85 p-4 shadow-heritage ring-1 ring-ink/5">
      <Chart options={options} series={series} type="line" height={360} />
      {!hasLakeData && (
        <p className="px-3 pb-2 text-sm leading-loose text-ink/60">
          ڍنڍ جي سطح لاءِ تصديق ٿيل عوامي فيڊ ترتيب نه ڏنل آهي؛ گراف ۾ في الحال گرمي پد ۽ برسات ڏيکاريل آهن.
        </p>
      )}
    </div>
  );
}
