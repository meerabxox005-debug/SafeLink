let seconds = 300;
let interval;

function startTimer(){

clearInterval(interval);

interval = setInterval(function(){

seconds--;

let min = Math.floor(seconds/60);
let sec = seconds%60;

document.getElementById("timer").innerHTML =
String(min).padStart(2,"0")+":"+
String(sec).padStart(2,"0");

if(seconds<=0){

clearInterval(interval);

alert("Emergency! Contacts will be notified.");

}

},1000);

}

function imSafe(){

clearInterval(interval);

alert("Safety Check Completed!");

seconds=300;

document.getElementById("timer").innerHTML="05:00";

}