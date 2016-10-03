
function introText() {
    $("#headerText").text("Click the microscope to learn about its components.");
}


function setupText(){
    $("#headerText").text("Follow the instructions to toggle the components.");
}


/*
   Use of below function is for intro.js (intro.js + gameLogic.js interdependence).
 */
function startStep(step) {
    /* intro

       Intro doesn't necessarily have flexible choices for the user to act on.
       The purpose of the introduction is to teach the user about the different
       parts of the microscope.
     */
    if (step == introLightSwitch)   { introText(); triggerLightSwitch();
        $("#light").addClass("elementOff");}
        if (step == introDiaphragm)     { triggerDiaphragm(); }
        if (step == introFine)          { triggerFine(); }
        if (step == introCoarse)        { triggerCoarse(); }
        if (step == introLenses)        { triggerLenses(); }
        if (step == introCaliper)       { triggerCaliper(); }
        if (step == introEyepiece)      { triggerEyepiece();}

        /* setup

           Steps now have an intermission period between each step where the user must
           act/adjust the microscope before the game proceeds onto the next step.

         */
        if (step == setupLightSwitch)       { setupText(); setupEnableSwitch(); toggleLightSwitch(); }
        if (step == setupEyepiece)          { setupAdjustEyepiece(); enableEyepiece(); }
        if (step == setupCoarse)            { setupAdjustCoarse(); enableCoarseKnob();  }
        if (step == setupFine)              { setupAdjustFine(); toggleFine(); }
        if (step == setupDiaphragmLight)    { toggleDiaphragmLight(); }
        if (step == setupDiaphragmHeight)   { toggleDiaphragmHeight(); }


        if (step == setupLenses)            { toggleLenses(); }
        if (step == setupCaliper)           { toggleCaliper(); }


        // enable freemode? (user can do whatever they want with the scope)

}

function endStep(step) {}


