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
/******SEARCH VENDOR BY NAME*************/
const searchButton = document.getElementById('search-button');
const inputName = document.getElementById("search-vendor");
const inputLoc = document.getElementById("search-loc");
var foundVendorsHtml = '';  

function findVendor(name, loc, changes){ 
    var foundVendors = [] 
    let html = ''
    console.log(isSearch)
    var i, j=0;
    for(i = 0; i < changes.length; i++){
    if (name && !loc){
        //console.log('name only')
        if(changes[i].doc.data().name == name){
            html += createVendorCard(changes[i], j)
        }
    }
    else if (name && loc){
        console.log('name and loc');
        
    } 
    else if (!name && loc){
        //console.log('loc only')
        //.toLowerCase
        if(changes[i].doc.data().location == loc){
            html += createVendorCard(changes[i], j)
        }
   } 
}
    if(j%2==1){
        console.log('j is 1')
        html += `</div><space class="large"></space>`
}
   return html
}

searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    name = inputName.value;
    loc = inputLoc.value;
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
    })
 
/******DISPLAY VENDOR *******/
function createVendorCard(change, i){
    let html = '';  
        const vendor = change.doc.data()
        let startRow = `<div class="row">` 
        let endRow = `</div>
        <space class="large"></space>`
        let content = ` <div class="col-5">
        <div class="tile u-no-padding">
            <div class="row u-no-padding">
                <!-- vendor pic -->
                <div class="tile__icon">
                    <figure class="avatar">
                        <img src=${vendor.logo}>
                    </figure>
                </div>
                <!-- Vendor's name, location, industry -->
                <div class="tile__container tile-padded"> 
                        <h6 class="tile__title u-no-margin">${vendor.name}</b></h6>

                        <p class="tile__subtitle">${vendor.location}</p>
                       
                        <span class="info">Category: ${vendor.category}</span> 
                </div>
                <!-- Vendor's rating stars -->
                <div class="tile__container u-text-right tile-padded">
                    <span class="fa fa-star checked yellow"></span>
                    <span class="fa fa-star checked yellow"></span>
                    <span class="fa fa-star checked yellow"></span>
                    <span class="fa fa-star checked yellow"></span>
                    <span class="far fa-star yellow"></span>
                    <span class="info light-blue">5 reviews</span>
                </div>
            </div>            
        </div>
    </div>`
        //if changes.length == 1
        // if (size == 0){
        //     console.log('Not found')
        // }
        // if(i%2==0 && i == size - 1)
        //     html += startRow + content + endRow;
        if(i%2==0)
            html += startRow + content;
        else if (i%2 ==1)
            html += content + endRow;
        //i++;
    return html
}

db.collection('vendors').orderBy('name').get().then(snap=>{
    let html = ''
    let defaultData = snap.docChanges();
    var i = 0       
    defaultData.forEach(change=>{
        html += createVendorCard(change,i)
        i++
    })
    defaultList.innerHTML = html
})


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

