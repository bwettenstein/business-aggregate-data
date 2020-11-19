const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const YELP_API = process.env.YELP_API;

const CHICAGO_BIZ_ENDPOINT =
  'https://data.cityofchicago.org/resource/r5kz-chrr.json';
const YELP_ENDPOINT =
  'https://api.yelp.com/v3/businesses/matches?city=chicago&state=il&country=US';

// Business that i'll test on all of these
const mcdonalds = {
  name: 'mcdonalds',
  address: '10 E Chicago Ave',
};

// Need to add search value and search parameter, as function parameters
// Then write a filter statement based off it
const fetchFromChicagoBiz = async () => {
  let businessInfo;
  const fetchBusinessInfo = await fetch(CHICAGO_BIZ_ENDPOINT, {
    method: 'get',
  })
    .then((res) => res.json())
    .catch((err) => console.error('ERR', err));

  if (fetchBusinessInfo) {
    fetchBusinessInfo.forEach((business) => {
      console.log(business);
    });
  }
  //   if (fetchBusinessInfo) {
  //     businessInfo = fetchBusinessInfo.filter();
  //   }
  //   console.log(businessInfo);
};

// Business data includes 'name' and 'address'
const fetchFromYelp = async (businessData) => {
  if (!businessData || businessData == undefined) {
    return 'No business data';
  }
  const fetchBusinessInfo = await fetch(
    `${YELP_ENDPOINT}&name=${businessData.name}&address1=${businessData.address}`,
    {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + YELP_API,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error('ERR', err));

  // Idk what info we want, so ill just leave it raw right now
  if (fetchBusinessInfo) {
    console.log(fetchBusinessInfo);
  }
};

// fetchChicagoBiz();
fetchFromYelp(mcdonalds);
