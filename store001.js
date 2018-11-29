if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var quan = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quan.length; i++) {
        var input = quan[i]
        input.addEventListener('change', updatecart)
    }
    var removeitembtn = document.getElementsByClassName('btn-remove')
    for (var i = 0; i < removeitembtn.length; i++) {
        var button = removeitembtn[i]
        button.addEventListener('click', removeitem)
    }
    var additem = document.getElementsByClassName('btn-add')
    for (var i = 0; i < additem.length; i++) {
        var button = additem[i]
        button.addEventListener('click', addtocart)
    }
}

function updatecart() {
    var input = event.target
    if (input.value <= 0 || input.value == NaN) {
        input.value = 1
    }
    var cartitem_all = document.getElementsByClassName('cart-items')[0]
    var rows11 = cartitem_all.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < rows11.length; i++) {
        var cartRow = rows11[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('€', ''))
        var quantity = input.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '€' + total
    return total
}

function removeitem(event) {
    var button = event.target
    button.parentElement.parentElement.remove()
    updatecart()
}

function addtocart(event) {
    var row = document.createElement('div')
    row.classList.add('cart-row')
    var cartitems = document.getElementsByClassName('cart-items')[0]
    var cartnames = cartitems.getElementsByClassName('cart-item-title')
    var btn = event.target
    var item = btn.parentElement.parentElement
    var title = item.getElementsByClassName('shop-package-name')[0].innerText
    var price = item.getElementsByClassName('shop-package-price')[0].innerText
    var imageSrc = item.getElementsByClassName('shop-package-image')[0].src
    var cartrowcontent = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity-input cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-remove" type="button">Remove from card</button>
        </div>`
    row.innerHTML = cartrowcontent
    cartitems.append(row)
    updatecart()
    row.getElementsByClassName('btn-remove')[0].addEventListener('click', removeitem)
    row.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', updatecart)
}