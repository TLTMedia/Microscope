/*
 * setup.js
 *
 * Scene 2
 * Second scene that teaches student how to set up the microcope.
 */ 


function setupEnableSwitch(){
    $("#switch").click(function() {
            if (setupLightSwitch.isActive()){
            setupLightSwitch.complete();}
            });
}


function setupAdjustEyepiece(){

    if (setupEyepiece.isActive()){
        var intervalId = window.setInterval(ocularCallback, 1000);
        function ocularCallback (){
            //console.log(microscope.eyepiecePosition);
            if (microscope.eyepiecePosition > 10 && microscope.eyepiecePosition < 25){
                clearInterval(intervalId);
                setupEyepiece.complete();
            }
        }
    }
}



/*Trigger for coarse knob (for now I have conjoined them)*/
function setupAdjustCoarse(){
    if (setupCoarse.isActive()){
        var intervalId = window.setInterval(coarseCallback, 1000);
        function coarseCallback (){
            //console.log(microscope.eyepiecePosition);
            if (microscope.knobPosition > -30 && microscope.knobPosition < 0){
                clearInterval(intervalId);
                setupCoarse.complete();
            }
        }
    }
}

/*Trigger for fine knob (for now I have conjoined them)*/
function setupAdjustFine(){
    if (setupFine.isActive()){
        var intervalId = window.setInterval(fineCallback, 1000);
        function fineCallback (){
            //console.log(microscope.eyepiecePosition);
            if (microscope.knobPosition > -30 && microscope.knobPosition < -10){
                clearInterval(intervalId);
                setupFine.complete();
            }
        }
    }
}
