import { ChangeEventHandler } from 'react';

const MarkerFilter = () => {
  return (
    <>
      <div className='map-overlay top'>
        <div className='map-overlay-inner'>
          <ul>
            <li>
              <h2 className='category-title'>Natural Landmarks</h2>
              <ul>
                <li>
                  <label>
                    <span>Park</span>
                    <input className='asset-filter' type='checkbox' id='park' />
                  </label>
                </li>
                <li>
                  <label>
                    <span>Sanctuary</span>
                    <input
                      className='asset-filter'
                      type='checkbox'
                      id='sanctuary'
                    />
                  </label>
                </li>
              </ul>
            </li>
            <li>
              <h2 className='category-title'>Cultural/ Religious</h2>
              <ul>
                <li>
                  <label>
                    <span>Temple</span>
                    <input
                      className='asset-filter'
                      type='checkbox'
                      id='temple'
                    />
                  </label>
                </li>
                <li>
                  <label>
                    <span>Monastery</span>
                    <input
                      className='asset-filter'
                      type='checkbox'
                      id='monastry'
                    />
                  </label>
                </li>
                <li>
                  <label>
                    <span>Mosque</span>
                    <input
                      className='asset-filter'
                      type='checkbox'
                      id='mosque'
                    />
                  </label>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default MarkerFilter;
