var APERTURE_HEIGHT_KNOB = 0;
var CONDENSER_START = 80;

// If hell ever breaks loose, you can assume it's from these
// They keep an alias to the state machine and update it externally

var updateAlias;
var knobs = [];

function saveKnob(divSelector) {
  var knob = {
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
    divSelector
  }
  knobs.push(knob);
  return knob;
}

function getKnob(divSelector) {
  return knobs.find(function(knob) {return knob.divSelector === divSelector});
}

$("body").mouseup(function () {  // TODO: Is this still needed?
    $("body").off("mousemove touchmove");
});

function getCoords(event, knob, isTouchscreen) {
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

/**
 * direction: Directions.HORIZONTAL or Directions.VERTICAL
 */
function getNormalRadians(event, knob, direction, isTouchscreen) {
  var coords = getCoords(event, knob, isTouchscreen);
  var x = coords[0];
  var y = coords[1];
  var distance = direction === Directions.HORIZONTAL ? x : y;
  return (Math.PI / 2 - Math.atan(distance / 10)) % Math.PI;
}

function registerKnob(divSelector, direction, onRotate) {
    saveKnob(divSelector);
    function register(isTouchscreen) {
      $(divSelector).bind(isTouchscreen ? 'touchstart' : 'mousedown', function (e) {
          var knob = getKnob(divSelector);
          if (knob.enabled || !game.isGuided()) {
              $("body").bind(isTouchscreen ? 'touchmove' : 'mousemove', function (e) {
                  e.preventDefault();
                  var normalRads = getNormalRadians(e, knob, direction, isTouchscreen);
                  var links = knob.link;
                  for (var j = 0; j < links.length; j++) {
                      knobRotate(links[j], normalRads, onRotate);
                  }
              });
          }
      });
    }
    register(true);
    register(false);
}

function knobRotate(id, normRads, onRotate) {
    var knob = knobs[id];
    // Apply rotation
    var span = Math.abs(floor-ceiling);
    var floor = knob.bounds[0];
    var ceiling = knob.bounds[1];
    var span=Math.abs(floor-ceiling);
    knob.rotation = normRads * span + floor;
    onRotate(knob.rotation)
}
