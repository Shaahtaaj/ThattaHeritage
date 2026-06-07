import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

const pulseIcon = L.divIcon({
  className: '',
  html: renderToStaticMarkup(<div className="pin-pulse" />),
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

export default function MapView({ heritage }) {
  const mappedHeritage = heritage.filter((item) => Number.isFinite(item.map_lat) && Number.isFinite(item.map_lng));
  const center = mappedHeritage?.[0] ? [mappedHeritage[0].map_lat, mappedHeritage[0].map_lng] : [24.7475, 67.9237];

  return (
    <MapContainer center={center} zoom={10} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mappedHeritage.map((item) => (
        <Marker key={item.id} position={[item.map_lat, item.map_lng]} icon={pulseIcon}>
          <Popup className="sindhi-map-popup">
            <div
              dir="rtl"
              className="font-sindhi"
              style={{
                fontFamily: "'MB Sarem Iqra', 'Noto Nastaliq Urdu', serif",
                textAlign: 'right',
                direction: 'rtl',
              }}
            >
              <strong>{item.name_sindhi}</strong>
              <p>{item.description_sindhi}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
