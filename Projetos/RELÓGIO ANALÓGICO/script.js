let weDigital = document.querySelector('.digital');
let weSeconds = document.querySelector('.p_s');
let weMinutes = document.querySelector('.p_m');
let weHours = document.querySelector('.p_h');


function updateClock(){
    let now = new Date();
    let seconds = now.getSeconds();
    let minutes = now.getMinutes();
    let hours = now.getHours();

    let digital = [hours, minutes, seconds];
    let adaptDigitalClock = (num) => num < 10 ? '0' + num: num;
    for (let i in digital){digital[i] = adaptDigitalClock(digital[i])};
    weDigital.innerHTML = `${digital[0]}:${digital[1]}:${digital[2]}`;

    weSeconds.style.transform = `rotate(${seconds*6-90}deg)`;
    weMinutes.style.transform = `rotate(${minutes*6-90}deg)`;
    weHours.style.transform = `rotate(${hours*30-90}deg)`;
}

setInterval(updateClock, 998);
updateClock();