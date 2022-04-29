/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweetInfo) {
  let $tweet = $(`
  <article class="tweet">
          <header class="tweet-header">
            <span class="user">
              <img class="user-icon" src=${tweetInfo.user.avatars}>
              <p class="user">${tweetInfo.user.name}</p>
            </span>

            <span class="handle">${tweetInfo.user.handle}</span>
          </header>
          <p class="tweet-content">
            ${tweetInfo.content.text}
          </p>
          <footer class="tweet-footer">
            <time>${timeago.format(tweetInfo.created_at)}</time>
            <div class="icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>
        `)
        return $tweet;
};


const renderTweets = function(array) {
  for (let obj of array) {
    let newTweet = createTweetElement(obj);
  $('.tweet-container').prepend(newTweet);
  } 
}

const errorDisplay = function() {
  setTimeout(() => {
    $('.error-message').css('display', 'none');
    $('.error-message').css('visibility', 'hidden')
  }, 2000)
}

$(document).ready(() => {
  const loadTweets = function() {
    $.ajax('/tweets', {method: "GET"}).then((res) => renderTweets(res))
  }

  const postNewTweet = (event) => {
    event.preventDefault();

    const formData = $('#post-tweet').serialize();
    const textLength = $('#tweet-text').val().length;

    if (textLength === 0) {
      $('.error-message').css('display', 'block');
      $('.error-message').css('visibility', 'visible');
      errorDisplay();
      return;
    } else if (textLength > 140) {
      $('.error-message').css('display', 'block');
      $('.error-message').css('visibility', 'visible')
      errorDisplay();
      return;
    } else if (textLength > 1 && textLength <= 141) {
      $.ajax({
        method: 'POST',
        data: formData,
        url: '/tweets',
      })
      .then((res) => {
        $(".tweet-container").empty();
        loadTweets(res);
      })
    }
  };

  $("#post-tweet").submit((event) => {
    event.preventDefault();
    postNewTweet(event);
    $('textarea').val("");
    $('.counter').val(140).css('color', 'black');
  });
  loadTweets();
});


