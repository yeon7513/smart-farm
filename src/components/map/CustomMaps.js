import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import React from 'react';

function CustomMaps({ geoCode }) {
  const position = geoCode[0];

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
      <Map
        defaultCenter={position}
        defaultZoom={8}
        mapId="DEMO_MAP_ID"
        disableDefaultUI={true}
        style={{ visibility: 'off' }}
      >
        {geoCode.map((code, idx) => (
          <AdvancedMarker
            key={idx}
            position={{
              lat: Number(code.lat),
              lng: Number(code.lng),
            }}
          />
        ))}
      </Map>
    </APIProvider>
  );
}

export default CustomMaps;
