// User's goal for 1 Pomodoro
var currentGoal;
// Variables for divs and elements
var inputBox = document.getElementById('input-box');
var goalInput = document.getElementById('goal-input');
var timerBox = document.getElementById('timer-box');
var timer = document.getElementById('timer');
var buttonBox = document.getElementById('button-box');
var startBtn = document.getElementById('start-btn');
var pauseBtn = document.getElementById('pause-btn');
var restartBtn = document.getElementById('restart-btn');
var goalListBox = document.getElementById('goal-list-box');
var goalList = document.getElementById('goal-list');
var question = document.getElementById('question');
var checkSuccessBox = document.getElementById('check-success-box');
var successRateLine = document.getElementById('success-rate');
// Variables
var currentListItem = "";
var goalListData = "";
var countdown;
var successfulPom = 0;
var unsuccessfulPom = 0;
var successRate = 0;
var isPaused = false;
var isMinsTwoDigits = true;
var isSecsTwoDigits = true;
//Timer variables
var minutes = 25;
var seconds = 00;

var alertSound = new Audio('alert.mp3');


var saveGoalBtn = document.getElementById('save-goal-btn').onclick = function() {
  if(goalInput.value == "") {
    alert("Enter a goal!");
  } else {
    currentGoal = goalInput.value;
    inputBox.style.display = "none";
    buttonBox.style.display = "block";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
}

startBtn.onclick = function() {
  isPaused = false;
  countdown = setInterval(startCountdown, 1000);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
}

function startCountdown() {
  if(minutes == 0 && seconds == 0) {
    endPomodoro();
  } else {
    if(seconds == 00) {
      seconds = 60;
      minutes--;
    }
    seconds--;
    var newMins = minutes;
    var newSecs = seconds;
    if(seconds > 9 && seconds <=59) {
      isSecsTwoDigits = true;
    } else {
      isSecsTwoDigits = false;
    }
    if(minutes<10) {
      isMinsTwoDigits = false;
    }
    if(!isMinsTwoDigits) {
      newMins = "0" + minutes;
    }
    if(!isSecsTwoDigits) {
      newSecs = "0" + seconds;
    }
    timer.innerHTML = newMins + " : " + newSecs;
    //console.log(minutes + " : " + seconds);
  }
}

pauseBtn.onclick = function() {
  if(isPaused == false) {
    isPaused = true;
    clearInterval(countdown);
  }
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

restartBtn.onclick = function() {
  reset();
  goalList.innerHTML = "";
  goalListData = "";
  successfulPom = 0;
  unsuccessfulPom = 0;
  successRate = 0;
  successRateLine.innerHTML = "";
  buttonBox.style.display = "none";
  goalListBox.style.display = "none";
  timer.innerHTML = "";
}

function endPomodoro() {
  // 1 Pomodoro over, ask if it was successful or not
  alertSound.play();
  buttonBox.style.display = "none";
  checkSuccessBox.style.display = "block";
  question.innerHTML = "Did you reach your goal?<br>" +
                        "(" + currentGoal + ")";
}

var yesBtn = document.getElementById('yes-btn').onclick = function() {
  currentListItem = "<li>" + currentGoal + " <span class='successful'>DONE</span></li><br>";
  goalListData += currentListItem;
  goalList.innerHTML = goalListData;
  question.innerHTML = "";
  checkSuccessBox.style.display = "none";
  successfulPom++;
  goalListBox.style.display = "block";
  alertSound.pause();
  reset();
}

var noBtn = document.getElementById('no-btn').onclick = function() {
  currentListItem = "<li>" + currentGoal + " <span class='unsuccessful'>FAILED</span></li><br>";
  goalListData += currentListItem;
  goalList.innerHTML = goalListData;
  question.innerHTML = "";
  checkSuccessBox.style.display = "none";
  unsuccessfulPom++;
  goalListBox.style.display = "block";
  alertSound.pause();
  reset();
}

function reset() {
  newMins = "";
  newSecs = "";
  isMinsTwoDigits = true;
  isSecsTwoDigits = true;
  timer.innerHTML = "";
  goalInput.value = "";
  inputBox.style.display = "block";
  currentGoal = "";
  currentListItem = "";
  minutes = 25;
  seconds = 00;
  successRate = ((successfulPom/(successfulPom+unsuccessfulPom))*100).toFixed(2);
  successRateLine.innerHTML = successRate + "%";
  clearInterval(countdown);
}
