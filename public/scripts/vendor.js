
//  add filter tags to the top
function addTag(tag){
    var tagContainer = document.getElementById("tag-filter");
    sanitizedTag = tag.replace(/\s+/g, '-').toLowerCase();

    var allTags = tagContainer.getElementsByClassName("tag");
    for(var i = 0; i < allTags.length; i++){
        if (allTags[i].classList.contains('animated','fade-in')){
        allTags[i].classList.remove('animated','fade-in');}
    }

    let tagType = 'class="tag tag--grey animated fadeIn"';
    if (!tagContainer.contains(document.getElementById(sanitizedTag))){
        // if (color =="blue") tagType = 'class="tag tag--info animated fadeIn"';
        // else if(color =="purple") tagType = 'class="tag tag--link animated fadeIn"';
        // else if(color == "yellow") tagType = 'class="tag tag--warning animated fadeIn"';
        // else if(color =="red") tagType = 'class="tag tag--primary animated fadeIn"';
        tagContainer.innerHTML += `<div id="${sanitizedTag}"` + tagType +`>${tag}
                        <a class="tag tag--delete" href="javascript:deleteTag('${sanitizedTag}')"></a></div>`;
    }
}
// delete filter tags from the top
function deleteTag(tag){
    var tag = document.getElementById(tag);
    tag.parentNode.removeChild(tag);
}
function clearAllTags(){
    var tagContainer = document.getElementById("tag-filter");
    // var allTags = tagContainer.getElementsByClassName("tag");
    tagContainer.innerHTML = "";
}
/**************SEARCH *************/
const searchButton = document.getElementById('search-button');
const inputName = document.getElementById("search-vendor");
const inputLoc = document.getElementById("search-loc");
const num_founds = document.getElementById('num_founds')
const not_found = document.getElementById('result-not-found');
const default_list = document.getElementById('default-list');
const display_all = document.getElementById('display-all');
const pagination = document.getElementById('pagination');
// var vendors = [];
//console.log(searchButton)

isSearch = false;


// Listener for Search Button
searchButton.addEventListener('click', (e)=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // fullList = vendors
            vendors = []
            // clear tags
            clearAllTags();
            // clearAllTags('tag-filter', tags_to_display);

          // User is signed in.
            e.preventDefault();
            name = inputName.value;
            loc = inputLoc.value;
            if (name.length > 0) addTag(name);
            if (loc.length < 0) addTag(loc);
            isSearch = true;
            db.collection('vendors').orderBy('name').get().then(snap=>{
                let changes = snap.docChanges()
                findVendor(name,loc, changes)
                console.log(numPages());
                not_found.style.display  = 'none';
                //console.log(vendors)
                if (vendors.length === 0){                   
                    not_found.style.display  = 'block';
                    display_all.innerHTML = "";
                    display_all.style.display = 'none';
                    pagination.style.visibility = 'hidden';
                    // document.getElementById('default-list').innerHTML = "";
                    // document.getElementById('display-all').style.display = 'none';
                    // document.getElementById('pagination').style.visibility ='hidden';
                    // document.getElementById('toggle-vendor-card').innerHTML = "";
                    num_founds.innerHTML = '';
                }                
                else if(vendors.length === 1){
                    createPagingItems();
                    display_all.style.display = 'block';
                    pagination.style.visibility = 'visible';
                    // document.getElementById('display-all').style.display = 'block';
                    // document.getElementById('pagination').style.visibility ='visible';
                    changePage(1);
                    num_founds.innerHTML = vendors.length + " result found";
                }                    
                else if (vendors.length > 1){
                    createPagingItems();
                    display_all.style.display = 'block';
                    pagination.style.visibility = 'visible';
                    changePage(1);
                    num_founds.innerHTML = vendors.length + " results found";
                }
            })  
            
            document.getElementById("search-vendor").value =""
            document.getElementById("search-loc").value = "" 

        } else {
          // No user is signed in.
          e.preventDefault();
          window.location.href = "index.html";
        }
      });
    
    })

/******Functions to help SEARCH VENDOR *************/
function foundVendor(data){
    return new Vendor(data.name, data.location, data.category, data.logo, data.rating)
}
function findVendor(name, loc, changes){ 
    for(let i = 0; i < changes.length; i++){
        let dataName = changes[i].doc.data().name;
        let dataLoc = changes[i].doc.data().location;
        if (name && !loc){
            if(checkStrings(dataName, name)){              
                vendors.push(foundVendor(changes[i].doc.data()))
            }
        }
        else if (name && loc){
            if(checkStrings(dataName, name) && checkStrings(dataLoc, loc)){
                vendors.push(foundVendor(changes[i].doc.data()))
            }
        } 
        else if (!name && loc){
            if(checkStrings(dataLoc, loc)){
                vendors.push(foundVendor(changes[i].doc.data()))
            }
        } 
    }
}

function checkStrings(str1, str2){
    const regex = /\W*\s*/gi;
    new_str1 = str1.replace(regex, "").toUpperCase();
    new_str2 = str2.replace(regex, "").toUpperCase();
    //return new_str1.toUpperCase() === new_str2.toUpperCase();
    return new_str1.indexOf(new_str2) !== -1;
}

/******LOG OUT ********/
// already done this in profile.js

// const logoutButton = document.getElementById('logout-button');
// logoutButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     auth.signOut();
//     window.location.href = "index.html";
// });
/******ADD VENDOR ********/

const addVendor = document.getElementById('add-button');
addVendor.addEventListener('click', (e)=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            e.preventDefault();
            window.location.href = "addVendor.html";
        } else {
          // No user is signed in.
          e.preventDefault();
          window.location.href = "index.html";
        }
      });
    
    })

/******VIEW PROFILE ********/
const profileButton = document.getElementById('profile');
profileButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "profile.html";
});
// profile-button
    // Get the modal
// var modal = document.getElementById("myModal");
// console.log(modal)

// // Get the button that opens the modal
// var profileButton = document.getElementById("profile");
// console.log(profileButton)

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// document.getElementById('profile').addEventListener("click", function() {
// 	document.querySelector('.myModal').style.display = "flex";
// });

// When the user clicks on the button, open the modal
// profileButton.onclick = function() {
//     modal.style.display = "block";
// }
// profileButton.addEventListener('click', (e) => {
//     e.preventDefault();
//     console.log("profileButton")

//     // modal.style.display = "block";
//     document.getElementById("myModal").style.display = "flex";

// });

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }

// // // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//     modal.style.display = "none";
//     }
// }
// document.getElementById('button').addEventListener("click", function() {
// 	document.querySelector('.modal').style.display = "flex";
// });

// document.querySelector('.close').addEventListener("click", function() {
// 	document.querySelector('.modal').style.display = "none";
// });