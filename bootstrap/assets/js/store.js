// ITEMS ADDED TO CART
//var oldItems = JSON.parse(localStorage.getItem('items'));
var items = [];
/*
init();

function init() {
    for (var i = 0; i < oldItems.length; i++) {
        addItemToRow(oldItems[i], i);
        items[i] = oldItems[i];
    }
    updateTotal();
}
*/
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
  window.open('cart.html', '_self');
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
  var item = {
    itemName,
    itemPrice,
    itemQuantity
    
  };
  return item;
}

// ADD ITEM TO TABLE ROW
function addItemToRow(item) {
  var unitPrice = formatNumberAsUSD(item.itemPrice);
  var row = document.getElementById('items-table').insertRow(items.length);
  row.insertCell(0).innerText = items.length;
  row.insertCell(1).innerText = item.itemName;
  row.insertCell(2).innerText = unitPrice;
    row.insertCell(3).innerText = item.itemQuantity;
    row.insertCell(4).innerHTML = HTMLButtonElement
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

// FORMAT NUMBER TO USD
function formatNumberAsUSD(num) {
  num = '$' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return num.includes('.') ? num : (num = num + '.00');
}
