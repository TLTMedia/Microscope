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
    link: [0],
    enabled: true,
    divSelector
  }

  var knobObject = $(divSelector);
  knobObject.css({'transform': ''});
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
  return knobs.find(function(knob) {return knob.divSelector === divSelector});
}

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
  return (Math.atan(distance / 10) + Math.PI / 2) % Math.PI;
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
              $("body").mouseup(function () {
                  $("body").off("mousemove touchmove");
              });
          }
      });
    }
    register(true);
    register(false);
}

function knobRotate(id, normRads, onRotate) {
    var knob = knobs[id];
    knob.rotation = normRads * 360;
    onRotate(knob.rotation)
}
