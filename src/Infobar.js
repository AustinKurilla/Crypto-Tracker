import React from 'react'
import './cryptoapp.css'
const Infobar = () => {
    return (
        <div className='infobar'>
          <p className='rank'>Rank</p>
          <p className="name">Name</p>
          <p className='ticker'>Ticker</p>
          <p className='coinprice'>Price</p>
          <p className="percentchange24">% Change 24H</p>
          <p className="marketcap">Market Cap</p>
        </div>
    )
}


export default Infobar
