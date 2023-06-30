// The complete code is too long to fit in a single response. I'll split the code into two parts. This is part 1.
let cashAccount = localStorage.getItem('cashAccount') ? parseFloat(localStorage.getItem('cashAccount')) : 0;
let myStocks = localStorage.getItem('myStocks') ? JSON.parse(localStorage.getItem('myStocks')) : [];
let accountValueHistory = localStorage.getItem('accountValueHistory') ? JSON.parse(localStorage.getItem('accountValueHistory')) : [{time: new Date().toLocaleString(), value: cashAccount}];
let profitLoss = localStorage.getItem('profitLoss') ? JSON.parse(localStorage.getItem('profitLoss')) : [];

// After signup, replace 'Your_Finnhub_API_Key' with the API key you received
const finnhubApiKey = 'cifhe21r01qhvakk3ie0cifhe21r01qhvakk3ieg';
let currentStock = null;

// Function to deposit cash
function deposit() {
  let depositAmount = parseFloat(document.getElementById('deposit-amount').value);

  if (!isNaN(depositAmount) && depositAmount > 0) {
    cashAccount += depositAmount;
    localStorage.setItem('cashAccount', cashAccount);
    updateDisplay();

    // Clear the input field and give user feedbackf
    document.getElementById('deposit-amount').value = '';
    alert('Deposit successful!');
  } else {
    alert('Please enter a valid deposit amount');
  }
}

// Define stockPrice at the top of your code
let stockPrice = 0;

// ...

// Function to search for a stock
async function searchStock() {
  let ticker = document.getElementById('stock-ticker').value;

  if (ticker) {
    // API endpoint to get real-time quote
    let apiEndpoint = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${finnhubApiKey}`;

    try {
      let response = await fetch(apiEndpoint);
      if (response.ok) {
        let data = await response.json();
        if (data.c) {
          document.getElementById('stock-price').innerText = data.c.toFixed(2);
          stockPrice = data.c;
          currentStock = { ticker: ticker, price: data.c };
        } else {
          alert('Could not fetch the stock price');
        }
      } else {
        alert('Failed to retrieve stock data. Please try again.');
      }
    } catch (error) {
      alert('Error:', error);
    }
  } else {
    alert('Please enter a valid stock ticker');
  }
}

document.getElementById('stock-ticker').addEventListener('input', function(e) {
    e.target.value = e.target.value.toUpperCase();
  });
  

// Function to buy stock
function buyStock() {
  let stockAmount = parseFloat(document.getElementById('stock-amount').value);

  if (currentStock && !isNaN(stockAmount) && stockAmount > 0) {
    let totalPrice = stockAmount * currentStock.price;
    if (totalPrice > cashAccount) {
      alert("Insufficient funds");
    } else {
      cashAccount -= totalPrice;
      myStocks.push({ ticker: currentStock.ticker, amount: stockAmount, purchasePrice: currentStock.price });
      localStorage.setItem('cashAccount', cashAccount);
      localStorage.setItem('myStocks', JSON.stringify(myStocks));
      updateDisplay();
    }
  } else {
    alert('Please enter a valid number of shares');
  }
}

// Function to sell stock
function sellStock(index) {
  let stock = myStocks[index];

  // API endpoint to get real-time quote
  let apiEndpoint = `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${finnhubApiKey}`;

  // Make a GET request to the API endpoint
  fetch(apiEndpoint)
    .then(response => response.json()) // When the data is received, convert it into JSON
    .then(data => {
      if (data.c) {
        let totalPrice = stock.amount * data.c;
        cashAccount += totalPrice;

        let profit = totalPrice - (stock.amount * stock.purchasePrice);
        profitLoss.push({ ticker: stock.ticker, amount: stock.amount, profit: profit });

        myStocks.splice(index, 1); // Remove the stock from myStocks array

        localStorage.setItem('cashAccount', cashAccount);
        localStorage.setItem('myStocks', JSON.stringify(myStocks));
        localStorage.setItem('profitLoss', JSON.stringify(profitLoss));

        updateDisplay();
      } else {
        alert('Could not fetch the stock price');
      }
    })
    .catch(error => alert('Error:', error)); // If there's an error, alert it
}

// Function to update display
function updateDisplay() {
    document.getElementById('cash-account').innerText = 'Current Balance: $' + cashAccount.toLocaleString('en-US', { minimumFractionDigits: 2 });
  
    // Update My Stocks section
    let myStocksDiv = document.getElementById('my-stocks');
    myStocksDiv.innerHTML = '';
    myStocks.forEach((stock, index) => {
      myStocksDiv.innerHTML += `<p>${stock.ticker}: ${stock.amount} shares, bought at $${stock.purchasePrice} <button onclick="sellStock(${index})">Sell</button></p>`;
    });
  
    // Update Profit/Loss section
    let profitLossDiv = document.getElementById('profit-loss');
    profitLossDiv.innerHTML = '';
    profitLoss.forEach(record => {
      let profitLossColor = record.profit >= 0 ? 'green' : 'red';
      profitLossDiv.innerHTML += `<p style="color:${profitLossColor}">${record.ticker}: ${record.amount} shares, Profit/Loss: $${record.profit.toFixed(2)}</p>`;
    });
  
    // Update Account Value History section
    let accountValueHistoryDiv = document.getElementById('account-value-history');
    accountValueHistoryDiv.innerHTML = '';
    accountValueHistory.forEach(record => {
      accountValueHistoryDiv.innerHTML += `<p>${record.time}: $${record.value.toFixed(2)}</p>`;
    });
  
    // Record the current account value
    accountValueHistory.push({time: new Date().toLocaleString(), value: cashAccount});
    localStorage.setItem('accountValueHistory', JSON.stringify(accountValueHistory));
  }
  
  // Call updateDisplay on page load
  updateDisplay();
  
  // Function to clear all data
function clearData() {
    localStorage.clear();
    location.reload(); // This will reload the page after clearing data
  }
// Event listener for input change
document.getElementById('stock-amount').addEventListener('input', updateEstimatedPrice);

// Function to update estimated price
function updateEstimatedPrice() {
    let stockAmount = parseFloat(document.getElementById('stock-amount').value);
  
    // Check if the input is not a number (NaN), if so, set it to 0
    if (isNaN(stockAmount)) {
      stockAmount = 0;
    }
  
    let estimatedPrice = stockAmount * stockPrice;
  
    // Display estimated price
    document.getElementById('estimated-price').innerText = 'Estimated Price: $' + estimatedPrice.toFixed(2);
  }
  
  