import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CheckCircle2, MapPin } from 'lucide-react';
import { SERVICE_AREAS } from '../data/serviceAreas';
import PageSEO from '../components/PageSEO';

const createIcon = (isHub: boolean) => L.divIcon({
  className: 'bg-transparent',
  html: `<div style="width: ${isHub ? '28px' : '20px'}; height: ${isHub ? '28px' : '20px'}; background-color: #697566; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
  iconSize: [isHub ? 28 : 20, isHub ? 28 : 20],
  iconAnchor: [isHub ? 14 : 10, isHub ? 14 : 10],
  popupAnchor: [0, isHub ? -14 : -10]
});

const CITIES = SERVICE_AREAS.map((area) => ({
  id: area.name,
  slug: area.slug,
  position: area.mapPosition,
  isHub: area.isHub,
  desc: area.description,
}));

export default function ServiceAreaPage() {
  const centerPosition: [number, number] = [31.5493, -97.8000];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 pb-0">
      <PageSEO
        title="Service Areas | J & C Lewis Construction Group"
        description="J & C Lewis Construction Group serves Bellmead, Waco, Temple, Austin, Dallas, Fort Worth, Corsicana & communities across Texas with custom metalwork."
        path="/service-areas"
      />
      {/* Dark hero banner */}
      <div className="bg-slate-950 pt-48 md:pt-56 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/jclewis-hero1.png')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-6"
          >
            Our Service <span className="text-primary gap-2">Area</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Based in Bellmead, TX — proudly serving communities across Texas with custom metalwork and construction.
          </motion.p>
        </div>
      </div>

      <section className="pt-12 md:pt-16 pb-24 relative overflow-hidden z-10 bg-slate-50 border-b border-slate-200">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-center">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-0"
            >
              <h2 className="text-3xl font-black text-slate-900 uppercase mb-6 flex items-center gap-3">
                <MapPin className="text-primary" size={36} />
                Statewide Coverage
              </h2>
              <div className="prose prose-lg text-slate-600 space-y-6">
                <p>
                  As a Bellmead-based contractor with over 35 years of combined experience, J & C Lewis Construction Group serves clients across Texas. Our commitment to quality craftsmanship and local accountability means you get a trusted partner — whether you're in Waco, Austin, Dallas, or beyond.
                </p>
                <p>
                  We specialize in custom metal fences, gates, and ornamental ironwork for residential and commercial properties. Every project is managed from conception through completion, ensuring your vision becomes a durable, functional, and visually striking reality.
                </p>
                <p className="font-semibold text-slate-900">
                  Don't see your city listed? Give us a call — we travel for the right project and serve communities throughout the state of Texas.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 relative"
            >
              <h3 className="text-2xl font-black text-slate-900 uppercase mb-8 border-b border-slate-100 pb-4">
                Cities We Serve
              </h3>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                {CITIES.map((city) => (
                  <li key={city.id} className="flex items-center gap-3 group">
                    <CheckCircle2 className="text-primary shrink-0" size={24} />
                    <Link
                      to={`/service-areas/${city.slug}`}
                      className="text-slate-800 font-bold text-lg hover:text-primary transition-colors group-hover:translate-x-1 transition-transform inline-flex items-center"
                    >
                      {city.id}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-10 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                <p className="text-slate-900 mb-2 font-bold text-lg">Don't see your city?</p>
                <p className="text-sm text-slate-500 font-medium">We serve all of Texas. Contact us to discuss your project — we're happy to travel for larger installations.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map */}
      <div className="w-full h-[50vh] md:h-[65vh] shadow-inner relative z-20">
        <MapContainer
          center={centerPosition}
          zoom={6}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
          style={{ background: '#f8fafc' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {CITIES.map((city) => (
            <Marker
              key={city.id}
              position={city.position}
              icon={createIcon(!!city.isHub)}
            >
              <Popup className="custom-popup">
                <div className="font-bold text-slate-900 text-sm mb-1">{city.id}{city.isHub ? ' — HQ' : ''}</div>
                <div className="text-slate-600 text-xs">{city.desc}</div>
              </Popup>
            </Marker>
          ))}

          <Circle
            center={[31.5493, -97.1467]}
            radius={80000}
            pathOptions={{ fillColor: '#697566', fillOpacity: 0.1, color: '#697566', weight: 2, dashArray: '5, 5' }}
          />
        </MapContainer>
      </div>

    </main>
  );
}
