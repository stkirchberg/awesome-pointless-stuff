const monthInput = document.getElementById("month");
const dayInput = document.getElementById("day");
const yearInput = document.getElementById("year");

const button = document.getElementById("calculate");

const exactAgeEl = document.getElementById("exact-age");
const detailedAgeEl = document.getElementById("detailed-age");
const lifePercentageEl = document.getElementById("life-percentage");

button.addEventListener("click", () => {

    const month = parseInt(monthInput.value, 10);
    const day = parseInt(dayInput.value, 10);
    const year = parseInt(yearInput.value, 10);

    if (!month || !day || !year) {
        exactAgeEl.textContent = "Please enter a valid date.";
        detailedAgeEl.textContent = "";
        lifePercentageEl.textContent = "";
        return;
    }

    const birthDate = new Date(year, month - 1, day);
    const now = new Date();

    if (birthDate > now) {
        exactAgeEl.textContent = "Birth date cannot be in the future.";
        detailedAgeEl.textContent = "";
        lifePercentageEl.textContent = "";
        return;
    }

    const diffMs = now - birthDate;
    const msPerDay = 1000 * 60 * 60 * 24;
    const msPerYear = msPerDay * 365.2425;

    const exactAge = diffMs / msPerYear;

    let tempDate = new Date(birthDate);
    let years = 0;
    let months = 0;

    while (new Date(tempDate.getFullYear() + 1, tempDate.getMonth(), tempDate.getDate()) <= now) {
        tempDate.setFullYear(tempDate.getFullYear() + 1);
        years++;
    }

    while (new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, tempDate.getDate()) <= now) {
        tempDate.setMonth(tempDate.getMonth() + 1);
        months++;
    }

    const days = Math.floor((now - tempDate) / msPerDay);

    const totalDays = Math.floor(diffMs / msPerDay);
    const totalMonths = Math.floor(totalDays / 30.436875);

    const lifeAvg = 73.4;
    const lifeMale = 70.8;
    const lifeFemale = 76.0;

    const percentAvg = (exactAge / lifeAvg) * 100;
    const percentMale = (exactAge / lifeMale) * 100;
    const percentFemale = (exactAge / lifeFemale) * 100;

    exactAgeEl.innerHTML = `
        <strong>Exact age:</strong><br>
        ${exactAge.toFixed(3)} years
    `;

    detailedAgeEl.innerHTML = `
        <strong>Age breakdown:</strong><br>
        ${years} years, ${months} months, ${days} days<br>
        ${totalMonths} months, ${days} days<br>
        ${totalDays} days
    `;

    lifePercentageEl.innerHTML = `
        <strong>Life expectancy used:</strong><br>
        Average (73.4 years): ${percentAvg.toFixed(1)}%<br>
        Male (70.8 years): ${percentMale.toFixed(1)}%<br>
        Female (76.0 years): ${percentFemale.toFixed(1)}%
    `;
});
