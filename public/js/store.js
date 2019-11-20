// ITEMS ADDED TO CART
var items = [];

// ADD TO CART
document.getElementById('add-to-cart').onclick = function() {
  var item = createNewItemObject();
  items.push(item);
  addItemToRow(item);
  updateTotal();
};

// CHECKOUT
document.getElementById('checkout-button').onclick = function() {
  // Persist data added to cart
  window.localStorage.setItem('items', JSON.stringify(items));

  // Redirect to cart
  window.open('cart', '_self');
};

// UPDATE UNIT PRICE FIELD
document.getElementById('storeFormItems').onchange = function() {
  var form = document.getElementById('storeFormItems');
  var itemPrice = form.options[form.selectedIndex].dataset.amount;
  var unitPrice = formatNumberAsUSD(itemPrice);

  document.getElementById('unitPriceField').innerText = unitPrice;
};

// CREATE AN OBJECT FOR STORAGE
function createNewItemObject() {
  var form = document.getElementById('storeFormItems');
  var itemName = form.options[form.selectedIndex].value;
  var itemPrice = form.options[form.selectedIndex].dataset.amount;
  var itemQuantity = document.getElementById('storeFormQuantity').value;
  if(!itemQuantity) itemQuantity = 1;
  var item = {
    itemName,
    itemPrice,
    itemQuantity
  };
  return item;
}

// ADD ITEM TO TABLE ROW
// function addItemToRow(item) {
//   var unitPrice = formatNumberAsUSD(item.itemPrice);
//   var row = document.getElementById('items-table').insertRow(items.length);
//   row.insertCell(0).innerText = items.length;
//   row.insertCell(1).innerText = item.itemName;
//   row.insertCell(2).innerText = unitPrice;
//   row.insertCell(3).innerText = item.itemQuantity;
// }

// UPDATE TOTAL FIELD
function updateTotal() {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + Number(items[i].itemPrice) * Number(items[i].itemQuantity);
  }
  var totalString = formatNumberAsUSD(total);
  console.log(totalString);
  document.getElementById('totalField').innerHTML = totalString;
}

// FORMAT NUMBER TO USD
function formatNumberAsUSD(num) {
  num = '$' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return num.includes('.') ? num : (num = num + '.00');
}