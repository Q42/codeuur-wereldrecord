
var config = {
  apiKey: "AIzaSyDg2xwtEGR1FtS4OwLcsYdYZ2V2n7L1I60",
  authDomain: "codeuur-wereldrecord.firebaseapp.com",
  databaseURL: "https://codeuur-wereldrecord.firebaseio.com",
  storageBucket: "codeuur-wereldrecord.appspot.com",
};
firebase.initializeApp(config);

var db = firebase.database();
var submissions = db.ref('/submissions')

// counter for amount of submissions
amountOfSubmissions = 0;
submissions.on('child_added', function(data) {
  amountOfSubmissions++;
});
submissions.on('child_removed', function(data) {
  amountOfSubmissions--;
});

addSubmission = function() {
  console.log('adding submission');
  submissions.push({
    date: new Date().getTime(),
    name: document.getElementById('naam').value,
    school: document.getElementById('school').value
  });
}
