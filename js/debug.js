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
    setupSlide.complete();
}

function debugLow(){
    lowEyepiece.complete();
    lowCoarse.complete();
    lowFine.complete();
    lowDiaphragmLight.complete();
    lowDiaphragmHeight.complete();
    lowCaliper.complete();
}

function debugHighMag(){}
