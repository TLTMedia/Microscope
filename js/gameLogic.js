function startStep(step) {

    // intro
    if (step == introLightSwitch)   { intro(); triggerLightSwitch();
                                      $("#light").addClass("elementOff");}
    if (step == introDiaphragm)     { triggerDiaphragm(); }
    if (step == introFine)          { triggerFine(); }
    if (step == introCoarse)        { triggerCoarse(); }
    if (step == introLenses)        { triggerLenses(); }
    if (step == introCaliper)       { triggerCaliper(); }
    if (step == introEyepiece)      { triggerEyepiece(); }

    // setup
    if (step == setupStart)             { setup(); }
    if (step == setupLightSwitch)       { toggleLightSwitch(); }
    if (step == setupDiaphragmLight)    { toggleDiaphragmLight(); }
    if (step == setupDiaphragmHeight)   { toggleDiaphragmHeight(); }
    if (step == setupFine)              { toggleFine(); }
    if (step == setupCoarse)            { toggleCoarse(); }
    if (step == setupLenses)            { toggleLenses(); }
    if (step == setupCaliper)           { toggleCaliper(); }
    if (step == setupEyepiece)          { toggleEyepiece(); }

}

function endStep(step) {}
