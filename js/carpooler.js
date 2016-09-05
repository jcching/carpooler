
$(function() {
	console.log("hello!Welcome to Carpooler!");
	showView("startView");
});


//handler binding
$("#newTripButton").click(tripStart);
$("#endTripButton").click(tripEnd);







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



//utility functions
function showView(viewName) {
	// view management system, 
	// all views are in divs with class view 
	// and custom id
	$("div.view").hide();
	var nameCache = "#"+viewName;
	$(nameCache).show();

}