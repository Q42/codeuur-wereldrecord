
var config = {
  apiKey: "AIzaSyDg2xwtEGR1FtS4OwLcsYdYZ2V2n7L1I60",
  authDomain: "codeuur-wereldrecord.firebaseapp.com",
  databaseURL: "https://codeuur-wereldrecord.firebaseio.com",
  storageBucket: "codeuur-wereldrecord.appspot.com",
};
firebase.initializeApp(config);

var db = firebase.database();
var submissions = db.ref('/submissions')

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

// then to call it, plus stitch in '4' in the third group
if (!getCookie('guid')) {
  guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  setCookie('guid',guid,7);
}

addSubmission = function() {
  console.log('adding submission');

  var date = new Date();
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  if (year != 2016 || monthIndex != 9 || day != 14) {
    alert('Met dit formulier geef je aan dat je aan het wereldrecord mee doet.\n\nDat kan alleen op 14 oktober! Kom vrijdag a.u.b. terug.');
    return;
  }

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
    cookie: getCookie('guid'),
    names: [
      document.getElementById('naam_1').value,
      document.getElementById('naam_2').value,
      document.getElementById('naam_3').value
    ],
    school: document.getElementById('school').value
  });
}
