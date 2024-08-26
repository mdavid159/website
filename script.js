const option1 = document.querySelector(".option-1");
const option2 = document.querySelector(".option-2");
const button = document.querySelector(".btn");
const result = document.querySelector(".result");
const amount = document.querySelector(".amount"); 
const api_key = "cur_live_gmpVvt2D3NcfbUghWF1HFyUWBkVomdw7r1hURRld";

amount.addEventListener("input", () => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (!regex.test(amount.value)) {
        amount.value = amount.value.slice(0, -1);
    }
});

async function getCurrency(option1Value, option2Value, amountValue) {
    const api_url = `https://api.currencyapi.com/v3/latest?apikey=${api_key}&currencies=${option2Value}&base_currency=${option1Value}`;

    try {
        const response = await fetch(api_url);
        const data = await response.json();
        console.log(data);
        result.textContent = `${amountValue} ${option1Value} = ${(data.data[option2Value].value * amountValue).toFixed(2)} ${option2Value}`;
    } catch (error) {
        console.error("Error fetching currency data:", error);
        result.textContent = "Error fetching currency data.";
    }
}

button.addEventListener("click", async () => {
    const option1Value = option1.value;
    const option2Value = option2.value;
    const amountValue = amount.value;

    if (amountValue === "" || isNaN(amountValue) || amountValue <= 0) {
        result.textContent = "Please enter a valid amount.";
        return;
    }
    getCurrency(option1Value, option2Value, amountValue);
    
});