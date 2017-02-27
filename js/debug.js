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
    removeHighlightCopy();
}

function debugSetup() {
    removeHighlightCopy();
    setupLightSwitch.complete();
    setupCaliperBlade.complete();
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
    medLenses.complete();
    medCoarse.complete();
    medFine.complete();
    medDiopter.complete();
    medOcular.complete();
}
function debugHighMag(){
    removeHighlightCopy();
    highLenses.complete();
    highAperture.complete(); 
    highFine.complete();
}

function debugCleanup(){
    cleanupLow.complete();
    cleanupCoarse.complete();
    cleanupSlide.complete();
    cleanupLight.complete();
}

function DEBUG(state, mode){
    var isDebug = state;
    if (isDebug){
        if (currentMode == "Introduction")
            debugIntro();
        else if (currentMode == "Tutorial"){
            debugSetup();
            debugLow(); 
            debugMedMag();
            debugHighMag(); 
            //debugCleanup();
        }
    }
    return isDebug;
}


