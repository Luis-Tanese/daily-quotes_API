const fs = require("fs");
const path = require("path");

const getQuoteByDate = (dateString) => {
    const quotesPath = path.join(__dirname, "../quotes.json");
    const quotes = JSON.parse(fs.readFileSync(quotesPath, "utf-8"));

    const date = dateString ? new Date(dateString) : new Date();

    if (isNaN(date.getTime())) {
        return { error: "Invalid date format. Use YYYY-MM-DD." };
    }

    const dayIndex = date.getDate() % quotes.length;
    return quotes[dayIndex];
};

const getAllQuotes = () => {
    const quotesPath = path.join(__dirname, "../quotes.json");
    return JSON.parse(fs.readFileSync(quotesPath, "utf-8"));
};

module.exports = { getQuoteByDate, getAllQuotes };
