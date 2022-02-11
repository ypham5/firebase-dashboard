 
import {ref as dataRef, get, set, update} from 'firebase/database';
import {db} from './libs/firebase/firebaseConfig';
import {productCard} from './templates/productCard'

async function pageInit(){
    const productRef = dataRef(db, 'products/');
    const productSnapShot = await get(productRef)
    const data = productSnapShot.val();
   
    // Object of Objects  rental{{},{},{}}
    // Arrays of Objects
    // map filter reduce sort find ....
    // Object.keys()  Object.enteries() Object.values();

    const productCards =   Object.values(data).map(product=>{
            const card = productCard(product);
            // layout thrashing
            //document.body.append(card)
            document.querySelector('.page-content').append(card)
            return card
      })
      
      


    
}

pageInit()