function openPopup1() {
    document.getElementById("overlay1").style.display = "flex";
}
function openPopup2() {
    document.getElementById("overlay2").style.display = "flex";
}

function closePopup1() {
    document.getElementById("overlay1").style.display = "none";           
}
function closePopup2() {
    document.getElementById("overlay2").style.display = "none";
}

function outsideClick(event) {
    if (event.target.id === "overlay1") {
        closePopup1();
    }
    else if (event.target.id === "overlay2") {
        closePopup2();
    }
}

function currentTime(){
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    if(seconds<10){
        seconds="0"+seconds;
    }
    if(minutes<10){
        minutes="0"+minutes;
    }
    if(hours<10){
        hours="0"+hours;
    }

    if(hours==0){
        current_time1.textContent="12"+":"+minutes+":"+seconds+" am";
        current_time2.textContent="12"+":"+minutes+":"+seconds+" am";
    }
    else if(hours<12){
        current_time1.textContent=hours+":"+minutes+":"+seconds+" am";
        current_time2.textContent=hours+":"+minutes+":"+seconds+" am";
    }
    else if(hours>=12){
        hours=hours-12;
        if(hours<10){
            hours="0"+hours;
        }
        current_time1.textContent=hours+":"+minutes+":"+seconds+" pm";
        current_time2.textContent=hours+":"+minutes+":"+seconds+" pm";
    }
}

setInterval(currentTime, 1000); 
currentTime(); 

function parseTime(timeStr) {
    let [time, modifier] = timeStr.split(" "); // "11:20:30", "AM"

    let [hours, minutes, seconds] = time.split(":").map(Number);

    if (modifier === "pm" && hours !== 12) {
        hours += 12;
    }
    if (modifier === "am" && hours === 12) {
        hours = 0;
    }

    let date = new Date();
    date.setHours(hours, minutes, seconds, 0);

    return date;
}

function remainingTime(start_time, end_time){
    let start = parseTime(start_time);
    let end = parseTime(end_time);

    if (end < start) {
        end.setDate(end.getDate() + 1);
    }

    let diff = end - start;

    let h = Math.floor(diff / 3600000);
    let m = Math.floor((diff % 3600000) / 60000);
    let s = Math.floor((diff % 60000) / 1000);

    let remTime=(`${h}h ${m}m ${s}s`);
    return remTime;
}

function remTimeUpdate(){
    next_clear1.textContent=remainingTime(current_time1.textContent, fixed_time1.textContent);
    next_clear2.textContent=remainingTime(current_time2.textContent, fixed_time2.textContent);
}

setInterval(remTimeUpdate, 1000); 
remTimeUpdate();

function parseRemTime(timeStr) {
    
    let match = timeStr.match(/(\d+)h/);
    let hours = parseInt(match[1]);

    return hours; 
}


function fill_status(hour) {
    return 95-hour*4;
}

function update_status(){
    hour=parseRemTime(next_clear1.textContent);
    stat=fill_status(hour);
    status1.textContent=stat+"% Filled";
    
    hour=parseRemTime(next_clear2.textContent);
    stat=fill_status(hour);
    status2.textContent=stat+"% Filled";
}

setInterval(update_status, 1000); 
update_status();