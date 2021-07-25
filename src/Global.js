import React from 'react';
import './cryptoapp.css'
import { PieChart } from 'react-minimal-pie-chart';
import './global.css'

//Provides the global data bar (the total crypto market cap and the total crypto market change over 24h)
const Global = ({coins,globalData,colors}) => {
    //calculate total market cap
    let totalMarketCap = 0;
    coins.map(coin => {
        totalMarketCap = totalMarketCap + coin.market_cap;
        return null;
    })

    var percentages = globalData.data.market_cap_percentage
    var chartData = []
    let i = 0;
    Object.keys(percentages).forEach(function(key){
        //If the total market cap is greater than 1% display the name on the chart else dont display name since it will overflow
        if(percentages[key] > 1){
            chartData.push({
                'value' : percentages[key],
                'key' : key,
                'color' : colors[i],
                'title' : key
            })
            i++;
        }
        else{
            chartData.push({
                'value' : percentages[key],
                'color' : colors[i],
                'title' : key
            })
            i++;
        }
    })
    const defaultLabelStyle = {
        fontSize: '4px',
        fontFamily: 'sans-serif',
    };

    totalMarketCap = totalMarketCap.toLocaleString();
    return (
        <div className='global-container'>
            <div className='global-info-left'>
                In the past 24 hours the global crypto market has changed 
                {globalData.data.market_cap_change_percentage_24h_usd > 0 ? 
                    (<p className='green'> {globalData.data.market_cap_change_percentage_24h_usd.toFixed(2)}%</p>) : 
                    ( <p className='red'> {globalData.data.market_cap_change_percentage_24h_usd.toFixed(2)}%</p>)
                }
                The total crypto market cap is now {
                    globalData.data.market_cap_change_percentage_24h_usd > 0 ?  (<p className="green">${totalMarketCap}</p>) :
                    (<p className="red">${totalMarketCap}</p>)
                }</div>
            <div className='global-info-right'>
                <div className="global-info-right">
                <PieChart data={chartData} style={{ maxHeight : '100%'}} label={({ dataEntry }) => dataEntry.key} labelStyle={{...defaultLabelStyle,}} />
            </div>
          </div>
        </div>
    )
}


export default Global
