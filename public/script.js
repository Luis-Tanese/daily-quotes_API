const fetchQuote = async () => {
    try {
        const userLang = navigator.language || "en";
        const lang = userLang.split("-")[0];

        const response = await fetch(`/api/daily-quote?lang=${lang}`);
        const data = await response.json();

        if (data.quote && data.author) {
            document.getElementById("quote").textContent = `"${data.quote}"`;
            document.getElementById("author").textContent = `- ${data.author}`;
        } else {
            throw new Error("Invalid data structure");
        }
    } catch (error) {
        document.getElementById("quote").textContent = "Failed to load quote.";
        document.getElementById("author").textContent = "Tanese :3";
        console.error("Error fetching quote:", error);
    }
};

window.onload = fetchQuote;
