import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';

const createIcon = (isHub: boolean, isSelected: boolean) => L.divIcon({
  className: 'bg-transparent',
  html: `<div style="width:${isHub ? '22px' : isSelected ? '16px' : '12px'};height:${isHub ? '22px' : isSelected ? '16px' : '12px'};background:${isSelected ? '#4d574b' : '#697566'};border-radius:50%;border:${isSelected ? '3px' : '2px'} solid white;box-shadow:0 0 ${isSelected ? '14px' : '8px'} rgba(${isSelected ? '73,87,75' : '0,0,0'},${isSelected ? '0.6' : '0.3'})"></div>`,
  iconSize: [isHub ? 22 : isSelected ? 16 : 12, isHub ? 22 : isSelected ? 16 : 12],
  iconAnchor: [isHub ? 11 : isSelected ? 8 : 6, isHub ? 11 : isSelected ? 8 : 6],
  popupAnchor: [0, -12],
});

const CITIES = [
  { id: 'Waco', position: [31.5493, -97.1467] as [number, number], isHub: true, desc: 'Our home base and central dispatch.', zoom: 12 },
  { id: 'Bellmead', position: [31.6054, -97.1314] as [number, number], desc: 'Our business headquarters — local service, personal attention.', zoom: 13 },
  { id: 'Austin', position: [30.2672, -97.7431] as [number, number], desc: 'Serving the greater Austin metro area.', zoom: 10 },
  { id: 'Collin', position: [33.1972, -96.6397] as [number, number], desc: 'Serving the Collin County area and surrounding communities.', zoom: 11 },
  { id: 'Corsicana', position: [32.0956, -96.4689] as [number, number], desc: 'Extended service for Corsicana projects.', zoom: 11 },
  { id: 'Dallas', position: [32.7767, -96.7970] as [number, number], desc: 'DFW and surrounding communities.', zoom: 10 },
  { id: 'Fort Worth', position: [32.7555, -97.3308] as [number, number], desc: 'Custom metalwork across Fort Worth.', zoom: 10 },
  { id: 'Gatesville', position: [31.4357, -97.7436] as [number, number], desc: 'Serving the Gatesville area and surroundings.', zoom: 11 },
  { id: 'McGregor', position: [31.4360, -97.3994] as [number, number], desc: 'Custom metalwork for McGregor residents.', zoom: 12 },
  { id: 'Odessa', position: [31.8457, -102.3676] as [number, number], desc: 'West Texas coverage — we travel for the right job.', zoom: 11 },
  { id: 'Temple', position: [31.0981, -97.3428] as [number, number], desc: 'Fast response times for all Temple projects.', zoom: 11 },
];

function MapController({ city }: { city: typeof CITIES[0] | null }) {
  const map = useMap();
  useEffect(() => {
    if (city) {
      map.flyTo(city.position, city.zoom, { duration: 1.5 });
    }
  }, [city, map]);
  return null;
}

export default function InteractiveMapSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const center: [number, number] = [31.5493, -97.2000];

  return (
    <section className="bg-white pt-20 pb-24 md:pb-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Eyebrow & Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 md:mb-20"
        >
          <p className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-5">Service Area</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none uppercase">
              All of <span className="text-primary">Texas</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium max-w-sm leading-relaxed">
              Based in Bellmead / Waco, TX — we serve 11 communities across Texas from Odessa to Dallas and beyond.
            </p>
          </div>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

          {/* Left Column: Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full h-[400px] sm:h-[450px] lg:h-auto rounded-3xl overflow-hidden border border-slate-200 shadow-xl relative z-10 min-h-[400px]"
          >
            <MapContainer center={center} zoom={7} scrollWheelZoom={false} className="w-full h-full">
              <MapController city={selectedIndex !== null ? CITIES[selectedIndex] : null} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              {CITIES.map((city, index) => (
                <Marker
                  key={city.id}
                  position={city.position}
                  icon={createIcon(!!city.isHub, selectedIndex === index)}
                >
                  <Popup>
                    <div className="font-bold text-slate-900 text-sm mb-1">{city.id}{city.isHub ? ' — HQ' : ''}</div>
                    <div className="text-slate-500 text-xs mb-2">{city.desc}</div>
                    <Link
                      to="/contact"
                      className="text-primary hover:underline font-bold text-xs inline-flex items-center gap-1"
                    >
                      Get a Free Estimate &rarr;
                    </Link>
                  </Popup>
                </Marker>
              ))}
              <Circle
                center={center}
                radius={80000}
                pathOptions={{ fillColor: '#697566', fillOpacity: 0.07, color: '#697566', weight: 1.5, dashArray: '6, 4' }}
              />
            </MapContainer>
          </motion.div>

          {/* Right Column: Directory */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-black text-slate-900 uppercase mb-4 tracking-tight">
              We Serve All of Texas
            </h3>
            <p className="text-slate-500 text-lg font-medium mb-8 leading-relaxed">
              Click a city to see it on the map, or visit the contact page to start your project.
            </p>

            <div className="grid grid-cols-3 gap-2">
              {CITIES.map((city, index) => (
                <button
                  key={city.id}
                  onClick={() => setSelectedIndex(index === selectedIndex ? null : index)}
                  className={`px-3 py-3 text-xs font-bold tracking-wide border transition-all duration-200 text-center flex items-center justify-center hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${
                    selectedIndex === index
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-[1.03]'
                      : city.isHub
                        ? 'bg-primary/10 text-primary border-primary/30 hover:bg-primary hover:text-white hover:border-primary'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-primary hover:text-primary hover:bg-white'
                  }`}
                >
                  {city.id}{city.isHub ? ' ★' : ''}
                </button>
              ))}
            </div>

            {selectedIndex !== null && (
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 bg-primary/5 border border-primary/20 p-5 rounded-2xl"
              >
                <p className="text-slate-900 font-bold mb-1">{CITIES[selectedIndex].id}{CITIES[selectedIndex].isHub ? ' — Headquarters' : ''}</p>
                <p className="text-sm text-slate-500 mb-3">{CITIES[selectedIndex].desc}</p>
                <Link
                  to="/contact"
                  className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1"
                >
                  Get a Free Estimate →
                </Link>
              </motion.div>
            )}

            {selectedIndex === null && (
              <div className="mt-5 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <p className="text-slate-900 mb-1 font-bold">Open 24 Hours, 7 Days a Week</p>
                <p className="text-sm text-slate-500 font-medium">Select any city above to zoom the map, or <Link to="/contact" className="text-primary hover:underline font-semibold">contact us</Link> to start your project — we travel for the right job.</p>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
