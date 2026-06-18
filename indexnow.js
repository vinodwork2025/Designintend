// Run after every deploy: node --use-system-ca indexnow.js
// Pings IndexNow (Bing, Yandex) with all site URLs.

const https = require('https');

const KEY = '4d700ae101913e8bf9f04a4fdf030a8c4b0eac669b0e37223c1025c805d0bdcf';
const HOST = 'designintend.com';

const URLS = [
  'https://designintend.com/',
  'https://designintend.com/about',
  'https://designintend.com/projects',
  'https://designintend.com/build-your-home-hosur',
  'https://designintend.com/authors/ar-chittrarasan',
  // Architecture Services
  'https://designintend.com/architects-hosur',
  'https://designintend.com/residential-architects-hosur',
  'https://designintend.com/design-build-hosur',
  'https://designintend.com/modern-house-architects-hosur',
  // Construction Services
  'https://designintend.com/construction-company-hosur',
  'https://designintend.com/best-construction-company-in-hosur',
  'https://designintend.com/house-construction-hosur',
  'https://designintend.com/villa-construction-hosur',
  'https://designintend.com/villa-builders-hosur',
  'https://designintend.com/luxury-home-builders-hosur',
  'https://designintend.com/turnkey-construction-hosur',
  'https://designintend.com/building-contractors-hosur',
  'https://designintend.com/home-renovation-hosur',
  'https://designintend.com/house-construction-attibele',
  'https://designintend.com/house-construction-bagalur',
  'https://designintend.com/house-construction-denkanikottai',
  'https://designintend.com/house-construction-sarjapura',
  // Interior Design Services
  'https://designintend.com/interior-designers-hosur',
  'https://designintend.com/interior-designers-bagalur',
  'https://designintend.com/interior-designers-denkanikottai',
  'https://designintend.com/interior-designers-sarjapura',
  'https://designintend.com/home-interiors-hosur',
  'https://designintend.com/modular-kitchen-hosur',
  'https://designintend.com/2bhk-interior-design-hosur',
  'https://designintend.com/3bhk-interior-design-hosur',
  // Cost Guides
  'https://designintend.com/construction-cost-hosur',
  'https://designintend.com/house-construction-cost-hosur',
  'https://designintend.com/interior-design-cost-hosur',
  // Project Pages
  'https://designintend.com/projects/kishore-farmhouse-perithalmanna-kerala',
  'https://designintend.com/projects/jamna-auto-industries-hosur',
  'https://designintend.com/projects/vinutha-residence-bengaluru',
  'https://designintend.com/projects/ambrish-residence-hosur',
];

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: URLS,
});

const options = {
  hostname: 'api.indexnow.org',
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
  },
};

const req = https.request(options, (res) => {
  console.log(`IndexNow response: ${res.statusCode}`);
  if (res.statusCode === 200) {
    console.log(`OK — ${URLS.length} URLs submitted`);
  } else if (res.statusCode === 202) {
    console.log(`Accepted — URLs queued for processing`);
  } else {
    console.log(`Unexpected status: ${res.statusCode}`);
    res.on('data', (d) => process.stdout.write(d));
  }
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(payload);
req.end();
