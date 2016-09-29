var game;
var introLightSwitch;
var introEyepiece;
var introDiaphragm;
var introFine;
var introCoarse;
var introLenses;
var introCaliper;

var setupStart;
var setupLightSwitch;
var setupEyepiece;
var setupDiaphragmLight;
var setupDiaphragmHeight;
var setupFine;
var setupCoarse;
var setupLenses;
var setupCaliper;



$(function () {
    $('#microscope').load('img/microscope.svg', function() {

        resizeWindow();
        loadStartMenu();
        loadSubMenu();

        $("#endOption1").click(function () {
            // Start Beginner Mode
            newGame(true, false);
        });


        /*===============intro===============*/
        $("#switch").click(function () {
            console.log("hit")
            if (introLightSwitch.isActive()) {
                introLightSwitch.complete();}
        });

        $("#ocularLensBase, #ocularRight, #ocularLeft").click(function () {
            if (introEyepiece.isActive()) {
                introEyepiece.complete();}
        });

        $("#knobsCoarse").click(function () {
            if (introCoarse.isActive()) {
                introCoarse.complete();}
        });

        $("#knobsFine").click(function () {
            if (introFine.isActive()) {
                introFine.complete();}
        });

        $("#diaphragm").click(function () {
            if (introDiaphragm.isActive()) {
                introDiaphragm.complete();}
        });

        $("#caliperKnob, #caliper, #xcaliper, #ycaliper").click(function () {
            if (introCaliper.isActive()) {
                introCaliper.complete();}
        });

        $("#lenses, #lensesRed, #lensesBlue, #lensesYellow, #lensesWhite").click(function () {
            if (introLenses.isActive()) {
                introLenses.complete();
                $("#popup").removeClass("elementOn");
                $("#popup").addClass("elementOff");
                showAllParts();
            }
        });



        /*===============setup===============*/

        $("#switch").click(function () {
            if (setupLightSwitch.isActive()) {
                setupLightSwitch.complete();}
        });




        $('#ocularRight')
          .draggable()

          // rint.bind('mousedown', function(event, ui){
          .bind('mousedown', function(event, ui){
            // bring target to front
            console.log("hit");
            //$(event.target.parentElement).append( event.target );
          })

          .bind('drag', function(event, ui){
            // console.log(ui.position.left);
            var ocularRight_PosLeft=$("#stage").width()/2.1;
            var maxFreedom =ocularRight_PosLeft/30;
            var ocularRight_PosLeft=
            console.log(event.pageX, event.pageY, $("#ocularRight").width());
            var offSet= Math.max(0,Math.min(maxFreedom,parseFloat(ui.position.left)-ocularRight_PosLeft));
            console.log(  $('#ocularRight').position());
            // var offSet= Math.max(0, Math.min(30,parseFloat(ui.position.left)) );
            $('#ocularRight').attr("transform","translate("+ offSet +")");
            $('#ocularLeft').attr("transform","translate("+ (-offSet) +")");
            // update coordinates manually, since top/left style props don't work on SVG
          });





        if (setupEyepiece.isActive()) {
          setupEyepiece.complete();
        }

        // $("#eyepiece").click(function () {
        //    if (setupEyepiece.isActive()) {
        //        setupEyepiece.complete();}
        // });

        $("#knobsCoarse").click(function () {
           if (setupCoarse.isActive()) {
               setupCoarse.complete();}
        });

        $("#knobsFine").click(function () {
           if (setupFine.isActive()) {
               setupFine.complete();}
        });

        // wrong ID
        $("#diaphragm").click(function () {
           if (setupDiaphragmLight.isActive()) {
               setupDiaphragmLight.complete();}
        });

        // wrong ID
        $(".diaphragm").click(function () {
           if (setupDiaphragmHeight.isActive()) {
               setupDiaphragmHeight.complete();}
        });

        // add IDs
        $("#caliper").click(function () {
           if (setupCaliper.isActive()) {
               setupCaliper.complete();}
        });

        // add IDs
        $("#lenses").click(function () {
           if (setupLenses.isActive()) {
               setupLenses.complete();
               // hide popup bubble
           }
        });

//        mousemove jquery
//        $( "#target" ).mousemove(function( event ) {
//            var msg = "Handler for .mousemove() called at ";
//            msg += event.pageX + ", " + event.pageY;
//            $( "#log" ).append( "<div>" + msg + "</div>" );
//        });



        // $(window).keypress(function(event) {
        //     if (event.which == 32) {
        //        if (spaceBar.isActive()) {
        //            spaceBar.complete();
        //        }
        //    }
        //    if (event.which == 102) {
        //        if (pressF.isActive()) {
        //            pressF.complete();
        //        }
        //    }
        // });



        $("#endOption2").click(function () {
            // Start Intermediate Mode
            if (false)
                newGame(false, false);
        });

        $("#endOption3").click(function () {
            // Start Expert Mode
            if (false)
                newGame(false, true);
        });
        for (var i = 1; i <= 3; i++) {
            initEndOptionHover(i);
        }
    })
});
