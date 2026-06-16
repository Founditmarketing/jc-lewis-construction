export interface ServiceAreaCity {
  slug: string;
  name: string;
  description: string;
  mapPosition: [number, number];
  isHub?: boolean;
}

export const SERVICE_AREAS: ServiceAreaCity[] = [
  { slug: 'bellmead', name: 'Bellmead', description: 'Our business headquarters — local service with personal attention.', mapPosition: [31.6054, -97.1314], isHub: true },
  { slug: 'waco', name: 'Waco', description: 'Our central dispatch and home base for all Central Texas projects.', mapPosition: [31.5493, -97.1467] },
  { slug: 'temple', name: 'Temple', description: 'Fast response times for all Temple and Bell County projects.', mapPosition: [31.0981, -97.3428] },
  { slug: 'austin', name: 'Austin', description: 'Serving the greater Austin metro area with precision metalwork.', mapPosition: [30.2672, -97.7431] },
  { slug: 'dallas', name: 'Dallas', description: 'DFW and surrounding communities — quality metalwork delivered on time.', mapPosition: [32.7767, -96.7970] },
  { slug: 'fort-worth', name: 'Fort Worth', description: 'Custom metalwork across Fort Worth and Tarrant County.', mapPosition: [32.7555, -97.3308] },
  { slug: 'corsicana', name: 'Corsicana', description: 'Extended service for Corsicana and Navarro County projects.', mapPosition: [32.0956, -96.4689] },
  { slug: 'gatesville', name: 'Gatesville', description: 'Serving the Gatesville area and all of Coryell County.', mapPosition: [31.4357, -97.7436] },
  { slug: 'mcgregor', name: 'McGregor', description: 'Custom metalwork for McGregor and McLennan County residents.', mapPosition: [31.4360, -97.3994] },
  { slug: 'odessa', name: 'Odessa', description: 'West Texas coverage — we travel for the right job.', mapPosition: [31.8457, -102.3676] },
  { slug: 'collin-county', name: 'Collin County', description: 'Serving the Collin County area and surrounding communities.', mapPosition: [33.1972, -96.6397] },
];
