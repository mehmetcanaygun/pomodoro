var currentGoal;

//Timer variables
var minutes = 25;
var seconds = 00;

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
  window.setInterval(function(){
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
  }, 1000);
}

function endPomodoro() {
  // 1 Pomodoro over, ask if it was successful or not
}
