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
    showAllParts();
}

function debugSetup() {
    removeHighlightCopy();
    setupLightSwitch.complete();
    setupSlide.complete();
    setupCondense.complete();
    setupCaliper.complete();
}

function debugLow(){
    removeHighlightCopy();
    lowLenses.complete();
    lowDiaphragmLight.complete();
    lowCoarse.complete();
}

function debugMedMag(){
    removeHighlightCopy();
    medAdjustLenses();
    medAdjustFine();
    //medAdjustDiopter();
    //medAdjustEyepiece();
}
function debugHighMag(){
    removeHighlightCopy();
    highAdjustLenses();
    highAdjustFine(); 
    highAdjustDiopter();
    highAdjustEyepiece();
}

function DEBUG(state){
    var isDebug = state;
    if (isDebug){
        debugIntro();
        debugSetup();
        debugLow(); 
        debugMedMag();
        //debugHighMag(); 
    }
    return isDebug;
}


