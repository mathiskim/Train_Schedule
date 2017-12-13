
  // Initialize Firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA0e8QGnkacV_-YPIARrf9g2xgFi1aRWSs",
    authDomain: "trainschedule-km.firebaseapp.com",
    databaseURL: "https://trainschedule-km.firebaseio.com",
    projectId: "trainschedule-km",
    storageBucket: "trainschedule-km.appspot.com",
    messagingSenderId: "859899317031"
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();

  console.log(trainData);

  $("#addTrainBtn").on("click", function(){
    console.log('click is working');
      event.preventDefault();
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
      var frenquency = $("#frenquencyInput").val().trim();

      trainData.ref().set({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frenquency: frenquency
      });
      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#firstTrainInput").val("");
      $("#frenquencyInput").val(""); 
        return false;
})
      trainData.ref().on("value",function(snapshot) {
        var trainName1 = snapshot.val().trainName;
        var destination2 = snapshot.val().destination;
        var firstTrain3 = snapshot.val().firstTrain;
        var frenquency4 = snapshot.val().frenquency;

        console.log("trainName " + trainName1);
        console.log("destination " + destination2);
        console.log("firstTrain " + firstTrain3);
        console.log("frenquency " + frenquency4);

        var remainder = moment().diff(moment.unix(firstTrain3), "minutes")%frenquency4;
        var minutes = frenquency4 - remainder;
        var arrival = moment().add(minutes,"m").format("hh:mm A");

        console.log("remainder " + remainder);
        console.log("minutes " + minutes);
        console.log("arrival " + arrival);

        $("#trainTable > tBody").append("<tr><td>"+trainName1+"</td><td>"+destination2+"</td><td>"+frenquency4+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
      
  });
