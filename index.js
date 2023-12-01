import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, push, ref } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://gotocart-mobile-app-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings),
database = getDatabase(app),
productsInDB = ref(database, 'products');

console.log(database);

const formEl = document.getElementById('form-el'),
inputEl = document.getElementById('input-el');

// Event Listeners
formEl.addEventListener('submit', handleForm);

function handleForm(event) {
  event.preventDefault();
  const product = document.getElementById('input-el').value;
  push(ref(productsInDB, 'products'), {
    name: product
  });
}