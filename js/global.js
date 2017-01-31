components = [
    "#frame",
    "#base",
    "#diaphragm",
    "#diaphragmKnob",
    "#slideStage",
    "#caliperKnob",
    "#caliper",
    "#caliperMetal",
    "#xcaliper",
    "#ycaliper",
    "#apertureFixed",
    "#aperture",
    "#illumination",
    "#eyepiece",
    "#ocularLensBase",
    "#ocularRight",
    "#ocularLeft",
    "#ocularLeftDiopter",
    "#lenses",
    "#switch",
    "#knobsCoarse",
    "#knobsFine",
    "#lensesBasePath",
    "#lensesBase",
    "#lenses1Red",
    "#lenses2",
    "#lenses3",
    "#lenses4Yellow",
    "#lenses5",
    "#lenses6",
    "#lenses7Blue",
    "#lenses8",
    "#lenses9",
    "#lenses10White",
    "#lenses11",
    "#lenses12",
    "#stageLight",
    "#illuminationLight"
    ];

// State machine boundaries (DYNAMIC) 
sm_bd = {
    "MAX_OCULAR": 15,
    "MAX_KNOB": 20,
    "MIN_KNOB": -10,
    "MAX_DIAPHRAGM_LIGHT": 40,
    "MIN_DIAPHRAGM_HEIGHT": -15,
    "MAX_DIAPHRAGM_HEIGHT": 15,
    // Caliper
    "MAX_X_CALIPER": 20,
    "MIN_X_CALIPER": -20,
    "MAX_Y_CALIPER": 13,
    "MIN_Y_CALIPER": -13,
    // Slide contents
    "MIN_Y_BOUND": -10,
    "MAX_Y_BOUND": 10,
    "MIN_X_BOUND": -10,
    "MAX_X_BOUND": 10,
    //Blur
    "MAX_BLUR":10,
    "MIN_BLUR":-10,
    //Diaphragm
    "MAX_DIOPTER": 0, // Meaning LOWER BOUND
    "MIN_DIOPTER": -10
}


// State machine boundaries (STATIC)
sm_orig = {
    "MAX_OCULAR": 15,
    "MAX_KNOB": 20,
    "MIN_KNOB": -10,
    "MAX_DIAPHRAGM_LIGHT": 40,
    "MIN_DIAPHRAGM_HEIGHT": -15,
    "MAX_DIAPHRAGM_HEIGHT": 15,
    // Caliper
    "MAX_X_CALIPER": 20,
    "MIN_X_CALIPER": -20,
    "MAX_Y_CALIPER": 13,
    "MIN_Y_CALIPER": -13,
    // Slide contents
    "MIN_Y_BOUND": -10,
    "MAX_Y_BOUND": 10,
    "MIN_X_BOUND": -10,
    "MAX_X_BOUND": 10,
    //Blur
    "MAX_BLUR":10,
    "MIN_BLUR":-10,
    //Diaphragm
    "MAX_DIOPTER": 0,   // Meaning LOWER BOUND
    "MIN_DIOPTER": -10
}
