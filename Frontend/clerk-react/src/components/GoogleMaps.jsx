import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  Marker
} from "@vis.gl/react-google-maps";
// const glyphIcon = "../src/pics/pin.png";

export default function GoogleMaps() {
  const [position, setPosition] = useState(null);
  const [open, setOpen] = useState(false);
  const [mechanics, setMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(12); // Initial zoom level
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (position) {
      fetchNearbyMechanics(position);
    }
  }, [position]);

  const fetchNearbyMechanics = async (position) => {
    if (!position || !position.lat || !position.lng) {
      console.error("Position data is invalid:", position);
      return;
    }

    const { lat, lng } = position;
    const apiUrl = `api/nearbyMechanics?lat=${lat}&lng=${lng}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch nearby mechanics');
      }
      const data = await response.json();
      setMechanics(data.results);
    } catch (error) {
      console.error("Error fetching nearby mechanics:", error);
    }
  };

  const handleZoomChange = (zoom) => {
    // Update the zoom level state
    setZoomLevel(zoom);
  };

  const handleDirectionsClick = () => {
    if (selectedMechanic) {
      const { lat, lng } = selectedMechanic.geometry.location;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`);
    }
  };

  return (
    <div >
        <h1 className="font-sixty4 text-center pb-2">Nearby Mechanics</h1>

    <APIProvider apiKey={apiKey}>
      <div role='none'  style={{ height: "400px", width: "100%" }}>
        <Map zoom={zoomLevel} center={position} mapId={"e07bd16b9a612dab"} onZoomChange={handleZoomChange}>
          {mechanics.map((mechanic, index) => (
            
            <Marker
            key={index}
            position={{
              lat: mechanic.geometry.location.lat,
              lng: mechanic.geometry.location.lng,
            }}
            onClick={() => {
              setSelectedMechanic(mechanic);
              setOpen(true);

            
            }}
          >
            
            
          </Marker>
          ))}
          {selectedMechanic && open && (
            <InfoWindow position={{
              lat: selectedMechanic.geometry.location.lat,
              lng: selectedMechanic.geometry.location.lng
            }} onCloseClick={() => setOpen(false)}>
              <div>
                <div>{selectedMechanic.name}</div>
                <button role='none'  onClick={handleDirectionsClick}>Get Directions</button>
              </div>
            </InfoWindow>
            
          )}
        </Map>
      </div>
    </APIProvider>
    </div>
  );
}
