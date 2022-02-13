function productCard({ key, title, price, size, urlPath }) {
    const template = `
  <div class="product-card">

    <div class="card-header">
        <button id="edit" data-key="${key}" >
            EDIT
        </button>
        <button id="delete" data-key="${key}" onclick="confirmation()">
            DELETE
        </button>
    </div>
    <div class="card-body">
        <img src="${urlPath}" width="160" alt="product card">
        <div class="product-info"> 
            <h2 class="card-title">${title}</h2>
            <div>
                <p class="card-text">Size: ${size}</p>
                <p class="card-text">$${price}</p>
            </div>
        </div>
    </div>
    <div class="card-footer">
        <div class="button form-control">
            <a class="white-btn" href="#">Add to cart</a>
        </div>

        <div class="button form-control">
            <a class="black-btn" href="#">Buy it now</a>
        </div>
    </div>
  </div>
  `
    const element = document.createRange().createContextualFragment(template).children[0]
    addCardControls(element)
    return element
}

function addCardControls(product) {
    product.querySelector('#edit').addEventListener('click', onEditProduct)
    product.querySelector('#delete').addEventListener('click', onRemoveProduct)
}


function onEditProduct(e) {
    const key = e.target.dataset.key
    sessionStorage.setItem('key', key)
    window.location.assign('update.html')
}

function onRemoveProduct(e) {
    const key = e.target.dataset.key
    sessionStorage.setItem('key', key)
    let confirmed = confirm("Are you sure you want to delete this product?");
    if (confirmed) {
    window.location.assign('delete.html')
}
   
}


export { productCard }

// <button id="edit" data-key="${key}" >
// <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"></path></svg>
// </button>
// <button id="delete" data-key="${key}" onclick="confirm('Are you sure you want to delete this product?')">
// <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg>
// </button>
//<img src="../../static/svg/icons/edit.svg" alt="edit icon">
//<img src="../../static/svg/icons/delete.svg" alt="delete icon">