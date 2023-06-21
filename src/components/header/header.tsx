/// <reference types="vite-plugin-svgr/client" />
import { ReactComponent as Logo } from '@/assets/svgIcons/logo.svg';
import { ReactComponent as Pattern } from '@/assets/svgIcons/patterns.svg';

import './header.scss';

const Header = () => {
  return (
    <>
      {/* <header className='flex items-center justify-center pt-5 pb-8 primary-header'> */}
      <Pattern />
      <div className='relative max-w-[480px] text-center'>
        <div className='main-logo'>
          <Logo />
        </div>
        <div className='text-center leading-[1.4]'>
          <p>
            Discover the path that Mayadevi took while travelling from Lumbini
            to Kapilvastu after giving birth to Siddhartha Gautam
          </p>
        </div>
      </div>
      {/* </header> */}
    </>
  );
};

export default Header;
