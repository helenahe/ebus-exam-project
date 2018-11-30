//we add an event listener that waits for the html file to completely load before it executes the main code
document.addEventListener('DOMContentLoaded', main)

// main code... we just put it as a function in order to be able to check if the document is loaded (above) before we start executing
function main() {

    //additem saves all elements that have a class name "btn-add"
    var additem = document.getElementsByClassName('btn-add')
    //create a loop that runs through all elements that have the class "btn-add" and execute commands in {}
    for (var i = 0; i < additem.length; i++) {
        // button gets the element No. i 
        var button = additem[i]
        //create a new event listener that waits for a click. When it detects a click it calls function "addtocart"
        button.addEventListener('click', addtocart)
    }
}

//addtocart function adds a new html element to the cart area using data from the package containing the button that was pressed to call this function
function addtocart(event) {
    //create a <div> and save it to variable "row" 
    var row = document.createElement('div')
    // inside the div saved in row >> add "cart-row"
    row.classList.add('cart-row')
    // in variable "cartitems" save the element with class name "cart-items"
    var cartitems = document.getElementsByClassName('cart-items')[0]
    // in variable "cartnames" save the elements with class name "cart-item-title" that exist in the element we got above "cartitems"
    var cartnames = cartitems.getElementsByClassName('cart-item-title')
    //####################################
    //in btn variable save the event target (object) that called this function
    var btn = event.target
    // in item save the parent element that contained this button that was clicked >>> which is the whole package with imgsrc, title, price, button
    var item = btn.parentElement 
    //in title save the inner text (content) of the class "shop-package-name" of the element as a string value
    // if we do not tell it to take the No. 0 element the it gets undefined values
    var title = item.getElementsByClassName('shop-package-name')[0].innerText
    //in price save the inner text (content) of the class "shop-package-price" of the element as a string value (since we also have the euro sign inside that text)
    var price = item.getElementsByClassName('shop-package-price')[0].innerText
    //in imagesrc save the source inside the class "shop-item-image" of the element as a url
    var imageSrc = item.getElementsByClassName('shop-package-image')[0].src
    //inside cartrowcontent we create a new HTML element which is gonna be the extra new html part to be displayed inside our cart
    var cartrowcontent = `
        <div class="cart-item cart-column">
                                         <!-- we set the image source in our new html part to be the "imagesrc" that we got above as a variable from our package   -->
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                                             <!-- same as image happens with title   -->
            <span class="cart-item-title">${title}</span>
        </div>
                                            <!-- same as title happens with price   --> 
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity-input cart-column">
            <input class="cart-quantity-input" type="number" value=1>
            <button class="btn btn-remove" type="button">Remove from card</button>
        </div>`
    //change the html code inside the variable row (we created it at the beginning of the function) and instead put inside the new html part above
    row.innerHTML = cartrowcontent
    //add the content of "row"(the above that now has the new html) to the list of cartitems that holds all cart-items inside our cart
    cartitems.append(row)
    //call the function "updatecart" in order to update the total price after we have added the new item in our cart
    updatecart()
    //the same way we have done in our main program we now create a new event listener to wait for clicks on btn-remove or change in value of quantity >>
    //of our new element that we have created inside our cart that has a button to remove and a quantity to change
    row.getElementsByClassName('btn-remove')[0].addEventListener('click', removeitem)
    // the change in value of cart-quantity-input can happen either by typing a number inside the box or clicking on up&down arrows (the default quantity is set to 1)
    row.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', updatecart)
}

//remove item function which deletes the whole element from the cart
function removeitem(event) {
    // save the element that caused this function to be called in variable "button"
    var button = event.target
    // remove the parent element of the parent element containing the button and all its data (the whole row in cart with image, title, price, quantity box, remove button)
    button.parentElement.parentElement.remove()
    // call the "updatecart()" function to update the total price after removing the item in our cart
    updatecart()
}

// update cart function which calculates the total price of our cart based on the item prices and quantities that we have in the cart
function updatecart() {
    //initialize the total variable with 0 (if we don't initialize it our cart will show NaN since it has no value at all)
    var total = 0
    //we get the value from the quantity input box and we check if it the user gave an input <= than 0 or not given an input at all. If this happened then >>
    // we set the value to 1 (there is no point in having a negative or zero or undefined quantity... it will also cause trouble in calculating the total price)
    var input = event.target
    if (input.value <= 0 || input.value == NaN) {
        input.value = 1
    }
    //cartitem_all gets the element of our shopping cart containing all cart items
    var cartitem_all = document.getElementsByClassName('cart-items')[0]
    // rows11 gets a list of all the cart rows where each row is a package we have in our shopping cart with all its data 
    var rows11 = cartitem_all.getElementsByClassName('cart-row')
    // we create a loop that goes through every package in our cart (if existing) and executes the commands in {}
    for (var i = 0; i < rows11.length; i++) {
        // in cartRow we save the package element that we are processing in each time the loop runs
        var cartRow = rows11[i]
        // we get the price of that package and save it into "priceElement"
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        // we get the quantity of that package and save it into "quantityElement" NOTE: Here we use [1] since when creating the element we have used the class >>
        // "cart-quantity-input" 2 times one for styling. So we need to call the 2nd one which is having the actual value
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[1]
        // we change the type of "price" from string to float so we can use it in a math equation. HOWEVER >>
        // Before doing so we replace the euro sign with nothing (we remove it) from our variable since we want only the number that makes sense for math equations
        var price = parseFloat(priceElement.innerText.replace('€', ''))
        // we get the value part of the quantityElement since it is the one containing the number value and we save it in "quantity"
        var quantity = quantityElement.value
        // this is an obvious math equation to calculate the total price. Note that we +total at the beginning since this is in a loop running for each package in the cart
        total = total + (price * quantity)
    }
    // we use the Math.round to avoid having numbers with too many decimals coming from a multiplication. We set them to be with only 2 decimals rounded which >>
    // make sense when talking about money
    total = Math.round(total * 100) / 100
    // we get the "cart-total-price" element and we write inside it the euro sign and the number which is rounded to 2 decimals to be displayed in out total price section
    document.getElementsByClassName('cart-total-price')[0].innerText = '€' + total
}

// This a function we have added to be used to get the pre-calculated total price of our cart and return it as an output
// this is to allow us to call this function inside the paypal button script which is in the HTML so paypal API gets out total price as a payment price
function updateforpaypal() {
    // we get the element which has "cart-total-price" class which has our total price and save it to "price22"
    var price22 = document.getElementsByClassName('cart-total-price')[0]
    //we remove the euro sign by replacing it with nothing so we keep only the number text to process
    var price = parseFloat(price22.innerText.replace('€', ''))
    // we change the number which is until now stored as a string (since we also had euro sign) and change it to float number
    // we do not change it to int since we want to keep our 2 decimals
    price = parseFloat(price)
    // we use the Math.round to avoid having numbers with too many decimals. We set them to be with only 2 decimals rounded which >>
    // make sense when talking about money
    // even if we already have a number with 2 decimals removing this part causes errors when calling the paypal button.
    var total = Math.round(price * 100) / 100
    // We return the total price as an output of this function to be used for giving the paypal script the price to use for the payment
    return total
}