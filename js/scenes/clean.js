/*
 * clean.js
 *
 * Scene 4
 * Fourth scene instructs user to put away the microscope. 
 */


function cleanAdjustLenses() {
    textSetup("Rotate the lenses to the lowest objective (4X) without the 100X objective passing the slide.", "15%", "35%"); 
    var id="#lensesBasePath"
        if (cleanupLow.isActive()) { 
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                if (ms.lensePosition==0){
                    removeHighlightCopy();
                    cleanupLow.complete();
                    $(document).unbind("mousemove", handler);
                }
            }
            $(document).bind("mousemove", handler);
        }
}

// Trigger for coarse knob.
function cleanAdjustCoarse() {
    textSetup("Move the stage to the bottom using the coarse knob.", "60%", "64%");
    var id="#knobsCoarse"
        if (cleanupCoarse.isActive()) { 
            var clonedComp = highlightComponent(id);
            bringToFront($(id));
            var handler = function(){
                subHandler(ms.slideBlur, -1, 1, cleanupCoarse, handler, id, null);
            }
            $(document).bind("mousemove", handler);
        }
}

function cleanRemoveSlide() {
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


        if (cleanupSlide.isActive() && Math.abs(x) < 10 && y < 25 && y > 10) {
            cleanupSlide.complete();
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
function cleanDisableSwitch() {
    textSetup("Lastly, let's turn off the light switch.", "60%", "73%");
    id = "#switch";
    var clonedComp = highlightComponent(id);
    bringToFront($(id));
    $("#switch").click(function () {
        if (cleanupLight.isActive()) {
            removeHighlight(clonedComp);
            cleanupLight.complete();
        }
    });
}
