
function animate(ajax) {
  $('.logo').css("letterSpacing", "3px");
  $('.logo').stop(false, true).animate({
      letterSpacing: "0px"
  }, 1000);
  if (!ajax) {
    $('.menu a').hover(function() {
      $(this).css("backgroundColor", "#222");
      $(this).stop(false, true).animate({
        color: "#C9E033",
        letterSpacing: "1px"
      }, 300);
    }, function() {
      $(this).stop(false, true).animate({
        backgroundColor: "rgb(39, 39, 39)",
        letterSpacing: "0px",
        color: "#888"
      }, 200);
    });
  }
  $('.post-link a').hover(function() {
    $(this).css("backgroundColor", "#222");
  }, function() {
    $(this).stop(false, true).animate({
      backgroundColor: "rgb(39, 39, 39)",
    }, 200);
  });
}

function runAjax() {
  var siteUrl = 'http://'+(document.location.hostname||document.location.host);

    // Make sure that all clicked links that link to your internal website
    // don't just reload the page but execute a History.pushState call
    $(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
        e.preventDefault();
        content = jQuery('.page-content');
        pathname = this.pathname;
        History.pushState({}, "", pathname);
    });

    // Catch all History stateChange events
    History.Adapter.bind(window, 'statechange', function(){
        var State = History.getState();

        // Load the new state's URL via an Ajax Call
        $.get(State.url, function(data){
            // Replace the "<title>" tag's content
            document.title = "bit.brain";

            // Replace the content of the main container (.content)
            // If you're using another div, you should change the selector
            $('.page-content').html($(data).filter('.page-content').html());
            $('.page-content').css('display', 'block');
            // If you're using Google analytics, make sure the pageview is registered!
            //_gaq.push(['_trackPageview', State.url]);
            animate(true);
        });
    });
}

$(document).ready(function() {
  animate(false);
  runAjax();
});
