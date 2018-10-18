var database = firebase.database();

database.ref().on("child_added", function(snapshot){

    var currentTime = moment();
    var firstTrain = 0;
    var firstTrainConverted = moment(firstTrain, "HH:mm")
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    var frequency = snapshot.val().frequency;
    var remainder = diffTime % frequency;
    var minutesAway = frequency - remainder;
    var nextArrival = moment().add(minutesAway, "minutes").format("ddd, MMMM Do YYYY, h:mm:ss a");
     //Is Next Arrival calculating correctly?

    $("#train-table tbody").append(
        `
            <tr>
                <td>${snapshot.val().train}</td>
                <td>${snapshot.val().destination}</td>
                <td>${snapshot.val().frequency}</td>
                <td>${nextArrival}</td>
                <td>${minutesAway}</td>
            </tr>
        `
    );
});

$("button").on("click", function(event){
    event.preventDefault();
    var train = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#train-time").val().trim();
    var frequency = $("#frequency").val().trim();

    $("#train-name").val("")
    $("#destination").val("")
    $("#train-time").val("")
    $("#frequency").val("")

    database.ref().push({
        train,
        destination,
        firstTrain,
        frequency,
    });
});

var currentTime = moment().format("ddd, MMMM Do YYYY, h:mm:ss a");
$(".time").text(currentTime);

//setInterval to have the current time automatically update
// var currentTime = setInterval(clock, 1000)

// clock({

// });
