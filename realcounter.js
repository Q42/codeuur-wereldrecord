
var config = {
  apiKey: "AIzaSyDg2xwtEGR1FtS4OwLcsYdYZ2V2n7L1I60",
  authDomain: "codeuur-wereldrecord.firebaseapp.com",
  databaseURL: "https://codeuur-wereldrecord.firebaseio.com",
  storageBucket: "codeuur-wereldrecord.appspot.com",
};
firebase.initializeApp(config);

var db = firebase.database();
var submissions = db.ref('/submissions')

submissions.on('child_added', function(data) {
  if (data.child('names').exists()) {
    var names = data.child('names').val();
    var filledNames = names.filter(function(n) { return n.length > 0 });
    updateAmountOfSubmissions(filledNames.length);
  }
});

submissions.on('child_removed', function(data) {
  if (data.child('names').exists()) {
    var names = data.child('names').val();
    var filledNames = names.filter(function(n) { return n.length > 0 });
    updateAmountOfSubmissions(-filledNames.length);
  }
});

var amountOfSubmissions = 0;

function updateAmountOfSubmissions(count) {
  amountOfSubmissions += count;
  document.getElementById("studentcount").innerHTML = amountOfSubmissions
}
