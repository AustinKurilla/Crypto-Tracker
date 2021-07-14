import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';
import moonunfilled from './img/moon-unfilled.png';
import moonfilled from './img/moon-filled.png'

function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [livefeedTheme, setLiveFeedTheme] = useState(<iframe  title="livefeed" 
  src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=light&pref_coin_id=1505&invert_hover=" 
  width="100%" height="36px" scrolling="auto" border="0" className="div3"></iframe>)
  
  //Light and dark themes
  const [colorTheme, setTheme] =useState('theme-light')
  const [themeImg, setThemeImg] =useState(moonunfilled)

  useEffect(() =>{
    const currThemeColor = localStorage.getItem('color-theme');
    if (currThemeColor){
      setTheme(currThemeColor)
    }
    if (currThemeColor === 'theme-dark'){
      document.getElementById('html').classList.add('theme-dark')
      setLiveFeedTheme(<iframe  title="livefeed" 
      src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover=" 
      width="100%" height="36px" scrolling="auto" border="0" className="div3"></iframe>)
    }
    else{
      setThemeImg(moonfilled)
    }
  }, [])

  const themeChange = () => {
    if (colorTheme === 'theme-light'){
      setTheme('theme-dark')
      setThemeImg(moonunfilled)
      localStorage.setItem('color-theme', 'theme-dark')
      document.getElementById('html').classList.add('theme-dark')
      setLiveFeedTheme(<iframe  title="livefeed" 
      src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=dark&pref_coin_id=1505&invert_hover=" 
      width="100%" height="36px" scrolling="auto" border="0" className="div3"></iframe>)
    }
    else{
      setTheme('theme-light')
      setThemeImg(moonfilled)
      localStorage.setItem('color-theme', 'theme-light')
      document.getElementById('html').classList.remove('theme-dark')
      setLiveFeedTheme(<iframe  title="livefeed" 
      src="https://widget.coinlib.io/widget?type=horizontal_v2&theme=light&pref_coin_id=1505&invert_hover=" 
      width="100%" height="36px" scrolling="auto" border="0" className="div3"></iframe>)
    }
  }

  //Get data from API
  useEffect(()=> {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data)
      }).catch(error => console.log(error));
  }, []);

  //Called whenever data in the search bar changes
  const handleChange = e => {
    setSearch(e.target.value)
  }

  //Filter data based on search in search bar
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
    )
  
  return (
      <div className="CryptoApp" >
        <div className={['div1', {colorTheme}]}><div className='div2'>{livefeedTheme}</div></div>
        <div className='search-bar'>
          <div className='navbar-left'>
            <h1 className='search-text'>Crypto Tracka</h1>
          </div>
          <div className='navbar-right'>
            <form>
              <input type='text' placeholder='Search' className="search-input" onChange={handleChange}/>
            </form>
              <img src={themeImg} className='themeselect' alt='theme-selector' onClick={() => themeChange()} style={{"pointerEvents": "all"}}/>
          </div>
        </div>
        <div className='infobar'>
          <p className='rank'>Rank</p>
          <p className="name">Name</p>
          <p className='ticker'>Ticker</p>
          <p className='coinprice'>Price</p>
          <p className="marketcap">Market Cap</p>
          <p className="percentchange24">% Change 24H</p>
        </div>
        <div className={colorTheme} id='coin-div'>
        {filteredCoins.map(coin =>{
          return (
        <Coin key={coin.id} 
            name={coin.name} 
            image={coin.image} 
            symbol={coin.symbol.toUpperCase()} 
            marketcap={coin.market_cap} 
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            rank={coin.market_cap_rank}/>
          );
          })}
          </div>
      </div>
    );
}

export default App;
