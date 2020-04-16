

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
require('./vendor.js')
/******SEARCH VENDORS*****/
console.log(name)

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

