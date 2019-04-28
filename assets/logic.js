var p1Win = 0;
var p1Loss = 0;
var p2Win = 0;
var p2Loss = 0;
var draw =0;
var player1choice = "";
var player2choice = "";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDkzpAXShOHKeUdkKWlZCxy-4G8Oa-ANhs",
  authDomain: "week-8-chat-log.firebaseapp.com",
  databaseURL: "https://week-8-chat-log.firebaseio.com",
  projectId: "week-8-chat-log",
  storageBucket: "week-8-chat-log.appspot.com",
  messagingSenderId: "842004167328"
};
firebase.initializeApp(config);

var database = firebase.database();
getChat();

$("#chatSubmit").on("click", function(){
  pushChat();
});

$(document).keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if (keycode == '13'){
     pushChat();
  }
});

function UpdateChatBox(chat, time){
  var TnC = time + " " + chat;
  $("#chatbox").append($("<p>").text(TnC));
}

function pushChat(){
  var dChat = $("#userInput").val();
  if (dChat == "" || dChat == null){
    alert("Please enter proper text.")
  } else {
    console.log("Current Text in chat is:")
    console.log(dChat);
    var dTime = moment().format("HH:mm");
    console.log("Current Time is: ")
    console.log(dTime);
    $("#userInput").val("");
    database.ref().push({
      'dChat': dChat,
      'dTime': dTime
    });
  }
};

function getChat(){
  database.ref().on("child_added", function(child){
    var dChat = child.val().dChat;
    var dTime = child.val().dTime;
    console.log(dChat);
    console.log(dTime);
    UpdateChatBox(dChat, dTime);
  });

}

//Rock-Paper-Scissors
$("#p1rock").on("click", function(){
  player1choice = 'rock';
});

$("#p1paper").on("click", function(){
  player1choice = 'paper'
});

$("#p1scissors").on("click", function(){
  player1choice = 'scissors'
});

$("#p2rock").on("click", function(){
  player2choice = 'rock';
});

$("#p2paper").on("click", function(){
    player2choice = 'paper';
});

$("#p2scissors").on("click", function(){
  player2choice = 'scissors';
});

$("#submitcompare").on("click", function(){
  if (player1choice === "" || player2choice === ""){
    alert("Not all players have made a choice");
    console.log("Invalid: Please have both players select a new button");
  } else {
  pushChoice();
  getChoice();
  resetChoice();
  }
});

function pushChoice(){
  database.ref("playerChoice").update({
    'player1': player1choice,
    'player2': player2choice
  })
};

function getChoice(){
  database.ref("/playerChoice").once("value").then(function(dataSnapshot){
    console.log(dataSnapshot.val());
    var p1Choice = dataSnapshot.val().player1
    var p2Choice = dataSnapshot.val().player2
    compareChoice(p1Choice, p2Choice);
  })
};

function resetChoice(){
  player1choice = ""
  player2choice = ""
  pushChoice();
};


function compareChoice(p1Choice, p2Choice){
  if (p1Choice === "rock" && p2Choice === "rock"){
    draw++
    console.log("Draw")
  } else if (p1Choice === "rock" && p2Choice === "paper") {
    p2Win++
    p1Loss++
    console.log("Player 2 Win");
  } else if (p1Choice === "rock" && p2Choice === "scissors"){
    p1Win++
    p2Loss++
    console.log("Player 1 Win");
  } else if (p1Choice === "paper" && p2Choice === "rock"){
    p1Win++
    p2Loss++
    console.log("Player 1 Win");
  } else if (p1Choice === "paper" && p2Choice === "paper"){
    draw++
    console.log("Draw");
  } else if (p1Choice === "paper" && p2Choice === "scissors"){
    p1Loss++
    p2Win++
    console.log("Player 2 Win");
  } else if (p1Choice === "scissors" && p2Choice === "rock"){
    p1Loss++
    p2Win++
    console.log("Player 2 Win");
  } else if (p1Choice === "scissors" && p2Choice === "paper"){
    p1Win++
    p2Loss++
    console.log("Player 1 Win");
  } else if (p1Choice === "scissors" && p2Choice === "scissors"){
    draw++
    console.log("Draw");
  }
};
