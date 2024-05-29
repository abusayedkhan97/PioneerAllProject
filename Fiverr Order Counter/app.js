const formDate = document.getElementById("formDate");
const output = document.querySelector(".output")


formDate.addEventListener("submit", function(e){
    e.preventDefault();

    let date = this.querySelector('input[type="date"]').value;
    let time = this.querySelector('input[type="time"]').value;

    
    let startInterval = setInterval(() => {
        let startTime = new Date();
        let endTime = new Date(date + " "+ time);
        let timeDiff = Math.abs(endTime.getTime() - startTime.getTime());
    
        let diffSec = Math.floor(timeDiff/1000);
        let diffMin = Math.floor(diffSec/60);
        let diffHours = Math.floor(diffMin/60);
        let diffDays = Math.floor(diffHours/24);
    
    
        let Hours = diffHours - (diffDays * 24);
        let Minits = diffMin - (diffDays * 24 * 60) - (Hours * 60);
        let seconds = diffSec - (diffDays * 24 * 60 * 60) - (Hours * 60 * 60) - (Minits * 60);
        
        output.innerHTML = `${diffDays > 0 ? diffDays+"d : " : ""} ${Hours > 0 ? Hours+"h : " : ""} ${Minits > 0 ? Minits+"m : " : ""} ${seconds > 0 ? seconds+"s": ""}`;

        // Check if all time components are zero
            if (diffDays == 0 && Hours == 0 && Minits == 0 && seconds == 0) {
                clearInterval(startInterval);
            }

    }, 1000);

});