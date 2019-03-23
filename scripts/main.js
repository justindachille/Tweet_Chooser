  if (document.readyState !== 'loading') {
    initialize();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      initialize();
    });
  }

  function initialize() {
    document.getElementById("game").style.display = "none!important";
  }

  function enter() {
    document.getElementById("splash").style.display = "none";
    document.getElementById("game").style.display = "block";
  }
