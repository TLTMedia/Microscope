/*
* statemachine.js 
*
* Responsible for feedback on events triggered by the user.
*
**/

var components = ["#frame",
                  "#base",
                  "#diaphragm",
                  "#diaphragmKnob",
                  "#slideStage",
                  "#slide",
                  "#caliperKnob",
                  "#caliper",
                  "#xcaliper",
                  "#ycaliper",
                  "#apertureFixed",
                  "#aperture",
                  "#illumination",
                  "#eyepiece",
                  "#ocularLensBase",
                  "#ocularRight",
                  "#ocularLeft",
                  "#lenses",
//                      "#lensesRed",
//                      "#lensesBlue",
//                      "#lensesYellow",
//                      "#lensesWhite",
                  "#switch",
                  // "#light",
                  "#knobsCoarse",
                  "#knobsFine"];


// Steps ordered in an array
var stepTexts =["Turn on the light.", "Adjust the eyepieces"];
var stepIndex=0;

/*
* We should introduce the idea of a state machine which represents the state
* of the microscope at any given time. The machine should be able to
* transition into other states seamlessly, regardles of the current state.
*/

class StateMachine{
    constructor(){
        this.lightStatus = 0; // Brightness of the light ranged 0-1. 0 being off.
        this.eyepiecePosition = 0;
        console.log("State machine has been created");
    }

}

microscope = new StateMachine();


/* User global states
*/

//Globalize drag components (this is fine because there cannot be multiple drag instances unless user is not homosapien)
var isDown = false;
var prevX;
var ocularSpread = 0;
var MAX_OCULAR=50;



//function lowMagnification(){
//    $("#headerText").text("Test 2 ");
//}

// function highMagnification(){
//    $("#headerText").text("");
// }


// function sideViewOn(){}
// function sideViewOff(){}




/* Toggles the light switch */
function toggleLightSwitch(){
    //$("#headerText").text("Turn on the light.");
    $("#switch").on('click', function () {
        microscope.lightStatus = (1+microscope.lightStatus)%2; 
        console.log(microscope.lightStatus);
       
        if (microscope.lightStatus>0){
            $("#light").removeClass("elementOff"); 
            $("#light").addClass("lightOn");
        }

        else{
            $("#light").removeClass("lightOn");
            $("#light").addClass("elementOff");
        }

    });
}


/*Enables functionality for the eyepiece on call.*/
function enableEyepiece(){
            function addOcularDrag(ocularPart){
            var ocularPartOpposite = "#ocularLeft";
            var baseDir = 0;
            var val=1;
            //Swap logic based on which side of the component is being dragged.

            if (ocularPart=="#ocularRight"){
            val=1;

            }
            else if(ocularPart=="#ocularLeft"){ 
                ocularPartOpposite = "#ocularRight";
            }

            $(ocularPart)
                .mousedown(function() {
                        isDown = true;
                        })
            .mousemove(function(event) {
                    if (isDown){
                    if ((prevX < event.pageX && ocularPart == "#ocularRight") || (prevX > event.pageX && ocularPart=="#ocularLeft")){
                      if (ocularSpread < MAX_OCULAR){
                          ocularSpread += val;   
                     }
                    }
                    else if ((prevX > event.pageX && ocularPart == "#ocularRight") ||(prevX < event.pageX && ocularPart=="#ocularLeft")){
                        if (ocularSpread > 0){
                            ocularSpread -= val;
                        }
                    }


                    $("#ocularRight").css({
                        "-website-transform":"translate(" + ocularSpread  +"px," + 0  + "px)",
                        "-ms-transform":"translate(" + ocularSpread  +"px," + 0  + "px)",
                        "transform":"translate(" + ocularSpread  +"px," + 0  + "px)"
                        });
                    $("#ocularLeft").css({
                        "-website-transform":"translate(" + -1*ocularSpread  +"px," + 0  + "px)",
                        "-ms-transform":"translate(" + -1*ocularSpread  +"px," + 0  + "px)",
                        "transform":"translate(" + -1*ocularSpread  +"px," + 0  + "px)"
                        });
                    prevX = event.pageX;
                    microscope.eyepiecePosition = ocularSpread;
                    }
            })
            .mouseup(function() {
                    isDown = false;
                    })
            .mouseleave(function(){
                    isDown = false;
                    });
            }
            addOcularDrag("#ocularRight");            
            addOcularDrag("#ocularLeft");            
}

function toggleDiaphragmLight(){
    console.log("Diaphragm light test");
}

function toggleDiaphragmHeight(){}
function toggleFine(){}
function toggleCoarse(){}
function toggleLenses(){}
function toggleCaliper(){}
function toggleEyepiece(){}
