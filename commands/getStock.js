const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const puppeteer = require('puppeteer');

const getStock = async (code) => {


    // Start a Puppeteer session with:
    // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
    // - no default viewport (`defaultViewport: null` - website page will be in full width and height)
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    // Open a new page
    const page = await browser.newPage();

    // On this new page:
    // - open the "http://quotes.toscrape.com/" website
    // - wait until the dom content is loaded (HTML is ready)
    await page.goto(`https://finance.yahoo.com/quote/${code}`, {
        waitUntil: "domcontentloaded",
    });

    // Get page data
    const stock = await page.evaluate(() => {
        const s = document.querySelector(".D\\(ib\\).Mend\\(20px\\)");
        const price = document.querySelector(".D\\(ib\\).Mend\\(20px\\)").firstChild.outerText;
        const prChange = document.querySelector(".D\\(ib\\).Mend\\(20px\\)").children[1].outerText;
        const perChange = document.querySelector(".D\\(ib\\).Mend\\(20px\\)").children[2].outerText;

        return { price, prChange, perChange }
    })

    // Display the quotes
    // console.log(stock);

    //Close the browser Return the Quote 
    await browser.close();
    return stock;


};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stock')
        .setDescription('Replies with Stock Price!').addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back')
                .setRequired(true)),

    async execute(interaction) {
        const code = interaction.options.getString("input")

        await interaction.deferReply();
        fStock = await getStock(code);
        const embed = new EmbedBuilder()
            .setColor(0xEFFF00)
            .setTitle(`Stock Update for ${code}`)
            .setURL(`https://finance.yahoo.com/quote/${code}`)
            .addFields({ name: 'Price', value: fStock.price }, { name: 'Price Change', value: fStock.prChange }, { name: 'Percentage Change', value: fStock.perChange});

            console.log(fStock.price)
        await interaction.editReply({ embeds: [embed] });
        // await interaction.editReply(fQuote);
    },
};