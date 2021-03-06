
var config = {
  apiKey: "AIzaSyDg2xwtEGR1FtS4OwLcsYdYZ2V2n7L1I60",
  authDomain: "codeuur-wereldrecord.firebaseapp.com",
  databaseURL: "https://codeuur-wereldrecord.firebaseio.com",
  storageBucket: "codeuur-wereldrecord.appspot.com",
};
firebase.initializeApp(config);

var db = firebase.database();
var submissions = db.ref('/submissionCounts')
var $div = $('#students');
window.all = [];
window.grouped = {};

window.excludeName = ["Keukerol", "Bloem"]

var subm = 0;
submissions.on('child_added', function(data) {
  subm++;
  var counter = 0;
  var key = data.key;
  if (data.child('namesCount').exists()) {
    counter = data.child('namesCount').val();
    updateAmountOfSubmissions(counter);
  }
  else if (data.child('names').exists()) {
    counter = data.child('names').val().filter(function(n) {
      var add = n.length > 0;
      if (add && (n.length <= 1 || window.excludeName.indexOf(n) >= 0)) {
        console.log('excluding', n);
        return false;
      }
      return add
    }).length;
    updateAmountOfSubmissions(counter);
  }

  // window.all
  var cookie = data.child('cookie').val();
  var el = { _school: data.child('school').val(), namesCount: counter };
  if (data.child('names').exists()) {
    var names = data.child('names').val();
    if (names[0].length > 0) el.name1 = names[0];
    if (names[1].length > 0) el.name2 = names[1];
    if (names[2].length > 0) el.name3 = names[2];
  }
  el.zCookie = cookie;
  window.all.push(el);

  // window.grouped = cookies
  if (!window.grouped[cookie]) { window.grouped[cookie] = 0 }
  window.grouped[cookie]++;
});

submissions.on('child_removed', function(data) {
  if (data.child('names').exists()) {
    updateAmountOfSubmissions(-data.child('names').val().filter(function(n) { return n.length > 0 }).length);
  }
});

var amountOfSubmissions = 0;

function updateAmountOfSubmissions(count) {
  amountOfSubmissions += count;
  document.getElementById("studentcount").innerHTML = amountOfSubmissions
}
