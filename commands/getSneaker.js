const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
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
    code = code.replace(" ", "%20")
    await page.goto(`https://www.solesearchindia.com/products?search_query=${code}&product_type=Sneakers`, {
        waitUntil: 'load',
    });
    // await page.goto(`https://stockx.com/search?s=${code}`, {
    //     waitUntil: "domcontentloaded",
    // });

    // Get page data
    const stock = await page.evaluate(() => {

        // All 10 sneakers solesearch
        const name = Array.from(document.querySelectorAll(".product-name")).map(x => x.innerText)
        const price = Array.from(document.querySelectorAll(".product-price")).map(x => x.innerText)

        const images = Array.from(document.querySelectorAll(".sneaker__img.mt-4")).map(x => x.firstChild.src)
        const urls = Array.from(document.querySelectorAll(".product-name")).map(x => x.firstChild.href)

        // document.querySelector(".product-name").firstChild.href
        // const single = Array.from(document.querySelectorAll(".product-name")).slice(0,10);

        return {name, price, images,urls};

        // STOCKX 
        // var name = document.querySelectorAll(".chakra-text.css-3lpefb")

        // const price = Array.from(document.querySelectorAll(".chakra-text.css-nsvdd9")).slice(0, 10);
        // const images = Array.from(document.querySelectorAll(".css-tkc8ar")).slice(0, 10);
        
        // return name;
        // return { name, price, images };

        // Single Name
        // Array.from(document.querySelectorAll(".chakra-text.css-3lpefb"))[0].innerText;

        //Single Image
        // document.querySelector(".css-tkc8ar").innerHTML.split("srcset=\"")[1].split(" ")[0]
    })

    // Display the quotes
    // console.log(stock);

    //Close the browser Return the Quote 
    await browser.close();
    return stock;


};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sneaker')
        .setDescription('Replies with Sneaker Price!').addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back')
                .setRequired(true)),

    async execute(interaction) {
        const code = interaction.options.getString("input")

        await interaction.deferReply();
        fStock = await getStock(code);
        var embedF = []
        for (let i = 0; i < 10; i++) {
            const file = new AttachmentBuilder(fStock.images[i]);
            const embed = new EmbedBuilder()
                .setColor(0xEFFF00)
                .setTitle(`Sneaker match${i+1} for ${code}`)
                .setImage(fStock.images[i])
                .setURL(fStock.urls[i])
                .addFields({ name: 'Name', value: fStock.name[i] }, { name: 'Price', value: fStock.price[i] });

        embedF.push(embed);
        }
        
        await interaction.editReply({ embeds: [...embedF] });
    },
};