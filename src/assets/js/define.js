const define = {
  IMG_BASE_URL: 'https://s3-ap-northeast-1.amazonaws.com/sabian-symbols/',
  PLANET_ICON_DIR: '/img/planet/',
  SIGN_LIST: [
    {key: "Aries"},
    {key: "Taurus"},
    {key: "Gemini"},
    {key: "Cancer"},
    {key: "Leo"},
    {key: "Virgo"},
    {key: "Libra"},
    {key: "Scorpio"},
    {key: "Sagittarius"},
    {key: "Capricorn"},
    {key: "Aquarius"},
    {key: "Pisces"},
  ],
  cookie:{
    orb_midpoint: 1.5,
    orb_harmonics: 5,
  },
  year_milisecond: 365.2425 * 24 * 60 * 60 * 1000,
}
module.exports = define