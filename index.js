// Imports
import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import {getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';

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
// Initialize ProductsInDB
const shoppingListInDB = ref(database, 'shoppingList');

const formEl = document.getElementById('form-el'),
inputEl = document.getElementById('input-el'),
ulEl = document.getElementById('ul-el');

onValue(shoppingListInDB, (snapshot) => {
  let itemsArray = [];
  snapshot.forEach((item) => {
    itemsArray.push(item.val());
  });
  renderList(itemsArray);
});

function renderList(items) {
  let listItems = '';
  items.forEach((item) => {
    listItems += `<li>${item}</li>`;
  });
  ulEl.innerHTML = listItems;
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
  inputEl.value = '';
}