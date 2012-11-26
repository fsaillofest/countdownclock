jquery.countdown.js - Countdown clock plugin
==============

A count down clock in CSS3 and JQuery

This plugin is based on jquery.tzineClock.js - Tutorialzine Colorful Clock Plugin
 http://tutorialzine.com/<br/>
I modified it to build a countdown clock.

You can choose the amount of time to count down in seconds and the clock rotation speed.

The clock element design is flexible. You can give it a width in percentage and it will adapt to the size of the page and resize gracefully.  

 Use:<br/>
 $('#myCount').countdownClock([opts]);<br/>
 with by default:<br/>
 opts = {<br/>
	total: 30, // Total to count down in seconds<br/>
	interval: 1, // Interval for the clock rotation speed in seconds<br/>
	background: '#000000' // Background color of the clock<br/>
 }<br/>

 Run demo.html to see an example.
