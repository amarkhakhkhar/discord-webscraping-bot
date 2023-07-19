# discord-webscraping-bot
A discord bot made using JS that performs webScraping using "Puppeteer"  and performs following things: 
fetches random quote, fetches stock price from it's stock code, fetches sneaker price from it's name and provides url for buying

Steps to start: 
1. npm install
2. Add your respective keys in config.json
3. Then start "node index.js"

Steps to test : 
After inviting bot to your server, you can write / and see following commands: 
/quotes -> for random quotes
/sneaker -> which will ask for sneaker name-> will fetch sneakers and show their prices,photos, name and link to purchase
/stocks -> which will ask for stock code-> will show it's current price, change in price, % change in price.
