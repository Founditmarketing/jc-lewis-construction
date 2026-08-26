export const BUSINESS = {
  name: 'J & C Lewis Construction Group',
  url: 'https://www.jandclewisconstruction.com',
  telephone: '+1-254-332-1303',
  email: 'john.jandclewis@gmail.com',
  logo: 'https://www.jandclewisconstruction.com/jclewis-logo.png',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bellmead',
    addressRegion: 'TX',
    postalCode: '76705',
    addressCountry: 'US',
  },
  sameAs: [
    'https://www.facebook.com/profile.php?id=61576222776400',
    'https://www.google.com/maps/place/J+%26+C+Lewis+Construction+Group/@31.6227618,-97.1161271,17z/data=!4m6!3m5!1s0x864f9d5447423393:0x20a1ba27efd4cd18!8m2!3d31.6322485!4d-97.1052066!16s%2Fg%2F11xfvmgwwb',
    'https://www.yelp.com/biz/j-and-c-lewis-construction-group-waco',
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
};
