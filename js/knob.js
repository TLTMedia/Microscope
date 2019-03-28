var knobs = [];

function saveKnob(divSelector) {

    var knob = {
        width: 0,
        height: 0,
        center: {
            x: 0,
            y: 0
        },
        angle: 0,
        link: [0],
        enabled: true,
        divSelector
    };

    var knobObject = $(divSelector);
    knobObject.css({
        'transform': ''
    });
    var offset = knobObject.offset();
    var w = knobObject[0].getBoundingClientRect().width;
    var h = knobObject[0].getBoundingClientRect().height;
    knob.width = w;
    knob.height = h;
    knob.center.x = offset.left + w / 2;
    knob.center.y = offset.top + h / 2;
    knobs.push(knob);
    return knob;
}

function getKnob(divSelector) {
    return knobs.find(function (knob) {
        return knob.divSelector === divSelector
    });
}

function getCoords(event, knob, isTouchscreen) {
    var svgEl = $('svg')

    var svgHeight = svgEl.height()
    var svgWidth = svgEl.width()


    var sensitivity = 1;

    if (isTouchscreen) {
        var touch = event.originalEvent.touches[0] ||
            event.originalEvent.changedTouches[0];
        var x = sensitivity * (touch.offsetX - knob.firstClick[0]) / svgWidth;
        var y = sensitivity * (touch.offsetY - knob.firstClick[1]) / svgHeight;
        return [x, y];
    } else {
        var x = sensitivity * (event.offsetX - knob.firstClick[0]) / svgWidth;
        var y = sensitivity * (event.offsetY - knob.firstClick[1]) / svgHeight;
        return [x, y];
    }
}

/**
 * direction: Directions.HORIZONTAL or Directions.VERTICAL
 */
function getRotation(event, knob, direction, isTouchscreen) {
    var coords = getCoords(event, knob, isTouchscreen);
    var x = coords[0];
    var y = coords[1];
    var distance = direction === Directions.HORIZONTAL ? x : y;
    //return (Math.atan(distance / 10) + Math.PI / 2) % Math.PI;
    return distance;
}

function registerKnob(divSelector, direction, onRotate, origRotation) {
    var knob = saveKnob(divSelector)
    console.log(knob);

    function register(isTouchscreen) {
        var knob = getKnob(divSelector);
        knob.oldRotation = origRotation || 0;
        $(divSelector).bind(isTouchscreen ? 'touchstart' : 'mousedown', function (e) {
            knob.firstClick = [e.offsetX, e.offsetY]

            //console.log(knob)
            if (knob.enabled || !game.isGuided()) {
                $("body").bind(isTouchscreen ? 'touchmove' : 'mousemove', function (e) {
                    e.preventDefault();
                    var rotation = knob.oldRotation + getRotation(e, knob, direction, isTouchscreen);
                    var links = knob.link;
                    knob.rotation = rotation;
                    $(divSelector).trigger("turning")
                    for (var j = 0; j < links.length; j++) {
                        knobRotate(links[j], rotation, onRotate);
                    }
                });
                $("body").on("mouseup mouseleave",function () {
                  //console.log("upppppp")
                    $("body").off("mousemove touchmove");
                    knob.oldRotation = knob.rotation;
                });
            }
        });
    }
    register(true);
    register(false);
}

function knobRotate(id, rotation, onRotate) {
    var knob = knobs[id];
    knob.rotation = rotation;
    onRotate(knob.rotation);
}
