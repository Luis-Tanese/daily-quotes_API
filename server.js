const express = require("express");
const { getQuoteByDate, getAllQuotes } = require("./middleware/quote");
const { dateTan } = require("datetan");
const translate = require("google-translate-api-x");

const app = express();

app.use((req, res, next) => {
    const { method, url, query } = req;
    const timestamp = new Date();
    console.log(
        `[${dateTan(
            timestamp,
            "DDDD, DD de MMMM YYYY as HH:mm:ss (Semana WW, TZ Z)",
            "pt-BR"
        )}]: ${method} ${url} - Query: ${JSON.stringify(query)}`
    );
    next();
});

app.get("/api/daily-quote", async (req, res) => {
    const { date, lang } = req.query;
    const result = getQuoteByDate(date);

    if (result.error) {
        return res.status(400).json(result);
    }

    let quote = result;

    if (lang) {
        try {
            const translation = await translate(quote.quote, { to: lang });
            quote = {
                quote: translation.text,
                author: quote.author,
                language: lang,
            };
            return res.status(200).json(quote);
        } catch (error) {
            const timestamp = new Date();
            console.error(
                `[${dateTan(
                    timestamp,
                    "DDDD, DD de MMMM YYYY as HH:mm:ss (Semana WW, TZ Z)",
                    "pt-BR"
                )}]: Translation Failed: `,
                error.message
            );
            return res.status(500).json({
                error: "Translation failed. Check the language code and try again.",
            });
        }
    }

    res.status(200).json({ ...quote, language: "en" });
});

app.get("/api/random-quote", async (req, res) => {
    const { lang } = req.query;
    const quotes = getAllQuotes();

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    let quote = randomQuote;

    if (lang) {
        try {
            const translation = await translate(quote.quote, { to: lang });
            quote = {
                quote: translation.text,
                author: quote.author,
                language: lang,
            };
            return res.status(200).json(quote);
        } catch (error) {
            const timestamp = new Date();
            console.error(
                `[${dateTan(
                    timestamp,
                    "DDDD, DD de MMMM YYYY as HH:mm:ss (Semana WW, TZ Z)",
                    "pt-BR"
                )}]: Translation Failed: `,
                error.message
            );
            return res.status(500).json({
                error: "Translation failed. Check the language code and try again.",
            });
        }
    }

    res.status(200).json({ ...quote, language: "en" });
});

module.exports = app;
