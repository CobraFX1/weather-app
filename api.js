async function getData(location) {
    try {
        const API_KEY = 'RKPZ9WCKY9W3PUZAFY63KQXXZ';
const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}`);        const weatherData = await response.json();
        console.log(weatherData);
        return {
            // Top Header & Main Display
            name: weatherData.resolvedAddress,
            date: new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }),
            temp: Math.round(weatherData.currentConditions.temp),
            description: weatherData.currentConditions.conditions,

            // High/Low for the current day (first item in days array)
            high: Math.round(weatherData.days[0].tempmax),
            low: Math.round(weatherData.days[0].tempmin),

            // Metrics Grid
            humidity: weatherData.currentConditions.humidity,
            wind: weatherData.currentConditions.windspeed,
            pressure: weatherData.currentConditions.pressure,
            visibility: weatherData.currentConditions.visibility,

            // 5-Day Forecast (starts from tomorrow, which is index 1)
            forecast: weatherData.days.slice(1, 6).map(day => ({
                dayName: new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'short' }),
                tempMax: Math.round(day.tempmax),
                tempMin: Math.round(day.tempmin),
                icon: day.icon // Helpful if you decide to add dynamic icons later
            }))
        };
    } catch (error) {
        console.error(error);
    }
}
export { getData };