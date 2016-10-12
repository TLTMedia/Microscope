/*
 * low.js
 *
 * Scene 3
 * Third scene that teaches student how to use the microscope 
 */

// ===== Hardcoded Bounds ===== //

var bounds = {}


// ====== Start Trigger ======= //

function textSetupEyepiece() {
    var arr = ["#eyepiece", "#ocularRight", "#ocularLeft", "#ocularLensBase"];
    popupOn("Adjust the eyepiece to change the magnification.", {
            "left": "5%",
            "top": "25%",
            });
}

function textSetupDiaphragmLight() {
    arr = ["#diaphragm", "#apertureFixed", "#aperture"];
    popupOn("Adjust the diaphragm to change the lighting on the slide.", {
            "left": "10%",
            "top": "60%",
            });
}


function textSetupDiaphragmHeight() {
    arr = ["#diaphragm", "#apertureFixed", "#aperture"];
    popupOn("Adjust the height of the diaphragm by rotating the knob.", {
            "left": "50%",
            "top": "60%",
            });
}

function textSetupFine() {
    arr = ["#knobsFine"];
    popupOn("Move the stage up a little to sharpen the focus", {
            "left": "10%",
            "top": "64%",
            });
}

function textSetupCoarse() {
    arr = ["#knobsCoarse"];
    popupOn("Move the stage up by moving the coarse knob.", {
            "left": "10%",
            "top": "64%",
            });
}

function textSetupCaliper() {
    arr = ["#caliper", "#xcaliper", "#ycaliper", "#caliperKnob"];
    popupOn("Move the caliper to adjust the position of the slide.", {
            "left": "62%",
            "top": "60%",
            });
}

function textSetupLenses() {
    arr = ["#lenses", "#lensesRed", "#lensesBlue", "#lensesYellow", "#lensesWhite"];
    edgeArr = arr;
    popupOn("Lenses: The lenses are rotated on the nosepiece to change the magnification. These different lenses are referred to as the objectives.", {
            "left": "10%",
            "top": "36%",
            });
}


function doComplete(upperBound, lowerBound, stepTask){
    if (upperBound && lowerBound){
        stepTask.complete();
        return true;
    }
    return false;
}


function lowAdjustEyepiece() {
    textSetupEyepiece();
    if (lowEyepiece.isActive()) {
        var intervalId = window.setInterval(check, 1000);
        function check() {
            if(doComplete(microscope.eyepiecePosition > 10, microscope.eyepiecePosition < 25, lowEyepiece)){ 
                clearInterval(intervalId);
            }
        }
    }
}

/*Trigger for coarse knob (for now I have conjoined them)*/
function lowAdjustCoarse() {
    textSetupCoarse();
    if (lowCoarse.isActive()) {
        var intervalId = window.setInterval(coarseCallback, 1000);

        function coarseCallback() {
            //console.log(microscope.eyepiecePosition);
            if (microscope.knobPosition > -30 && microscope.knobPosition < 0) {
                clearInterval(intervalId);
                lowCoarse.complete();
            }
        }
    }
}

/*Trigger for fine knob (for now I have conjoined them)*/

function lowAdjustFine() {
    textSetupFine();
    if (lowFine.isActive()) {
        var intervalId = window.setInterval(fineCallback, 1000);

        function fineCallback() {
            //console.log(microscope.eyepiecePosition);
            if (microscope.knobPosition > -30 && microscope.knobPosition < -10) {
                clearInterval(intervalId);
                lowFine.complete();
            }
        }
    }
}


// Adjust diaphram light
function lowDLight() {
    textSetupDiaphragmLight();
    if (lowDiaphragmLight.isActive()) {
        var intervalId = window.setInterval(dLightCallback, 1000);
        function dLightCallback() {
            //console.log(microscope.eyepiecePosition);
            if (microscope.diaphragmLightPosition > 5 && microscope.diaphragmLightPosition < 30) {
                clearInterval(intervalId);
                lowDiaphragmLight.complete();
            }
        }
    }
}


function lowDHeight() {
    textSetupDiaphragmHeight();
    if (lowDiaphragmHeight.isActive()) {
        var intervalId = window.setInterval(dHeightCallback, 1000);
        function dHeightCallback() {
            //console.log(microscope.eyepiecePosition);
            if (microscope.diaphragmHeightPosition > 5 && microscope.diaphragmHeightPosition < 15) {
                clearInterval(intervalId);
                lowDiaphragmHeight.complete();
            }
        }
    }
}


function lowAdjustCaliper() {
    textSetupCaliper();
    if (lowCaliper.isActive()) {
        var intervalId = window.setInterval(caliperCallback, 1000);
        function caliperCallback() {
            //console.log(microscope.eyepiecePosition);
            if (microscope.xcaliper > 5 && microscope.xcaliper < 20 && microscope.ycaliper > 5 && microscope.ycaliper < 20) {
                clearInterval(intervalId);
                lowCaliper.complete();
            }
        }
    }
}


function lowAdjustLenses() {
    textSetupLenses();
    if (lowLenses.isActive()) {
        var intervalId = window.setInterval(caliperCallback, 1000);
        function caliperCallback() {
            //console.log(microscope.eyepiecePosition);
            if (microscope.xcaliper > 5 && microscope.xcaliper < 20 && microscope.ycaliper > 5 && microscope.ycaliper < 20) {
                clearInterval(intervalId);
                lowLenses.complete();
            }
        }
    }
}
