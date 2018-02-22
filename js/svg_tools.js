function registerDrag(item, target, onDrop) {

    var draggingItem = SVG.get(item)
    draggingItem.draggable()
    var $draggingItem = $('#' + draggingItem)
    $draggingItem.addClass('draggable')

    console.log(target)

    draggingItem.on('dragstart.namespace', function (event) {
        $(event.target).attr('pointer-events', 'none')
    })
    draggingItem.on('dragend.namespace', function (event) {
        $(event.target).attr('pointer-events', 'all')
        console.log(event.detail.event.target.id)
        if (event.detail.event.target.id === target) {
            console.log("eeeeeee")
            draggingItem.draggable(false)
            onDrop()
        }
    })
}
