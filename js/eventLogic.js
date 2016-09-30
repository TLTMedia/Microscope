/*
* eventLogic.js
*
* Responsible for feedback on events triggered by the user.
*
**/

var components = ["#frame",
                  "#base",
                  "#diaphragm",
                  "#diaphragmKnob",
                  "#slideStage",
                  "#slide",
                  "#caliperKnob",
                  "#caliper",
                  "#xcaliper",
                  "#ycaliper",
                  "#apertureFixed",
                  "#aperture",
                  "#illumination",
                  "#eyepiece",
                  "#ocularLensBase",
                  "#ocularRight",
                  "#ocularLeft",
                  "#lenses",
//                      "#lensesRed",
//                      "#lensesBlue",
//                      "#lensesYellow",
//                      "#lensesWhite",
                  "#switch",
                  // "#light",
                  "#knobsCoarse",
                  "#knobsFine"];


// Steps ordered in an array
var stepTexts =["Turn on the light.", "Adjust the eyepieces"];
var stepIndex=0;

/*
* We should introduce the idea of a state machine which represents the state
* of the microscope at any given time. The machine should be able to
* transition into other states seamlessly, regardles of the current state.
*/

class StateMachine{
    constructor(){
        this.lightStatus = 0; // Brightness of the light ranged 0-1. 0 being off.
        console.log("State machine has been created");
    }

}

var microscope = new StateMachine();


/* User global states
*/

//Globalize drag components (this is fine because there cannot be multiple drag instances unless user is not homosapien)
var isDown = false;
var prevX;
var ocularSpread = 0;
var MAX_OCULAR=50;

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
    //  console.log($('body').html());

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



function popupOn(text, props) {
    $("#popup").css("display", "inline-block");
    $("#popup").addClass("elementOn");
    $("#popup").css(props);
    $("#popupText").text(text);
}

function popupOff() {
    $("#popup").css("display", "none");
}

function intro() {
    $("#headerText").text("Click the microscope to learn about its components.");
}

function setup(){
    $("#headerText").text("Follow the instructions to toggle the components.");
}


//function lowMagnification(){
//    $("#headerText").text("Test 2 ");
//}

// function highMagnification(){
//    $("#headerText").text("");
// }


// function sideViewOn(){}
// function sideViewOff(){}



function triggerLightSwitch() {
    var arr = ["#switch"];
    popupOn("Light Switch: Turns the light on and off.", {
        "left": "10%",
        "top": "73%",
    });
    secludePart(arr);
}


function triggerEyepiece() {
    var arr = ["#eyepiece", "#ocularRight", "#ocularLeft", "#ocularLensBase"];
    popupOn("Eyepiece: View the sample through the ocular lenses. They magnify the image ten times.", {
        "left": "5%",
        "top": "25%",
    });
    secludePart(arr);
}

function triggerDiaphragm() {
    arr = ["#diaphragm", "#apertureFixed", "#aperture"];
    popupOn("Diaphragm: Adjusts the amount of light on the slide", {
        "left": "15%",
        "top": "60%",
    });
    secludePart(arr);
}

function triggerFine() {
    arr = ["#knobsFine"];
    popupOn("Fine Knobs: Moves the stage slightly to sharpen the focus", {
        "left": "10%",
        "top": "64%",
    });
    secludePart(arr);
}

function triggerCoarse() {
    arr = ["#knobsCoarse"];
    popupOn("Coarse Knobs: Moves the stage up and down for focusing", {
        "left": "10%",
        "top": "64%",
    });
    secludePart(arr);
}

function triggerCaliper() {
    arr = ["#caliper", "#xcaliper", "#ycaliper", "#caliperKnob"];
    popupOn("Caliper: Adjusts the vertical and horizontal positions of the slide.", {
        "left": "55%",
        "top": "55%",
    });
    secludePart(arr);
}

function triggerLenses() {
    arr = ["#lenses"];
    popupOn("Lenses: The lenses are rotated on the nosepiece to change the magnification. These different lenses are referred to as the objectives.", {
        "left": "10%",
        "top": "36%",
    });
    secludePart(arr);
}

/* Toggles the light switch */
function toggleLightSwitch(){
    //$("#headerText").text("Turn on the light.");
    $("#switch").on('click', function () {
        microscope.lightStatus = (1+microscope.lightStatus)%2; 
        console.log(microscope.lightStatus);
       
        if (microscope.lightStatus>0){

            
//            $("#light").removeClass("lightOff");
//            $("#light").addClass("lightOn");
        }
        else{

  //          $("#light").removeClass("lightOn");
      //      $("#light").addClass("lightOff");
     //       $("#light").addClass("elementOff");
        }
    });
}


/*Enables functionality for the eyepiece on call.*/
function enableEyepiece(){

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
            addOcularDrag("#ocularRight");            
            addOcularDrag("#ocularLeft");            
}

function toggleDiaphragmLight(){
    console.log("Diaphragm light test");
}

function toggleDiaphragmHeight(){}
function toggleFine(){}
function toggleCoarse(){}
function toggleLenses(){}
function toggleCaliper(){}
function toggleEyepiece(){}
