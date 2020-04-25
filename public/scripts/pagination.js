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
                                    <span class="info vendor-info">${vendors[i].location}</span></br>
                                    <span class="info vendor-info">${categories}</span> 
                            </div>
                            
                            <div class="col-2 tile__container u-text-right">
                                <span class="info vendor-info dark-grey">${(Math.round(vendors[i].rating * 10) / 10).toFixed(1)}</span>
                                <span class="fa fa-star small checked dark-grey"></span></br>
                                <span class="info vendor-info dark-grey">10</span>
                                <span class="fas fa-comment small dark-grey"></span>
                                
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
    var ratings = displayRatings(vendor.rating);
    return `<div class="card-container h-20">
                <div class="card-image"></div>
                <div class="title-container u-text-right">
                    <div class="btn-group">
                        <button class="btn-dark tooltip" data-tooltip="Save"><i class="fas fa-bookmark white"></i></button>
                        <button class="btn-dark tooltip"  data-tooltip="More"><i class="fas fa-ellipsis-h white"></i></button>
                      
                    </div>  
                
                </div>
                
            </div>
            <space class="medium"></space>
            
            <div class="content card-content">
                <dt class="tile tile--center no-shadow" >
                    <div class="tile__icon">
                        <figure class="avatar vendorCard-avatar">
                            <img class="h-100" src="${vendor.logo}">
                        </figure>
                    </div>  
                    <div class="tile__container">
                        <a href=""><span class="tile__title">${vendor.name}</span></a>
                        <span class="tile__subtitle">${ratings}</span>
                        <span class="info vendor-info dark-grey">・</span>
                        <span class="info vendor-info dark-grey">50 reviews</span>
                        <span class="info vendor-info dark-grey">・</span>
                        <span class="info vendor-info dark-grey">1.4 miles</span>
                    
                    </div>
                </dt>
                <space class="large"></space>
                <dt class="title white no-top-bot-margin">Review Highlights</dt>
                <space class="small"></space>
                <dd class="tile tile--center no-shadow no-side-padding">
                    <div class="tile__icon">
                        <figure class="avatar user-avatar">
                            <img src="https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png">
                        </figure>
                    </div>
                    <div class="tile__container review-container">
                        <p class="tile__subtitle review u-no-margin">"The service was fast. I would come back again."</p>
                        <span class="info user-review">23 minutes ago</span>
                    </div>
                </dd>
                <space class="small"></space>
                <dd class="tile tile--center no-shadow no-side-padding">
                    <div class="tile__icon">
                        <figure class="avatar user-avatar">
                            <img src="https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png">
                        </figure>
                    </div>
                    <div class="tile__container review-container">
                        <p class="tile__subtitle review u-no-margin">"This place is busy during Monday afternoon so avoid going during that time."</p>
                        <span class="info user-review">23 minutes ago</span>
                    </div>
                </dd>
                <space class="small"></space>
                <dd class="tile tile--centerno-shadow no-side-padding">
                    <div class="tile__icon">
                        <figure class="avatar user-avatar">
                            <img src="https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png">
                        </figure>
                    </div>
                    <div class="tile__container review-container">
                        <p class="tile__subtitle review u-no-margin">"This place is busy during Monday afternoon so avoid going during that time."</p>
                        <span class="info user-review">23 minutes ago</span>
                    </div>
                </dd>
                
                <dt class="title white no-top-bot-margin">Location and Hours</dt>
                <space class="small"></space>
                <div class="row u-no-padding">
                    <div class="col-6 no-side-padding">
                        <dd class="info no-top-bot-margin">1824 Redwood</dd>
                        <dd class="info no-top-bot-margin"> NC, USA</dd>
                    </div>
                    <div class="col-6 no-side-padding u-text-left">
                        <dd class="info no-top-bot-margin">Mon-Fri: 10:00 AM - 6:00 PM</dd>
                        <dd class="info no-top-bot-margin">Sat: 11:00 AM - 5:00 PM</dd>
                        <dd class="info no-top-bot-margin">Sun: closed</dd>
                    </div>
                </div>
                <space class="small"></space>
               
                <dt class="title white no-top-bot-margin">Categories</dt>
                <space class="small"></space>
                <dd class="tag-container">
                    ${displayCategoryTags(vendor.category)}
                </dd>
                    
            </div>
            `
}

//display rating stars 
function displayRatings(rating){
    var html="";
    for (var i = 0; i < rating; i++){
        html += `<span class="fa fa-star checked yellow"></span>`;
    }
    for (var j = 0; j < (5 - rating); j++){
        html += `<span class="far fa-star yellow"></span>`;
    }
    return html;
}

// display categories on vendor card
function displayCategoryTags(categories){
    let html= ""
    for(var i =0; i < categories.length; i++){
        html += `<a class="tag tag--link" href="javascript:addTag('${categories[i]}','purple')">${categories[i]}</a>`;
    }
    return html;
}
// when a vendor tile is clicked, change its background color and populate vendor card
function selectVendor(selectIndex){
    var vendorCard = document.getElementById('toggle-vendor-card');
    vendorTiles[selectIndex].classList.add('selected');
    vendorTiles[selectIndex].classList.remove('unselected');
    vendorCard.innerHTML = displayVendorCard(vendors[(current_page-1)*records_per_page + selectIndex]);
    vendorCard.style.display ="block";
    
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

// add click event to each vendor tile 
function toggleVendorCard(){
    var toggleVendor = document.getElementById('toggle-vendor-card');

    for (var i = 0; i < vendorTiles.length; i++){
        (function (index) {
            vendorTiles[index].addEventListener('click', function() {
                // if (toggleVendor.classList.contains('animated', 'fadeIn')){
    
                //     toggleVendor.classList.remove('animated','fadeIn');
                // } 
                // setTimeout(() => {
                //     toggleVendor.classList.add('animated','fadeIn');
                //     // toggleVendor.innerHTML = displayVendorCard(vendors[(current_page-1)*records_per_page + index]);
                // },100);
            
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
 