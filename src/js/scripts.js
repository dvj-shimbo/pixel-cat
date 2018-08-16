$(window).on("load", function() {
	"use strict";

	// User's functions

//	console.log("scripts.js is loaded");

/**
    $(".work-sample a").mouseover(function() {



        var workSample = $(this);


        if (workSample.attr("data-mouseover") !== "true") {

            console.log("over");

            workSample.attr("data-mouseover", "true");

//            workSample.animate({
//                "margin-left": "5%"
//            }, 400).animate({
//                "margin-left": ""
//            }, 400);



			if (! workSample.find(".icon-arrow-right").length) {

                workSample.append("<div class=\"icon-arrow-right\"></div>");

                var arrow = workSample.find(".icon-arrow-right");

                console.log("Arrow APPEND");

                arrow.animate({
	                "margin-left": "5%"
	            }, 450).animate({
	                "margin-left": ""
	            }, 450);

			}




//            if (! workSample.hasClass("arrow")) {
//
//            	workSample.addClass("arrow");
//
//                console.log("arrow");
//
//                var interval = setInterval(function () {
//
//                    console.log("END");
//
//                    clearInterval(interval);
//
// //                   workSample.removeClass("arrow");
//
//                }, 900);
//
//			}


		}

	}).mouseleave(function() {

//        console.log("out");
//        $(this).attr("data-mouseover", "false");

    });
/**/

/**/
	$(".work-sample a").mouseover(function() {

		console.log("over");

        var workSample = $(this);

        workSample.attr("data-mouseover", "true");

		if (! workSample.hasClass("arrow")) {

            console.log("over arrow animated");

            workSample.addClass("arrow animated");

            var interval = setInterval(function () {
                clearInterval(interval);

                console.log("over animated END");

                workSample.removeClass("animated");

                if (workSample.attr("data-mouseover") === "false") {

                    console.log("over arrow END");

                    workSample.removeClass("arrow");
				}



			}, 900);

		}

	}).mouseleave(function() {

        console.log("out");

     //   var workSample = $(this);

        $(this).attr("data-mouseover", "false");


        if (! $(this).hasClass("animated")) {
            $(this).removeClass("arrow animated");
		}

//        if (workSample.hasClass("arrow")) {
//
//		}

	});
/**/




 /**
     $(".work-sample a").mouseover(function() {

     	console.log("over");

        var workSample = $(this);

        if (workSample.attr("data-mouseover") !== "true") {

            if (! workSample.hasClass("animated")) {

                console.log("over animated");

                workSample.addClass("animated");

                var interval = setInterval(function () {
                    clearInterval(interval);

                    console.log("over animated END");

                    workSample.removeClass("animated");
                }, 900);

            }
		}

	}).mouseleave(function() {

        console.log("out");

     //   var workSample = $(this);

        $(this).attr("data-mouseover", "false");


        if (! $(this).hasClass("animated")) {
            $(this).removeClass("animated");
		}

//        if (workSample.hasClass("arrow")) {
//
//		}

	});
/**/










});