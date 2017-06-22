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
        $("body").off("mousemove touchmove");
    });
    for (var i = 0; i < knobs.length; i++) {
        knobControls(i);
    }
}

function getCoords(event, isTouchscreen) {
  if (isTouchscreen) {
    var touch = event.originalEvent.touches[0] ||
                event.originalEvent.changedTouches[0];
    var x = knob.center.x - touch.pageX;
    var y = knob.center.y - touch.pageY;
    return [x, y];
  }
  else {
    var x = knob.center.x - event.pageX;
    var y = knob.center.y - event.pageY;
    return [x, y];
  }
}

function getAngle(event, isTouchscreen) {
  var coords = getCoords(event, isTouchscreen);
  var x = coords[0];
  var y = coords[1];
  return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
}

function getNormalRadians(event, isTouchscreen) {
  var coords = getCoords(event, isTouchscreen);
  var x = coords[0];
  var y = coords[1];
  // return (Math.atan2(y, x)+Math.PI)/(Math.PI*2);
  //return (Math.sin((-y)/100)+1)/2;
  return (Math.PI / 2 - Math.atan(y / 10)) % Math.PI;
}

function registerKnob(numericID, isTouchscreen) {
  var divID = knobs[numericID].divID;
  $("#" + divID).bind(isTouchscreen ? 'touchstart' : 'mousedown', function (e) {
      var knob = knobs[numericID];
      if (knob.enabled || !game.isGuided()) {

          $("body").bind(isTouchscreen ? 'touchmove' : 'mousemove', function (e) {
              e.preventDefault();
              var normalRads = getNormalRadians(e, isTouchscreen);

              var links = knob.link;
              for (var j = 0; j < links.length; j++) {
                  knobRotate(links[j], normalRads);
              }
            //  knob.angle = angle;
          });
      }
  });
}

function knobControls(numericID) {
    registerKnob(numericID, true);
    registerKnob(numericID, false);
}

function knobRotate(id, normRads) {
    var knob = knobs[id];
    // Apply rotation

    console.log(normRads)

    var span=Math.abs(floor-ceiling);
    var floor = knob.bounds[0];
    var ceiling = knob.bounds[1];
    var span=Math.abs(floor-ceiling);
    knob.rotation =normRads*span+floor;
    //console.log(knob.rotation)

    smAlias.diaphragmHeightPosition = knob.rotation/12;
    smAlias.update();
}
