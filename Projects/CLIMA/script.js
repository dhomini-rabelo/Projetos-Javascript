// Web elements
let weForm = document.querySelector('.busca');
let weInput = document.querySelector('#searchInput');
let weFeedback = document.querySelector('.aviso');
let weResultArea = document.querySelector('.resultado');
let weTitleResult = document.querySelector('.titulo');
let weTemp = document.querySelector('.tempInfo');
let weWindSpeed = document.querySelector('.ventoInfo');
let weClimateImg = document.querySelector('.temp img');
let weWindDirection = document.querySelector('.ventoPonto');



// Initial variables


// Events
weForm.addEventListener('submit', search);

// Functions

async function search(event){
    event.preventDefault();
    weResultArea.style.display = 'none';
    let city = weInput.value;
    let key = 'd06cdb298fafc83c520d5ab677fc477e';
    if (city !== ''){
        weFeedback.innerHTML = 'Carregando..';
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=${key}&units=metric&lang=pt_br`;
        let jsonResult = await fetch(url);
        let result = await jsonResult.json();
        if (result.cod === 200){
            showInfo({
                name: result.name,
                country: result.sys.country,
                temperature: result.main.temp,
                icon: result.weather[0].icon,
                windSpeed: result.wind.speed,
                windAngle: result.wind.deg,
            });
        } else {
            weFeedback.innerHTML = 'Cidade não encontrada';
        }
    }else{
        weFeedback.innerHTML = '';
        weResultArea.style.display = 'none';
    } 
}

function showInfo(TempObj){
    weFeedback.innerHTML = '';
    weResultArea.style.display = 'block';

    weTitleResult.innerHTML = `${TempObj.name}, ${TempObj.country}`;
    weTemp.innerHTML = `${TempObj.temperature}°C`;
    weWindSpeed.innerHTML = `${TempObj.windSpeed} <span>km/h</span>`;
    weClimateImg.setAttribute('src', `http://openweathermap.org/img/wn/${TempObj.icon}@2x.png`);
    weWindDirection.style = `transform: rotate(${TempObj.windAngle}deg)`;
}