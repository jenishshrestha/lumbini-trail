import * as ReactDomServer from 'react-dom/server';

import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet';

import { OptionTypes, MapStyleTypes } from '@/types';

import { POSITION, tileLayer } from '@/utils/constants';
import { GeoJsonObject } from 'geojson';

import './map.scss';

const trekkingRoutes = await import('@/data/trekkingRoutes.json');

interface MapTypes {
  mapStyle: MapStyleTypes;
  options: OptionTypes;
}

const Map = ({ mapStyle, options }: MapTypes) => {
  return (
    <>
      <MapContainer center={POSITION} zoom={11} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileLayer[mapStyle]}
        />
        <ZoomControl position='bottomright' zoomInText='🧐' zoomOutText='🗺️' />
        {options.trekkingRoutes && (
          <GeoJSON
            data={trekkingRoutes as GeoJsonObject}
            onEachFeature={(feature, layer: L.GeoJSON) => {
              const PopupModal = () => {
                return (
                  <div className='space-y-1'>
                    <div>
                      Route name:{' '}
                      <span className='font-bold'>
                        {feature.properties.Name
                          ? feature.properties.Name
                          : 'N/A'}
                      </span>
                    </div>
                    <div>
                      Length:{' '}
                      <span className='font-bold'>
                        {parseFloat(feature.properties.Shape_Leng.toFixed(3))}{' '}
                        KM
                      </span>
                    </div>
                  </div>
                );
              };
              layer.bindPopup(ReactDomServer.renderToString(<PopupModal />));

              layer.setStyle({
                color: '#0B9B01',
                weight: 4,
              });
              layer.on('mouseover', () => {
                layer.setStyle({
                  color: '#007a0b',
                  weight: 5,
                });
              });
              layer.on('mouseout', () => {
                layer.setStyle({
                  color: '#0B9B01',
                  weight: 4,
                });
              });
            }}
          />
        )}
      </MapContainer>
    </>
  );
};

export default Map;
