$(document).ready(function(){
	/* This code is executed after the DOM has been completely loaded */

	$('#fancyClock').countdownClock({interval:0.05});
	$('#fancyClock').startCount();
});