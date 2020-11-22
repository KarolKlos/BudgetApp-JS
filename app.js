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
 
    // Function constructors for Expense and Income
    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Structured data - containers for newly created objects

    /* // simple data structure
    let allExpenses = [];
    let allIncomes = [];
    let totalExpenses = 0; */

    /* // better way
    let data = {
        allExpenses: [],
        allIncomes: [],
        totalExpenses: 0
    } */
    
    // or a much better way - good practice
    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    // Return a ready, structured data for GLOBAL APP CONTROLLER
    // expose objects into the PUBLIC
    return {
        addItem: function(type, des, val) {
            let newItem;

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create a new Expense or Income objects based on "inc" or "exp" type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }
            
            // Store them into an "allItems" array
            data.allItems[type].push(newItem);
            // Expose new element to the PUBLIC
            return newItem;
        },

        testing: function() {
            console.log(data);
        }
    };
    
})();



// UI CONTROLLER
let UIContoller = (function () {

    // 
    const DOMstrings = {
        inputType: '.add__type',
        inputDesription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list'
    };

    // expose objects into the PUBLIC
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDesription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },

        // obj is the exact object made by function constructor and passed into APP CONTROLLER
        addListItem: function(obj, type) {
            let html, newHtml, element;
            
            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btclass="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btclass="ion-ios-close-outline"></i></button></div></div></div>';
            };

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM - JSON method
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        // Clear the input fields after adding income/expense items
        clearFields: function() {
            let fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDesription + ', ' + DOMstrings.inputValue);

            // fields is a list so fieds.slice() will not work
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });

            // Select first element of fields array which is DOMstrings.inputDescpription and use focus method to set the cursor on it after adding an income/expense item
            fieldsArr[0].focus();
        },
        
        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();



// GLOBAL APP CONTROLLER
let controller = (function (budgetCtrl, UICtrl) {

    // Store all event listeners in a variable instead of writing them again in "return" 
    const setupEventListeners = function() {
        const DOM = UICtrl.getDOMstrings();
        
        // Event listeners for a click and enter button
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            // there are two conditions because browsers uses two types of key code
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };
    
    
    // Control center of the application, tells other modules what to do
    let ctrlAddItem = function () {
        //console.log('button and enter works properly');
        let input, newItem;

        // 1. Get the filed input data
        input = UICtrl.getInput();
        //console.log(input);

        // 2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);

        // 4. Clear the input fields
        UICtrl.clearFields();

        // 5. Calculate the budget

        // 6. Display the budget on the UI

        
    };

    // expose objects into the PUBLIC
    return {
        init: function() {
            console.log('app has started');
            setupEventListeners();
        }
    }

})(budgetController, UIContoller);


controller.init(); // without this line of code nothing will ever happened