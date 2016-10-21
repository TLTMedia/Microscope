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
    //$("#popup").removeClass("elementOn");
    //$("#popup").addClass("elementOff");
    showAllParts();
}

function debugSetup() {
    console.log("Setup debugged.");
    setupLightSwitch.complete();
    setupSlide.complete();
    setupAperture.complete();
}

function debugLow(){
    lowEyepiece.complete();
    lowCoarse.complete();
    lowFine.complete();
    lowDiaphragmLight.complete();
    //lowDiaphragmHeight.complete();
    //lowCaliper.complete();
}

function debugHighMag(){}


function DEBUG(state){
    var isDebug = state;
    if (isDebug){
        debugIntro();
        debugSetup();
//        debugLow();
    }
      //debugHighMag(); 
    return isDebug;
}


