$(window).on("load", function() {
	"use strict";

	// User's functions

//	console.log("scripts.js is loaded");


/**/
	$(".work-sample a, .about a").mouseover(function() {

//		console.log("over");

        var a = $(this);

        a.attr("data-mouseover", "true");

		if (! a.hasClass("arrow")) {

 //           console.log("over arrow animated");

            a.addClass("arrow animated");

            var interval = setInterval(function () {
                clearInterval(interval);

 //               console.log("over animated END");

                a.removeClass("animated");

                if (a.attr("data-mouseover") === "false") {

 //                   console.log("over arrow END");

                    a.removeClass("arrow");
				}

			}, 900);

		}

	}).mouseleave(function() {

//        console.log("out");

        $(this).attr("data-mouseover", "false");

        if (! $(this).hasClass("animated")) {
            $(this).removeClass("arrow animated");
		}


	});






});