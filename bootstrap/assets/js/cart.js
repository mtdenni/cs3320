var items = JSON.parse(localStorage.getItem('items'));
init();

// GENERATE FORM INFO
function init() {
  for (var i = 0; i < items.length; i++) {
    addItemToRow(items[i], i);
  }
  updateTotal();
}

// ADD ITEMS TO ROW
function addItemToRow(item, i) {
  var unitPrice = formatNumberAsUSD(item.itemPrice);
  var row = document.getElementById('items-table').insertRow(i + 1);
  row.insertCell(0).innerText = i + 1;
  row.insertCell(1).innerText = item.itemName;
  row.insertCell(2).innerText = unitPrice;
  row.insertCell(3).innerText = item.itemQuantity;
}

// FORMAT NUMBER TO USD
function formatNumberAsUSD(num) {
  num = '$' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return num.includes('.') ? num : (num = num + '.00');
}

// UPDATE TOTAL FIELD
function updateTotal() {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + Number(items[i].itemPrice) * Number(items[i].itemQuantity);
  }
  var totalString = formatNumberAsUSD(total);

  document.getElementById('totalField').innerHTML = totalString;
}
