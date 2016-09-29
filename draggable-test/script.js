

$( function() {

  $( "#draggable" ).draggable({ axis: "y" });
  $( "#draggable2" ).draggable({ axis: "x" });

  $( "#draggable3" ).draggable({ containment: "#containment-wrapper", scroll: false });
  $( "#draggable4" ).draggable({ containment: "parent" });
} );

$( function() {
  var $start_counter = $("#event-start"),
      $drag_counter  = $("#event-drag" ),
      $stop_counter  = $("#event-stop" ),
      counts = [ 0, 0, 0 ];

  $( "#draggable5" ).draggable({
    start: function() {
      counts[ 0 ]++;
      updateCounterStatus( $start_counter, counts[ 0 ] );
    },
    drag: function() {
      counts[ 1 ]++;
      updateCounterStatus( $drag_counter, counts[ 1 ] );
    },
    stop: function() {
      counts[ 2 ]++;
      updateCounterStatus( $stop_counter, counts[ 2 ] );
    }
  });

  function updateCounterStatus( $event_counter, new_count ) {
    // first update the status visually...
    if ( !$event_counter.hasClass( "ui-state-hover" ) ) {
        $event_counter.addClass( "ui-state-hover" )
        .siblings().removeClass( "ui-state-hover" );
    }
    // ...then update the numbers
    $( "span.count", $event_counter ).text( new_count );
  }
} );


/*   http://api.jquery.com/event.pageX/   */
