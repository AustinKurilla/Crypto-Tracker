import randomColor from 'randomcolor';
import moonunfilled from './img/moon-unfilled.png';
import moonfilled from './img/moon-filled.png'

//Generates random colors for the pie chart
export function generateColors(){
    var colors = []
    for(let i = 0; i< 100; i++){
         colors.push(randomColor());
    }
    return colors
}

export function getSavedTheme(){
    const currThemeColor = localStorage.getItem('color-theme');
    //if theme color is saved in local storage set it to the correct one
    if (currThemeColor === 'theme-dark'){
      document.getElementById('html').classList.add('theme-dark')
    }
    if (currThemeColor){
        return(currThemeColor)
    }
    else{
        return 'theme-light'
    }
}

export function getSavedThemeImg(){
    const currThemeColor = localStorage.getItem('color-theme');
    if (currThemeColor === 'theme-dark'){
        return moonunfilled
    }
    else{
        return moonfilled
    }
}

export function loadSavedCoins(){
    const saveCoins = localStorage.getItem('saved-coins');
    var saveCoinArr = JSON.parse(saveCoins);
    if(saveCoins){
        return saveCoinArr
    }
    else{
        return [0]
    }
}