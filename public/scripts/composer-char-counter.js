$(document).ready(function() {
  const log = $('.counter'); //use . to pull class names
  $('textarea').on('input', (x) => { //listens to input events on textarea HTML
    let count = x.target.value.length;
    let char = 140;
    char = 140 - count;
    $(log).text(char);
    if (char < 0) {
      $(log).css('color', 'red');
    } else {
      $(log).css('color', 'black');
    }
  });
});