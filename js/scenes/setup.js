
/*
 * setup.js
 *
 * Scene 2
 * 
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
