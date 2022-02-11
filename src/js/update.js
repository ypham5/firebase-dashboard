import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, update, get } from 'firebase/database';
import { db, storage  } from "./libs/firebase/firebaseConfig";

 // ref with key (read data in)
  // get data
  // update form values
  // populate the form
  // submit event
  // pull data from values
  // create object
  // send the object to firestore
  // update is combiantion of the read and write pages
const productForm = document.forms['productForm']
async function pageInit (){
  const key = sessionStorage.getItem('key')
  const productRef = databaseRef(db, `products/${key}`)
  const productSnapShot = await get(productRef)
  //const product = productSnapShot.val()

  //formatter for the form
  if (productSnapShot.exists()) {
    setFieldValues(productSnapShot.val())
  }
  document.querySelector("#productImage").addEventListener("change", onImageSelected);
  productForm.addEventListener('submit', onUpdateProduct)
  
}

function onImageSelected(e) {
  //selected file
  // file objets   [fileObj, fileObj, fileObj]
  let file = e.target.files[0];
  // update the display with the requested image
  document.querySelector(".display img").src = URL.createObjectURL(file);
}


function onUpdateProduct(e){
  e.preventDefault();
  updateProductData();
  document.querySelector('.msg').style.display = "block";
}

function setFieldValues({title, price, size, urlPath}){
  productForm.elements['productName'].value = title
  productForm.elements['productPrice'].value = price
  productForm.elements['productSize'].value = size
  document.querySelector('#uploadImage img').src = urlPath 
  //console.log(title, price, size)
}

async function updateProductData() {
  const title = productForm.elements['productName'].value.trim()
  const price = productForm.elements['productPrice'].value.trim()
  const size = productForm.elements['productSize'].value.trim()
  const files = productForm.elements['productImage'].files
//array ...path
  const key = sessionStorage.getItem('key')
  const dataRef = databaseRef( db,  `products/${key}`)
  if(files.length !== 0){
    // format the storage for the new image file
    // images/key/file.name (the key form realtime database) storage path
    const file = files[0]
    const imageRef = storageRef(storage, `images/${file.name}`)
    const uploadResult = await uploadBytes(imageRef, file)
    // url to the image stored in storage bucket
    const urlPath =  await getDownloadURL(imageRef)
    // path on the storage bucket to the image
    const storagePath = uploadResult.metadata.fullPath
    update(dataRef,{
      urlPath,
      storagePath,
      title,
      price, 
      size
    })
  } else {
    update(dataRef,{
      title,
      price,
      size
    })
 }

}



pageInit()