import React from 'react'
import './cryptoapp.css'
const Infobar = ({sortbutton, sortCoins}) => {
    return (
      <div className='infocontainer'>
        <div className='sortbuttondiv'>
          {sortCoins ? (
          <button className='sortbutton' onClick={(e) => sortbutton(e)}>Unsort by Saved</button>
          ) : (<button className='sortbutton' onClick={(e) => sortbutton(e)}>Sort by Saved</button>
          )
          }
        </div>
        <div className='infobar'>
          <p className='rank'>Rank</p>
          <p className="name">Name</p>
          <p className='ticker'>Ticker</p>
          <p className='coinprice'>Price</p>
          <p className="percentchange24">% Change 24H</p>
          <p className="marketcap">Market Cap</p>
          <p className='favorite'>Save</p>
        </div>
      </div>
    )
}


export default Infobar
