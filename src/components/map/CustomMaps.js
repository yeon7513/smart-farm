import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import React from 'react';

function CustomMaps({ lat = 36.3287, lng = 127.4229 }) {
  const position = { lat: Number(lat), lng: Number(lng) };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
      <Map defaultCenter={position} defaultZoom={10} mapId="DEMO_MAP_ID">
        <AdvancedMarker position={position} />
      </Map>
    </APIProvider>
  );
}

export default CustomMaps;
