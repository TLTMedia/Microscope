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
    popupOn("Adjust the eyepiece to change the magnification.", {
        "left": "5%",
        "top": "25%",
    });
}

function textSetupDiaphragm() {
    arr = ["#diaphragm", "#apertureFixed", "#aperture"];
    popupOn("Adjust the diaphragm to change the lighting on the slide..", {
        "left": "15%",
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
        "left": "55%",
        "top": "55%",
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


function setupEnableSwitch() {
    textSetupSwitch();
    $("#switch").click(function() {
        if (setupLightSwitch.isActive()) {
            setupLightSwitch.complete();
        }
    });
}


function setupAdjustEyepiece() {
    textSetupEyepiece();
    if (setupEyepiece.isActive()) {
        var intervalId = window.setInterval(ocularCallback, 1000);
        function ocularCallback() {
            //console.log(microscope.eyepiecePosition);
            if (microscope.eyepiecePosition > 10 && microscope.eyepiecePosition < 25) {
                clearInterval(intervalId);
                setupEyepiece.complete();
            }
        }
    }
}

/*Trigger for coarse knob (for now I have conjoined them)*/
function setupAdjustCoarse() {
    textSetupCoarse();
    if (setupCoarse.isActive()) {
        var intervalId = window.setInterval(coarseCallback, 1000);

        function coarseCallback() {
            //console.log(microscope.eyepiecePosition);
            if (microscope.knobPosition > -30 && microscope.knobPosition < 0) {
                clearInterval(intervalId);
                setupCoarse.complete();
            }
        }
    }
}

/*Trigger for fine knob (for now I have conjoined them)*/
function setupAdjustFine() {
  textSetupFine();
    if (setupFine.isActive()) {
        var intervalId = window.setInterval(fineCallback, 1000);

        function fineCallback() {
            //console.log(microscope.eyepiecePosition);
            if (microscope.knobPosition > -30 && microscope.knobPosition < -10) {
                clearInterval(intervalId);
                setupFine.complete();
            }
        }
    }
}
