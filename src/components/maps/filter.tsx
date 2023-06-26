// global constants
import { assetIcons } from '@/utils/constants';

/// <reference types="vite-plugin-svgr/client" />
import { ReactComponent as FolderIcon } from '@/assets/svgIcons/folder.svg';

import './filter.scss';

const MarkerFilter = () => {
  return (
    <>
      <div className='map-overlay'>
        <div>
          <div className='map-overlay-inner'>
            <ul className='marker-filter'>
              {Object.keys(assetIcons).map((key, index) => {
                const keyOfObj = key as keyof typeof assetIcons;
                return (
                  <li key={index}>
                    <h2 className='category-title'>
                      <FolderIcon />
                      <span>{keyOfObj}</span>
                    </h2>
                    <ul>
                      {typeof assetIcons[keyOfObj] === 'object' &&
                      assetIcons[keyOfObj] !== null
                        ? assetIcons[keyOfObj].map((subkey, i) => {
                            return (
                              <>
                                <li key={i}>
                                  <label>
                                    <span>{subkey.type}</span>
                                    <input
                                      className='asset-filter'
                                      type='checkbox'
                                      id={subkey.type}
                                    />
                                  </label>
                                </li>
                              </>
                            );
                          })
                        : ''}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarkerFilter;
