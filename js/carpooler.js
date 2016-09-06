
$(function() {
	console.log("hello!Welcome to Carpooler!");
	showView("startView");
});

var eventLog = [];
var currentlyOnCar = [];
var ledger = [];
var feeCache=0;
var lastLoc=0;


//handler binding
$("#newTripButton").click(tripStart);
$("#tripEndSubmitButton").click(tripEnd);
$("#gotOnSubmitButton").click(gotOn);
$("#gotOffSubmitButton").click(gotOff);
$("#paidFeeSubmitButton").click(paidFee);
//paidFeeSubmitButton






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
	var location=$("#endLocationBox").val();

	if(location==""){
		console.log("something wasn't filled in");
	}else{
		//clear out
		$("#endLocationBox").val("");

		var humanText = "Trip Ended";
		var logEntry = {location:location, text:humanText};
		eventLog.push(logEntry);
		drawLog();

		//calculate new ledger entries before updating on-car list & last loc
		updateLedger(parseInt(location));

		//draw the updated ledger
		drawLedger();





		$('#tripEndModal').modal('hide');
	}

	//everybody gets off

	//showView("startView");
}

function gotOn(){
	var name=$("#nameBox").val();
	var location=$("#locationBox").val();

	if(name==""||location==""){
		console.log("something wasn't filled in");
	}else{

		//form filled in properly, not clear out the boxes
		$("#nameBox").val("");
		$("#locationBox").val("");
	var humanText = name+" got on";
	var logEntry = {location:location, text:humanText};

	//calculate new ledger entries before updating on-car list
	updateLedger(parseInt(location));

	eventLog.push(logEntry);
	drawLog();

	//update dropdown menu on "getoff"
	currentlyOnCar.push(name);
	drawOnCarList();

	//update ledger
	var ledgerEntry = {name:name, cost:0};
	ledger.push(ledgerEntry);

	//draw the updated ledger
	drawLedger();





	console.log("Entry added:");
	console.log(humanText);
	$('#gotOnModal').modal('hide');

	//update last known location in entry
	lastLoc=parseInt(location);
}
}

function gotOff() {
	var name=$("#nameList").val();
	var location=$("#offlocationBox").val();
	if(name==""||location==""||name==null){
		console.log("something wasn't filled in");
	}else{

		//form filled in properly, now clear out the boxes
		$("#nameList").val("");
		$("#offlocationBox").val("");

		var humanText = name+" got off";
		var logEntry = {location:location, text:humanText};


		//calculate new ledger entries before updating on-car list
		updateLedger(parseInt(location));

		//get them out of the oncar list
		var index = currentlyOnCar.indexOf(name);
		if (index > -1) {
		    currentlyOnCar.splice(index, 1);
		}
		drawOnCarList();


		console.log("Entry added:");
		console.log(humanText);


		eventLog.push(logEntry);
		drawLog();

		//draw the updated ledger
		drawLedger();

		$('#gotOffModal').modal('hide');

		//update last known location in entry
		lastLoc=parseInt(location);
	}

}

function updateLedger(currentLoc) {
	var sectionCost;
	var personCost;
	var peopleCount;
	// check km since last entry
		//check if there are entries at all

	// add any tunnel fees, then clear out the cache
		sectionCost=currentLoc-lastLoc;
		sectionCost=sectionCost+feeCache;
		feeCache=0;
	// divide by amount of people currently on car
		//count people on car
		peopleCount=currentlyOnCar.length;
		personCost=sectionCost/peopleCount;

	// add value to ledger entries of those on car
	console.log("updating ledger");
	// console.log(currentLoc);
	// console.log(lastLoc);
	// console.log(sectionCost);
	// console.log(personCost);

		for (var i = 0; i < currentlyOnCar.length; i++) {
			//loop through the names on the car
			var currentName= currentlyOnCar[i];
			for (var j = ledger.length - 1; j >= 0; j--) {
				if(ledger[j].name==currentlyOnCar[i]){
					ledger[j].cost+=parseInt(personCost);
					break;
				}
				//ledger[j]
			}

		}
		



}

function paidFee(){
	//triggered whenever fees are paid, used in 
	//feeCache;
	//paidFeeBox


	var feeInput=$("#paidFeeBox").val();
	if(feeInput==""||feeInput==null){
		console.log("something wasn't filled in");
	}else{
		//clear out input box
		$("#paidFeeBox").val("");

		var humanText = "Fee Paid:"+feeInput;


		console.log();
		var logEntry = {location:"-", text:humanText};
		eventLog.push(logEntry);
		drawLog();

		//fee cache accumulates any unpaid fees
		feeCache+=parseInt(feeInput);

		//update ledger with 
		updateLedger(lastLoc);
		//draw the updated ledger
		drawLedger();


		$('#paidFeeModal').modal('hide');

	}
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

function drawLedger() {
	$("#ledgerTable > tbody > tr.ledgerEntry").remove();
	for (var i = 0; i < ledger.length; i++) {
		$('#ledgerTable').append('<tr class="ledgerEntry"><td>'+ledger[i].name+'</td><td>'+ledger[i].cost+'</td></tr>');
	}
}