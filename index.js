import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js'
import {getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js'

const appSettings = {
    databaseURL: "https://shopping-list-60800-default-rtdb.europe-west1.firebasedatabase.app/",
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListIndDB = ref(database, "shoppingList")

onValue(shoppingListIndDB, function(snapshot){
    if(snapshot.exists()){
        let booksArray = Object.entries(snapshot.val())        
        shoppingListEl.innerHTML = ""

        for(let entry of booksArray){
            let currentBook = entry
            appendIdemToShoppingListEl(currentBook)
        }
    }
    else{
        shoppingListEl.innerHTML = "no items here..."
    }
})

const inputFieldEl = document.querySelector("#input-field")
const addButtonEl = document.querySelector("#add-button")
const shoppingListEl = document.querySelector("#shopping-list")

addButtonEl.addEventListener("click", addItem)

function addItem(){
    let inputValue = inputFieldEl.value
    push(shoppingListIndDB, inputValue)
    clearInputFieldEl(inputValue)
}

function clearInputFieldEl(value){
    inputFieldEl.value = ""
}

function appendIdemToShoppingListEl(value){

    let newEl = document.createElement("li")
    newEl.textContent = value[1]
    newEl.id = value[0]

    newEl.addEventListener("click", function(){
        const exactLocation = ref(database, `shoppingList/${value[0]}`)
        remove(exactLocation)
    })

    shoppingListEl.append(newEl)
}

inputFieldEl.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        addItem()
    }
})