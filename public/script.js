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

const toggleTheme = () => {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");
};

window.onload = () => {
    fetchQuote();
    document
        .getElementById("toggle-theme")
        .addEventListener("click", toggleTheme);

    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;
    document.body.classList.add(prefersDark ? "dark-theme" : "light-theme");
};
