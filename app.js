var firebaseConfig = {
  apiKey: "AIzaSyAbaEhxwgGdsdMOSHHkoNezt2xIqjG0EmA",
  authDomain: "republique-73762.firebaseapp.com",
  databaseURL: "https://republique-73762.firebaseio.com",
  projectId: "republique-73762",
  storageBucket: "republique-73762.appspot.com",
  messagingSenderId: "892956897406",
  appId: "1:892956897406:web:605e771f32b597e206e82f",
  measurementId: "G-XKVYMF7YEQ"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
let trainName;
let destination;
let fTT;
let freqTime;

$("#trainSubmit").on("click", function(event) {
  event.preventDefault();

  trainName = $("#trainName")
    .val()
    .trim();
  destination = $("#destination")
    .val()
    .trim();
  fTT = $("#fTT")
    .val()
    .trim();
  freqTime = $("#freqTime")
    .val()
    .trim();

  var newTrain = {
    trainName: trainName,
    destination: destination,
    fTT: fTT,
    freqTime: freqTime
  };

  database.ref().push(newTrain);
});

database.ref().on("child_added", function(childSnapshot) {
  let minuteAway = childSnapshot.val().freqTime;

  let newRow = $("<tr>").append(
    $("<td>").text(childSnapshot.val().trainName),
    $("<td>").text(childSnapshot.val().destination),
    $("<td>").text(childSnapshot.val().fTT),
    $("<td>").text(childSnapshot.val().freqTime),
    $("<td>").text(minuteAway)
  );

  $("#train-table > tbody").append(newRow);
});
