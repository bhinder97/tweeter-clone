$(document).ready(function() {

  //vanilla JS
  
  // const input = document.querySelector('textarea');
  // const log = document.getElementById('counter'); //elemsbyClassName returns an ARRAY

  // const changeValue = function(x) {
  //   log.textContent = x.target.value;
  //   let count = log.textContent.length;
  //   let char = 140 - count;
  //   document.getElementById('counter').innerHTML = char; //elembyID returns singular value, better to use than elemsbyClassNAme
  //   if (char < 0) {
  //     document.getElementById('counter').style.color = "red";
  //   } else {
  //     document.getElementById('counter').style.color = "black";
  //   }
  // }
  // input.addEventListener('input', changeValue);


  //jQuery way


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

  // let charCounter = 0;
  // $('textarea').on('input', () => {
  //   charCounter = $('textarea').val().length;
  //   $('.counter').text(140 - charCounter);
  //   if (charCounter > 140) {
  //     $('.counter').css('color', 'red');
  //   }
  // });
  
});