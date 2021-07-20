import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';
import moonunfilled from './img/moon-unfilled.png';
import moonfilled from './img/moon-filled.png'
import ReactLoading from 'react-loading';
import { PieChart } from 'react-minimal-pie-chart';

function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] =useState('true')
  const [globalData, setGlobalData] = useState([])
  //Light and dark themes
  const [colorTheme, setTheme] =useState('theme-light')
  const [themeImg, setThemeImg] =useState(moonunfilled)

  useEffect(() =>{
    const currThemeColor = localStorage.getItem('color-theme');
    //if theme color is saved in local storage set it to the correct one
    if (currThemeColor){
      setTheme(currThemeColor)
    }
    if (currThemeColor === 'theme-dark'){
      document.getElementById('html').classList.add('theme-dark')
    }
    else{
      setThemeImg(moonfilled)
    }
  }, [])

  const themeChange = () => {
    //if color theme is currently light switch it to dark or vice versa
    if (colorTheme === 'theme-light'){
      setTheme('theme-dark')
      setThemeImg(moonunfilled)
      localStorage.setItem('color-theme', 'theme-dark')
      document.getElementById('html').classList.add('theme-dark')
    }
    else{
      setTheme('theme-light')
      setThemeImg(moonfilled)
      localStorage.setItem('color-theme', 'theme-light')
      document.getElementById('html').classList.remove('theme-dark')
    }
  }

  //Get data from API
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/global')
    .then(res => {
      setGlobalData(res.data)
    }).catch(error => console.log(error))
  }, []);

  useEffect(()=> {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data)
        //Load main content after preloader finishes
        setTimeout(
          () => setLoading(false),2000 //disable preloader after content is finished loading + 2 seconds
        )
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
  );

  //calculate total market cap
  let totalMarketCap = 0;
  coins.map(coin => {
    totalMarketCap = totalMarketCap + coin.market_cap;
    return null;
  })
  totalMarketCap = totalMarketCap.toLocaleString();

  return (
    <>
    { loading ? ( <div className={colorTheme} id='preloaderDIV'><ReactLoading type={'spinningBubbles'} color={'#bbe0ff'} height={667} width={375} className='preloader'/></div>) : (
      <div className="CryptoApp" >
        <div className={['div1', {colorTheme}]}><div className='div2'></div></div>
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
        <div className='global-info'>
          <div>In the past 24 hours the global crypto market has changed 
            {globalData.data.market_cap_change_percentage_24h_usd > 0 ? (<p className='green'> {globalData.data.market_cap_change_percentage_24h_usd}</p>) : ( <p className='red'> {globalData.data.market_cap_change_percentage_24h_usd}</p>)}
            the total crypto market cap is now ${totalMarketCap}</div>
        </div>
        <div className='infobar'>
          <p className='rank'>Rank</p>
          <p className="name">Name</p>
          <p className='ticker'>Ticker</p>
          <p className='coinprice'>Price</p>
          <p className="percentchange24">% Change 24H</p>
          <p className="marketcap">Market Cap</p>
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
    )}
    </>
    );
}

export default App;
