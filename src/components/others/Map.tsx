import React, { useCallback, useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "15px", // Esquinas redondeadas
  overflow: "hidden", // Para asegurarse de que el contenido dentro del mapa también esté redondeado
};

const center = {
  lat: 10.361090,
  lng: -84.509411,
};

const MapComponent = () => {
  const [markers, setMarkers] = useState([
    { lat: 10.358570, lng: -84.511230, nombre: "Taller 1" },
    { lat: 37.7849, lng: -122.4294, nombre: "Taller 2" },
  ]);

  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      // Asegurarse de agregar los marcadores iniciales al mapa después de que esté cargado
      markers.forEach((marker) => {
        addAdvancedMarker(marker);
      });
    }
  }, [isLoaded, markers]); // Asegúrate de que markers esté en las dependencias para que se re-renderice cuando cambie

  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    const newMarker = {
      lat: event.latLng!.lat(),
      lng: event.latLng!.lng(),
      nombre: "Nuevo Taller",
    };

    // Agregar el nuevo marcador al estado
    setMarkers((current) => [...current, newMarker]);

    // Añadir el nuevo marcador al mapa con AdvancedMarkerElement
    if (mapRef.current) {
      addAdvancedMarker(newMarker);
    }
  }, []);

  // Función para agregar un AdvancedMarkerElement con icono personalizado
  const addAdvancedMarker = (markerData: { lat: number; lng: number; nombre: string }) => {
    const iconHTML = `
      <div style="width: 40px; height: 40px; border-radius: 50%; background-color: #4285F4; display: flex; align-items: center; justify-content: center;">
        <img src="https://img.icons8.com/color/48/000000/car.png" style="width: 24px; height: 24px;" alt="Taller Icon"/>
      </div>
    `;

    const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
      position: new google.maps.LatLng(markerData.lat, markerData.lng),
      map: mapRef.current!, // Aquí asegúrate de que el mapa esté asignado
      title: markerData.nombre,
      content: document.createRange().createContextualFragment(iconHTML), // Agrega el ícono personalizado
    });

    advancedMarker.addListener("click", () => {
      alert(`Haz clic en: ${markerData.nombre}`);
    });
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onClick={onMapClick}
      onLoad={onLoad} // Asegúrate de cargar el mapa correctamente antes de agregar marcadores
    >
      {/* Los marcadores se manejarán con AdvancedMarkerElement */}
    </GoogleMap>
  ) : (
    <div>Cargando mapa...</div>
  );
};

export default React.memo(MapComponent);
