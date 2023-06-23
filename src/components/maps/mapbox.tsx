import { useRef, useEffect, useState } from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import './mapbox.scss';

import MarkerFilter from './filter';

import geojson from '@/data/lumbini.json';

mapboxgl.accessToken =
  'pk.eyJ1IjoiamVycnlzaHJlc3RoYSIsImEiOiJjbGozdXJhcjAwcGp2M2pvMGNpZ3Z5cHp2In0.nNhUtM8bSN4oCgDNvXdz2A';

const MapboxGL = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  interface MarkerTypes {
    imageUrl: string;
    id: string;
  }

  // defining markers to register in the map
  const markers: MarkerTypes[] = [
    { imageUrl: 'src/assets/markerIcons/airport.png', id: 'airport/helipad' },
    {
      imageUrl: 'src/assets/markerIcons/building.png',
      id: 'public-library/art-gallery',
    },
    {
      imageUrl: 'src/assets/markerIcons/bus.png',
      id: 'bus-park/taxi-stand',
    },
    {
      imageUrl: 'src/assets/markerIcons/dollar.png',
      id: 'bank/atm/currency-exchange-counter',
    },
    { imageUrl: 'src/assets/markerIcons/graduation.png', id: 'university' },
    {
      imageUrl: 'src/assets/markerIcons/hospital.png',
      id: 'hospital/health-posts',
    },
    { imageUrl: 'src/assets/markerIcons/parking.png', id: 'vehicle-parking' },
    { imageUrl: 'src/assets/markerIcons/restaurant.png', id: 'gourmet-place' },
    {
      imageUrl: 'src/assets/markerIcons/park.png',
      id: 'park/garden',
    },
    { imageUrl: 'src/assets/markerIcons/student.png', id: 'school/college' },
    { imageUrl: 'src/assets/markerIcons/temple.png', id: 'temple' },
    {
      imageUrl: 'src/assets/markerIcons/market.png',
      id: 'shopping-store/market',
    },
    {
      imageUrl: 'src/assets/markerIcons/rental.png',
      id: 'vehicle-rental-facilities-(bike,-car)',
    },
    {
      imageUrl: 'src/assets/markerIcons/gas-station.png',
      id: 'gas-station',
    },
    {
      imageUrl: 'src/assets/markerIcons/sanctuary.png',
      id: 'sanctuary',
    },
  ];

  useEffect(() => {
    const map = new mapboxgl.Map({
      container:
        mapContainerRef.current === undefined ||
        mapContainerRef.current === null
          ? ''
          : mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [84.124, 28.3949],
      zoom: 8,
      minZoom: 8,
      maxZoom: 20,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // disable map zoom when using scroll
    map.scrollZoom.disable();

    map.on('load', async () => {
      map.flyTo({
        center: [83.0469, 27.5518],
        speed: 0.5,
        zoom: 10,
      });

      // calling api for data
      // const geojson = await getLocation();
      // add route lines
      map.addSource('route', {
        type: 'geojson',
        data: 'src/data/trail.geojson',
      });

      // route styles
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

      // Add a new source from our GeoJSON data
      map.addSource('lumbini', {
        type: 'geojson',
        // @ts-ignore
        // data: geojson,
        data: geojson,
        // cluster: true,
        // clusterMaxZoom: 14,
        // clusterRadius: 50,
      });

      // Clustering the massive data
      // map.addLayer({
      //   id: 'clusters',
      //   type: 'circle',
      //   source: 'lumbini',
      //   filter: ['has', 'point_count'],
      //   paint: {
      //     'circle-color': [
      //       'step',
      //       ['get', 'point_count'],
      //       '#4470E0',
      //       100,
      //       '#f1f075',
      //       750,
      //       '#f28cb1',
      //     ],
      //     'circle-radius': [
      //       'step',
      //       ['get', 'point_count'],
      //       20,
      //       100,
      //       30,
      //       750,
      //       40,
      //     ],
      //   },
      // });

      // display cluster with count number
      // map.addLayer({
      //   id: 'cluster-count',
      //   type: 'symbol',
      //   source: 'lumbini',
      //   filter: ['has', 'point_count'],
      //   layout: {
      //     'text-field': ['get', 'point_count_abbreviated'],
      //     'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      //     'text-size': 12,
      //   },
      // });

      // register markers for different types of locations
      markers.forEach((img) => {
        map.loadImage(img.imageUrl, function (error, image: any) {
          if (error) throw error;
          map.addImage(img.id, image);
        });
      });

      //marker of unclustered point
      map.addLayer({
        id: 'unclustered-points',
        type: 'symbol',
        source: 'lumbini',
        filter: ['!', ['has', 'point_count']],
        layout: {
          'icon-image': ['get', 'category'],
          'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.2, 20, 1],
          'icon-allow-overlap': true,
        },
      });

      /**
       * Api call function
       * @returns geojson data for map
       */
      // async function getLocation() {
      //   try {
      //     const response = await fetch(process.env.MAP_API as string, {
      //       method: 'GET',
      //       // headers: new Headers({
      //       //   'ngrok-skip-browser-warning': '69420',
      //       // }),
      //     });

      //     const data = await response.json();

      //     const { features } = data;

      //     return {
      //       type: 'FeatureCollection',
      //       features: features,
      //     };
      //   } catch (err: any) {
      //     throw new Error(err);
      //   }
      // }

      // get an array of all unique `icon` properties
      const symbols: string[] = [];

      // looping through features
      for (const feature of geojson.features) {
        const symbol = feature.properties.category;
        if (!symbols.includes(symbol)) symbols.push(symbol);
      }

      map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div ref={mapContainerRef} className='map'></div>
      <MarkerFilter />
    </>
  );
};

export default MapboxGL;
