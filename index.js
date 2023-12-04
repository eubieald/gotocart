// Imports
import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import {getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';

 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyAgFIMRpqBoYZ2vJoZ4st9OWMnapl2Ec3A",
  authDomain: "gotocart-mobile-app.firebaseapp.com",
  databaseURL: "https://gotocart-mobile-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gotocart-mobile-app",
  storageBucket: "gotocart-mobile-app.appspot.com",
  messagingSenderId: "292377266182",
  appId: "1:292377266182:web:04f596d8420f3903311b87"
};

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
//  Initialize DB
 const database = getDatabase(app);
 const dbName = "shoppingList";
// Initialize ProductsInDB
const shoppingListInDB = ref(database, dbName);

const formEl = document.getElementById('form-el'),
inputEl = document.getElementById('input-el'),
shoppingListEl = document.getElementById('shoppingListEl');

onValue(shoppingListInDB, (snapshot) => {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    clearShoppingListHtml();

    for (let index=0; index<itemsArray.length; index++) {
      let currentItem = itemsArray[index],
      currentItemID = currentItem[0],
      currentItemValue = currentItem[1];

      appendItemToShoppingList(currentItem);
    }
  } else {
    console.log('No data available');
    let noItemsEl = document.createElement('li');
    noItemsEl.classList = 'noItems';
    noItemsEl.textContent = 'No items in your shopping list, add some!';
    shoppingListEl.innerHTML = '';
    shoppingListEl.append(noItemsEl);
  }
})

function appendItemToShoppingList(item) {
  let itemID = item[0],
  itemValue = item[1];

  let newListEl = document.createElement('li');
  newListEl.textContent = itemValue;
  newListEl.id = itemID;

  newListEl.addEventListener('click', () => {
    let itemLocationInDB = ref(database, `${dbName}/${itemID}`);
    remove(itemLocationInDB);
  });

  shoppingListEl.append(newListEl);
}

function clearShoppingListHtml() {
  shoppingListEl.innerHTML = '';
}

function clearInputField() {
  inputEl.value = '';
}

// Event Listeners
formEl.addEventListener('submit', handleForm);

function handleForm() {
  event.preventDefault();

  const item = inputEl.value;

  if (item === '') {
    alert('Please enter an item');
    return;
  }

  push(shoppingListInDB, item);
  clearInputField();
}