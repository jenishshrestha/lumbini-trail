import { LatLngTuple } from 'leaflet';

export const POSITION: LatLngTuple = [28.42452, 83.81316];

export const tileLayer: { osm: string; satellite: string } = {
  osm: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  satellite:
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
};
