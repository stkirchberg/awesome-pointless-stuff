const birthdateInput = document.getElementById("birthdate");
const button = document.getElementById("calculate");
const result = document.getElementById("result");

button.addEventListener("click", () => {
    if (!birthdateInput.value) {
        result.textContent = "Bitte Datum auswählen";
        return;
    }

    const birthDate = new Date(birthdateInput.value);
    const now = new Date();

    const diffMs = now - birthDate;

    const msPerYear = 1000 * 60 * 60 * 24 * 365.2425;

    const age = diffMs / msPerYear;

    result.textContent = age.toFixed(3).replace(".", ",");
});
