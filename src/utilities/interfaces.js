const countryBorders = require('./countries-mock.geo.json');
// When not in mantainance
//const countryBorders = require('./countries.geo.json');

const notEmpty = dataset => !!dataset ? Object.keys(dataset).length > 0 : false;

export const intfcGeoPointsCondensed = dataset => {
  let geoData = {
    type: 'FeatureCollection',
    features: [],
  }

  if(notEmpty(dataset)) {
    let _geodataFeatures = [];
    for(const point of dataset){
      const {
        confirmed,
        recovered,
        deaths,
        latlng,
      } = point;

      const [ lat, lng ] = latlng;

      _geodataFeatures.push({
        type: 'Feature',
        properties: {
          confirmed: Number(confirmed),
          recovered: Number(recovered),
          deaths: Number(deaths),
        },
        geometry: {
          type: 'Point',
          coordinates: [Number(lng), Number(lat)],
        }
      });
    }

    geoData.features = _geodataFeatures;
  }
  return geoData;
}

export const intfcGeoPointsSurvey = dataset => {
  let geoData = {
    type: 'FeatureCollection',
    features: [],
  }

  if(notEmpty(dataset)) {
    let _geodataFeatures = [];
    for(const point of dataset){
      const {
        infectionPropability,
        latlng,
      } = point;

      //console.log(point.id, infectionPropability);

      const [lat, lng] = latlng;

      _geodataFeatures.push({
        type: 'Feature',
        properties: {
          probability: Number(infectionPropability),
        },
        geometry: {
          type: 'Point',
          coordinates: [Number(lng), Number(lat)],
        }
      });
    }

    geoData.features = _geodataFeatures;
  }
  return geoData;
}

export const intfcGeoAreasCountries = dataset => {
  let geoData = {
    type: 'FeatureCollection',
    features: [],
  }

  if(notEmpty(dataset)) {
    let _geodataFeatures = [];
    for(const point of dataset){
      const {
        province,
        country,
        confirmed,
        deaths,
      } = point;

      const areaBorder = Object.values(countryBorders.features).filter(feat => (
        feat.properties['ADMIN'] === country || feat.properties['ADMIN'] === province
      ));

      if(areaBorder.length === 1) {
        _geodataFeatures.push({
          type: 'Feature',
          properties: {
            confirmed: Number(confirmed),
            deaths: Number(deaths),
          },
          geometry: areaBorder[0].geometry,
        });
      }
    }

    geoData.features = _geodataFeatures;
  }
  return geoData;
}
