/*
 * setup.js
 *
 * Scene 2
 * Third scene that teaches student how to setup the microscope 
 */

// ====== Start Trigger ======= //
function setupEnableSwitch() {
    textSetup("First, let's turn on the light switch.", "60%", "73%");
    id = "#switch"
        var clonedComp = highlightComponent(id);
    bringToFront($(id));
    $("#switch").click(function () {
        if (setupLightSwitch.isActive()) {
            removeHighlight(clonedComp);
            setupLightSwitch.complete();
        }
    });
}

function setupEnableBlade(){
    textSetup("Now pull on the caliper blade by clicking on it.", "64%", "45%");
    id = "#caliperBlade";
    var clonedComp = highlightComponent(id);
    bringToFront($(id));
    $("#caliperBlade").click(function () {
        if (setupCaliperBlade.isActive()) {
            removeHighlight(clonedComp);
            setupCaliperBlade.complete();
        }
    });
}

function setupEnableSlide() {
    textSetup("Now grab the slide below and put it against the caliper.", "64%", "45%");
    toggleVisibility("#slide");

    //Moving the original slide
    var $pseudoSlide = $("#slide").clone();
    $pseudoSlide.attr("id", "pseudo_slideCopy")
        var x = 0.115*$(window).width();
        var y = $(window).height()*0.05;

    $pseudoSlide.css({
        "-webkit-transform": "translate(" + x + "px," + y + "px)",
        "-ms-transform": "translate(" + x + "px," + y + "px)",
        "transform": "translate(" + x + "px," + y + "px)"
    });

    $pseudoSlide.attr("data-x", x);
    $pseudoSlide.attr("data-y", y);


    $("#microscope > svg").append($pseudoSlide);

    toggleVisibility("#slide");

    var cloned = highlightComponent("#pseudo_slideCopy");
    $(cloned).attr("style", $("#slide").attr("style"));

        interact('#pseudo_slideCopy')
        .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            restrict: {
                restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            // enable autoScroll
            autoScroll: true,

            // call this function on every dragmove event
            onmove: dragMoveListener,
            // call this function on every dragend event
            onend: function (event) {
                var textEl = event.target.querySelector('p');

                textEl && (textEl.textContent =
                    'moved a distance of '
                    + (Math.sqrt(event.dx * event.dx +
                            event.dy * event.dy)|0) + 'px');
            }
        });

    function dragMoveListener (event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;


        if (setupSlide.isActive() && Math.abs(x) < 10 && y < 25 && y > 10) {
            setupSlide.complete();
            $("#caliperBlade").trigger("click");
            toggleVisibility("#slide");
            $("#pseudo_slideCopyCopy").remove();
            $("#pseudo_slideCopy").remove();
        }

        // translate the element
        target.style.webkitTransform =
            target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    // this is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;

}


//  (´・ω・`) broke this
//  knob should go <- not ->
// hehe dwai shrin i got u
function setupCondenser() {
    textSetup("Rotate the condenser knob all the way to the top.", "8%", "45%");
    var id="#draggableDiaphragm";
    if (setupCondense.isActive()) {
        var clonedComp = highlightComponent(id);
        bringToFront($(id));
        var handler = function () {
            subHandler(ms.diaphragmHeightPosition, 0, 4.8, setupCondense, handler, id, null);
        }
        $(document).bind("mousemove", handler);
    }
}


function setupAdjustCaliper() {
    textSetup("Move the caliper knob so the aperture light is directly on the specimen.", "62%", "60%");
    id = "#caliperKnob"
        if (setupCaliper.isActive()) {
            var clonedComp1 = highlightComponent("#yCaliperKnob");
            var clonedComp2 = highlightComponent("#xCaliperKnob");

            bringToFront($("#xCaliperKnob"));
            bringToFront($("#yCaliperKnob"));

            var handler = function () {
                //console.log(ms.xcaliper + ", " + ms.ycaliper);
                if(ms.xcaliper >-1 && ms.xcaliper<1)
                subHandler(ms.ycaliper, 18, 20, setupCaliper, handler, id, null);
            }
            $(document).bind("mousemove", handler);
            $("#stageLight").removeClass("st0");
        }
}
