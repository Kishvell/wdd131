// Get the elements where we'll display the windchill
const windChillElement = document.getElementById('windchill');
const temperatureElement = document.getElementById('temperature');
const windSpeedElement = document.getElementById('windSpeed');

// Real-time values for Buenos Aires (replace with actual values)
const temperature = 17.8; // In degrees Celsius
const windSpeed = 3.7; // In kilometers per hour

// Function to calculate windchill
function calculateWindChill(temperature, windSpeed) {
  // Formula for metric units (Celsius)
  if (temperature <= 10 && windSpeed > 4.8) {
    return Math.round(13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16));
  } else {
    return "N/A";
  }
}

// Calculate and display the windchill
const windChill = calculateWindChill(temperature, windSpeed);
windChillElement.textContent = windChill;

// Update the footer with the current year and last modified date
const footer = document.querySelector('footer');
const currentYear = new Date().getFullYear();
const lastModified = document.lastModified;
footer.innerHTML = `&copy; ${currentYear} | Last Modified: ${lastModified}`;
