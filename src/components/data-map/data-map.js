import React, { useState } from 'react';
import ReactMapGL, { Source, Layer, NavigationControl } from 'react-map-gl';
import { circleLayer, countLayer } from './layers-setup';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZ2lhbm5vdHIiLCJhIjoiY2s3aHFkcDkwMGMzYjNlbzNvMWl4bGFxbyJ9.2p2O5m7aiA6Bn9vjPe7HrQ';

const DataMap = ({ data, mapStyle, onClick }) => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 45,
    longitude: 10,
    zoom: 4,
  });

  const mapStyleURI = `mapbox://styles/mapbox/${mapStyle}`;

  /*
  const clusterParams = {
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
    clusterProperties: { 'cluster_count': ['+', ['case', ['get', 'confirmed'], 1, 0]] },
  }
  */

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
      mapStyle={mapStyleURI}
      onClick={onClick}
    >
      <Source id="covid-19" type="geojson" data={data}>
        <Layer {...circleLayer} />
        <Layer {...countLayer} />
      </Source>
      <div style={{position: 'absolute', bottom: '45px', right: '20px'}}>
        <NavigationControl />
      </div>
    </ReactMapGL>
  );
}

export default DataMap;
