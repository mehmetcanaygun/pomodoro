var currentGoal;
var checkSuccessBox = document.getElementById('check-success-box');
var question = document.getElementById('question');
var goalList = document.getElementById('goal-list');
var currentListItem = "";
var goalListData = "";
var countdown;

//Timer variables
var minutes = 00;
var seconds = 02;

var saveGoalBtn = document.getElementById('save-goal-btn').onclick = function() {
  var goalInput = document.getElementById('goal-input').value;
  if(goalInput == "") {
    alert("Enter a goal!");
  } else {
    currentGoal = goalInput;
  }
}

var startBtn = document.getElementById('start-btn').onclick = function() {
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
  reset();
}

var noBtn = document.getElementById('no-btn').onclick = function() {
  currentListItem = "<li>" + currentGoal + " <span class='unsuccessful'>FAILED</span></li><br>";
  goalListData += currentListItem;
  goalList.innerHTML = goalListData;
  reset();
}

function reset() {
  currentGoal = "";
  currentListItem = "";
  minutes = 00;
  seconds = 02;
  clearInterval(countdown);
}
