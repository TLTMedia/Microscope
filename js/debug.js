/* =================================
   Debugging functions
   Use these to skip scenes
   ================================= */

function debugIntro() {
    introLightSwitch.complete();
    for (var i=0; i<components.length;i++){
        $(components[i]).off("mouseenter");
        $(components[i]).off("mouseleave");
    }
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
        debugLow(); 
        debugMedMag();
        //debugHighMag(); 
    }
    return isDebug;
}


