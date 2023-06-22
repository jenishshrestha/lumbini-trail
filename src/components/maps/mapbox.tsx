import { useRef, useEffect } from 'react';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import './mapbox.scss';

mapboxgl.accessToken =
  'pk.eyJ1IjoiamVycnlzaHJlc3RoYSIsImEiOiJjbGozdXJhcjAwcGp2M2pvMGNpZ3Z5cHp2In0.nNhUtM8bSN4oCgDNvXdz2A';

const MapboxGL = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  interface MarkerTypes {
    imageUrl: string;
    id: string;
  }
  const markers: MarkerTypes[] = [
    { imageUrl: 'src/assets/markerIcons/airport.png', id: 'l-airport' },
    { imageUrl: 'src/assets/markerIcons/building.png', id: 'l-building' },
    { imageUrl: 'src/assets/markerIcons/bus.png', id: 'l-bus' },
    { imageUrl: 'src/assets/markerIcons/dollar.png', id: 'l-dollar' },
    { imageUrl: 'src/assets/markerIcons/graduation.png', id: 'l-graduation' },
    { imageUrl: 'src/assets/markerIcons/hospital.png', id: 'hospitals' },
    { imageUrl: 'src/assets/markerIcons/parking.png', id: 'l-parking' },
    { imageUrl: 'src/assets/markerIcons/restaurant.png', id: 'l-restaurant' },
    {
      imageUrl: 'src/assets/markerIcons/securedparking.png',
      id: 'l=sParking',
    },
    { imageUrl: 'src/assets/markerIcons/student.png', id: 'l-student' },
    { imageUrl: 'src/assets/markerIcons/temple.png', id: 'l-temple' },
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
      zoom: 6.7,
      minZoom: 6,
      maxZoom: 15,
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
      const geojson = await getLocation();

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
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      // set the 'cluster' option to true. GL-JS will add the point_count property to your source data.
      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'lumbini',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#4470E0',
            100,
            '#f1f075',
            750,
            '#f28cb1',
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });

      //cluster count
      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'lumbini',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': ['get', 'point_count_abbreviated'],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
      });

      // register markers
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
          'icon-image': 'hospitals',
          'icon-size': 0.7,
        },
      });

      // async function getLocation() {
      //   return fetch('https://a16c-103-10-31-27.ngrok-free.app/map', {
      //     method: 'GET',
      //     headers: new Headers({
      //       'ngrok-skip-browser-warning': '69420',
      //     }),
      //   })
      //     .then((res) => res.json())
      //     .then((data) => {
      //       console.log('<==========================>');
      //       console.log(data);
      //     })
      //     .catch((error) => {
      //       console.log('Error');
      //       console.error(error);
      //     });
      // }

      async function getLocation() {
         // Make a GET request to the API and return the location of the ISS.
         try {
          const response = await fetch(
            'http://localhost:3002/map',
            {
              method: 'GET',
              // headers: new Headers({
              //   'ngrok-skip-browser-warning': '69420',
              // }),
            },
          );

          const data = await response.json();

          const { features } = data;

          console.log('---------');
          console.log(features);

          return {
            type: 'FeatureCollection',
            features: features,
          };
        } catch (err: any) {
          throw new Error(err);
        }
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

  return <div ref={mapContainerRef} className='map'></div>;
};

export default MapboxGL;
