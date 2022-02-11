import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, push, set } from 'firebase/database';
import { db, storage  } from "./libs/firebase/firebaseConfig";

document.querySelector("#productImage").addEventListener("change", onImageSelected);
document.forms["productForm"].addEventListener("submit", onAddProduct); 


    function onAddProduct(e) {
        e.preventDefault();
        uploadNewProduct();
        document.querySelector('.msg').style.display = "block";
    }
  

   function onImageSelected(e) {
    //selected file
    // file objets   [fileObj, fileObj, fileObj]
    let file = e.target.files[0];
    // update the display with the requested image
    document.querySelector(".display img").src = URL.createObjectURL(file);
}

    async function uploadNewProduct() {

        // form data
        const title = document.querySelector('#productName').value.trim();
        const price = parseFloat(document.querySelector('#productPrice').value.trim());
        const size = parseFloat(document.querySelector('#productSize').value.trim());
        //validate
        //if(isNaN(price)){
        //     setMessage(`Please enter a number for your price`);
        // }
        const file = document.querySelector('#productImage').files[0];
        
        // paths to the data to write
        const imageRef =  storageRef( storage, `images/${file.name}`);
        const dataRef =  databaseRef( db, 'products')

        // uploading file to the storage bucket
        const uploadResult = await uploadBytes(imageRef, file);
        // url to the image stored in storage bucket
        const urlPath =  await getDownloadURL(imageRef) 
        // path on the storage bucket to the image
        const storagePath = uploadResult.metadata.fullPath;

        // firebase unique key
        // push  return a ref to area with the key but no data wrtitten yet. 
        const itemRef = await push(dataRef)
        //ref.key
        set(itemRef,{
           key:itemRef.key,
           sku:`orsm${itemRef.key}`,
           urlPath,
           storagePath,
           title,
           price,
           size
        })
        
    }
 