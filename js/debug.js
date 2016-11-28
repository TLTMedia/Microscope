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

function debugmedMag(){}
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


