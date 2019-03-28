/*
 * low.js
 *
 * Scene 3
 * Third scene that teaches student how to use the microscope on low magnification.
 */


//  See: /__image-reference/gifs/ocular.gif
function lowAdjustLenses() {
    $("#popupType").html("Objective");
    var id = "#lensesBasePath";
    if (lowLenses.isActive()) {
        var clonedComp = highlightComponent(id);
        var handler = function () {
            if (ms.lensePosition == 0) {
                removeHighlightCopy();
                lowLenses.complete();
                $(document).unbind("mousemove", handler);
            }
        }
        $(document).bind("click", handler);
    }
}

// Adjust diaphragm light
function lowDLight() {
    $(document).unbind("click", handler);
    $("#popupType").html("Aperture");

    var id = "#diaphragm";
    if (lowDiaphragmLight.isActive()) {
        var clonedComp = highlightComponent(id);
        var handler = function () {
            // console.log(ms.diaphragmLightPosition)
            subHandler(ms.diaphragmLightPosition, 5, 10, lowDiaphragmLight, id, null);
        }
        $(document).bind("mousemove", handler);
    }
}

// Trigger for coarse knob.
function lowAdjustCoarse() {
    $(document).unbind("mousemove", handler);
    $("#popupType").html("Coarse Focus");

    var id = "#knobsCoarse";
    if (lowCoarse.isActive()) {
        var clonedComp = highlightComponent(id);
        var handler = function () {
          // console.log(ms.knobPosition)
            subHandler(ms.knobPosition, 9, 11, lowCoarse, id, null);
        }
        $(document).bind("mousemove", handler);
    }
}

function lowDHeight() {
    $(document).unbind("mousemove", handler);

    var id = "#draggableDiaphragm";
    if (lowDiaphragmHeight.isActive()) {
        var clonedComp = highlightComponent(id);
        var handler = function () {
            subHandler(ms.diaphragmHeightPosition, 5, 15, lowDiaphragmHeight, id, null);
        }
        $(document).bind("mousemove", handler);
    }
}

//  !!! (´・ω・`)
//  separated components. ycaliper shouldn't move with x-Knob
//  xcaliperKnob - "#slide", #xcaliper",  "#caliperMetal"
//  ycaliperKnob - "#slide", #xcaliper", "#ycaliper", "#caliperMetal"
function lowAdjustCaliper() {
    $(document).unbind("mousemove", handler);
    //textSetup("Move the caliper to adjust the position of the slide.", "62%", "60%");
    var id = "#caliperKnob";
    var clonedComp2 = highlightComponent("#yCaliperKnob");
    var clonedComp2 = highlightComponent("#xCaliperKnob");

    if (lowCaliper.isActive()) {
        var handler = function () {
            subHandler(ms.xcaliper, 5, 20, lowCaliper, id, null);
            subHandler(ms.ycaliper, 5, 20, lowCaliper, id, null);
        }
        $(document).bind("mousemove", handler);
    }
}
