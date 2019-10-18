$(document).ready(function() {
  //Card Type Variable
  var cardType;
  var validMonth;
  var cardNumber;
  var cardMatch;
  var validYear;
  var currentTime = new Date();
  var currentYear = currentTime.getFullYear();
  var userYear;
  var currentMonth = currentTime.getMonth() + 1;
  var userMonth;
  var monthErrorMessage = 'Invalid Month\n';
  var yearErrorMessage = 'Invalid Year\n';
  var cardErrorMessage = 'Invalid Card Number\n';
  var valid = [];
  var validMonth;
  var validYear;

  document.getElementById('paymentFormType').onchange = function() {
    checkCardType();
    //window.alert("Im alive");
  };

  document.getElementById('paymentFormNumber').onchange = function() {
    //Ensure there is a value for cardType
    checkCardType();
    cardNumber = this.value;
    if (handleCard(cardNumber)) {
      cardMatch = true;
    } else {
      document.getElementById('paymentFormNumber').value = null;
      cardMatch = false;
    }
  };
  document.getElementById('paymentMonth').onchange = function() {
    if (handleMonth(this.value)) {
      validMonth = true;
    } else {
      document.getElementById('paymentMonth').value = null;
    }
  };
  document.getElementById('paymentYear').onchange = function() {
    if (handleYear(this.value)) {
      validYear = true;
    } else {
      document.getElementById('paymentYear').value = null;
    }
  };

  document.getElementById('submit').addEventListener('click', function(event) {
    if (!validate()) {
      event.preventDefault();
    }
  });
  function checkCardType() {
    cardType = document.getElementById('paymentFormType').value;
  }
  function handleCard(cardNumber) {
    if (parseInt(cardNumber) != NaN) {
      if (cardType == 'VISA') {
        if (cardNumber.match(new RegExp('^4')) != null) {
          //window.alert("Im VISA");
          return true;
        }
      } else if (cardType == 'Mastercard') {
        if (cardNumber.match(new RegExp('^5[1-5]')) != null) {
          //window.alert("Im Mastercard");
          return true;
        }
      } else if (cardType == 'Discovery') {
        if (cardNumber.match(new RegExp('^6011')) != null) {
          //window.alert("Im Discovery");
          return true;
        }
      } else if (cardType == 'AmericanExpress') {
        if (cardNumber.match(new RegExp('^(34|37)')) != null) {
          //window.alert("Im AmericanExpress");
          return true;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function handleMonth(month) {
    if (parseInt(month) != NaN) {
      if (month.match(new RegExp('([1][0-2]|[0][1-9])'))) {
        //window.alert("Correct format");
        userMonth = month;
        return true;
      }
    } else {
      //window.alert("inCorrect format");
    }
  }
  function handleYear(year) {
    if (parseInt(year) != NaN) {
      if (year.match(new RegExp('[2][0][1-2][0-9]'))) {
        //window.alert("Correct format");
        userYear = year;
        return true;
      } else {
        //window.alert("inCorrect format");
        return false;
      }
    }
  }

  function validate() {
    checkCardType();
    if (cardMatch) {
      valid.push(true);
    } else {
      document.getElementById('paymentFormNumber').value = null;
      valid.push(false);
    }

    if (parseInt(userYear) >= currentYear) {
      // Make sure the current year and user year ar >=
      valid.push(true);

      if (parseInt(userYear) == currentYear && validYear) {
        // Ensure that if the current year is the same
        // as the user's input, the month is at least
        // the same as the current month.
        if (parseInt(userMonth) >= currentMonth && validMonth) {
          valid.push(true);
        } else {
          valid.push(false);
        }
      } else {
        valid.push(false);
      }
    } else {
      valid.push(false);
    }

    if (valid.every(Boolean)) {
      // Make sure everything is valid.
      return true;
    } else {
      valid = [];
      return false;
    }
  }
});
