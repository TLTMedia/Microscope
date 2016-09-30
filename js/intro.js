/*
 * intro.js
 *
 * Provides UI to teach users how to use the microscope, step by step.
 * Currently also includes functionality to change the ocular component via drag. (This will probably be modularized into another source file).
 **/


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
var debug=true;
var intro=true;

//Globalize drag components (this is fine because there cannot be multiple drag instances unless user is not homosapien)
var isDown = false;
var isDragging = false;
var prevX;
var ocularSpread = 0;
var MAX_OCULAR=50;

$(function () {

        $('#microscope').load('img/microscope2.svg', function() {
            resizeWindow();
            loadStartMenu();
            loadSubMenu();

            // Create dragability on horizontal component on a div. Precisely to be used for the ocular component. DRY principle applied so we don't reuse the same code for both ocular ends.
            function addOcularDrag(ocularPart){
            var ocularPartOpposite = "#ocularLeft";
            var baseDir = 0;
            var val=1;
            //Swap logic based on which side of the component is being dragged.

            if (ocularPart=="#ocularRight"){
            val=1;

            }
            else if(ocularPart=="#ocularLeft"){ 
                ocularPartOpposite = "#ocularRight";
            }

            $(ocularPart)
                .mousedown(function() {
                        isDown = true;
                        })
            .mousemove(function(event) {
                    if (isDown){
                    if ((prevX < event.pageX && ocularPart == "#ocularRight") || (prevX > event.pageX && ocularPart=="#ocularLeft")){
                      if (ocularSpread < MAX_OCULAR){
                          ocularSpread += val;   
                     }
                    }
                    else if ((prevX > event.pageX && ocularPart == "#ocularRight") ||(prevX < event.pageX && ocularPart=="#ocularLeft")){
                        if (ocularSpread > 0){
                            ocularSpread -= val;
                        }
                    }


                    $("#ocularRight").css({
                        "-website-transform":"translate(" + ocularSpread  +"px," + 0  + "px)",
                        "-ms-transform":"translate(" + ocularSpread  +"px," + 0  + "px)",
                        "transform":"translate(" + ocularSpread  +"px," + 0  + "px)"
                        });
                    $("#ocularLeft").css({
                        "-website-transform":"translate(" + -1*ocularSpread  +"px," + 0  + "px)",
                        "-ms-transform":"translate(" + -1*ocularSpread  +"px," + 0  + "px)",
                        "transform":"translate(" + -1*ocularSpread  +"px," + 0  + "px)"
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
            }
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
                    addOcularDrag("#ocularRight");            
                    addOcularDrag("#ocularLeft");            

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

});
