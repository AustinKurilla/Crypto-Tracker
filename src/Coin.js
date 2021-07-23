import React from 'react'
import './cryptoapp.css'
const Coin = ({name,image,symbol,price,marketcap,priceChange,rank,favoriteButton}) => {
    if(priceChange == null){
        priceChange = 0;
    }
    return (
        <div className='coin-container'>
            <div className='coin-row'>
                <div className='coin'>
                    <h2>{rank}</h2>
                    <img src={image} alt='crypto'/>
                    <h1>{name}</h1>
                    <p className='coin-symbol'>{symbol}</p>
                </div>
                <div className='coin-data'>
                    <p className='coin-price'>${price.toLocaleString()}</p>
                    {priceChange < 0 ? (
                        <p className='coin-percent red'>{priceChange.toFixed(2)}%</p>
                    ) : (<p className='coin-percent green'>{priceChange.toFixed(2)}%</p>)}
                    <p className='coin-marketcap'>${marketcap.toLocaleString()}</p>
                    <div className='favoritebutton'>
                        <input className='checkbox' type='checkbox' onChange={(e) => favoriteButton(rank, e)}></input>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Coin
