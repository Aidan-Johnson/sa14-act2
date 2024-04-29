document.getElementById('converter').addEventListener('submit', function(e) {
    e.preventDefault();
    const sourceCurrency = document.getElementById('sourceCurrency').value;
    const targetCurrency = document.getElementById('targetCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    fetch(`https://api.exchangerate-api.com/v4/latest/${sourceCurrency}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[targetCurrency];
            const convertedAmount = amount * rate;
            document.getElementById('result').innerHTML = `
            Exchange Rate: 1 ${sourceCurrency} = ${rate.toFixed(4)} ${targetCurrency}
            <br>${amount} ${sourceCurrency} = ${convertedAmount.toFixed(2)} ${targetCurrency}
            `;
        })
});