
var config = {
  apiKey: "AIzaSyDg2xwtEGR1FtS4OwLcsYdYZ2V2n7L1I60",
  authDomain: "codeuur-wereldrecord.firebaseapp.com",
  databaseURL: "https://codeuur-wereldrecord.firebaseio.com",
  storageBucket: "codeuur-wereldrecord.appspot.com",
};
firebase.initializeApp(config);

var db = firebase.database();
var submissions = db.ref('/submissions')

addSubmission = function() {
  console.log('adding submission');

  var schoolName = document.getElementById('school').value;
  var naamOne = document.getElementById('naam_1').value;

  if (!schoolName || !naamOne) {
    alert('Vul een schoolnaam en minimaal één leerlingnaam toe om mee te doen aan het wereldrecord!');
    return;
  }

  document.getElementById('studentform').className = "hidden";
  document.getElementById('studentthanksform').className = "";

  submissions.push({
    date: new Date().getTime(),
    names: [
      document.getElementById('naam_1').value,
      document.getElementById('naam_2').value,
      document.getElementById('naam_3').value
    ],
    school: document.getElementById('school').value
  });
}