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


/**************SEARCH *************/
const searchButton = document.getElementById('search-button');
const inputName = document.getElementById("search-vendor");
const inputLoc = document.getElementById("search-loc");
const num_founds = document.getElementById('num_founds')
isSearch = false;


// Listener for Search Button
searchButton.addEventListener('click', (e)=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // fullList = vendors
            vendors = []

          // User is signed in.
            e.preventDefault();
            name = inputName.value;
            loc = inputLoc.value;
            if (name.length > 0) addTag(name,'red');
            if (loc.length < 0) addTag(loc,'red');
            isSearch = true;
            db.collection('vendors').orderBy('name').get().then(snap=>{
                let changes = snap.docChanges()
                findVendor(name,loc, changes)
                console.log(vendors)
                changePage(1)
                if(vendors.length < 2)
                    num_founds.innerHTML = vendors.length + " result found"
                else{
                    num_founds.innerHTML = vendors.length + " results found"
                }
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

/******Functions to help SEARCH VENDOR *************/
function foundVendor(data){
    return new Vendor(data.name, data.location, data.category, data.logo, data.rating)
}
function findVendor(name, loc, changes){ 
    var i;
    for(i = 0; i < changes.length; i++){
        if (name && !loc){
            if(changes[i].doc.data().name == name){
                vendors.push(foundVendor(changes[i].doc.data()))
            }
        }
        else if (name && loc){
            if(changes[i].doc.data().name == name && changes[i].doc.data().location == loc){  
                vendors.push(foundVendor(changes[i].doc.data()))
            }
        } 
        else if (!name && loc){
            console.log('location only');
            if(changes[i].doc.data().location == loc){
                vendors.push(foundVendor(changes[i].doc.data()))
            }
        } 
    }
}

 

/******LOG OUT ********/
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
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
