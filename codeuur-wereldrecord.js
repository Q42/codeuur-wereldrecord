
var config = {
  apiKey: "AIzaSyDg2xwtEGR1FtS4OwLcsYdYZ2V2n7L1I60",
  authDomain: "codeuur-wereldrecord.firebaseapp.com",
  databaseURL: "https://codeuur-wereldrecord.firebaseio.com",
  storageBucket: "codeuur-wereldrecord.appspot.com",
};
firebase.initializeApp(config);

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

var db = firebase.database();
var submissions = db.ref('/submissions')

// counter for amount of submissions
var throttle = null;
amountOfSubmissions = 0;
submissions.on('child_added', function(data) {
  updateAmountOfSubmissions(1);
});
submissions.on('child_removed', function(data) {
  updateAmountOfSubmissions(-1);
});
function updateAmountOfSubmissions(count) {
  amountOfSubmissions = amountOfSubmissions + count;
  if (throttle != null) clearTimeout(throttle);
  throttle = setTimeout(function() {
    document.getElementById('counter').innerText = amountOfSubmissions;
  }, 10);
}



addSubmission = function() {
  console.log('adding submission');
  submissions.push({
    date: new Date().getTime(),
    name: document.getElementById('naam').value,
    school: document.getElementById('school').value
  });
}
