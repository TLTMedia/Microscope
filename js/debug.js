/* =================================
   Debugging functions
   Use these to skip scenes
   ================================= */

function debugIntro() {
    introLightSwitch.complete();
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
    //lowCoarse.complete();
}

function debugMedMag(){
    removeHighlightCopy();
    medLenses.complete();
    medFine.complete();
    medDiopter.complete();
    medOcular.complete();
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
        //debugLow(); 
        //debugMedMag();
        //debugHighMag(); 
    }
    return isDebug;
}


