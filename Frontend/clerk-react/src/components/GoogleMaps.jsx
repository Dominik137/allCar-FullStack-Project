import React, { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

export default function GoogleMaps() {
  const position = { lat: 53.54, lng: 10 };
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={'AIzaSyB8gf5rwSP9baKzk3It5-XvySbV5_Pzh9c'}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map
          zoom={9}
          center={position}
          mapId={'e07bd16b9a612dab'}
        >
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"grey"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </AdvancedMarker>

          {open && (
            <InfoWindow
              position={position}
              onCloseClick={() => setOpen(false)}
            >
              <p>I'm in Hamburg</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}