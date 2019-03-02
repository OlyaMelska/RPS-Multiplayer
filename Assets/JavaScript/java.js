let database = firebase.database();
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
console.log(database);

connectedRef.on("value", function(snap) {
  // If they are connected..
  if (snap.val()) {
    // Add user to the connections list.
    var con = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

$("#selectPlayer1").on("click", event => {
  $("#player1").removeClass("hidden");
  $(".main-page").attr("class", "hidden");
  database.ref().push({
    player1: true
  });
});

$("#selectPlayer2").on("click", event => {
  $("#player2").removeClass("hidden");
  $(".main-page").attr("class", "hidden");
  database.ref().push({
    player2: true
  });
});

$(".images").on("click", event => {
  let weapon = $(event.target).attr("value");
  $("#displayChoice1").removeClass("hidden");
  $("#weapon1").text(weapon);
  $("#displayChoice2").removeClass("hidden");
  $("#weapon2").text(weapon);
});

$("#submit").on("click", event => {});
