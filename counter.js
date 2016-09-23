
var config = {
  apiKey: "AIzaSyDg2xwtEGR1FtS4OwLcsYdYZ2V2n7L1I60",
  authDomain: "codeuur-wereldrecord.firebaseapp.com",
  databaseURL: "https://codeuur-wereldrecord.firebaseio.com",
  storageBucket: "codeuur-wereldrecord.appspot.com",
};
firebase.initializeApp(config);

var db = firebase.database();
var submissions = db.ref('/submissions')

var counter = new CountUp("counter", 0, 0, 0, 30, {
  useEasing : false,
  useGrouping : true,
  separator : '.',
  decimal : ','
});

counter.start()

// counter for amount of submissions
amountOfSubmissions = 0;
submissions.on('child_added', function(data) {
  if (data.child('names').exists()) {
    updateAmountOfSubmissions(data.child('names').val().filter(function(n) { return n.length > 0 }).length);
  }
});
submissions.on('child_removed', function(data) {
  if (data.child('names').exists()) {
    updateAmountOfSubmissions(-data.child('names').val().filter(function(n) { return n.length > 0 }).length);
  }
});
function updateAmountOfSubmissions(count) {
  amountOfSubmissions = amountOfSubmissions + count;
  counter.update(amountOfSubmissions * 500);
}