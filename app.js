// "budgetController" variable is siply an object containing "publicTest" method because thats what is returned from IEFE and it uses "x" and "add" variable even if the IEFE is already executed
// That is possible because of CLOSURES - inner function has always acces to variables and parameters of its outer function even after the outer function has returned
// The "publicTest" method is public because it was returned and now I can use it but the "x", "add" variables are private because they are in the CLOSURE and therefore only the "publicTest" method can acces it
/* let budgetController = (function() {

  // PRIVATE - CLOSURE START
  const x = 23;

  let add = function(a) {
    return x + a;
  }

  let square = function(a) {
    return a * a;
  }
  // PRIVATE - CLOSURE END

  // PUBLIC
  return {
    publicTest: function(b) {
      return add(b);
    },
    publicTest2: function(b) {
      return square(b);
    }
  }
  // PUBLIC

})(); */



// Each contoller should be independent, contollers shouldn't know each other

//BUDGET CONTROLLER
let budgetController = (function () {



})();



// UI CONTROLLER
let UIContoller = (function () {

    const DOMstrings = {
        inputType: '.add__type',
        inputDesription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        // exposing objects into the PUBLIC
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                descpription: document.querySelector(DOMstrings.inputDesription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        
        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();



// GLOBAL APP CONTROLLER
let controller = (function (budgetCtrl, UICtrl) {

    const setupEventListeners = function() {
        const DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            // there are two conditions because browsers uses two types of key code
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };
    
    

    let ctrlAddItem = function () {
        //console.log('button and enter works properly');

        // 1. Get the filed input data
        let input = UICtrl.getInput();
        //console.log(input);

        // 2. Add the item to the budget controller

        // 3. Add the item to the UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI

        
    };

    return {
        init: function() {
            //console.log('app has started');
            setupEventListeners();
        }
    }

})(budgetController, UIContoller);


controller.init(); // without this line of code nothing will ever happened