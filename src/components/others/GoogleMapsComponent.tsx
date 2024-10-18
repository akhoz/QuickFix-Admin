import {
  APIProvider,
  Map,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";

interface GoogleMapComponentProps {
  position: { lat: number; lng: number };
  setPosition: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
}

function GoogleMapsComponent({ position, setPosition }: GoogleMapComponentProps) {

  const handleMarkerDrag = (event: any) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    console.log(position);
    setPosition(newPosition);
  }

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div className="h-full w-full rounded-xl overflow-hidden">
        <Map defaultZoom={15}
          defaultCenter={position}
          mapId={import.meta.env.VITE_MAP_ID}>
          <AdvancedMarker
            position={position}
            draggable={true}
            onDrag={handleMarkerDrag}
          >
            <img
              src="/images/workshop-icon.png"
              className="w-12 h-12"
            />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}

export default GoogleMapsComponent;
