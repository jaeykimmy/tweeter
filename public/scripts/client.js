/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //for single tweet rendering
  const createTweetElement = (tweet) => {
    const $tweet = `<section class="tweets">
    <form class="tweets-text-box">
    <header class="tweets-user-handle">
    <div class="tweets-avatar-user">
    <img class="tweets-avatar" src = "${escape(tweet.user.avatars)}">
    <span class = "tweets-user">${escape(tweet.user.name)}</span>
    </div>
    <span class = "tweets-handle">${escape(tweet.user.handle)}</span>
    </header>

    <div class="tweets-user-made">
    <p class="tweets-user-sent">${escape(tweet.content.text)}</p>
    </div>

    <footer class="tweets-date-impressions">
    <span class="tweets-date">${escape(timeago.format(tweet.created_at))}</span>
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

  //for multiple tweets
  const renderTweets = function (tweetsArr) {
    $(".tweets-container").empty();
    // loops through tweets
    for (let tweet of tweetsArr) {
      // calls createTweetElement for each tweet
      // takes return value and prepends it to the tweets container
      $(".tweets-container").prepend(createTweetElement(tweet));
    }
  };

  //Add an Event Listener and Prevent the Default Behaviour
  $(".new-tweet-text-box").submit(function (event) {
    event.preventDefault();
    const currentLength = $("#tweet-text").val().length;
    console.log(currentLength);
    if (currentLength <= 140) {
      $.ajax({
        url: "/tweets",
        //serialize the form into a query string
        data: $(this).serialize(),
        //Use the jQuery library to submit a POST request that sends the serialized data to the server
        method: "post",
        //Upon success, have the post load immediately without refreshing the page
        success: function () {
          $("#tweet-text").val("");
          loadTweets();
          //reset counter after posting tweet
          $("#tweet-text").parent().find(".counter").val(140);
        },
      });
    }
    if (currentLength === 0) {
      $(".alert-short").slideDown();
    }
  });

  //define a loadTweets function to fetch tweets from http://localhost:8080/tweets
  const loadTweets = () => {
    $.get("/tweets").then((tweets) => {
      renderTweets(tweets);
    });
  };
  loadTweets();
});
