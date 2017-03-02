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
            ms.enable("light-switch");
            isDebug = DEBUG(isDebug, currentMode);
        }
        if (step == setupCaliperBlade){
            ms.enable("caliper-blade");
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
            ms.enable("sideview");
        }

        if (step == setupCaliper){ 
            setupAdjustCaliper();
            ms.enable("caliper");
        }

        // Low magnification
        if (step == lowLenses) {
            lowAdjustLenses();
            ms.enable("lenses");
        }
        if (step == lowDiaphragmLight) {
            lowDLight();
            ms.enable("diaphragm-light");
        }
        if (step == lowCoarse) {
            lowAdjustCoarse();
            ms.enable("coarse-knob");
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
            ms.enable("fine-knob");
        }
        if (step == medDiopter){
            medAdjustDiopter();
            ms.enable("diopter");
        }
        if (step == medOcular) {
            medAdjustEyepiece();
            ms.enable("eyepiece");
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
            console.log("Question 1");
        }
        else if (step==totalMagQ2){
            // Configure lenses at this position
            console.log("Question 2");
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
