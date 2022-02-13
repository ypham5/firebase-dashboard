import {ref as databaseRef, remove } from 'firebase/database';
import { db, storage  } from "./libs/firebase/firebaseConfig";


async function pageInit(){
    const key = sessionStorage.getItem('key')
    const path = `products/${key}`
    const productRemoveRef = databaseRef(db, path)
    //remove object with the key from RTD
    // ref with the key
    // remove(ref)
    //productRemoveRef.remove()
    //await confirm("Are you sure you want to delete this product?");
    await remove(productRemoveRef)
    await window.location.assign(document.referrer)
}
  

  pageInit()


