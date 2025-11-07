'use client'

import { Button } from "@/components/ui/button";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useState } from "react";

export default function AddModalContent() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setLocation({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  };

  const handleSave = () => {
    if (location) {
      console.log('Saved location:', location);
      alert(`Location saved: ${location.lat}, ${location.lng}`);
    } else {
      alert('Please select a location first');
    }
  };

  const apiKye = process.env.GOOGLE_MAPS_API_KEY;
  console.log(apiKye);

  return (
    <APIProvider apiKey={apiKye!}>
      <div className='flex flex-col items-center gap-4'>
        {/* Map */}
        <Map
          style={{ width: '100%', height: '400px', borderRadius: '8px' }}
          defaultCenter={{ lat: 30.0444, lng: 31.2357 }} // Cairo
          defaultZoom={10}
          onClick={() => handleMapClick}
        >
          {location && <Marker position={location} />}
        </Map>

        {/* Save Button */}
        <Button onClick={handleSave} className='mt-4'>
          Save Location
        </Button>
        <p> {process.env.GOOGLE_MAPS_API_KEY} </p>

        {/* Display current coordinates */}
        {location && (
          <p className='text-sm text-gray-500'>
            Selected: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
          </p>
        )}
      </div>
    </APIProvider>
  );
}
