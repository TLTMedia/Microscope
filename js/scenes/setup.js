/*
 * setup.js
 *
 * Scene 2
 * Second scene that teaches student how to set up the microcope.
 */ 

// ====== Start Trigger ======= //
function textSetupSwitch() {
    console.log("debug");
    popupOn("First, let's turn on the light switch.", {
            "left": "10%",
            "top": "73%",
            });

}


function textSetupEyepiece() {
    var arr = ["#eyepiece", "#ocularRight", "#ocularLeft", "#ocularLensBase"];
    popupOn("Eyepiece: View the sample through the ocular lenses. They magnify the image ten times.", {
            "left": "5%",
            "top": "25%",
            });
    secludePart(arr);
}

function textSetupDiaphragm() {
    arr = ["#diaphragm", "#apertureFixed", "#aperture"];
    popupOn("Diaphragm: Adjusts the amount of light on the slide", {
            "left": "15%",
            "top": "60%",
            });
    secludePart(arr);
}

function textSetupFine() {
    arr = ["#knobsFine"];
    popupOn("Fine Knobs: Moves the stage slightly to sharpen the focus", {
            "left": "10%",
            "top": "64%",
            });
    secludePart(arr);
}

function textSetupCoarse() {
    arr = ["#knobsCoarse"];
    popupOn("Coarse Knobs: Moves the stage up and down for focusing", {
            "left": "10%",
            "top": "64%",
            });
    secludePart(arr);
}

function textSetupCaliper() {
    arr = ["#caliper", "#xcaliper", "#ycaliper", "#caliperKnob"];
    popupOn("Caliper: Adjusts the vertical and horizontal positions of the slide.", {
            "left": "55%",
            "top": "55%",
            });
    secludePart(arr);
}

function textSetupLenses() {
    arr = ["#lenses", "#lensesRed", "#lensesBlue", "#lensesYellow", "#lensesWhite"];
    edgeArr = arr;
    popupOn("Lenses: The lenses are rotated on the nosepiece to change the magnification. These different lenses are referred to as the objectives.", {
            "left": "10%",
            "top": "36%",
            });
    secludePart(arr);
}

function showAllPartsSetup() {
    for (var i = 0; i < components.length; i++) {
        console.log(components[i]);
        $(components[i]).removeClass("opacityLow");
        $(components[i]).removeClass("elementOff");
        $(components[i]).off("mouseleave");
        $(components[i]).off("hover");
        
    }
    for (var i = 0; i < components.length; i++) {
        $(components[i]).addClass("elementOn");
    }

}


function setupEnableSwitch(){
console.log("SWITCH");
    textSetupSwitch();
    
    $("#switch").click(function() {
            if (setupLightSwitch.isActive()){
            setupLightSwitch.complete();}
            });
}


function setupAdjustEyepiece(){

    if (setupEyepiece.isActive()){
        var intervalId = window.setInterval(ocularCallback, 1000);
        function ocularCallback (){
            //console.log(microscope.eyepiecePosition);
            if (microscope.eyepiecePosition > 10 && microscope.eyepiecePosition < 25){
                clearInterval(intervalId);
                setupEyepiece.complete();
            }
        }
    }
}



/*Trigger for coarse knob (for now I have conjoined them)*/
function setupAdjustCoarse(){
    if (setupCoarse.isActive()){
        var intervalId = window.setInterval(coarseCallback, 1000);
        function coarseCallback (){
            //console.log(microscope.eyepiecePosition);
            if (microscope.knobPosition > -30 && microscope.knobPosition < 0){
                clearInterval(intervalId);
                setupCoarse.complete();
            }
        }
    }
}

/*Trigger for fine knob (for now I have conjoined them)*/
function setupAdjustFine(){
    if (setupFine.isActive()){
        var intervalId = window.setInterval(fineCallback, 1000);
        function fineCallback (){
            //console.log(microscope.eyepiecePosition);
            if (microscope.knobPosition > -30 && microscope.knobPosition < -10){
                clearInterval(intervalId);
                setupFine.complete();
            }
        }
    }
}
