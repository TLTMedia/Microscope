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
    var x = touch.pageX - knob.center.x;
    var y = touch.pageY - knob.center.y;
    return [x, y];
  }
  else {
    var x = event.pageX - knob.center.x;
    var y = event.pageY - knob.center.y;
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
    saveKnob(divSelector).oldRotation = origRotation || 0;
    function register(isTouchscreen) {
      $(divSelector).bind(isTouchscreen ? 'touchstart' : 'mousedown', function (e) {
          var knob = getKnob(divSelector);
          if (knob.enabled || !game.isGuided()) {
              $("body").bind(isTouchscreen ? 'touchmove' : 'mousemove', function (e) {
                  e.preventDefault();
                  var rotation = getRotation(e, knob, direction, isTouchscreen);
                  var links = knob.link;

                  for (var j = 0; j < links.length; j++) {
                      knobRotate(links[j], rotation, onRotate);
                  }
              });
              $("body").mouseup(function () {
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
    knob.rotation = knob.oldRotation + rotation;
    onRotate(knob.rotation);
}
