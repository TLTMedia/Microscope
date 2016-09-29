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




function secludePart(keepOn) {

    for (var i = 0; i < components.length; i++) {
        $(components[i]).removeClass("opacityLow");
        $(components[i]).removeClass("elementOn");
        $(components[i]).removeClass("elementOff");
    }
    for (var i = 0; i < components.length; i++) {
        $(components[i]).addClass("opacityLow");
    }

    for (var i = 0; i < keepOn.length; i++) {
        $(keepOn[i]).removeClass("opacityLow");
        $(keepOn[i]).addClass("elementOn");
    }
    //  console.log($('body').html());

}



function showAllParts() {
    for (var i = 0; i < components.length; i++) {
        $(components[i]).removeClass("opacityLow");
        $(components[i]).removeClass("elementOn");
        $(components[i]).removeClass("elementOff");
    }
    for (var i = 0; i < components.length; i++) {
        $(components[i]).addClass("elementOn");
    }

}



function popupOn(text, props) {
    $("#popup").css("display", "inline-block");
    $("#popup").addClass("elementOn");
    $("#popup").css(props);
    $("#popupText").text(text);
}

function popupOff() {
    $("#popup").css("display", "none");
}

function intro() {
    $("#headerText").text("Click the microscope to learn about its components.");
}

function setup(){
    $("#headerText").text("Follow the instructions to toggle the components.");
}


//function lowMagnification(){
//    $("#headerText").text("Test 2 ");
//}

// function highMagnification(){
//    $("#headerText").text("");
// }


// function sideViewOn(){}
// function sideViewOff(){}



function triggerLightSwitch() {
    var arr = ["#switch"];
    popupOn("Light Switch: Turns the light on and off.", {
        "left": "10%",
        "top": "73%",
    });
    secludePart(arr);
}


function triggerEyepiece() {
    var arr = ["#eyepiece", "#ocularRight", "#ocularLeft", "#ocularLensBase"];
    popupOn("Eyepiece: View the sample through the ocular lenses. They magnify the image ten times.", {
        "left": "5%",
        "top": "25%",
    });
    secludePart(arr);
}

function triggerDiaphragm() {
    arr = ["#diaphragm", "#apertureFixed", "#aperture"];
    popupOn("Diaphragm: Adjusts the amount of light on the slide", {
        "left": "15%",
        "top": "60%",
    });
    secludePart(arr);
}

function triggerFine() {
    arr = ["#knobsFine"];
    popupOn("Fine Knobs: Moves the stage slightly to sharpen the focus", {
        "left": "10%",
        "top": "64%",
    });
    secludePart(arr);
}

function triggerCoarse() {
    arr = ["#knobsCoarse"];
    popupOn("Coarse Knobs: Moves the stage up and down for focusing", {
        "left": "10%",
        "top": "64%",
    });
    secludePart(arr);
}

function triggerCaliper() {
    arr = ["#caliper", "#xcaliper", "#ycaliper", "#caliperKnob"];
    popupOn("Caliper: Adjusts the vertical and horizontal positions of the slide.", {
        "left": "55%",
        "top": "55%",
    });
    secludePart(arr);
}

function triggerLenses() {
    arr = ["#lenses"];
    popupOn("Lenses: The lenses are rotated on the nosepiece to change the magnification. These different lenses are referred to as the objectives.", {
        "left": "10%",
        "top": "36%",
    });
    secludePart(arr);
}

function toggleLightSwitch(){
    $("#headerText").text("Turn on the light.");
    $("#switch").click(function () {
        console.log("butts");
        $("#light").removeClass("elementOff");
        $("#light").addClass("lightOn");
    });
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
