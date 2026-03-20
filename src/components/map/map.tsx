import { useRef, useEffect, useState } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OfferCard } from '../../types/offer';

const defaultIcon = leaflet.icon({
  iconUrl: '/markup/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

const activeIcon = leaflet.icon({
  iconUrl: '/markup/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13, 39],
});

type MapProps = {
  mapName: string;
  offers: OfferCard[];
  activeOfferId?: string | null;
}

function Map({ mapName, offers, activeOfferId = null }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const cityLocation = offers[0]?.city.location || {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      };

      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: cityLocation.latitude,
          lng: cityLocation.longitude,
        },
        zoom: cityLocation.zoom,
      });

      leaflet
        .tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        })
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [offers]);

  useEffect(() => {
    if (!map) {
      return;
    }

    map.eachLayer((layer) => {
      if (layer instanceof leaflet.Marker) {
        map.removeLayer(layer);
      }
    });

    offers.forEach((offer) => {
      leaflet
        .marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        }, {
          icon: offer.id === activeOfferId ? activeIcon : defaultIcon,
        })
        .addTo(map);
    });
  }, [map, offers, activeOfferId]);

  return (
    <section
      className={`${mapName}__map map`}
      ref={mapRef}
    />
  );
}

export default Map;
