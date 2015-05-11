// Generated by CoffeeScript 1.9.0
(function() {
  var fullroom;

  $(function() {
    $("#Members").load(location.href + " #Members");
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

  fullroom = function(runs) {
    if (window.currentusers === window.roomsize && runs === 0) {
      document.getElementById('siren').loop = true;
      document.getElementById('siren').play();
      alert("Alla är redo");
      document.getElementById('siren').pause();
      return window.runs = 1;
    }
  };

}).call(this);
