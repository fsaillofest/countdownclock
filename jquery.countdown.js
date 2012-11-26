/*!
 * jquery.countdown.js - Count down clock plugin
 * author : Fleur Saillofest
 * 
 * Use:
 * $('#myCount').countdownClock([opts]);
 * with by default:
 * opts = {
	total: 30, // Total of seconds to count down
	interval: 1, // Interval when turning the clock in seconds
	background: '#000000' // background color of the clock
 }
 *
 * Inspired by:
 * jquery.tzineClock.js - Tutorialzine Colorful Clock Plugin
 * http://tutorialzine.com/
 *
 * Licensed under MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($){
	
	// A global array used by the functions of the plug-in:
	var gVars = {};

	// Extending the jQuery core:
	$.fn.countdownClock = function(opts){
	
		// "this" contains the elements that were selected when calling the plugin: $('elements').countdownClock();
		// If the selector returned more than one element, use the first one:
		
		var container = this.eq(0);
	
		if(!container)
		{
			try{
				console.log("Invalid selector!");
			} catch(e){}
			
			return false;
		}
		
		if(!opts) opts = {}; 
		
		var defaults = {
			/* Additional options will be added in future versions of the plugin. */
			total: 30, // Total of seconds to count down
			interval: 1, // Interval when turning the clock in seconds
			background: '#000000' // background color of the clock
		};
		
		/* Merging the provided options with the default ones: */
		$.each(defaults,function(k,v){
			opts[k] = opts[k] || defaults[k];
		})

		// Calling the setUp function and passing the container,
		// will be available to the setUp function as "this":
		setUp.call(container, opts);
		
		return this;
	}

	$.fn.startCount = function(){
		// Setting up a interval, executed every opts.interval milliseconds:
		var time = gVars.opts.total;
		// Display the starting count without delay
		animation(gVars.timer, time, gVars.opts.total);
		time = time - gVars.opts.interval;
		// Then display the change at the chosen interval
		var interEvent = setInterval(function(){
			animation(gVars.timer, time, gVars.opts.total);
			time = time - gVars.opts.interval;
			if (time < 0) {clearInterval(interEvent);}
		},gVars.opts.interval*1000);
	}

	function setUp(opts)
	{

		var divClass = 'timer';
		var tmp;

		// Creating a new element and setting the color as a class name:
		
		tmp = $('<div>').attr('class',divClass+' clock').html(
			'<div class="display"></div>'+
			
			'<div class="front left"></div>'+
			
			'<div class="rotate left">'+
				'<div class="bg left"></div>'+
			'</div>'+
			
			'<div class="rotate right">'+
				'<div class="bg right"></div>'+
			'</div>'
		);

		// Appending to the container:
		$(this).append(tmp);
		resizeClock();
		$(window).resize(resizeClock);
		
		// Set the background color
		$('.front').css('background-color', opts.background);

		// Assigning some of the elements as variables for speed:
		tmp.rotateLeft = tmp.find('.rotate.left');
		tmp.rotateRight = tmp.find('.rotate.right');
		tmp.display = tmp.find('.display');
		
		// Adding the dial as a global variable. Will be available as gVars.colorName
		gVars[divClass] = tmp;
		gVars["opts"] = opts;
        
	}
	
	function resizeClock() {
		// Keeping a square clock container
		$(".clock").css('height', $(".clock").width() + 'px');
		var font = 0.3*$(".clock").width();
		// adapting the font to the clock size
		$(".clock .display").css('font-size', font + 'px');
	}

	function animation(clock, current, total)
	{
		// Calculating the current angle:
		//var angle = (360/total)*(current+1);
		var angle = (360/total)*(total-current);

		var element;

		if(current == total)
		{
			// Hiding the right half of the background:
			clock.rotateRight.hide();
			
			// Resetting the rotation of the left part:
			rotateElement(clock.rotateLeft,0);
		}
		
		if(angle<=180)
		{
			// The left part is rotated, and the right is currently hidden:
			element = clock.rotateLeft;
		}
		else
		{
			// The first part of the rotation has completed, so we start rotating the right part:
			clock.rotateRight.show();
			clock.rotateLeft.show();
			
			rotateElement(clock.rotateLeft,180);
			
			element = clock.rotateRight;
			angle = angle-180;
		}

		rotateElement(element,angle);
		
		// Setting the text inside of the display element, inserting a leading zero if needed:
		// Display only round numbers
		var disp = current.toString().split(".")[0];
		clock.display.html(current<10?'0'+disp:disp);
		
	}
	
	function rotateElement(element,angle)
	{
		// Rotating the element, depending on the browser:
		var rotate = 'rotate('+angle+'deg)';
		
		if(element.css('MozTransform')!=undefined)
			element.css('MozTransform',rotate);
			
		else if(element.css('WebkitTransform')!=undefined)
			element.css('WebkitTransform',rotate);
	
		// A version for internet explorer using filters, works but is a bit buggy (no surprise here):
		else if(element.css("filter")!=undefined)
		{
			var cos = Math.cos(Math.PI * 2 / 360 * angle);
			var sin = Math.sin(Math.PI * 2 / 360 * angle);
			
			element.css("filter","progid:DXImageTransform.Microsoft.Matrix(M11="+cos+",M12=-"+sin+",M21="+sin+",M22="+cos+",SizingMethod='auto expand',FilterType='nearest neighbor')");
	
			element.css("left",-Math.floor((element.width()-200)/2));
			element.css("top",-Math.floor((element.height()-200)/2));
		}
	
	}
	
})(jQuery);