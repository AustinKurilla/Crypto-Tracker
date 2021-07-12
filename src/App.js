import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  useEffect(()=> {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data)
      }).catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="CryptoApp">
      <div className='search-bar'>
        <h1 className='search-text'>Search A Cryptocurrency</h1>
        <form>
          <input type='text' placeholder='Search' className="search-input" onChange={handleChange}/>
        </form>
      </div>
      {filteredCoins.map(coin =>{
        return (
      <Coin key={coin.id} 
      name={coin.name} 
      image={coin.image} 
      symbol={coin.symbol.toUpperCase()} 
      marketcap={coin.market_cap} 
      price={coin.current_price}
      priceChange={coin.price_change_percentage_24h}/>
        );
        })}
    </div>
  );
}

export default App;
