let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function addItem() {
  const itemInput = document.getElementById('item');
  const costInput = document.getElementById('cost');
  const item = itemInput.value;
  const cost = parseFloat(costInput.value);

  // Basic validation
  if (item && cost) {
    const expense = {item, cost};
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    itemInput.value = '';
    costInput.value = '';
    updateExpenseList();
  }
}

function updateExpenseList() {
  const expenseList = document.getElementById('expenseList');
  const totalElement = document.getElementById('total');

  // Clear current list
  expenseList.innerHTML = '';

  let total = 0;
  for (const expense of expenses) {
    total += expense.cost;

    // Create list item and append to the list
    const listItem = document.createElement('li');
    listItem.textContent = `${expense.item}: $${expense.cost}`;
    expenseList.appendChild(listItem);
  }

  // Update total
  totalElement.textContent = `$${total.toFixed(2)}`;
}

// Update list when page loads
updateExpenseList();
