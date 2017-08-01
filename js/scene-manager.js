function toggableTab(){

}

function headerButtonClick(e){
}

// Make use of the header by making it a tooltip.
// When user hovers over a piece, describe what it is.
// To improve it, use a mapping that takes a key word and redirects it into a proper tooltip.
function bindTooltip(){
    components.forEach(function(component){
        $(component).hover(function(){
            $("#headerText").text((component.replace("#","")).capitalize());
        });
    });
}


/*
   Use of below function is for intro.js (intro.js + gameLogic.js interdependence).
   */
function startStep(step) {
    var isDebug = false;
    /* intro
       Intro doesn't necessarily have flexible choices for the user to act on.The purpose of the introduction is to teach the user about the different
       parts of the microscope.
       */


    $("#helpBox p").text(step.longText);

    // Intro Game mode Scenes
    if (currentMode == "Introduction"){
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
    }

    else if (currentMode == "Tutorial"){
        unbindComponentHover();
        /* setup
           act/adjust the microscope before the game proceeds onto the next step.
           */
        if (step == setupLightSwitch) {
            $("#light").addClass("elementOff");
            toggleVisibility("#slide");
            setupEnableSwitch();
            ms.enableLightSwitch();
            isDebug = DEBUG(isDebug, currentMode);
        }
        if (step == setupCaliperBlade){
            ms.enableCaliperBlade();
            setupEnableBlade();
        }
        if (step == setupSlide){
            setupEnableSlide();
        }
        if (step == setupCondense){
            if (isDebug){
                toggleVisibility("#slide");
                $("#slide").css({"display": "block"});
            }
            setupCondenser();
            ms.enableSideDiaphragmRotate();
        }

        if (step == setupCaliper){
            setupAdjustCaliper();
            ms.enableCaliper();
        }

        // Low magnification
        if (step == lowLenses) {
            lowAdjustLenses();
            ms.enableLenses();
        }
        if (step == lowDiaphragmLight) {
            lowDLight();
            ms.enableDiaphragmLight();
        }
        if (step == lowCoarse) {
            lowAdjustCoarse();
            ms.enableCoarseKnob();
        }

        // Med magnification
        if (step == medLenses) {
            medAdjustLenses();
        }
        if (step == medCoarse) {
            medAdjustCoarse();
        }

        if (step == medFine) {
            medAdjustFine();
            ms.enableFineKnob();
        }
        if (step == medDiopter){
            medAdjustDiopter();
            ms.enableDiopter();
        }
        if (step == medOcular) {
            medAdjustEyepiece();
            ms.enableEyepiece();
        }


        // High magnification
        if (step == highLenses) {
            highAdjustLenses();
        }
        if (step == highAperture){
            highAdjustAperture();
        }
        if (step == highFine) {
            highAdjustFine();
        }

        // Cleanup time
        if (step == cleanupLow) {
            cleanAdjustLenses();
        }
        if (step == cleanupCoarse){
            cleanAdjustCoarse();
        }
        if (step == cleanupSlide) {
            cleanRemoveSlide();
        }
        if (step == cleanupLight) {
            cleanDisableSwitch();
        }
    }
    else if (currentMode == "Total-Magnification"){
        console.log("Total magnification");
        if (step == totalMagQ1) {
            // Configure lenses at this position
            quizMag(1);
        }
        else if (step==totalMagQ2){
            // Configure lenses at this position
            quizMag(2);
        }
        else if (step==totalMagQ3){
            quizMag(3);
        }

    }
    else if (currentMode == "Cell-Count"){
        console.log("Cell count");
        if (step == cellCountQ1) {
            // Configure lenses at this position
            quiz2Q1();
        }
    }

    else if (currentMode == "Video"){
        console.log("Video");
        if (step == videoQ1) {
            // Configure lenses at this position
            quiz4Q1();
        }
    }
    // enable freemode? (user can do whatever they want with the scope)
}

function endStep(step) {
    if (step.div == "#step0" && currentMode == "Introduction")
        loadMenu("introduction-end");
    else if (step.div == "#step19"){
        popupOff();
        loadMenu("tutorial-end");
    }
}
