var currentGoal;
var inputBox = document.getElementById('input-box');
var goalInput = document.getElementById('goal-input');
var checkSuccessBox = document.getElementById('check-success-box');
var question = document.getElementById('question');
var goalList = document.getElementById('goal-list');
var currentListItem = "";
var goalListData = "";
var countdown;
var successfulPom = 0;
var unsuccessfulPom = 0;
var successRateLine = document.getElementById('success-rate');
var successRate = 0;
var isPaused = false;

//Timer variables
var minutes = 00;
var seconds = 02;

var saveGoalBtn = document.getElementById('save-goal-btn').onclick = function() {
  if(goalInput.value == "") {
    alert("Enter a goal!");
  } else {
    currentGoal = goalInput.value;
  }
  inputBox.style.display = "none";
}

var startBtn = document.getElementById('start-btn').onclick = function() {
  isPaused = false;
  startTimer();
}

function startTimer() {
  // window.setInterval(function(){
  //   if(minutes == 0 && seconds == 0) {
  //     endPomodoro();
  //   } else {
  //     if(seconds == 00) {
  //       seconds = 60;
  //       minutes--;
  //     }
  //     seconds--;
  //     console.log(minutes + " : " + seconds);
  //   }
  // }, 1000);

  countdown = setInterval(startCountdown, 1000);
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
    console.log(minutes + " : " + seconds);
  }
}

var pauseBtn = document.getElementById('pause-btn').onclick = function() {
  if(isPaused == false) {
    isPaused = true;
    clearInterval(countdown);
  }
}

var restartBtn = document.getElementById('restart-btn').onclick = function() {
  reset();
  goalList.innerHTML = "";
  goalListData = "";
  successfulPom = 0;
  unsuccessfulPom = 0;
  successRate = 0;
  successRateLine.innerHTML = "";
}

function endPomodoro() {
  // 1 Pomodoro over, ask if it was successful or not
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
  reset();
}

var noBtn = document.getElementById('no-btn').onclick = function() {
  currentListItem = "<li>" + currentGoal + " <span class='unsuccessful'>FAILED</span></li><br>";
  goalListData += currentListItem;
  goalList.innerHTML = goalListData;
  question.innerHTML = "";
  checkSuccessBox.style.display = "none";
  unsuccessfulPom++;
  reset();
}

function reset() {
  goalInput.value = "";
  inputBox.style.display = "block";
  currentGoal = "";
  currentListItem = "";
  minutes = 00;
  seconds = 02;
  successRate = ((successfulPom/(successfulPom+unsuccessfulPom))*100).toFixed(2);
  successRateLine.innerHTML = successRate + "%";
  clearInterval(countdown);
}
