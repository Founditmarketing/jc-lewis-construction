import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CheckCircle2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const createIcon = (isCurrent: boolean) => L.divIcon({
  className: 'bg-transparent',
  html: `<div style="width: ${isCurrent ? '28px' : '20px'}; height: ${isCurrent ? '28px' : '20px'}; background-color: ${isCurrent ? '#b31b1b' : '#1d4e89'}; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);"></div>`,
  iconSize: [isCurrent ? 28 : 20, isCurrent ? 28 : 20],
  iconAnchor: [isCurrent ? 14 : 10, isCurrent ? 14 : 10],
  popupAnchor: [0, isCurrent ? -14 : -10]
});

const CITIES = [
  { id: 'High Point', position: [35.9557, -80.0053] as [number, number], isHub: true, desc: "Our HQ and central dispatch." },
  { id: 'Winston-Salem', position: [36.0999, -80.2442] as [number, number], desc: "Fast response times for all WS projects." },
  { id: 'Greensboro', position: [36.0726, -79.7920] as [number, number], desc: "Serving the entire GSO metro area." },
  { id: 'Kernersville', position: [36.1199, -80.0736] as [number, number], desc: "Heart of the Triad, immediate service." },
  { id: 'Thomasville', position: [35.8826, -80.0820] as [number, number], desc: "Quick deployment for Davidson County." },
  { id: 'Clemmons', position: [36.0232, -80.3820] as [number, number], desc: "Premium concrete services in Clemmons." },
  { id: 'Bermuda Run', position: [35.9962, -80.4284] as [number, number], desc: "Dedicated crews for Bermuda Run residents." },
  { id: 'Lewisville', position: [36.0965, -80.4192] as [number, number], desc: "Reliable concrete solutions for Lewisville." },
  { id: 'Mocksville', position: [35.8943, -80.5615] as [number, number], desc: "Full-scale project coverage in Mocksville." }
];

export default function LewisvillePage() {
  const cityCenter: [number, number] = [36.0965, -80.4192];
  const hqCenter: [number, number] = [35.9557, -80.0053];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Premium Concrete Services in Lewisville, NC | Page Concrete and Outdoor Services';
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 pb-0">
      {/* Dark hero banner */}
      <div className="bg-slate-950 pt-48 md:pt-56 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pageconcretepic12.jpg')] bg-cover bg-center opacity-20 MixBlendMode-overlay"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm block mb-3">Service Areas</span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-6"
          >
            Concrete Contractor in <span className="text-primary">Lewisville, NC</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Delivering high-quality residential driveways, stamped concrete patios, and commercial concrete services in Lewisville.
          </motion.p>
        </div>
      </div>

      <section className="pt-12 md:pt-16 pb-24 relative overflow-hidden z-10 bg-slate-50 border-b border-slate-200">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-start">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-black text-slate-900 uppercase mb-6 flex items-center gap-3">
                <MapPin className="text-[#1d4e89]" size={36} />
                Lewisville Concrete Craftsmanship
              </h2>
              <div className="prose prose-lg text-slate-600 space-y-6">
                <p>
                  Lewisville, NC is a charming, family-friendly town in western Forsyth County. Page Concrete and Outdoor Services is proud to serve the local community with premium flatwork and decorative designs that fit the town’s historic and peaceful atmosphere.
                </p>
                <p>
                  Our concrete projects are built in prominent residential areas like Sequoia Place, Great Oaks, and along Conrad Road. Whether you are seeking a stamped slate walkway near Shallowford Square or Jack Warren Park, or need to replace a cracked residential driveway off Shallowford Road, Williams Road, or US-421, our team brings 30 years of experience. We ensure proper site grading, base packing, and clean finishes on every project.
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Our Core Concrete Services in Lewisville</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#1d4e89] shrink-0 mt-1" size={20} />
                    <span><strong>Residential Driveways:</strong> Highly reinforced driveway replacements designed to prevent shifting and handle regular vehicle loads.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#1d4e89] shrink-0 mt-1" size={20} />
                    <span><strong>Stamped & Decorative Concrete:</strong> Custom pool decks, patios, and walks styled to look like natural brick, slate, or stone.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#1d4e89] shrink-0 mt-1" size={20} />
                    <span><strong>Commercial flatwork:</strong> ADA ramps, dumpster pads, and walkways constructed to match town ordinances and building codes.</span>
                  </li>
                </ul>

              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 lg:sticky lg:top-32"
            >
              <h3 className="text-2xl font-black text-slate-900 uppercase mb-8 border-b border-slate-100 pb-4">
                Other Primary Areas Served
              </h3>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mb-8">
                {CITIES.map((city) => (
                  <li key={city.id} className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#1d4e89] shrink-0" size={20} />
                    <Link 
                      to={city.id === 'High Point' ? '/service-areas/high-point' : `/service-areas/${city.id.toLowerCase().replace(' ', '-')}`}
                      className={`font-bold text-base transition-colors ${city.id === 'Lewisville' ? 'text-primary' : 'text-slate-800 hover:text-primary'}`}
                    >
                      {city.id}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="text-slate-900 mb-2 font-bold text-lg">Looking for a Local Quote?</h4>
                <p className="text-sm text-slate-500 font-medium mb-4">We provide detailed, free site inspections and written estimates for residential and commercial concrete projects in Lewisville.</p>
                <Link 
                  to="/contact" 
                  className="inline-block w-full bg-primary hover:bg-[#0d47a1] text-white font-bold py-3 rounded-xl transition-colors text-center"
                >
                  Schedule Your Inspection
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <div className="w-full h-[50vh] md:h-[65vh] shadow-inner relative z-20">
        <MapContainer 
          center={cityCenter} 
          zoom={12} 
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
              icon={createIcon(city.id === 'Lewisville')}
            >
              <Popup>
                <div className="font-bold text-slate-900 text-sm mb-1">{city.id}{city.id === 'Lewisville' ? ' (You Are Here)' : ''}</div>
                <div className="text-slate-600 text-xs">{city.desc}</div>
              </Popup>
            </Marker>
          ))}

          <Circle 
            center={hqCenter}
            radius={48280.3}
            pathOptions={{ fillColor: '#1d4e89', fillOpacity: 0.05, color: '#1d4e89', weight: 2, dashArray: '5, 5' }}
          />
        </MapContainer>
      </div>
    </main>
  );
}
