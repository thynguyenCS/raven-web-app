var current_page = 1;
var records_per_page = 10;
var vendors = [];
var vendorTiles = [];
var max_tags = 3;
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
// function currentPage(){
//     return current_page;
// }
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
   
    //validate page
    if (page < 1) page=1;
    if (page > numPages()) page = numPages();
    listing_table.innerHTML = "";
    let html = "";
    for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++){
        if (vendors[i]){
            let categories = display3Categories(vendors[i].category);
            html =  `<div class="tile vendor-tile unselected">
                        <div class="row tile-content w-100">
                            <div class="col-3 tile__icon fill-height center">
                                <figure class="avatar vendor-avatar">
                                    <img class="w-100 h-100" src=${vendors[i].logo}>
                                </figure>
                            </div>
                            <div class="col-7 tile__container"> 
                                    <h6 class="tile__title u-no-margin">${vendors[i].name}</b></h6>
                                    <span class="info">${vendors[i].location}</span></br>
                                    <span class="info">${categories}</span> 
                            </div>
                            
                            <div class="col-2 tile__container u-text-right">
                                <span class="info dark-grey">${(Math.round(vendors[i].rating * 10) / 10).toFixed(1)}</span>
                                <span class="fa fa-star small checked  yellow"></span></br>
                                <span class="info dark-grey">10</span>
                                <span class="fas fa-comment small dark-grey"></span>
                                
                            </div>
                        </div>                                
                    </div>
                    <space class="medium"></space>`;        
        }
        listing_table.innerHTML += html;

        if(page == numPages() && (i+1 == vendors.length))
        {
            break;
        } 
    }

    // each time user changes page, populate vendorTiles again
    vendorTiles = document.querySelectorAll('.vendor-tile');
    toggleVendorCard(); // make all vendors in vendorTiles unselected at first
    selectVendor(0);  // then make the first vendor selected by default
}
// display categories on vendor tile (maxmium 3 tags)
function display3Categories(categories){
    var html = "";
    var num = 0;
    if (categories.length < max_tags) num = categories.length;
    else num = max_tags;

    for (var i = 0; i < num; i++){
        html += categories[i];
        if (i < num -1) {
            html += ", ";
        }
    }
    return html;
}
// display vendor's name, location, ratings, reviews, hours, and tags on vendor card
function displayVendorCard(vendor){
    return `<div class="card-container h-20">
                <div class="card-image"></div>
                <div class="title-container">        
                    <span class="title white">${vendor.name}</span>
                    <span class="info dark-grey">・</span>
                    <span class="subtitle dark-grey">${vendor.location}</span></br>
                    <span class="fa fa-star checked yellow"></span>
                    <span class="fa fa-star checked yellow"></span>
                    <span class="fa fa-star checked yellow"></span>
                    <span class="fa fa-star checked yellow"></span>
                    <span class="far fa-star yellow"></span>
                    <span class="info dark-grey">・</span>
                    <span class="info dark-grey">${vendor.rating} reviews</span>
                    <span class="info dark-grey">・</span>
                    <span class="info dark-grey">1.4 miles</span>
                </div>
            </div>
            <div class="content" style="margin-left: 3rem;">
                <span class="title white" style="line-height: 3;">Review Highlights</span>
                <div class="tile">
                    <div class="tile__icon">
                        <figure class="avatar user-avatar">
                            <img src="https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png">
                        </figure>
                    </div>
                    <div class="tile__container">
                        <p class="tile__subtitle u-no-margin">"Stark Industries is proud to announce its brand new suit."</p>
                        <span class="info">23 minutes ago</span>
                    </div>
                </div>
                <div class="tile">
                <div class="tile__icon">
                    <figure class="avatar user-avatar">
                        <img src="https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png">
                    </figure>
                </div>
                <div class="tile__container">
                    <p class="tile__subtitle u-no-margin">"Stark Industries is proud to announce its brand new suit."</p>
                    <span class="info">23 minutes ago</span>
                </div>
            </div>
                <div class="divider"></div>
                <span class="title white" style="line-height: 3;">Hours</span>
                <div class="divider"></div>
                <span class="title white" style="line-height: 3;">Categories</span>
                <div class="tag-container">
                    ${displayCategoryTags(vendor.category)}
                </div>
                    
            </div>
            <div class="action-bar u-center">
            <button class="btn btn-save">SAVE</button>
            <button class="btn btn-learn">LEARN MORE</button>
            </div>`
}

// display categories on vendor card
function displayCategoryTags(categories){
    let html= ""
    for(var i =0; i < categories.length; i++){
        html += `<a class="tag tag--link" href="javascript:addTag('${categories[i]}','purple')">${categories[i]}</a>`;
    }
    return html;
}
// Select a vendor tile and change its background color
function selectVendor(selectIndex){
    var vendorCard = document.getElementById('toggle-vendor-card');
    vendorTiles[selectIndex].classList.add('selected');
    vendorTiles[selectIndex].classList.remove('unselected');
    vendorCard.innerHTML = displayVendorCard(vendors[(current_page-1)*records_per_page + selectIndex])
    
    for (var i = 0; i < vendorTiles.length; i++) {
        (function (index){ 
            // keep a lighter background for other tiles (only the selected tile has a darker background)
            if (index != selectIndex && vendorTiles[index].classList.contains('selected')){
                vendorTiles[index].classList.remove('selected');
                vendorTiles[index].classList.add('unselected');
            }
        })(i);
    }
}

// Refresh fade-in affect of vendor card whenever clicking on a vendor tile
function toggleVendorCard(){
    var toggleVendor = document.getElementById('toggle-vendor-card');

    for (var i = 0; i < vendorTiles.length; i++){
        (function (index) {
            vendorTiles[index].addEventListener('click', function() {
                if (toggleVendor.classList.contains('animated', 'fadeIn')){
    
                    toggleVendor.classList.remove('animated','fadeIn');
                } 
                setTimeout(() => {
                    toggleVendor.classList.add('animated','fadeIn');
                    toggleVendor.innerHTML = displayVendorCard(vendors[(current_page-1)*records_per_page + index]);
                },100);
            
                selectVendor(index);
            });    
        })(i); 
    }
}      
// display vendors as soon as page loads
window.onload = function() {
    
    getVendors()
    .then( fbVendors => {
        if(!isSearch){
            vendors = fbVendors;
        }
        // display page 1 by default
        changePage(1); 
     })
};
 