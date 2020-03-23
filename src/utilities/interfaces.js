export const interfaceOutGeoJSON = (dataset) => {
  let geoData = {
    type: 'FeatureCollection',
    features: [],
  }
  if(dataset) {
    let geodataFeatures = [];
    for(const point of dataset){
      const {
        province,
        country,
        confirmed,
        recovered,
        deaths,
        latlng,
      } = point;
      const [ lat, lng ] = latlng;
      geodataFeatures.push({
        type: 'Feature',
        properties: {
          province,
          country,
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
    geoData.features = geodataFeatures;
  }
  return geoData;
}
