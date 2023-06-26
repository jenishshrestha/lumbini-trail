import { useRef, useEffect } from 'react';

// mapbox module
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Marker Filter Component
import MarkerFilter from './filter';

// getting data temporarily from json file
import geojson from '@/data/lumbini.json';

// global constants
import { assetIcons } from '@/utils/constants';

// global typescript interface
import { assetIconsTypes } from '@/types';

// map box custom styles
import './mapbox.scss';

//getting data from api
// import { getLocation } from '@/utils/fetch-api';

mapboxgl.accessToken = import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN;

const MapboxGL = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  interface MarkerTypes {
    imageUrl: string;
    id: string;
  }

  /**
   *  defining markers to register in the map
   */
  const markers: MarkerTypes[] = [];

  const iterate = (obj: assetIconsTypes) => {
    Object.keys(obj).forEach((key) => {
      const keyOfObj = key as keyof typeof obj;

      if (typeof obj[keyOfObj] === 'object' && obj[keyOfObj] !== null) {
        obj[keyOfObj].forEach(function (value) {
          const item = {
            imageUrl: `src/assets/markerIcons/${value['icon']}.png`,
            id: value['type'],
          };

          markers.push(item);
        });
      }
    });
  };

  iterate(assetIcons);

  /**
   * HTML Elements
   */
  const markerCheckboxes = document.getElementsByClassName(
    'asset-filter',
  ) as HTMLCollectionOf<HTMLInputElement>;

  useEffect(() => {
    /**
     * Initializing mapbox gl
     */
    const map = new mapboxgl.Map({
      container:
        mapContainerRef.current === undefined ||
        mapContainerRef.current === null
          ? ''
          : mapContainerRef.current,
      style: 'mapbox://styles/anjan-yi/clj8be7s5008a01p9f98p4nv6',
      center: [83.0469, 27.5518],
      zoom: 10.5,
      minZoom: 10.5,
      maxZoom: 20,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // disable map zoom when using scroll
    map.scrollZoom.disable();

    map.on('load', async () => {
      // map.flyTo({
      //   center: [83.0469, 27.5518],
      //   speed: 0.5,
      //   zoom: 10,
      // });

      // calling api for data
      // const geojson = await getLocation();

      /**
       * add route lines
       */
      map.addSource('route', {
        type: 'geojson',
        data: 'src/data/trail.geojson',
      });

      /**
       * route styles
       */
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#4470E0',
          'line-width': 4,
        },
      });

      /**
       * Add a new source from our GeoJSON data
       */
      map.addSource('lumbini', {
        type: 'geojson',
        // @ts-ignore
        // data: geojson,
        data: geojson,
      });

      /**
       * register markers for different types of locations
       */
      markers.forEach((img) => {
        map.loadImage(img.imageUrl, function (error, image: any) {
          if (error) throw error;
          map.addImage(img.id, image);
        });
      });

      /**
       * marker layer of assets
       */
      map.addLayer({
        id: 'assets',
        type: 'symbol',
        source: 'lumbini',
        filter: ['!', ['has', 'point_count']],
        layout: {
          'icon-image': ['get', 'category'],
          'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.2, 20, 1.4],
          'icon-allow-overlap': true,
        },
      });

      // this function will be called whenever a checkbox is toggled
      const updateMarkerIcons = () => {
        const checkedSymbols = [...markerCheckboxes]
          .filter((el) => el.checked)
          .map((el) => el.id);

        map.setFilter('assets', ['in', 'category', ...checkedSymbols]);
      };

      /**
       * get an array of all unique `icon` properties
       */
      const symbols: string[] = [];

      for (const feature of geojson.features) {
        const symbol = feature.properties.category;
        if (!symbols.includes(symbol)) symbols.push(symbol);
      }

      /**
       * for each checkbox filter, add event listener
       */
      Array.from(markerCheckboxes).forEach(function (element) {
        element.addEventListener('change', updateMarkerIcons);
      });
    });

    // Clean up on unmount
    return () => {
      // Array.from(markerCheckboxes).forEach(function (element) {
      //   element.removeEventListener('change', updateMarkerIcons);
      // });
      map.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div ref={mapContainerRef} className='map'></div>
      <MarkerFilter />
    </>
  );
};

export default MapboxGL;
