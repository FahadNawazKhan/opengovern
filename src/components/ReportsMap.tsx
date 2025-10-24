import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Report } from '@/types';
import { Card } from '@/components/ui/card';

interface ReportsMapProps {
  reports: Report[];
  onReportClick?: (reportId: string) => void;
}

const ReportsMap = ({ reports, onReportClick }: ReportsMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const apiKey = localStorage.getItem('mapbox_token');

  useEffect(() => {
    if (!mapContainer.current || !apiKey) return;

    mapboxgl.accessToken = apiKey;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.5, 40],
      zoom: 9,
    });

    map.current.addControl(new mapboxgl.NavigationControl());

    // Add markers for reports with coordinates
    reports.forEach(report => {
      if (report.coordinates) {
        const el = document.createElement('div');
        el.className = 'report-marker';
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';
        
        // Color based on status
        const colors = {
          pending: '#f59e0b',
          in_progress: '#3b82f6',
          resolved: '#10b981',
          rejected: '#ef4444',
        };
        el.style.backgroundColor = colors[report.status];
        el.style.border = '3px solid white';
        el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

        const marker = new mapboxgl.Marker(el)
          .setLngLat(report.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div style="padding: 8px;">
                  <h3 style="font-weight: bold; margin-bottom: 4px;">${report.title}</h3>
                  <p style="font-size: 12px; color: #666;">${report.category}</p>
                  <p style="font-size: 12px; margin-top: 4px;">${report.status.replace('_', ' ')}</p>
                </div>
              `)
          )
          .addTo(map.current!);

        el.addEventListener('click', () => {
          onReportClick?.(report.id);
        });
      }
    });

    return () => {
      map.current?.remove();
    };
  }, [apiKey, reports, onReportClick]);

  if (!apiKey) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground">
          Configure Mapbox API key in settings to view map
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div ref={mapContainer} className="h-96 w-full" />
    </Card>
  );
};

export default ReportsMap;
