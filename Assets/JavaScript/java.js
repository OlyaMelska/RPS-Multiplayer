let database = firebase.database();
let connectionsRef = database.ref("/connections");
let connectedRef = database.ref(".info/connected");
let initialValue = 2;
let clickCounter = initialValue;

connectedRef.on("value", function(snap) {
  if (snap.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});

database.ref("/clicks").on(
  "value",
  function(snapshot) {
    console.log(snapshot.val());
    clickCounter = snapshot.val().clickCount;
    console.log(clickCounter);
  },
  function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  }
);

// --------------------------------------------------------------

$("#selectPlayer1").on("click", event => {
  $("#player1").removeClass("hidden");
  $(".main-page").attr("class", "hidden");

  clickCounter--;

  // Alert User and reset the counter
  if (clickCounter === 0) {
    alert("Yay, two players are playing!");
    clickCounter = initialValue;
    selectWeapon();
    playTheGame();
  }

  // Save new value to Firebase
  database.ref("/clicks").set({
    clickCount: clickCounter
  });

  // Log the value of clickCounter
  console.log(clickCounter);
});

$("#selectPlayer2").on("click", event => {
  $("#player2").removeClass("hidden");
  $(".main-page").attr("class", "hidden");

  clickCounter--;

  // Alert User and reset the counter
  if (clickCounter === 0) {
    alert("Yay, two players are playing!");
    clickCounter = initialValue;
    selectWeapon();
    playTheGame();
  }

  // Save new value to Firebase
  database.ref("/clicks").set({
    clickCount: clickCounter
  });

  // Log the value of clickCounter
  console.log(clickCounter);
});

function selectWeapon() {
  $(".images1").on("click", event => {
    let weapon = $(event.target).attr("value");
    $("#displayChoice1").removeClass("hidden");
    $("#weapon1").text(weapon);
    database.ref().push({
      player1: weapon
    });
  });
  $(".images2").on("click", event => {
    let weapon = $(event.target).attr("value");
    $("#displayChoice2").removeClass("hidden");
    $("#weapon2").text(weapon);
    database.ref().push({
      player2: weapon
    });
  });
}

function playTheGame() {
  $("#submit").on("click", event => {
    console.log("You are playing the game!");
  });
}
