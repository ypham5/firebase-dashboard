function productCard({ key, title, price, size, urlPath }) {
    const template = `
  <div class="product-card">

    <div class="card-header">
        <button id="edit" data-key="${key}" >
           EDIT
        </button>
        <button id="delete" data-key="${key}" onclick="confirm('Are you sure you want to delete this product?')">
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
    window.location.assign('delete.html')
}
export { productCard }