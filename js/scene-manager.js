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

       Intro doesn't necessarily have flexible choices for the user to act on.
       The purpose of the introduction is to teach the user about the different
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
            isDebug = DEBUG(isDebug);
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
            enableLightSwitch();
        }
        if (step == setupSlide){ 
            setupEnableSlide(); 
        }
        if (step == setupCondense){ 
            setupCondenser();
            enableSideDiaphragmRotate();
        }

        if (step == setupCaliper){ 
            setupAdjustCaliper();
            enableCaliper(); 
        }

        // Low magnification
        if (step == lowLenses) {
            lowAdjustLenses();
            enableLenses();
        }
        if (step == lowDiaphragmLight) {
            lowDLight();
            enableDiaphragmLight();
        }
        if (step == lowCoarse) {
            lowAdjustCoarse();
            enableCoarseKnob();
        }

        // Med magnification
        if (step == medLenses) {
            medAdjustLenses();
        }
        if (step == medFine) {
            medAdjustFine(); 
            enableFineKnob();
        }
        if (step == medDiopter){
            medAdjustDiopter();
            enableDiopter();
        }
        if (step == medOcular) {
            medAdjustEyepiece();
            enableEyepiece();
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
    }

    // enable freemode? (user can do whatever they want with the scope)

}

function endStep(step) {
    if (step.div == "#step0" && currentMode == "Introduction") 
        loadMenu("introduction-end"); 
    else if (step.div == "#step13"){
        popupOff();
        loadMenu("tutorial-end"); 
    }
}
