var APERTURE_HEIGHT_KNOB = 0;
var CONDENSER_START = 80;

// If hell ever breaks loose, you can assume it's from these
// They keep an alias to the state machine and update it externally

var smAlias;
var updateAlias;

var knobs = [{
        width: 0,
        height: 0,
        center: {
            x: 0,
            y: 0
        },
        angle:0,
        rotation: CONDENSER_START,
        link: [0],
        enabled: true,
        bounds: [0, 270],
        divID: "draggableDiaphragm"
}
];

function setupKnobs(sm) {
    //Link em up
    smAlias = sm;
    $("body").mouseup(function () {
        $(".knob").off("mousemove touchmove");
    });
    for (var i = 0; i < knobs.length; i++) {
        knobControls(i);
    }
}

function knobControls(numericID) {
    var divID = knobs[numericID].divID;
    $("#" + divID).bind('mousedown', function (e) {
        var knob = knobs[numericID];
        //console.log(knob);
        if (knob.enabled || !game.isGuided()) {
            var x = knob.center.x - e.pageX;
            var y = knob.center.y - e.pageY;
            knob.angle = getAngle(x, y);
            $("#" + divID).bind('mousemove', function (e) {
                e.preventDefault();
                var x = knob.center.x - e.pageX;
                var y = knob.center.y - e.pageY;
                //console.log(knob.center.x, knob.center.y, e.pageX, e.pageY);
                var angle = getAngle(x, y);
                var delta = angleDistance(knob.angle, angle);
                var links = knob.link;
                for (var j = 0; j < links.length; j++) {
                    knobRotate(links[j], delta);
                }
                knob.angle = angle;
                //console.log(angle);
            });
        }

    });
    $("#" + divID).bind('touchstart', function (e) {
        var knob = knobs[i];
        if (knob.enabled || !game.isGuided()) {
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            var x = knob.center.x - touch.pageX;
            var y = knob.center.y - touch.pageY;
            knob.angle = getAngle(x, y);
            $("#" + divID).bind('touchmove', function (e) {
                e.preventDefault();
                var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                var x = knob.center.x - touch.pageX;
                var y = knob.center.y - touch.pageY;
                var angle = getAngle(x, y);
                var delta = angleDistance(knob.angle, angle);
                var links = knob.link;
                for (var j = 0; j < links.length; j++) {
                    knobRotate(links[j], delta, sm, callback);
                }
                knob.angle = angle;
            });
        }
    });
}

// Returns the difference between two angles, accounting for 0 to 360 jump.
function angleDistance(from, to) {
    var delta = to - from;
    if (delta < -180) delta += 360;
    if (delta > 180) delta -= 360;
    return delta;
}

function knobRotate(id, delta) {
    var knob = knobs[id];
    // Apply rotation

    knob.rotation += delta;
    // Constrain knob rotation to its bounds
    if (knob.rotation < knob.bounds[0]) {
        knob.rotation = knob.bounds[0];
    }
    if (knob.rotation > knob.bounds[1]) {
        knob.rotation = knob.bounds[1];
    }

    smAlias.diaphragmHeightPosition = knob.rotation/12;
    smAlias.update();
}

// Returns the angle (from 0 to 360 degrees) determined by the given offset (x, y)
function getAngle(x, y) {
    return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
}
