
$(function() {
	console.log("hello!Welcome to Carpooler!");
	showView("startView");
});

var eventLog = [];
var currentlyOnCar = [];


//handler binding
$("#newTripButton").click(tripStart);
$("#endTripButton").click(tripEnd);
$("#gotOnSubmitButton").click(gotOn);







//actual logic
function tripStart() {
	console.log("Trip Started on:");
	d = new Date();
	d.toLocaleString(); 
	console.log(d);

	showView("tripView");
}


function tripEnd() {
	console.log("Trip Ended on:");
	d = new Date();
	d.toLocaleString(); 
	console.log(d);

	showView("startView");
}

function gotOn(){
	//should really check if stuff is filled in here
	//but too lazy
	var name=$("#nameBox").val();
	var location=$("#locationBox").val();
	var humanText = name+" got on";
	var logEntry = {location:location, text:humanText};

	eventLog.push(logEntry);

	//draw the log here







	console.log("Entry added:");
	console.log(humanText);
	$('#gotOnModal').modal('hide');
}



//utility functions
function showView(viewName) {
	// view management system, 
	// all views are in divs with class view 
	// and custom id
	$("div.view").hide();
	var nameCache = "#"+viewName;
	$(nameCache).show();

}