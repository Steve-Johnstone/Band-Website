
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    let removeButtons = document.getElementsByClassName("btn-danger");
    let quantityInputs = document.getElementsByClassName('cart-quantity-input');
    let addButtons = document.getElementsByClassName('shop-item-button');


    for (let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', removeCartItem) 
    }

    for (let i = 0; i < quantityInputs.length; i++) {
        quantityInputs[i].addEventListener('change', quantityChanged);
    }

    for (let i = 0; i < addButtons.length; i++) {
        addButtons[i].addEventListener('click', addCartItem);
        }
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked() {
    alert('Thank you for your purchase mother fucker!');
    let cartItems = document.getElementsByClassName('cart-items')[0];

    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal();
}

function removeCartItem(event) {

    let buttonClicked = event.target;

    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function addCartItem(event) {

    let buttonClicked = event.target;
    let shopItem = buttonClicked.parentElement.parentElement;

    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;

    addItemToCart(title, price, imageSrc);
    updateCartTotal();
    ready();
}

function addItemToCart(title, price, imageSrc) {

    let cartRow = document.createElement('div');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = document.getElementsByClassName('cart-item-title');

    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            return alert ("Item already added fool!")
        } 
    } 

    let cartRowContents = `

    <div class="cart-row">
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button id="remove-button" class="btn btn-danger" role="button">Remove</button>
        </div>
    </div>`;

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
}

function quantityChanged(event) {

    let input = event.target;

    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
}

function updateCartTotal() {

    const cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0;

    for (let i = 0; i < cartRows.length; i++) {

        let cartRow = cartRows[i];
        let price = parseFloat(cartRow.getElementsByClassName('cart-price')[0].innerText.replace('£', ''));
        let quantity = cartRow.getElementsByClassName('cart-quantity-input')[0].value;

        let itemCost = price * quantity;

        total += itemCost;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '£' + total;
}


