// Class Timer declaration

class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  // Start button arrowed function
  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick(); // placing the tick above setInterval() will help the program to start right away
    this.interval = setInterval(this.tick, 20);
  };
  // Pause button to pause the timer
  pause = () => {
    clearInterval(this.interval);
  };
  // Countdown function
  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.02;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2); // floors the number by extracting extra 9999s
  }
}
