import { ReactElement, useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OfferCard } from '../../types/offer';

const pinIcon = '/markup/img/pin.svg';
const pinActiveIcon = '/markup/img/pin-active.svg';

const defaultIcon = leaflet.icon({
  iconUrl: pinIcon,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const activeIcon = leaflet.icon({
  iconUrl: pinActiveIcon,
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

leaflet.Marker.prototype.options.icon = defaultIcon;

type MapProps = {
  mapName: string;
  offers: OfferCard[];
  activeOfferId?: string | null;
};

function Map({
  mapName,
  offers,
  activeOfferId = null,
}: MapProps): ReactElement {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<leaflet.Map | null>(null);
  const markersRef = useRef<leaflet.Marker[]>([]);

  const centerLocation = offers[0]?.location || {
    latitude: 52.37454,
    longitude: 4.897976,
    zoom: 12,
  };

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = leaflet
        .map(mapRef.current)
        .setView(
          [centerLocation.latitude, centerLocation.longitude],
          centerLocation.zoom,
        );

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        )
        .addTo(map);

      mapInstanceRef.current = map;
    }
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      return;
    }

    markersRef.current.forEach((marker) => {
      marker.remove();
    });
    markersRef.current = [];

    offers.forEach((offer) => {
      const isActive = offer.id === activeOfferId;
      const marker = leaflet
        .marker([offer.location.latitude, offer.location.longitude], {
          icon: isActive ? activeIcon : defaultIcon,
        })
        .addTo(mapInstanceRef.current!);

      markersRef.current.push(marker);
    });
  }, [offers, activeOfferId]);

  return (
    <section
      className={`${mapName}__map map`}
      ref={mapRef}
      style={{ height: '500px', width: '100%' }}
    />
  );
}

export default Map;
