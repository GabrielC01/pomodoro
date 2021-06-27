// Elements objects declarations
const timeStatus	= document.getElementById('status'); 
const timerDisplay	= document.getElementById('timer');
const toggleTimer	= document.getElementById('toggleTimer');
const resetTimer	= document.getElementById('resetTimer');


var isTimeRunning 	= false;
var isBreakTime		= false;
var interval;
var time = {
	minutes: 25,
	seconds: 0
}

// Assign buttons functions
toggleTimer.onclick = function() {
	if (!isTimeRunning) {
		startClock();
		if (!isBreakTime)
			timeStatus.innerHTML	= "WORK TIME";
		else if (isBreakTime)
			timeStatus.innerHTML	= "BREAK TIME";
	
		toggleTimer.innerHTML 		= "STOP";
		resetTimer.style.display 	= "block";
	} else {
		stopClock(interval);
		toggleTimer.innerHTML 		= "START";
		if (!isBreakTime)
			timeStatus.innerHTML	= "WORK TIME (PAUSED)";
		else if (isBreakTime)
			timeStatus.innerHTML 	= "BREAK TIME (PAUSED)";	
	}
}

resetTimer.onclick = function() {
	resetClock(interval);
	resetTimer.style.visibility = "hidden";
}

// Functions definitions
function startClock() {
	if (!isTimeRunning) {
		isTimeRunning = true; 						// > Signals time started
		interval = setInterval(function() {			// > Time ticking loop
			decreaseTime();							// > Time calculation	
			timerDisplay.innerHTML = formatTime();	// > Displays time
		}, 1000);
	}
}

function stopClock(intervalId) {
	if (isTimeRunning) {
		isTimeRunning = false;
		clearInterval(intervalId);
	}	
}

function resetClock() {
	clearInterval(interval);	
	isTimeRunning = false;
	if (isBreakTime) {
		time.minutes = 5;
		time.seconds = 0;
		timeStatus.innerHTML 	= "BREAK TIME";
		toggleTimer.innerHTML	= "START";
	} else {
		time.minutes = 25;
		time.seconds = 0;
		timeStatus.innerHTML	= "WORK TIME";
		timeStatus.innerHTML	= "START";	
	}
	timerDisplay.innerHTML = formatTime();
}

function formatTime() {
	let strMinutes = time.minutes;
	let strSeconds = time.seconds;
	if (time.minutes < 10) {
		strMinutes = '0' + time.minutes;
	} else if (time.seconds < 10) {
		strSeconds = '0' + time.seconds;
	}
	if (isBreakTime && time.seconds < 10)	// This is to make sure the seconds will be correctly formatted for break time (05:00 instead of 05:0) 
		strSeconds = '0' + time.seconds;

	return strMinutes + ' : ' + strSeconds;
}

function decreaseTime() {
	time.seconds--;
	if (time.seconds <= 0) {
		time.minutes--;
		time.seconds = 59;
	}
	if (time.minutes <= 0) {
		if (!isBreakTime) {
			isBreakTime = true;
			alert('BREAK TIME.');
		} else {
			isBreakTime = false;
			alert('WORK TIME.');
		}
		resetClock();
	}
}
