/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetInfo =  {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//     },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// };

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

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


$(document).ready(() => {
  // renderTweets(data);
  const loadTweets = function() {
    $.ajax('/tweets', {method: "GET"}).then((res) => renderTweets(res))
  }

  const postNewTweet = (event) => {
    event.preventDefault();

    const formData = $('#post-tweet').serialize();
    
    if (formData.length === 5) {
      window.alert("tweet cannot be empty");
      return;
    } else if (formData.length > 145) {
      window.alert("tweet cannot exceed 140 characters");
      return;
    }

    $.ajax({
      method: 'POST',
      data: formData,
      url: '/tweets',
    })
    .then((res) => {
      $(".tweet-container").empty();
      loadTweets(res);
    })
    
  };

  $("#post-tweet").submit((event) => {
    event.preventDefault();
    postNewTweet(event);
    $('textarea').val("");
    $('.counter').val(140).css('color', 'black');
  });
  loadTweets();
});


