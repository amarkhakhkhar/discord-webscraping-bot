# discord-webscraping-bot
A discord bot made using JS that performs webScraping using "Puppeteer"  and performs following things: <br>
fetches random quote, fetches stock price from it's stock code, fetches sneaker price from it's name and provides url for buying

Steps to start: <br>
1. npm install<br>
2. Add your respective keys in config.json<br>
3. Then start "node index.js"<br>

Steps to test : <br>
After inviting bot to your server, you can write / and see following commands: <br>
/quotes -> for random quotes<br>
/sneaker -> which will ask for sneaker name-> will fetch sneakers and show their prices,photos, name and link to purchase<br>
/stocks -> which will ask for stock code-> will show it's current price, change in price, % change in price.<br>
