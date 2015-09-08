$(document).ready(function() {
  $('.logo').css("letterSpacing", "3px");
  $('.logo').stop(false, true).animate({
      letterSpacing: "0px"
  }, 1000);
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
  $('.post-link a').hover(function() {
    $(this).css("backgroundColor", "#222");
  }, function() {
    $(this).stop(false, true).animate({
      backgroundColor: "rgb(39, 39, 39)",
    }, 200);
  });
});
