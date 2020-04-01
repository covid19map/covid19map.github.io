import React, { useState } from 'react';
import ReactMapGL, { Source, Layer, NavigationControl } from 'react-map-gl';
import {
  confirmedLayer,
  recoveredLayer,
  deathsLayer,
  countLayer,
  areasLayer,
  surveyLayerClustered,
  surveyLayerUnclustered,
  surveyLayerCount,
} from './layers-setup';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2lhbm5vdHIiLCJhIjoiY2s3aHFkcDkwMGMzYjNlbzNvMWl4bGFxbyJ9.2p2O5m7aiA6Bn9vjPe7HrQ';

const DataMap = props => {
  const {
    container,
    pointsCondensed,
    pointsSurvey,
    areasCountries,
    mapStyle,
    onClick,
    live,
  } = props;

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 45,
    longitude: 10,
    zoom: 4,
  });

  // TODO: add layer for immunized cluster
  return (
    <ReactMapGL
      {...viewport}
      container={container}
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle={`mapbox://styles/mapbox/${mapStyle}`}
      onClick={onClick}
    >
      {/* Add a prop to hide this level conditionally */}
      {true && <Source id="points-condensed" type="geojson" data={pointsCondensed}>
        <Layer {...confirmedLayer} />
        <Layer {...deathsLayer} />
        <Layer {...recoveredLayer} />
        <Layer {...countLayer} />
      </Source>}
      <Source id="areas-countries" type="geojson" data={areasCountries}>
        <Layer {...areasLayer} />
      </Source>
      {/*Show this level only when data is live*/}
      {live && <Source id="points-survey" type="geojson" data={pointsSurvey} cluster={true}>
        <Layer {...surveyLayerClustered} />
        <Layer {...surveyLayerUnclustered} />
        <Layer {...surveyLayerCount} />
      </Source>}
      <div style={{position: 'absolute', bottom: '45px', right: '20px'}}>
        <NavigationControl />
      </div>
    </ReactMapGL>
  );
}

export default DataMap;
