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
var introCountCap = 0;
// ====== Helper Functions  ======= //

function introIsComplete(clonedArr)
{
    if(introLightSwitch.isActive())
    {
        removeHighlightArray(clonedArr);
        introCountCap--;
        if(introCountCap === 0)
            introLightSwitch.complete();
    }
}

function updateClonedPositionArr(clonedArr, arr){
    for (var i=0; i<clonedArr.length;i++)
    {
        updateClonedPosition(clonedArr[i], $(arr[i]));
    }
}


function highlightArray(arr){
    var clonedArr = [];
    for(var pieceIndex = 0; pieceIndex < arr.length; pieceIndex++){
        //updateClonedPosition( 
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
function triggerLightSwitch(){
    var arr = ["#switch"];
    var flag = false;
    textSetup("Light Switch: Turns the light on and off.", "10%", "73%");
    //secludePart(arr);
    introCountCap++;var flag=false;
    var clonedArr = highlightArray(arr);
    $("#switch")
        .hover(function () {
            if (!flag){
                introIsComplete(clonedArr);
                flag=!flag;
            }
        });
}


function triggerEyepiece() {
    var arr = ["#eyepiece", "#ocularRight", "#ocularLeft"];
    textSetup("Eyepiece: View the sample through the ocular lenses. They magnify the image ten times.", "5%", "25%");
    //secludePart(arr);
    introCountCap++;var flag=false;
    var clonedArr = highlightArray(arr); 
    updateClonedPositionArr(clonedArr,arr);

    $("#ocularLensBase, #ocularRight, #ocularLeft, #ocularLeftDiopter")
        .hover(function () {
                if (!flag){introIsComplete(clonedArr);flag=!flag;}
        });
}

function triggerDiaphragm() {
    arr = ["#diaphragm", "#apertureFixed", "#aperture"];
    popupOn("Diaphragm: Adjusts the amount of light on the slide", {
        "left": "15%",
        "top": "60%",
    });
    introCountCap++;var flag=false;
    var clonedArr = highlightArray(arr);
    updateClonedPositionArr(clonedArr,arr);

    $("#diaphragm")
        .hover(function () {
                if (!flag){introIsComplete(clonedArr);flag=!flag;}
        });
}

function triggerFine() {
    arr = ["#knobsFine"];
    popupOn("Fine Knobs: Moves the stage slightly to sharpen the focus", {
        "left": "10%",
        "top": "64%",
    });
    //secludePart(arr);
    introCountCap++;var flag=false;
    var clonedArr = highlightArray(arr);
    $("#knobsFine")
        .hover(function () {
                if (!flag){introIsComplete(clonedArr);flag=!flag;}
        });
}

function triggerCoarse() {
    arr = ["#knobsCoarse"];
    textSetup("Coarse Knobs: Moves the stage up and down for focusing", "10%", "64%");
    //secludePart(arr);
    introCountCap++;var flag=false;
    var clonedArr = highlightArray(arr);
    $("#knobsCoarse")
        .hover(function () {
                if (!flag){introIsComplete(clonedArr);flag=!flag;}
        });
}

function triggerCaliper() {
    arr = ["#caliper", "#xcaliper", "#ycaliper", "#caliperKnob", "#caliperMetal"];
    textSetup("Caliper: Adjusts the vertical and horizontal positions of the slide.", "55%", "55%");
    introCountCap++;var flag=false;
    //secludePart(arr);
    var clonedArr = highlightArray(arr);

    updateClonedPositionArr(clonedArr,arr);
    $("#caliperKnob, #caliper, #xcaliper, #ycaliper")
        .hover(function () {
                if (!flag){introIsComplete(clonedArr);flag=!flag;}
        });
}

function triggerLenses() {
    arr = ["#lenses", "#lensesBase"];
    textSetup("Lenses: The lenses are rotated on the nosepiece to change the magnification. These different lenses are referred to as the objectives.", "10%", "36%");
    //secludePart(arr);
    introCountCap++;var flag=false;
    var clonedArr = highlightArray(arr);
    $("#lenses, #lensesBlue, #lensesRed, #lensesYellow, #lensesWhite, #lensesBasePath")
        .hover(function () {
                if (!flag){introIsComplete(clonedArr);flag=!flag;}
        });
}
