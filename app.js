import { getData } from "./api.js";
import { renderWeatherResults } from "./dom.js";

// Change to ID or use the form submit event for better reliability
const searchForm = document.querySelector("#search-form");
const input = document.querySelector("#city-input");

async function initApp(cityName) {
    if (!cityName) return; // Don't run if empty
    try {
        const currentInfo = await getData(cityName);
        if (currentInfo) {
            renderWeatherResults(currentInfo);
        }
    } catch (error) {
        console.error("Failed to fetch weather:", error);
    }
}

// Use 'submit' on the form instead of 'click' on the button
// This allows the user to press 'Enter' to search
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = input.value.trim();
    initApp(location);
});

// DARK MODE LOGIC (Stays the same)
// ...

// DARK MODE LOGIC
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('span');

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        icon.textContent = 'light_mode';
    } else {
        icon.textContent = 'dark_mode';
    }
});