/*
 * intro.js
 *
 * Scene 1
 *
 * Provides UI to teach users how to use the microscope, step by step.
 * Currently also includes functionality to change the ocular component via drag. (This will probably be modularized into another source file).
 * The intro.js source is a wrapper or layer above the state machine logic. The state machine should be able to operate seperately from any
 * layer that tries to utilize it. Decoupling layer from state machine allows for reusablity of the state machine.
 *
 * Project tries to strictly follow DRY principle.
 */


var game;
var introLightSwitch;
var introEyepiece;
var introDiaphragm;
var introFine;
var introCoarse;
var introLenses;
var introCaliper;


// ====== Helper Functions  ======= //
function secludePart(keepOn) {
    for (var i = 0; i < components.length; i++) {
        $(components[i]).removeClass("opacityLow");
        $(components[i]).removeClass("elementOn");
        $(components[i]).removeClass("elementOff");
    }
    for (var i = 0; i < components.length; i++) {
        $(components[i]).addClass("opacityLow");
    }

    for (var i = 0; i < keepOn.length; i++) {
        $(keepOn[i]).removeClass("opacityLow");
        $(keepOn[i]).addClass("elementOn");
    }
}


function showAllParts() {
    for (var i = 0; i < components.length; i++) {
        $(components[i]).removeClass("opacityLow");
        $(components[i]).removeClass("elementOn");
        $(components[i]).removeClass("elementOff");
    }

    for (var i = 0; i < components.length; i++) {
        $(components[i]).addClass("elementOn");
    }

}


function highlightArray(arr){
    var clonedArr = [];
    for(var pieceIndex = 0; pieceIndex < arr.length; pieceIndex++){
        updateClonedPosition( 
        clonedArr.push(highlightComponent(arr[pieceIndex]));
        bringToFront($(arr[pieceIndex]));
    }
    return clonedArr;
}


function removeHighlightArray(clonedArr){
    for(var pieceIndex = 0; pieceIndex < clonedArr.length; pieceIndex++){
        removeHighlight(clonedArr[pieceIndex]);

    }
}

// ====== Start Trigger ======= //
function triggerLightSwitch() {
    var arr = ["#switch"];
    textSetup("Light Switch: Turns the light on and off.", "10%", "73%");
    //secludePart(arr);
    var clonedArr = highlightArray(arr);
    $("#switch")
        .click(function () {
            if (introLightSwitch.isActive()) {
                introLightSwitch.complete();
                removeHighlightArray(clonedArr); 
            }

        });
}


function triggerEyepiece() {
    var arr = ["#eyepiece", "#ocularRight", "#ocularLeft", "#ocularLensBase"];
    textSetup("Eyepiece: View the sample through the ocular lenses. They magnify the image ten times.", "5%", "25%");
    //secludePart(arr);
    var clonedArr = highlightArray(arr); 

    $("#ocularLensBase, #ocularRight, #ocularLeft, #ocularLeftDiopter")
        .click(function () {
            if (introEyepiece.isActive()) {
                introEyepiece.complete();
                removeHighlightArray(clonedArr);
            }

        });
}

function triggerDiaphragm() {
    arr = ["#diaphragm", "#apertureFixed", "#aperture"];
    popupOn("Diaphragm: Adjusts the amount of light on the slide", {
        "left": "15%",
        "top": "60%",
    });
    //secludePart(arr);
    var clonedArr = highlightArray(arr);
    $("#diaphragm")
        .click(function () {
            if (introDiaphragm.isActive()) {
                introDiaphragm.complete();
                removeHighlightArray(clonedArr);
            }

        });
}

function triggerFine() {
    arr = ["#knobsFine"];
    popupOn("Fine Knobs: Moves the stage slightly to sharpen the focus", {
        "left": "10%",
        "top": "64%",
    });
    //secludePart(arr);
    var clonedArr = highlightArray(arr);
    $("#knobsFine")
        .click(function () {
            if (introFine.isActive()) {
                introFine.complete();
                removeHighlightArray(clonedArr);
            }
        });
}

function triggerCoarse() {
    arr = ["#knobsCoarse"];
    textSetup("Coarse Knobs: Moves the stage up and down for focusing", "10%", "64%");
    //secludePart(arr);
    var clonedArr = highlightArray(arr);
    $("#knobsCoarse")
        .click(function () {
            if (introCoarse.isActive()) {
                introCoarse.complete();
                removeHighlightArray(clonedArr);
            }

        });
}

function triggerCaliper() {
    arr = ["#caliper", "#xcaliper", "#ycaliper", "#caliperKnob", "#caliperMetal"];
    textSetup("Caliper: Adjusts the vertical and horizontal positions of the slide.", "55%", "55%");
    //secludePart(arr);
    var clonedArr = highlightArray(arr);
    $("#caliperKnob, #caliper, #xcaliper, #ycaliper")
        .click(function () {
            if (introCaliper.isActive()) {
                introCaliper.complete();
                removeHighlightArray(clonedArr);
            }
        });
}

function triggerLenses() {
    arr = ["#lenses", "#lensesBase"];
    textSetup("Lenses: The lenses are rotated on the nosepiece to change the magnification. These different lenses are referred to as the objectives.", "10%", "36%");
    //secludePart(arr);
    var clonedArr = highlightArray(arr);
    $("#lenses, #lensesBlue, #lensesRed, #lensesYellow, #lensesWhite, #lensesBasePath")
        .click(function () {
            if (introLenses.isActive()) {
                introLenses.complete();
                removeHighlightArray(clonedArr);
                showAllParts()
            }
        });
}
