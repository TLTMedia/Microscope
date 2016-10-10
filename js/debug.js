/* =================================
        Debugging functions
     Use these to skip scenes
================================= */

function debugIntro() {
    introLightSwitch.complete();
    introEyepiece.complete();
    introCoarse.complete();
    introFine.complete();
    introDiaphragm.complete();
    introCaliper.complete();
    introLenses.complete();
    $("#popup").removeClass("elementOn");
    $("#popup").addClass("elementOff");
    showAllParts();
}

function debugSetup() {
    setupLightSwitch.complete();
    setupEyepiece.complete();
    setupCoarse.complete();
    setupFine.complete();
    setupDiaphragmLight.complete();
    setupDiaphragmHeight.complete();
    //setupCaliper.complete();
    //setupLenses.complete();
    // $("#popup").removeClass("elementOn");
    // $("#popup").addClass("elementOff");
    showAllParts();
}

function debugLowMag(){
    lowLight.complete();
    lowLens.complete();
    lowSlidePlace.complete();
    lowSlideCenter.complete();
    lowCoarse.complete();
    lowFine.complete();
    lowDiaphragm.complete();
}

function debugHighMag(){}
