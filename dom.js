export function renderWeatherResults(data) {
    const mainContainer = document.querySelector('main');
    if (!mainContainer) return;

    mainContainer.innerHTML = '';

    const resultsFragment = document.createDocumentFragment();

    // 1. City Header
    const cityHeader = document.createElement('section');
    cityHeader.className = 'city-header';
    cityHeader.innerHTML = `
        <div class="city-title">
            <h1>${data.name}</h1>
            <p>${new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
        <div class="location-badge" style="display: flex; align-items: center; gap: 0.5rem; background: rgba(57, 148, 239, 0.1); color: var(--primary); padding: 0.4rem 1rem; border-radius: 999px; font-size: 0.875rem; font-weight: 700;">
            <span class="material-symbols-outlined" style="font-size: 18px;">location_on</span>
            Current Location
        </div>
    `;

    // 2. Main Card
    const weatherCard = document.createElement('section');
    weatherCard.className = 'weather-card';
    weatherCard.innerHTML = `
        <div class="weather-info">
            <span class="material-symbols-outlined" style="font-size: 96px; color: var(--primary);">partly_cloudy_day</span>
            <p class="temp-main">${data.temp}°</p>
            <p style="font-size: 1.5rem; font-weight: 700;">${data.description}</p>
            <p style="color: var(--text-muted); font-size: 1.125rem;">High: ${data.high}° &nbsp; Low: ${data.low}°</p>
        </div>
        <div class="metrics-grid">
            ${renderMetric('humidity_percentage', 'Humidity', `${data.humidity}%`)}
            ${renderMetric('air', 'Wind', `${data.wind} km/h`)}
            ${renderMetric('compress', 'Pressure', `${data.pressure} hPa`)}
            ${renderMetric('visibility', 'Visibility', `${data.visibility} km`)}
        </div>
    `;

    // 3. Forecast
    const forecastSection = document.createElement('section');
    forecastSection.className = 'forecast-section';
    forecastSection.style.marginTop = '2.5rem';
    forecastSection.innerHTML = `<h3 style="margin-bottom: 1rem; font-weight: 800;">5-Day Forecast</h3>`;
    
    const forecastList = document.createElement('div');
    data.forecast.forEach(day => {
        const row = document.createElement('div');
        row.className = 'forecast-row';
        row.innerHTML = `
            <p style="width: 60px; font-weight: 700;">${day.dayName}</p>
            <div style="display: flex; align-items: center; gap: 1.5rem;">
                <span class="material-symbols-outlined" style="color: var(--primary);">sunny</span>
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <p style="font-weight: 800; width: 30px;">${day.tempMax}°</p>
                    <div class="bar-track"><div class="bar-active" style="left: 20%; right: 20%;"></div></div>
                    <p style="color: var(--text-muted); width: 30px;">${day.tempMin}°</p>
                </div>
            </div>
        `;
        forecastList.appendChild(row);
    });
    forecastSection.appendChild(forecastList);

    resultsFragment.append(cityHeader, weatherCard, forecastSection);
    mainContainer.appendChild(resultsFragment);
}

function renderMetric(icon, label, value) {
    return `
        <div class="metric-item">
            <span class="material-symbols-outlined">${icon}</span>
            <span style="font-size: 0.7rem; text-transform: uppercase; font-weight: 800; color: var(--text-muted);">${label}</span>
            <p style="font-size: 1.25rem; font-weight: 900;">${value}</p>
        </div>
    `;
}