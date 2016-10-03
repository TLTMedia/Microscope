

/*
Use of below function is for intro.js (intro.js + gameLogic.js interdependence).
*/
function startStep(step) {

    /* intro

    Intro doesn't necessarily have flexible choices for the user to act on.
    The purpose of the introduction is to teach the user about the different
    parts of the microscope.
    */
    if (step == introLightSwitch)   { intro(); triggerLightSwitch();
                                      $("#light").addClass("elementOff");}
    if (step == introDiaphragm)     { triggerDiaphragm(); }
    if (step == introFine)          { triggerFine(); }
    if (step == introCoarse)        { triggerCoarse(); }
    if (step == introLenses)        { triggerLenses(); }
    if (step == introCaliper)       { triggerCaliper(); }
    if (step == introEyepiece)      { triggerEyepiece(); }

    /* setup

    Steps now have an intermission period between each step where the user must
    act/adjust the microscope before the game proceeds onto the next step.

    */
    if (step == setupStart)             { setup(); }
    if (step == setupLightSwitch)       { toggleLightSwitch(); }
    if (step == setupDiaphragmLight)    { toggleDiaphragmLight(); }
    if (step == setupDiaphragmHeight)   { toggleDiaphragmHeight(); }
    if (step == setupFine)              { toggleFine(); }
    if (step == setupCoarse)            { toggleCoarse(); }
    if (step == setupLenses)            { toggleLenses(); }
    if (step == setupCaliper)           { toggleCaliper(); }
    if (step == setupEyepiece)          { toggleEyepiece(); }

    // enable freemode? (user can do whatever they want with the scope)

}

function endStep(step) {}
