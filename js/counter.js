
var counterInitialDuration = 5;
var counterSubsequentDuration = 1;
var confettiStarted = false;
var brokeWorldRecord = 9782;
var codeuurWrCounter = 11368;
var deadline = new Date("2016-10-14T11:20:00+02:00");

var counter = new CountUp("counteramount", 0, codeuurWrCounter, 0, counterInitialDuration, {
  useEasing : true,
  easingFn: function (t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  },
  useGrouping : true,
  separator : '.',
  decimal : ','
});

var counterElement = document.getElementById("counteramount");

counter.printValue = function(value) {
    var result = counter.formattingFn(value);
    counterElement.innerHTML = result;

    if(value >= brokeWorldRecord && !confettiStarted) {
      startConfetti();
      confettiStarted = true;
    }
};

counter.start();

// counter for amount of submissions
amountOfSubmissions = 0;

//////////////////
// Countdown
//////////////////
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);

  function updateClock() {
    var t = getTimeRemaining(endtime);
    var time = ('0' + t.hours).slice(-2) + "<small>:</small>" +
                      ('0' + t.minutes).slice(-2) + "<small>:</small>" +
                      ('0' + t.seconds).slice(-2);

    if(t.days > 0) {
      clock.innerHTML = t.days + "<small>d</small> " + time;
    } else {
      clock.innerHTML = time;
    }

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

if (document.getElementById('clockdiv')) {
  initializeClock('clockdiv', deadline);
}

//////////////////
// Confetti
//////////////////
var canvas = Confetti.createCanvas(
  document.querySelector('div'),
  document.querySelector('canvas')
);

var config = {
  angle: 0.011,
  tiltAngle: 0.1,
  draw: draw,
  updatePosition: updatePosition,
  updateState: updateState
};


var particles = new Array(500);
for (var i = 0; i < particles.length; i++) {
  particles[i] = Confetti.create({
    x: Confetti.randomFrom(0, canvas.width),
    y: 0,
    r: Confetti.randomFrom(5, 50),
    tilt: Confetti.randomFrom(-10, 0),
    tiltAngle: 0,
    tiltAngleIncrement: Confetti.randomFrom(0.05, 0.12, 100)
  });
}

function startConfetti() {
  canvas.step(particles, config)();
}

function draw(confetti) {
  canvas.context.beginPath();
  canvas.context.globalAlpha=1;
  canvas.context.lineWidth = confetti.r / 2;
  canvas.context.strokeStyle = confetti.color;
  canvas.context.moveTo(confetti.x + confetti.tilt + (confetti.r / 4),
    confetti.y);
  canvas.context.lineTo(confetti.x + confetti.tilt, confetti.y +
    confetti.tilt + (confetti.r / 4));
  canvas.context.stroke();
}

function updatePosition(confetti, idx) {
  confetti.tiltAngle += confetti.tiltAngleIncrement;
  confetti.y += (Math.cos(config.angle + confetti.d) + 1 + confetti.r / 2) / 2;
  confetti.x += Math.sin(config.angle);
  confetti.tilt = 15 * Math.sin(confetti.tiltAngle - idx / 3);

  if (confetti.isFlakeExiting(canvas)) {
    if (idx % 5 > 0 || idx % 2 === 0) {
      confetti.x = Confetti.randomFrom(0, canvas.width);
      confetti.y = -10;
      confetti.tilt = Confetti.randomFrom(-10, 0);

    } else {
      if (Math.sin(config.angle) > 0) {
        confetti.x = -5;
        confetti.y = Confetti.randomFrom(0, canvas.height);
        confetti.tilt = Confetti.randomFrom(-10, 0);
      } else {
        confetti.x = canvas.width + 5;
        confetti.y = Confetti.randomFrom(0, canvas.height);
        confetti.tilt = Confetti.randomFrom(-10, 0);
      }
    }
  }
}

function updateState() {
  this.angle += 0.01;
  this.tiltAngle += 0.1;
}
