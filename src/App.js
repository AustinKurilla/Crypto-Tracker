import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';
import ReactLoading from 'react-loading';
import Global from './Global'
import Infobar from './Infobar'
import './global.css'
import moonunfilled from './img/moon-unfilled.png';
import moonfilled from './img/moon-filled.png'
import {generateColors, getSavedTheme ,getSavedThemeImg, loadSavedCoins}  from './Helpers'

function App() {
  //Coins loaded from API
  const [coins, setCoins] = useState([])
  //Search bar content
  const [search, setSearch] = useState('')
  //Display preloader if true display content if false
  const [loading, setLoading] =useState('true')
  //Global data to be displayed loaded from API
  const [globalData, setGlobalData] = useState([])
  //array of 100 random colors for pie chart
  const [colors] = useState(generateColors)
  //saved array for all saved coins
  const [savedCoins, setSavedCoins] = useState(loadSavedCoins)
  //if true sort the list of coins by favorites 
  const [sortCoins, setSortCoins] = useState(false)
  //Light and dark themes
  const [colorTheme, setTheme] =useState(getSavedTheme)
  const [themeImg, setThemeImg] =useState(getSavedThemeImg)


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
          () => setLoading(false),1000 //disable preloader after content is finished loading + 2 seconds
        )
      }).catch(error => console.log(error));
  }, []);
  
  //Called whenever data in the search bar changes
  const handleChange = e => {
    setSearch(e.target.value)
  }

  //Filter data based on search in search bar
  const filteredCoins = coins.filter(coin => {
    if(sortCoins){
      return(
      (coin.name.toLowerCase().includes(search.toLowerCase()) && savedCoins.includes(coin.market_cap_rank)) ||
      (coin.symbol.toLowerCase().includes(search.toLowerCase()) && savedCoins.includes(coin.market_cap_rank))
      )
    }
    else{
      return(
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
      )
    }
  }
  );

  const favoriteButton = (rank, e) => {
    var savedCoinarr = savedCoins;
    console.log(savedCoinarr)
    var index = savedCoinarr.indexOf(rank);
    if (e.target.checked){
      savedCoinarr.push(rank)
      setSavedCoins(savedCoinarr)
    }
    else{
      savedCoinarr.splice(index,1)
      setSavedCoins(savedCoinarr)
    }
    localStorage.setItem('saved-coins', JSON.stringify(savedCoinarr))
  }

  const sortbutton = (e) =>{
    if (sortCoins){
      setSortCoins(false)
    }
    else{
      setSortCoins(true)
    }
  }

  return (
    <>
    { loading ? ( <div className={colorTheme} id='preloaderDIV'><ReactLoading type={'spinningBubbles'} color={'#bbe0ff'} height={200} width={200} className='preloader'/></div>) : (
      <div className="CryptoApp" >
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
        <Global coins={coins} globalData={globalData} colors={colors}/>
        <Infobar sortbutton={sortbutton} sortCoins={sortCoins}/>
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
                rank={coin.market_cap_rank}
                favoriteButton={favoriteButton}
                savedCoins={savedCoins}/>
          );
          })}
          </div>
      </div>
    )}
    </>
    );
}

export default App;
