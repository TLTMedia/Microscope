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


// Used to skip steps when testing
var debug=false;
var intro=true;

$(function () {
        $('#microscope').load('img/microscope.svg', function() {
            resizeWindow();
            loadStartMenu();
            loadSubMenu();

            $("#endOption1").click(function () {
                // Start Beginner Mode
                newGame(true, false);
                });
            if (debug){
            introLightSwitch.complete();
            introEyepiece.complete();
            introCoarse.complete();
            introFine.complete();
            introDiaphragm.complete();
            introCaliper.complete();
            introLenses.complete();
            $("#popup").removeClass("elementOn");
            $("#popup").addClass("elementOff");
            showAllParts();
            }

            //===============intro===============
            if (intro){
                $("#switch").click(function () {
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
            }


            //===============setup===============

            $("#switch").click(function () {
                    if (setupLightSwitch.isActive()) {
                    setupLightSwitch.complete();}
                    });

            //==========ocular movement===============
            var isDown = false;
            var isDragging = false;
            var prevX;
            var ocularSpread = 0;
            var MAX_OCULAR=50;

            $("#ocularRight")
                .mousedown(function() {
                        isDown = true;
                        })
            .mousemove(function(event) {
                    if (isDown){
                    if (prevX < event.pageX){
                    console.log("Moved right");
                    if (ocularSpread < MAX_OCULAR){
                    ocularSpread++;

                    }
                    }else if (prevX > event.pageX){
                    if (ocularSpread > 0){
                    ocularSpread--;
                    }

                    }

                    $("#ocularRight").css({
                        "-website-transform":"translate(" + ocularSpread  +"px," + 0  + "px)",
                        "-ms-transform":"translate(" + ocularSpread  +"px," + 0  + "px)",
                        "transform":"translate(" + ocularSpread  +"px," + 0  + "px)"
                        });

                    $("#ocularLeft").css({
                            "-website-transform":"translate(-" + ocularSpread  +"px," + 0  + "px)",
                            "-ms-transform":"translate(-" + ocularSpread  +"px," + 0  + "px)",
                            "transform":"translate(-" + ocularSpread  +"px," + 0  + "px)"
                            });
                    prevX = event.pageX;
                    }
            })
            .mouseup(function() {
                    isDown = false;
                    })
            .mouseleave(function(){
                    isDown = false;
                    });


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

