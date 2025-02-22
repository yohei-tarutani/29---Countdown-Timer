let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTimeDisplay = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  // clear any running timer
  clearInterval(countdown);

  const now = Date.now(); // ex. 1740251080386
  // Date.now() returns the number of milliseconds elapsed since January 1, 1970 (UTC). Known as the Unix timestamp or epoch time.
  const then = now + seconds * 1000; // ex. seconds = 5 => 5 * 1000 = 5000
  console.log({ now, then }); // ex. { now: 1740251080386, then: 1740251085386 }

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const displayTime = `${minutes}:${
    remainderSeconds >= 10 ? "" : "0"
  }${remainderSeconds}`;
  timerDisplay.textContent = displayTime;
  document.title = displayTime;

  console.log(`${minutes}:${remainderSeconds}`);
}

function displayEndTime(timestamp) {
  // timestamp = "then" above
  const end = new Date(timestamp);
  // ex. Date Sat Feb 22 2025 11:33:55 GMT-0800 (Pacific Standard Time)
  const hour = end.getHours();
  const min = end.getMinutes();

  endTimeDisplay.textContent = `Ends At ${hour > 12 ? hour - 12 : hour}:${
    min >= 10 ? "" : "0"
  }${min}`;

  console.log(`${hour}:${min}`);
}

function startTimer() {
  const seconds = parseInt(this.dataset.time); // make the string a number
  console.log(seconds); // ex. 20, 300, 900, 1200, 3600

  timer(seconds);
}

buttons.forEach((button) => {
  button.addEventListener("click", startTimer);
});

// If HTML elements have name attributes, we can call them by using ".<name-value>".
console.log(document.customForm); // <form id="custom" name="customForm">
console.log(document.customForm.minutes); // <input type="text" name="minutes" placeholder="Enter Minutes">

document.customForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const mins = this.customForm.minutes.value; // value of <input type="text" name="minutes" placeholder="Enter Minutes">
  console.log(mins, mins * 60); // ex. 5 300
  timer(mins * 60);
  this.customForm.reset();
});
