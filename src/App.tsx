import { useLayoutEffect, useRef, useState } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import 'leaflet/dist/leaflet.css';

// types
import Header from './components/header/header';
import MapboxGl from './components/maps/mapbox';

const App = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null),
    fixedHeader = useRef<HTMLDivElement | null>(null),
    headerPlaceholder = useRef<HTMLDivElement | null>(null);

  const [padding, setPadding] = useState<number>(0);

  /**
   * =====================================================
   * finding height of fixed header to apply padding top
   * =====================================================
   **/
  function paddingTop() {
    const headerElement = fixedHeader.current;
    const height = headerElement?.clientHeight as number;
    setPadding(height);
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // calculating header height on resize
      window.addEventListener('resize', paddingTop);
      paddingTop();

      // scroll trigger animation
      // const tl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: mapContainer.current,
      //     start: 'top center',
      //     // end: 'bottom+=1000',
      //     toggleActions: 'play pause resume reverse',
      //     // onEnter onLeave onEnterBack onLeaveBack
      //     // markers: true,
      //     // scrub: true,
      //     // pin: true,
      //   },
      // });

      // tl.to(mapContainer.current, {
      //   ease: 'linear',
      //   maxWidth: '100%',
      //   duration: 0.5,
      // });
    });
    return () => {
      ctx.revert();
      window.removeEventListener('resize', paddingTop);
    };
  }, []);

  return (
    <>
      <header
        ref={fixedHeader}
        className='flex items-center justify-center pt-5 pb-8 primary-header'
      >
        <Header />
      </header>
      <div
        ref={headerPlaceholder}
        className='header-placeholder'
        style={{ paddingTop: padding }}
      ></div>

      <div
        ref={mapContainer}
        className='relative mx-auto map-container'
        style={{ maxWidth: '1227px' }}
      >
        <MapboxGl />
      </div>
    </>
  );
};

export default App;
