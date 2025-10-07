const apiURL = 'https://api.exchangerate-api.com/v4/latest/USD';
let rates = {};

const currencySymbols = {
    "USD": "$",        // US Dollar
    "TZS": "TSh",      // Tanzanian Shilling
    "EUR": "€",        // Euro
    "GBP": "£",        // British Pound
    "JPY": "¥",        // Japanese Yen
    "CAD": "C$",       // Canadian Dollar
    "AUD": "A$",       // Australian Dollar
    "CNY": "¥",        // Chinese Yuan
    "INR": "₹",        // Indian Rupee
    "CHF": "CHF",      // Swiss Franc
    "NZD": "NZ$",      // New Zealand Dollar
    "ZAR": "R",        // South African Rand
    "KES": "KSh",      // Kenyan Shilling
    "UGX": "USh",      // Ugandan Shilling
    "GHS": "GH₵",      // Ghanaian Cedi
    "NGN": "₦",        // Nigerian Naira
    "EGP": "E£",       // Egyptian Pound
    "SAR": "﷼",        // Saudi Riyal
    "AED": "د.إ",      // UAE Dirham
    "QAR": "﷼",        // Qatari Riyal
    "BHD": ".د.ب",     // Bahraini Dinar
    "OMR": "﷼",        // Omani Rial
    "PKR": "₨",        // Pakistani Rupee
    "LKR": "Rs",       // Sri Lankan Rupee
    "MMK": "Ks",       // Myanmar Kyat
    "THB": "฿",        // Thai Baht
    "VND": "₫",        // Vietnamese Dong
    "MYR": "RM",       // Malaysian Ringgit
    "SGD": "S$",       // Singapore Dollar
    "IDR": "Rp",       // Indonesian Rupiah
    "KRW": "₩",        // South Korean Won
    "BTC": "₿",        // Bitcoin
    "XOF": "CFA",      // West African CFA Franc
    "XAF": "FCFA",     // Central African CFA Franc
    "MAD": "د.م",      // Moroccan Dirham
    "DZD": "د.ج",      // Algerian Dinar
    "TND": "د.ت",      // Tunisian Dinar
    "JOD": "د.ا",      // Jordanian Dinar
    "LBP": "ل.ل",      // Lebanese Pound
    "TRY": "₺",        // Turkish Lira
    "RUB": "₽",        // Russian Ruble
    "PLN": "zł",       // Polish Zloty
    "SEK": "kr",       // Swedish Krona
    "NOK": "kr",       // Norwegian Krone
    "DKK": "kr",       // Danish Krone
    "HUF": "Ft",       // Hungarian Forint
    "CZK": "Kč",       // Czech Koruna
    "ILS": "₪",        // Israeli Shekel
    "CLP": "$",        // Chilean Peso
    "COP": "$",        // Colombian Peso
    "ARS": "$",        // Argentine Peso
    "BRL": "R$",       // Brazilian Real
    "MXN": "$",        // Mexican Peso
    "PEN": "S/",       // Peruvian Sol
    "UYU": "$U",       // Uruguayan Peso
    "BOB": "Bs.",      // Bolivian Boliviano
    "PYG": "Gs",       // Paraguayan Guarani
    "DOP": "RD$",      // Dominican Peso
    "CRC": "₡",        // Costa Rican Colón
    "HNL": "L",        // Honduran Lempira
    "GTQ": "Q",        // Guatemalan Quetzal
    "NIO": "C$",       // Nicaraguan Córdoba
    "BZD": "BZ$",      // Belize Dollar
    "JMD": "J$",       // Jamaican Dollar
    "FJD": "FJ$",      // Fijian Dollar
    "PGK": "K",        // Papua New Guinean Kina
    "SAR": "﷼",        // Saudi Riyal
    "KHR": "៛",        // Cambodian Riel
    "LAK": "₭",        // Lao Kip
};


// Fetch rates
async function fetchRates() {
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        rates = data.rates;
        populateCurrencyDropdown();
    } catch (error) {
        console.error('Error fetching rates:', error);
    }
}

// Populate dropdowns
function populateCurrencyDropdown() {
    const from = document.getElementById('fromCurrency');
    const to = document.getElementById('toCurrency');

    for (let currency in rates) {
        let option1 = document.createElement('option');
        option1.value = currency;
        option1.text = currency;
        from.appendChild(option1);

        let option2 = document.createElement('option');
        option2.value = currency;
        option2.text = currency;
        to.appendChild(option2);
    }

    from.value = 'USD';
    to.value = 'TZS';
}

// Convert currency
document.getElementById('convertBtn').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if(!amount) {
        alert("Please enter an amount");
        return;
    }

    const converted = (amount / rates[fromCurrency]) * rates[toCurrency];
    addResultToTable(fromCurrency, toCurrency, amount, converted.toFixed(2));
});

// Add result to table
function addResultToTable(from, to, amount, converted) {
    const tbody = document.querySelector('#resultTable tbody');
    const tr = document.createElement('tr');

    const fromSymbol = currencySymbols[from] || from;
    const toSymbol = currencySymbols[to] || to;

    tr.innerHTML = `
        <td>${from} (${fromSymbol})</td>
        <td>${to} (${toSymbol})</td>
        <td>${fromSymbol} ${amount}</td>
        <td>${toSymbol} ${converted}</td>
    `;

    tbody.prepend(tr);
}

// Initialize
fetchRates();
