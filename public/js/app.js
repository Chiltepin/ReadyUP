$(function(){
    ws = new WebSocket("ws:0.0.0.0:9292");
    ws.onmessage = function(evt) {

        if( evt.data.indexOf('Checked') >= 0){

            $("table#titletable").load(location.href + " table#titletable");
            $("table#members").load(location.href + " table#members");

        }
        if( evt.data.indexOf('updated') >= 0){
            console.log('Refreshed background')
            location.reload(true)
        }
        if ($('#chat tbody tr:last').length > 0){
            $('#chat tbody tr:last').after('<tr><td>' + evt.data + '</td></tr>');
            $('#chatmessages').scrollTop($('#chatmessages')[0].scrollHeight);
        } else {
            $('#chat tbody').append('<tr><td>' + evt.data + '</td></tr>');
        }
    };

    sendmessage = function(action){
        ws.send( "The "+ action + " has been updated")
        console.log('Updated room settings')
    }

  /*  ws.onclose = function() {

    };

    ws.onopen = function() {


    };*/


    $("form.form-stacked").submit(function(e) {
        if($("#msg").val().length > 0){
            ws.send($("#msg").val());
            $("#msg").val("");
        }
        return false;
    });

    $("#clear").click( function() {
        $('#chat tbody tr').remove();

    });

});
// Generated by CoffeeScript 1.9.0
(function() {
    var fullroom;

    $(function() {
        $("table#members").load(location.href + " table#members");
        return window.runs = 0;
    });

    setInterval(function() {
        window.currentusers = document.getElementById("current").innerHTML;
        window.roomsize = document.getElementById("roomsize").innerHTML;
        fullroom(window.runs);
        if (window.currentusers !== window.roomsize) {
            return window.runs = 0;
        }
    }, 2000);
    setInterval(function() {
        $("table#members").load(location.href + " table#members");
        console.log('Timed refresh')
    }, 180000);



    fullroom = function(runs) {
        if (window.currentusers === window.roomsize && runs === 0) {
            document.getElementById('siren').play();
            alert("Alla är redo");
            document.getElementById('siren').pause();
            return window.runs = 1;
        }
    };

}).call(this);


/*
window.addEventListener("beforeunload", function (e) {

    var confirmationMessage = 'Leaving this page will uncheck you from the room';


    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});*/
