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

const defaultList = document.getElementById('default-list')
const searchList = document.getElementById('search-list')
const searchButton = document.getElementById('search-button');
const inputName = document.getElementById("search-vendor");
const inputLoc = document.getElementById("search-loc");


function addTag(tag, color){
    var tagContainer = document.getElementById("tag-filter");
    sanitizedTag = tag.replace(/\s+/g, '-').toLowerCase();

    var allTags = tagContainer.getElementsByClassName("tag");
    for(var i = 0; i < allTags.length; i++){
        if (allTags[i].classList.contains('animated','bounce')){
        allTags[i].classList.remove('animated','bounce');}
    }

    let tagType = "";
    if (!tagContainer.contains(document.getElementById(sanitizedTag))){
        if (color =="blue") tagType = 'class="tag tag--info animated fadeIn"';
        else if(color =="purple") tagType = 'class="tag tag--link animated fadeIn"';
        else if(color == "yellow") tagType = 'class="tag tag--warning animated fadeIn"';
        else if(color =="red") tagType = 'class="tag tag--primary animated fadeIn"';
        tagContainer.innerHTML += `<div id="${sanitizedTag}"` + tagType +`>${tag}
                        <a class="tag tag--delete animated" href="javascript:deleteTag('${sanitizedTag}')"></a></div>`;
    }
}
function deleteTag(tag){
    var tag = document.getElementById(tag);
    tag.parentNode.removeChild(tag);
}

/******Functions to help SEARCH VENDOR *************/
function findVendor(name, loc, changes){ 
    let html = ''
    var i, j=0;
    for(i = 0; i < changes.length; i++){
        if (name && !loc){
            if(changes[i].doc.data().name == name){
                html += createVendorCard(changes[i], j)
                j++
            }
        }
        else if (name && loc){
            if(changes[i].doc.data().name == name && changes[i].doc.data().location == loc){
                html += createVendorCard(changes[i], j)
                j++         
            }
        } 
        else if (!name && loc){
            console.log('location only');
            if(changes[i].doc.data().location == loc){
                html += createVendorCard(changes[i], j)
                j++
            }
        } 
    }
    if(j%2==1){
        console.log('There are odd number of founds')
        html += `</div><space class="large"></space>`
    }
    return html
}
// Listener for Search Button
searchButton.addEventListener('click', (e)=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            e.preventDefault();
            name = inputName.value;
            loc = inputLoc.value;
            if (name.length > 0) addTag(name,'red');
            if (loc.length < 0) addTag(loc,'red');
            isSearch = true;
            let html = ''
            db.collection('vendors').orderBy('name').get().then(snap=>{
                let changes = snap.docChanges()
                html += findVendor(name, loc, changes)        
                defaultList.innerHTML = ''
                searchList.innerHTML = html

            })  
            document.getElementById("search-vendor").value =""
            document.getElementById("search-loc").value = "" 
        } else {
          // No user is signed in.
          e.preventDefault();
          window.location.href = "index2.html";
        }
      });
    
    })
 
/******DISPLAY VENDOR *******/
// THIS PART IS MOVED TO PAGINATION.JS

// function createVendorCard(change, i){
//     let html = '';  
//         const vendor = change.doc.data()
//         let startRow = `<div class="row">` 
//         let endRow = `</div>
//         <space class="large"></space>`
//         let content = ` <div class="col-6">
//         <div class="tile u-no-padding">
//             <div class="row w-100 u-no-padding">
//                 <!-- vendor pic -->
//                 <div class="tile__icon">
//                     <figure class="avatar">
//                         <img class="h-100" src=${vendor.logo}>
//                     </figure>
//                 </div>
//                 <!-- Vendor's name, location, industry -->
//                 <div class="tile__container tile-padded"> 
//                         <h6 class="tile__title u-no-margin">${vendor.name}</b></h6>

//                         <p class="tile__subtitle">${vendor.location}</p>
                       
//                         <span class="info">Category: ${vendor.category}</span> 
//                 </div>
//                 <!-- Vendor's rating stars -->
//                 <div class="tile__container u-text-right tile-padded">
//                     <span class="fa fa-star checked yellow"></span>
//                     <span class="fa fa-star checked yellow"></span>
//                     <span class="fa fa-star checked yellow"></span>
//                     <span class="fa fa-star checked yellow"></span>
//                     <span class="far fa-star yellow"></span>
//                     <span class="info light-blue">5 reviews</span>
//                 </div>
//             </div>            
//         </div>
//     </div>`
//         //if changes.length == 1
//         // if (size == 0){
//         //     console.log('Not found')
//         // }
//         // if(i%2==0 && i == size - 1)
//         //     html += startRow + content + endRow;
//         if(i%2==0)
//             html += startRow + content;
//         else if (i%2 ==1)
//             html += content + endRow;
//         //i++;
//     return html
// }

// db.collection('vendors').orderBy('name').get().then(snap=>{
//     let html = ''
//     let defaultData = snap.docChanges();
//     var i = 0       
//     defaultData.forEach(change=>{
//         html += createVendorCard(change,i)
//         i++
//     })
//     defaultList.innerHTML = html
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
/******ADD VENDOR ********/
const addVendor = document.getElementById('add-button');
addVendor.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "addVendor.html";
});
/******VIEW PROFILE ********/
// profile-button
    // Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const profileButton = document.getElementById("profile");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
profileButton.onclick = function() {
    modal.style.display = "block";
}
// profileButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     modal.style.display = "block";
// });

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}