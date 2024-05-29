const second = document.querySelector(".s");
const minute = document.querySelector(".m");
const hour = document.querySelector(".h");



function clockFunction(time, current) {
    return (360/time)*current+180;
}


setInterval(()=>{
    let time = new Date();
    
    let currentS = time.getSeconds();
    let currentM = time.getMinutes();
    let currentH = time.getHours();
    second.style.transform = `rotate(${clockFunction(60, currentS)}deg)`;
    minute.style.transform = `rotate(${clockFunction(60, currentM)}deg)`;
    hour.style.transform = `rotate(${clockFunction(12, currentH)}deg)`;
},1000);