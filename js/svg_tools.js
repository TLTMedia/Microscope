function registerDrag(item, target, onDrop) {

  var draggingItem = SVG.get(item)
  draggingItem.draggable()
  var $draggingItem = $('#' + draggingItem)
  $draggingItem.addClass('draggable')

  draggingItem.on('dragstart.namespace', function(event) {
    $(event.target).attr('pointer-events', 'none')
  })
  draggingItem.on('dragend.namespace', function(event) {
    $(event.target).attr('pointer-events', 'all')
    if (event.detail.event.target.id === target) {
      draggingItem.draggable(false)
      onDrop()
    }
  })
}
