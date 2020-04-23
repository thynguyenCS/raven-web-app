var current_page = 1;
var records_per_page = 10;
var vendors = [];
//var tiles = []
var pagingItems = document.getElementsByClassName('paging-items')
class Vendor {
    constructor(name, location, category, logo, rating){
        this.name = name;
        this.location = location;
        this.category = category;
        this.logo = logo;
        this.rating = rating;
    }
}

 // Firestore data converter
vendorConverter = {
    toFirestore: function(vendor) {
        return {
            name: vendor.name,
            location: vendor.location,
            category: vendor.category,
            logo: vendor.logo,
            rating: vendor.rating
            }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Vendor(data.name, data.location, data.category, data.logo, data.rating);
    }
}
// this function is triggered in vendor3.html
function prevPage(){
    if (current_page > 1){
        current_page--;
        changePage(current_page);
    }
}
// this function is triggered in vendor3.html
function nextPage(){
    if (current_page < numPages()){
        current_page++;
        changePage(current_page);
    }

}
function currentPage(){
    return current_page;
}
function numPages(){
    return Math.ceil(vendors.length / records_per_page);
}

// display all the pages number - does not work
function displayPages(){    
    //console.log(pagingItems)
    let pagesHTML = ''
    for(var counter = 1; counter <= numPages(); counter++){
        pagesHTML += `<div class="pagination-item short">
            <a href="#">${counter}</a></div>`
    }    
    console.log(pagesHTML)
    pagingItems.innerHTML += pagesHTML
    
}


// retrieve vendors from firebase and push them into an array
function getVendors() {
    const fbVendors = [];
    return new Promise((resolve, reject) => {
        db.collection("vendors")
        .withConverter(vendorConverter)
        .orderBy("name")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
            vendor = doc.data();
            fbVendors.push(vendor);
            });    
            resolve(fbVendors);
        })
        .catch(function (error) {
            reject(error);
        });
    });
    }

function changePage(page){
    var btn_next = document.getElementById('next-button');
    var btn_prev = document.getElementById('prev-button');
    var listing_table = document.getElementById('default-list');
    //displayPages()
   
    //validate page
    if (page < 1) page=1;
    if (page > numPages()) page = numPages();
    //console.log('current page ' + current_page);
    listing_table.innerHTML = "";
    let html = "";
    for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++){
        //console.log(i)
        if (vendors[i]){
            html =  `<div class="tile u-no-padding">
                        <div class="row w-100 u-no-padding">
                            <div class="tile__icon">
                                <figure class="avatar">
                                    <img class="h-100" src=${vendors[i].logo}>
                                </figure>
                            </div>
                            <div class="tile__container tile-padded"> 
                                    <h6 class="tile__title u-no-margin">${vendors[i].name}</b></h6>
                                    <p class="tile__subtitle">${vendors[i].location}</p>
                                    <span class="info">${vendors[i].category}</span> 
                            </div>
                            
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
                    <space class="large"></space>`;        
        }
        listing_table.innerHTML += html;

        if(page == numPages() && (i+1 == vendors.length))
        {
            break;
        }
        //add the event listener for each tiles in the page
        // let tiles = document.querySelectorAll('.tile');
        // // console.log(tiles)
        // tiles[i].addEventListener('click', function() {
        //     console.log('click');
        //     var card = document.querySelector('.card');
        //     card.style.visibility = 'visible'
        //     card.innerHTML = displayVendorCard(vendors[i])
        //     card.classList.toggle('close');
        // });    

    }
    
}
function displayVendorCard(vendor){
    return `<div class="card-container h-20">
                <div class="card-image"></div>
                <div class="title-container">        
                <p class="title">${vendor.name}</p>
                <span class="subtitle">San Jose, CA</span>
            </div>
            </div>
            <div class="content" style="margin-left: 3rem;">
                 <p>${vendor.name}</p>
                 <p>${vendor.location}</p>
                 <p>${vendor.rating}</p>
            </div>
            <div class="action-bar u-center">
            <button class="btn btn-save">SAVE</button>
            <button class="btn btn-learn">LEARN MORE</button>
</div>`
}
          
// display vendors as soon as page loads
window.onload = function() {
    
    getVendors()
    .then( fbVendors => {
        if(!isSearch){
            vendors = fbVendors;
        }

       changePage(1);
       let tiles = document.querySelectorAll('.tile');
       console.log(tiles)
       //displayPages()

    // doesnt work
        for (var k = 0; k < tiles.length; k++){
            tiles[k].addEventListener('click', function() {
                console.log('click');
                var card = document.querySelector('.card');
                card.innerHTML = displayVendorCard(vendors[k])
                card.classList.toggle('close');
            });    
        }
         })
};
 