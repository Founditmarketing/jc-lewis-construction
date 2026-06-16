const SPECIALIZATIONS = [
  'Barndominium Construction',
  'Metal Patios',
  'Steel Erection',
  'Carport Installation',
  'Welding Services',
];

export default function SpecializationsBanner() {
  return (
    <div className="bg-[#1e2820] py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="text-[11px] font-black tracking-[0.25em] uppercase text-white/40 mb-4">
          Other Specializations
        </p>
        <div className="flex flex-wrap gap-x-1 gap-y-2 items-center">
          {SPECIALIZATIONS.map((item, i) => (
            <span key={item} className="text-white/70 font-semibold text-sm tracking-wide">
              {item}{i < SPECIALIZATIONS.length - 1 && <span className="text-white/30 mx-3">•</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
