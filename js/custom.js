
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
        if (siteUrl.indexOf("http") == -1) {
          e.preventDefault();
          content = jQuery('.page-content');
          pathname = this.pathname;
          History.pushState({}, "", pathname);
        }
    });

    // Catch all History stateChange events
    History.Adapter.bind(window, 'statechange', function(){
        var State = History.getState();

        // Load the new state's URL via an Ajax Call
        $.get(State.url, function(data){
            // Replace the "<title>" tag's content
            document.title = "my:reality";

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

function info() {
  console.log(
    ' _  _  _  _  _  ____  ____   __   __    __  ____  _  _ \n' +
    '( \\/ )( \\/ )(_)(  _ \\(  __) / _\\ (  )  (  )(_  _)( \\/ )\n' +
    '/ \\/ \\ )  /  _  )   / ) _) /    \\/ (_/\\ )(   )(   )  /\n' +
    '\\_)(_/(__/  (_)(__\\_)(____)\\_/\\_/\\____/(__) (__) (__/\n' +
    '\n' +
    ' Welcome, my friend! You like what I do?\n' +
    ' For questions or requests just ping me on Twitter @tweetmyreality\n' +
    '\n' +
    ' - Cheers, Miguel :-)\n');
}

function populateTweet(tweets) {
  console.log(tweets);
}

$(document).ready(function() {
  animate(false);
  runAjax();
  info();
  var config = {
    "id": '229941311',
    "dataOnly": true,
    "customCallback": populateTweet
  };
  twitterFetcher.fetch(config);
});
