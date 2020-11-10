// Get Quote From API
async function getQuote() {
    const apiUrl= 'https://freequote.herokuapp.com/';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('whooops, no quote', error);
    }
}

//On Load
getQuote();