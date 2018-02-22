function toggableTab() {

}

function headerButtonClick(e) {}

// Make use of the header by making it a tooltip.
// When user hovers over a piece, describe what it is.
// To improve it, use a mapping that takes a key word and redirects it into a proper tooltip.
function bindTooltip() {
    components.forEach(function (component) {
        $(component).hover(function () {
            $("#headerText").text((component.replace("#", "")).capitalize());
        });
    });
}


/*
   Use of below function is for intro.js (intro.js + gameLogic.js interdependence).
   */
function startStep(step) {
    console.log(step)
    var isDebug = false;
    /* intro
       Intro doesn't necessarily have flexible choices for the user to act on.The purpose of the introduction is to teach the user about the different
       parts of the microscope.
       */


    $("#helpBox p").text(step.longText);

    // Intro Game mode Scenes
    if (currentMode == "Introduction") {
        if (step == introLightSwitch) {
            //introText();
            if (!isDebug) triggerLightSwitch();
            $("#light").addClass("elementOff");
            toggleVisibility("#slide");
            triggerDiaphragm();
            triggerFine();
            triggerCoarse();
            triggerCaliper();
            triggerEyepiece();
            triggerLenses();
            isDebug = DEBUG(isDebug, currentMode);
        }
    } else if (currentMode == "Tutorial") {
//        debugSetup();
//        debugLow();
//        debugMedMag();
//        debugHighMag(); 
        
        unbindComponentHover();
        /* setup
           act/adjust the microscope before the game proceeds onto the next step.
           */

        // SAVE THIS FOR THE SETUPCONDENSE STEP
        //            if (isDebug){
        //                toggleVisibility("#slide");
        //                $("#slide").css({"display": "block"});
        //            }

        step.logic();

    } else if (currentMode == "Total-Magnification") {
        console.log("Total magnification");
        step.logic();
    } else if (currentMode == "Cell-Count") {
        console.log("Cell count");
        step.logic();
    } else if (currentMode == "Video") {
        console.log("Video");
        step.logic();
    }
}

function endStep(step) {
    if (step.div == "#step0" && currentMode == "Introduction")
        loadMenu("introduction-end");
    else if (step.div == "#step19") {
        popupOff();
        loadMenu("tutorial-end");
    }
}
