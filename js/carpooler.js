
$(function() {
	console.log("hello!Welcome to Carpooler!");
	showView("startView");
});

var eventLog = [];
var currentlyOnCar = [];
var ledger = [];


//handler binding
$("#newTripButton").click(tripStart);
$("#endTripButton").click(tripEnd);
$("#gotOnSubmitButton").click(gotOn);
$("#gotOffSubmitButton").click(gotOff);







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

	if(name==""||location==""){
		console.log("something wasn't filled in");
	}else{
	var humanText = name+" got on";
	var logEntry = {location:location, text:humanText};

	eventLog.push(logEntry);
	drawLog();

	currentlyOnCar.push(name);
	drawOnCarList();




	console.log("Entry added:");
	console.log(humanText);
	$('#gotOnModal').modal('hide');
}
}

function gotOff() {
	// body...
	var name=$("#nameList").val();
	var location=$("#offlocationBox").val();
	if(name==""||location==""){
		console.log("something wasn't filled in");
	}else{
		var humanText = name+" got off";
		var logEntry = {location:location, text:humanText};

		eventLog.push(logEntry);
		drawLog();

		//get them out of the oncar list
		var index = currentlyOnCar.indexOf(name);
		if (index > -1) {
		    currentlyOnCar.splice(index, 1);
		}
		drawOnCarList();




		console.log("Entry added:");
		console.log(humanText);

		$('#gotOffModal').modal('hide');
	}

}

function updateLedger() {
	var lastLoc;
	var currentLoc;
	// check km since last entry
	if (eventLog.length>0) {
		//check if there are entries at all
		lastLoc=eventLog[eventLog.length-2].location;
		currentLog

	}
	// add any tunnel fees
	// divide by amount of people currently on car
	// add value to ledger entries of those on car


}

function paidFee(){
	//triggered whenever fees are paid, used in 
}




//view utility functions
function showView(viewName) {
	// view management system, 
	// all views are in divs with class view 
	// and custom id
	$("div.view").hide();
	var nameCache = "#"+viewName;
	$(nameCache).show();

}

function drawLog(){
		//draw the log here from the eventLogArray
	$("#logTable > tbody > tr.logEntry").remove();
	for (var i = 0; i < eventLog.length; i++) {
		$('#logTable').append('<tr class="logEntry"><td>'+eventLog[i].location+'</td><td>'+eventLog[i].text+'</td></tr>');
	}
}

function drawOnCarList(){
	$("#nameList > option").remove();
	for (var i = 0; i < currentlyOnCar.length; i++) {
		$('#nameList').append('<option>'+currentlyOnCar[i]+'</option>');
	}
}