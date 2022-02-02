/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": timeago.format(1461116232227)
// };

$(document).ready(() => {
  const createTweetElement = (tweet) => {
    const $tweet = `<section class="tweets">
    <form class="tweets-text-box">
    <header class="tweets-user-handle">
    <span class = "tweets-user">${tweet.user.name}</span>
    <span class = "tweets-handle">${tweet.user.handle}</span>
    </header>
    <div class="tweets-user-made">
    <p class="tweets-user-sent">${tweet.content.text}</p>
    </div>
    <footer class="tweets-date-impressions">
    <span class="tweets-date">${tweet.created_at}</span>
    <div class="tweets-impressions">
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
    </div>
    </footer>
    </form>
    </section>`;
    return $tweet;
  };
  
  // const $tweet = createTweetElement(tweetData);
  
  // Test / driver code (temporary)
  //console.log($tweet); // to see what it looks like
  // $('.tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

  //for multiple tweets
  const renderTweets = function(tweetsArr) {
    // loops through tweets
    for (let tweet of tweetsArr) {
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      $('.tweets-container').append(createTweetElement(tweet));
    }
  };
  //renderTweets(data);

  //Add an Event Listener and Prevent the Default Behaviour
  $('.new-tweet-text-box').submit(function(event) {
    event.preventDefault();
    //serialize the form into a query string
    console.log($(this).serialize());
    //Use the jQuery library to submit a POST request that sends the serialized data to the server
    $.post("/tweets", $(this).serialize());
  });

  //define a loadTweets function to fetch tweets from http://localhost:8080/tweets
  // const loadTweets = $(function() {
  //   $.ajax('http://localhost:8080/tweets', { method: 'GET' });
  // });
  // console.log(loadTweets);
  // renderTweets(loadTweets);

  $.get('http://localhost:8080/tweets').then((loadTweets) => {
    renderTweets(loadTweets);
  });

});