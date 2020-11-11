const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')


function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API
async function getQuote() {
  showLoadingSpinner();
  const apiUrl = 'https://freequote.herokuapp.com/';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    //Check If Author is blank and replace it with 'Unknown'
    if (data.author === '') {
      authorText.innerText = 'Unknown'
    } else {
      authorText.innerText = data.author
    }

    //Dynamically reduce font size for long quotes
    if (data.quote.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quote;

    removeLoadingSpinner()
  } catch (error) {
    console.log(error);
  }
}

//On Load
getQuote();

//TweetQuote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');

}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);