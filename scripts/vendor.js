// const viewButton = document.getElementById('view-button');
// const tileExpand = document.getElementById('tile-expand');
// const tile = document.getElementById('tile');
// viewButton.addEventListener('click', (e) => {
//     if (tileExpand.style.display=="none"){
//         tileExpand.style.display="block";
//         tile.classList.toggle("expanded");
//     }else {
//         tileExpand.style.display="none";
//         tileExpand.classList.toggle("expanded");
//     }
    
// })
/******SEARCH VENDOR BY NAME*************/
const searchButton = document.getElementById('search-button');
const inputName = document.getElementById("search-vendor");
const inputLoc = document.getElementById("search-loc");
const searchFields = document.getElementsByClassName("form-group");
var foundVendors = [];  
function findVendor(name, loc){      
    if (name && !loc){
        console.log('name only');
        db.collection("vendors").orderBy("name").get().then(snap=>{
            snap.docs.forEach(doc=>{
                data = doc.data();
                if(name === data.name){
                    //displayVendor(doc)
                    //console.log(doc)
                    foundVendors.push(doc);
                    //console.log("found.length " + foundVendors.length)
                }
            })
        })
    }
    else if (name && loc){
        console.log('name and loc');
        
    } 
    else if (!name && loc){
        console.log('location only');
   } 
  // console.log("found.length " + foundVendors.length)
//   setTimeout(function(){
//     console.log(foundVendors.length);
//     }, 1000)
   return foundVendors;

 }
 
searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    name = inputName.value;
    loc = inputLoc.value;
    //find the documents of vendors that meet the requirements
   const foundVendors = findVendor(name,loc);
//    console.log(foundVendors.length);
//    console.log(foundVendors);
   displayVendor(foundVendors);
   // reset the search bars
   document.getElementById("search-vendor").value =""
   document.getElementById("search-loc").value = ""   
 })
 
/******DISPLAY VENDOR *******/
//const vendorList = document.getElementById('vendor-list')
const vendorList = document.getElementById('vendor-list')
function displayVendor(docs){
    let li = '';
    var i;
    for(i = 0; i <docs.length; i++){
        const vendor = docs[i].data()
        li += ` <div class="tile hover-grow">
        <div class="row">
            <!-- vendor pic -->
            <div class="tile__icon">
                <figure class="avatar">
                    <img src=${vendor.logo}>
                </figure>
            </div>
            <!-- vendor data -->
            <div class="tile__container"> 
                    <p class="tile__title u-no-margin">${vendor.name}</b></p>
                    <!-- <span class="info">Rating: ${vendor.rating}</span> -->
                    <p class="tile__subtitle">Furniture store in San Jose, CA</p>
                    <!-- rating stars -->
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="far fa-star"></span>
                    <span class="tile__subtitle">(4)</span>
                    <div class="tag-container">
                        <div class="tag">Windows</div>
                        <div class="tag">Fences</div>
                        <div class="tag">Walls</div>
                    </div>
            </div>
            <!-- <div class="tile__container u-text-right">
                <p class="tile__subtitle u-no-margin small">italianfurniture.com</p>
                <p class="tile__subtitle u-no-margin small">(408) 416-1640</p>
                <p class="tile__subtitle u-no-margin small">San Mateo, CA</p>
            </div> -->
            <p class="tile__buttons u-no-margin">
                <button id="view-button" class="btn-primary uppercase">View</button>
            </p>
        </div>
        <div class="row">
            <div class="tile__container" style="display:none;">
                <p class="info">"We specialize in..."</p>
            </div>
        </div>
        <!-- <div class="divider"></div> -->
        </div>
        <space class="large"></space>`
    }
    vendorList.innerHTML = li
}
//displayVendor(foundVendors)

// db.collection('vendors').orderBy('name').get().then(snap=>{
//     console.log(snap.docs)
//     displayVendor(snap.docs)
// })

/******LOG OUT ********/
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    // success("Logout successfully");
    // window.setTimeout(function(){
    // // Move to html.index after 2 seconds
    //     window.location.href = "index2.html";
    // }, 2000);
    window.location.href = "index2.html";
});

