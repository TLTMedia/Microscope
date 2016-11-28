/* =================================
   Debugging functions
   Use these to skip scenes
   ================================= */

function debugIntro() {
    console.log("Intro debugged.");
    introLightSwitch.complete();
    introEyepiece.complete();
    introCoarse.complete();
    introFine.complete();
    introDiaphragm.complete();
    introCaliper.complete();
    introLenses.complete();
    showAllParts();
}

function debugSetup() {
    console.log("Setup debugged.");
    setupLightSwitch.complete();
    setupSlide.complete();
    setupCondense.complete();
    setupCaliper.complete();
}

function debugLow(){

    lowLenses.complete();
    lowDiaphragmLight.complete();
    lowCoarse.complete();
//    lowFine.complete();
}

function debugHighMag(){}


function DEBUG(state){
    var isDebug = state;
    if (isDebug){
        debugIntro();
        debugSetup();
        removeHighlightCopy();
        debugLow(); 
        removeHighlightCopy();
      //debugHighMag(); 
    }
    return isDebug;
}


