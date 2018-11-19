//## 1) Check if the document is fully loaded... keep waiting for the document to fully load before doing anything else
//## 2) everytime the loop of checking runs, keep an event listener checking for loaded signal
//## when loaded call funtion "ready()" (the main program)
//## more on readystate here: https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    //## variable removeCartItemButtons gets the value of all the buttons which belong to classtype= btn-danger (simply to choose all the buttons of that category) 
   // ## more here: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    
   // ## from 0 to the number of buttons of classtype btn-danger:  (for each button of this type run the following) (the ".length" gives the size of list = No. of buttons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        
        //## save the button[i] in a temporary variable called "button" (i gets values from 0 to Max No. of buttons of that type)
        var button = removeCartItemButtons[i]

        //## start an event listener that waits for the certain button to be clicked. When clicked then call function "removeCartItem()"
        button.addEventListener('click', removeCartItem)

        //## so we are actually initiating an event listener for every button of class btn-danger
    }
//## the above are the buttons of "Remove Item" in the cart



    //## same as above but for the buttons of type "cart-quantity-input" (starting event listeners waiting for "change" for all cart-quantity-input buttons)
    //## change is any chance in the value which is an integer... it can be using the small up&down arrows or by typing the number

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        //## when it detects a change in the quantity then it calls function "quantitychanged()"
        input.addEventListener('change', quantityChanged)
    }
    //## the above are all for the quantity input box (with arrows) in the cart


   // ## same for all buttons of type "shop-item-button" waiting for click and when clicked calls function "addItemToCartclicked()"
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
   // ## all above is for the buttons "Add to Cart" in the products list


   // ## IGNORE THIS LINE since it was for our purchase button and now is replaced by the Paypal button which is directly implemented in our HTML code
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}


//## IGNORE THIS FUNCTION for the same reason above
//##############################################################################################
//#function purchaseClicked() {                                                                #
//#    var total = updateCartTotal()                                                           #
//#    //alert(total)                                                                          #
//#                                                                                            #
//#    //alert('Thank you for your purchase ADD PAYPAL CHECKOUT BUTTON HERE')                  #
//#    var cartItems = document.getElementsByClassName('cart-items')[0]                        #
//#    while (cartItems.hasChildNodes()) {                                                     #
//#                                                                                            #
//#        cartItems.removeChild(cartItems.firstChild)                                         #
//#    }                                                                                       #
//#    updateCartTotal()                                                                       #
//#}                                                                                           #
//##############################################################################################

//## Get as input the event that called this function
function removeCartItem(event) {
    //save the whole target item (the button that was clicked and triggered this function from within ready()) so we get the specific button now
    var buttonClicked = event.target
    // remove the parent of the parent element that holds the certain button inside (which means deleting the whole item and it's details and image and button from cart
    buttonClicked.parentElement.parentElement.remove()
    // call function udatecarttotal (to re-calculate the total amount since an item was removed now)
    updateCartTotal()
}


// same logic as above but here it was caused by a value change instead of click
function quantityChanged(event) {
    var input = event.target

    // if the input is EMPTY or is negative or zero the set the value to 1 (we cannot have negative or zero or non-existing quantity of a product... doesn't make sense
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    // again call updatecarttotal() to change re-calclate the total amount
    updateCartTotal()
}



// gets as input the event that triggered the call of this function (an add to cart button was clicked)
function addToCartClicked(event) {
    // we need to know which one exactly was clicked so we add the correct item to our cart... this is why we get the target of the event (specific button)
    var button = event.target
    // we save all the parent of parent element holding the button (the whole image text and details of that product) into a new variable we name "shopItem"
    var shopItem = button.parentElement.parentElement
    // we get the title seperately from the shoItem we saved before and save it into "title"
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    // same for price
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    // same for image source
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    // we call the function "addItemToCart and we give it as input the title, price, and imagesrc ### this function actually adds the product to our cart
    addItemToCart(title, price, imageSrc)
    // and again we need to re-calculate the total amount since a new item is added to the cart
    updateCartTotal()
}


// as said above this function will try to add the product to our cart (it will create a new html part inside our cart part using the details of the product that it gets
function addItemToCart(title, price, imageSrc) {
    // cartRow now is a html "div" element
    var cartRow = document.createElement('div')
    // add a new "cart-row" element to the div above (html element)
    cartRow.classList.add('cart-row')
    // save cart-item No. 0 (cart-item in the cart) into a variable "cartItems" for future usage
    var cartItems = document.getElementsByClassName('cart-items')[0]
    // get the cart-item-title element from the above cartItem  and save it into "cartItemNames"
    // so actually save the title of the item in cartItemNames
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')


    // YOU CAN REMOVE THIS AS IT IS EXTRA
    // this is to check if the item already exists in the cart when trying to add an item by comparing the titles saved in cartItemNames to our new item
    //for all the items 
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
//////////////////////////////////////////////////////////////////

    // create a new html element and save it into a variable called "cartRowContents"
    // ${imagesrc} ${title} and ${price} is to take the value of each of them as the input variable of the whole function (line: 121) to display in html the details of
    // the specific product
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">Remove from card</button>
        </div>`
    // add the whole html element the cartrow div that we created earlier so it's all part of that div in the cart
    cartRow.innerHTML = cartRowContents
    // add the element into the list "cartItems"
    cartItems.append(cartRow)

    // just like in the beggining of our program start eventlisteners to keep checking if any buttons are clicked in order to act accordingly
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


// this function is to always calculate the total amount to pay at the bottom of our cart
function updateCartTotal() {
    // first get the whole item in the cart and save it
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    //console.log (delete it)... it is only a command we use to try print a value in the console to check if something is working and getting correct value
    console.log(cartItemContainer)
    //
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    console.log(cartRows)

    
    var total = 0
    // for every item in cart get the price and quantity and save them into temporary variables
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        // remove the dollar sign from the variable of price (we need to do maths and computers can't do maths with symbols"
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        //get and save the quantity
        var quantity = quantityElement.value
        // the total amount is the total we had so far + (the price of tha item multiplied by it's quantity)
        total = total + (price * quantity)
    }
    // The Math.round() function returns the value of a number rounded to the nearest integer. so we get a rounded number 
    total = Math.round(total * 100) / 100
    // save the amount with a dollar sign now to be able to display it again with the sign
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    // return an output which is the total amount... the reason is because in the html code we run this function to give paypal function the total amount needed to pay
    return total

}

