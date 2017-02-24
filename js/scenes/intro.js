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
        if(introCountCap === 0){
            introLightSwitch.complete();
        }
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
    //secludePart(arr);
    introCountCap++;var flag=false;
    var clonedArr = highlightArray(arr);
    $("#switch")
        .hover(function () {
            textSetup("Light Switch: Turns the light on and off.", "20%", "73%");        

            if (!flag){
                introIsComplete(clonedArr);
                flag=!flag;
            }
        }).mouseleave(function(){popupOff()});
}


function triggerEyepiece() {
    var arr = ["#eyepiece", "#ocularRight", "#ocularLeft"];
    //secludePart(arr);
    introCountCap++;var flag=false;
    var clonedArr = highlightArray(arr); 
    updateClonedPositionArr(clonedArr,arr);

    $("#ocularLensBase, #ocularRight, #ocularLeft, #ocularLeftDiopter")
        .hover(function () {

            textSetup("Eyepiece: View the sample through the ocular lenses. They magnify the image ten times.", "64%", "15%");
            if (!flag){introIsComplete(clonedArr);flag=!flag;}
        }).mouseleave(function(){popupOff()});
}

function triggerDiaphragm() {
    arr = ["#diaphragm", "#apertureFixed", "#aperture"];
    introCountCap++;var flag=false;
    var clonedArr = highlightArray(arr);
    updateClonedPositionArr(clonedArr,arr);

    $("#diaphragm")
        .hover(function () {
            textSetup("Diaphragm: Adjusts the amount of light on the slide", "25%","64%");
            if (!flag){introIsComplete(clonedArr);flag=!flag;}
        }).mouseleave(function(){popupOff()});
}

function triggerFine() {
    arr = ["#knobsFine"];
    //secludePart(arr);
    introCountCap++;var flag=false;
    var clonedArr = highlightArray(arr);
    $("#knobsFine")
        .hover(function () {

            textSetup("Fine Knobs: Moves the stage slightly to sharpen the focus","63%","64%");
            if (!flag){introIsComplete(clonedArr);flag=!flag;}
        }).mouseleave(function(){popupOff()});
}

function triggerCoarse() {
    arr = ["#knobsCoarse"];
    //secludePart(arr);
    introCountCap++;var flag=false;
    var clonedArr = highlightArray(arr);
    $("#knobsCoarse")
        .hover(function () {

            textSetup("Coarse Knobs: Moves the stage up and down for focusing", "63%", "64%");
            if (!flag){introIsComplete(clonedArr);flag=!flag;}
        }).mouseleave(function(){popupOff()});
}

function triggerCaliper() {
    arr = ["#caliper", "#xcaliper", "#ycaliper", "#caliperKnob", "#caliperMetal"];
    introCountCap++;var flag=false;
    //secludePart(arr);
    var clonedArr = highlightArray(arr);

    updateClonedPositionArr(clonedArr,arr);
    $("#caliperKnob, #caliper, #xcaliper, #ycaliper")
        .hover(function () {

            textSetup("Caliper: Adjusts the vertical and horizontal positions of the slide.", "65%", "60%");
            if (!flag){introIsComplete(clonedArr);flag=!flag;}
        }).mouseleave(function(){popupOff()});
}

function triggerLenses() {
    arr = ["#lensesBase"];
    //secludePart(arr);
    introCountCap++;var flag=false;
    var clonedArr = highlightArray(arr);
    $("#lenses, #lensesBlue, #lensesRed, #lensesYellow, #lensesWhite, #lensesBasePath")
        .hover(function () {

            textSetup("Lenses: The lenses are rotated on the nosepiece to change the magnification. These different lenses are referred to as the objectives.", "15%", "33%");
            if (!flag){introIsComplete(clonedArr);flag=!flag;}
        }).mouseleave(function(){popupOff()});
}
