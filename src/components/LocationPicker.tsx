import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface LocationPickerProps {
  onLocationSelect: (location: string, coords: [number, number]) => void;
  initialLocation?: string;
}

const LocationPicker = ({ onLocationSelect, initialLocation }: LocationPickerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [location, setLocation] = useState(initialLocation || '');
  const [apiKey, setApiKey] = useState(localStorage.getItem('mapbox_token') || '');
  const [showKeyInput, setShowKeyInput] = useState(!apiKey);

  const saveApiKey = () => {
    localStorage.setItem('mapbox_token', apiKey);
    setShowKeyInput(false);
  };

  useEffect(() => {
    if (!mapContainer.current || !apiKey) return;

    mapboxgl.accessToken = apiKey;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      
      if (marker.current) {
        marker.current.setLngLat([lng, lat]);
      } else {
        marker.current = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(map.current!);
      }

      // Reverse geocode to get address
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${apiKey}`)
        .then(res => res.json())
        .then(data => {
          const address = data.features[0]?.place_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          setLocation(address);
          onLocationSelect(address, [lng, lat]);
        });
    });

    return () => {
      map.current?.remove();
    };
  }, [apiKey, onLocationSelect]);

  if (showKeyInput) {
    return (
      <div className="p-4 border rounded-lg space-y-4">
        <p className="text-sm text-muted-foreground">
          Enter your Mapbox public token to enable the map. Get one at{' '}
          <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            mapbox.com
          </a>
        </p>
        <div className="flex gap-2">
          <Input
            placeholder="pk.ey..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <Button onClick={saveApiKey}>Save</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Click on map or type address"
          className="pl-10"
        />
      </div>
      <div ref={mapContainer} className="h-64 rounded-lg border" />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setShowKeyInput(true)}
      >
        Change API Key
      </Button>
    </div>
  );
};

export default LocationPicker;
