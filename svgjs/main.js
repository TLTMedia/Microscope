function getFile(name, callback) {
  $.get(name,callback, 'text');
}

$(function() {
  var draw = SVG('drawing')
  getFile('rectangle.svg', function(data) {
    draw.svg(data)


    registerDrag('rectangle', 'square')
  })
})



function registerDrag(item, target, onDrop) {

  var draggingItem = SVG.get(item)
  draggingItem.draggable()
  var $draggingItem = $('#' + draggingItem)
  $draggingItem.addClass('draggable')

  draggingItem.on('dragstart.namespace', function(event) {
    $(event.target).attr('pointer-events', 'none')
  })
  draggingItem.on('dragend.namespace', function(event) {
    console.log("dropped on", event.detail.event.target.id === target)
    $(event.target).attr('pointer-events', 'all')

  })
}
