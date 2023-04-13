import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, push, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
	databaseURL: "https://realtime-database-323ac-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoping")

onValue(shoppingListInDB, function(snapshot){
	if (!snapshot.exists()){
		shopingListEl.innerHTML = "<p>No items here!!!</p>"
		return 0
	}

	//let shopings = Object.values(snapshot.val())
	let shopings = Object.entries(snapshot.val())

	clearShopingListEl()

	for(let i=0; i<shopings.length; i++){
		const currentItemID = shopings[i][0]
		const currentItem = shopings[i][1]
		appendShopingListEl(currentItemID, currentItem)
	}
})

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shopingListEl = document.getElementById("shoping-list")

addButtonEl.addEventListener("click", function(){
	let inputValue = inputFieldEl.value
	push(shoppingListInDB, inputValue)
	clearInputFieldEl()
})

function clearInputFieldEl(){
	inputFieldEl.value = ""
}

function clearShopingListEl(){
	shopingListEl.innerHTML = ""
}

function appendShopingListEl(itemID, itemValue){
	//shopingListEl.innerHTML += `<li data-id="${itemID}">${itemValue}</li>`
	let newEl = document.createElement("li")

	newEl.textContent = itemValue
	newEl.id = itemID

	newEl.addEventListener("click", function(){
		const getExactLocation = ref(database, `shoping/${itemID}`) 
		remove(getExactLocation)
	})

	shopingListEl.append(newEl)
}

