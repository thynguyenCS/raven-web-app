var current_page = 1;
var records_per_page = 10;
var vendors = [];
var vendorTiles = [];
var max_tags = 3;

class Vendor {
    constructor(id, name, location, category, logo, rating){
        this.id = id;
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
            id: vendor.id,
            name: vendor.name,
            location: vendor.location,
            category: vendor.category,
            logo: vendor.logo,
            rating: vendor.rating
            }
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Vendor(data.id, data.name, data.location, data.category, data.logo, data.rating);
    }
}
// this function is triggered in vendor3.html
function prevPage(){
    // console.log(current_page);
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

function numPages(){
    return Math.ceil(vendors.length / records_per_page);
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

const btn_next = document.getElementById('next-button');
const btn_prev = document.getElementById('prev-button');
const listing_table = document.getElementById('default-list');
const pagingItems = document.getElementById('pagination');
const content = document.getElementById("display-all");

function createPagingItems(){
    // let html ="";
    var html = `<div class="pagination-item short selected">
                <a id="page-1" href="javascript:changePage(1)" class="">1</a>
                </div> `;
    for (var i = 1; i < numPages(); i++){
        html += `<div class="pagination-item short">
            <a id="page-${i+1}" href="javascript:changePage(${i+1})" class="">${i+1}</a>
            </div> `;
    }
    var prev = `<div class="pagination-item short">
                    <a id="prev-button" href="javascript:prevPage()" class="">Prev</a>
                </div> `
    var next = `<div class="pagination-item short" id="next">
                    <a id="next-button" href="javascript:nextPage()" class="">Next</a>
                </div>`
    // for(let i = 1; i <3; i++){
    //     html += `<div class="pagination-item short child">
    //     <a href="javascript:changePage(${i})" class="">${i}</a>
    // </div>`
    // }   
    pagingItems.innerHTML = prev + html + next;
}
// createPagingItems();
function toggleSelectedPage(p){
    var id = 'page-' + p;
    var page = document.getElementById(id);
    var pages = pagingItems.getElementsByClassName('pagination-item');
    for (var i = 0; i < pages.length; i++){
        if (pages[i].classList.contains('selected')){
            pages[i].classList.remove('selected');
        }
    }
    page.parentNode.classList.add('selected');
}

function changePage(page){
    current_page = page;
    var prev_button = document.getElementById('prev-button');
    var next_button = document.getElementById('next-button');

    toggleSelectedPage(page);

    //validate page
    if (page < 1) page=1;
    if (page > numPages()) page = numPages();
    
    if (page == 1){
        prev_button.style.visibility = "hidden";
    }else {
        prev_button.style.visibility = "visible";
    }

    if (page == numPages()){
        next_button.style.visibility = "hidden";
    }else {
        next_button.style.visibility = "visible";
    }
    // if (page > numPages()) page = numPages();
    listing_table.innerHTML = "";
    let html = "";
    for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++){
        if (vendors[i]){
            let ratings = displayRatings(vendors[i].rating);
            let categories = display3Categories(vendors[i].category);
            html = `
            <div class="card vendor-tile">                                
                <div class="content vendor-content h-90">
                    <div class="tile u-text-left">
                        <div class="tile__icon">
                            <figure class="avatar vendor-avatar">
                                <img src="${vendors[i].logo}" alt="Person">
                            </figure>
                        </div>                        
                        <div class="tile__container">
                            <p class="tile__title"><a class="vendor-link" href="vendorPage.html">${vendors[i].name}</a></p>
                            <p class="tile__subtitle">${vendors[i].location}</p>
                        </div>
                    </div>
                    <space class="small"></space>
                    <p class="tile__bigTitle">${vendors[i].category[0]}</p>
                    <p class="tile__subtitle"><a class="link" href="javascript:displayVendorPage(${i})"></i> Learn More</a></p>
                    <space class="medium"></space>
                    <p class="vendor-text">This is some sample text spam spam spam spam spam spam spam. </p>
                </div>
                <div class="card-footer content w-100 h-10 u-pull-left">
                    <div class="row u-no-padding">
                        <div class="col u-no-padding">
                            ${ratings}
                        </div>
                        <div class="col u-no-padding u-text-right">
                            <span class="vendor-review">10 reviews</span>
                        </div>
                    </div>         
                </div>
            </div>`;
        }
        listing_table.innerHTML += html;

        if(page == numPages() && (i+1 == vendors.length))
        {
            break;
        } 
    }

    // each time user changes page, populate vendorTiles again
    vendorTiles = document.querySelectorAll('.vendor-tile');
    // toggleVendorCard(); // make all vendors in vendorTiles unselected at first
    selectVendor(0);  // then make the first vendor selected by default
}

//get the data of the chosen vendor to be viewed in vendorPage
function displayVendorPage(index){
    let v = vendors[index];
    var vendor = {
        id: v.id,
        name: v.name,
        location: v.location,
        category: v.category,
        logo: v.logo,
        rating: v.rating        
    }
    
    // db.collection("reviews").orderBy("vendorId").get().then(snap=>{
    //     //let reviews = []
    //     let changes = snap.docChanges();
    //     changes.forEach(change => {
    //         console.log(change.doc.data());
    //         reviews += change.doc.data().reviewContent + ',';
    //     })
    //     localStorage.setItem("reviews", reviews);
    // })
    localStorage.setItem("showingVendor", JSON.stringify(vendor));
    window.location.href = "vendorPage.html";
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
                <div class="tile tile--center no-shadow" >
                    <div class="tile__container">
                        <a href="" class="vendor-title"><h6 class="tile__title">${vendor.name}</h6></a>
                        <span class="tile__subtitle">${ratings}</span>
                        <span class="info vendor-info dark-grey">・</span>
                        <span class="info vendor-info dark-grey font-12">10 reviews</span>
                        <span class="info vendor-info dark-grey">・</span>
                        <span class="info vendor-info dark-grey font-12">1.4 miles</span>              
                    </div>
                </div>
                <space class="large"></space>
                <span class="title no-top-bot-margin">Recent Reviews</span>
                <space class="medium"></space>
                <div class="tile tile--center no-shadow no-side-padding">
                    <div class="tile__icon">
                        <figure class="avatar user-avatar">
                            <img src="https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png">
                        </figure>
                    </div>
                    <div class="tile__container review-container">
                        <p class="tile__subtitle font-12 u-no-margin">"The service was fast. I would come back again."</p>
                        
                    </div>
                </div>
                <space class="small"></space>
                <div class="tile tile--center no-shadow no-side-padding">
                    <div class="tile__icon">
                        <figure class="avatar user-avatar">
                            <img src="https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png">
                        </figure>
                    </div>
                    <div class="tile__container review-container">
                        <p class="tile__subtitle font-12 u-no-margin">"This place is busy during Monday afternoon so avoid going during that time."</p>
                    </div>
                </div>
                <space class="small"></space>
                <div class="tile tile--center no-shadow no-side-padding">
                    <div class="tile__icon">
                        <figure class="avatar user-avatar">
                            <img src="https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png">
                        </figure>
                    </div>
                    <div class="tile__container review-container">
                        <p class="tile__subtitle font-12 u-no-margin">"This place is busy during Monday afternoon so avoid going during that time."</p>
                        
                    </div>
                </div>
                <space class="medium"></space>
                <span class="title no-top-bot-margin">Location and Hours</span>
                <space class="medium"></space>
                <div class="row u-no-padding">
                    <div class="col-7 no-left-padding">
                        <span class="info no-top-bot-margin font-12">1824 Redwood</span>
                        <span class="info no-top-bot-margin font-12"> NC, USA</span>
                    </div>
                    <div class="col-5 no-side-padding u-text-left">
                        <span class="info no-top-bot-margin font-12">Mon-Fri: 10:00 AM - 6:00 PM</span>
                        <span class="info no-top-bot-margin font-12">Sat: 11:00 AM - 5:00 PM</span>
                        <span class="info no-top-bot-margin font-12">Sun: closed</span>
                    </div>
                </div>
                <space class="medium"></space>
                <span class="title no-top-bot-margin">Service Highlights</span>
                <space class="medium"></space>
                <div class="tag-container">
                    ${displayCategoryTags(vendor.category)}
                </div>
            </div>
            `
}
//display rating stars 
function displayRatings(ratings){
    var html="";
    for (var i = 0; i < ratings; i++){
        html += `<span class="fa fa-star checked yellow"></span>`;
    }
    for (var j = 0; j < (5 - ratings); j++){
        html += `<span class="far fa-star yellow"></span>`;
    }
    return html;
}

// display categories on vendor card
function displayCategoryTags(categories){
    let html= ""
    for(var i =0; i < categories.length; i++){
        html += `<a class="tag tag--grey" href="javascript:addTag('${categories[i]}')">${categories[i]}</a>`;
    }
    return html;
}
// when a vendor tile is clicked, change its background color and populate vendor card
function selectVendor(selectIndex){
    // var vendorCard = document.getElementById('toggle-vendor-card');
    vendorTiles[selectIndex].classList.add('selected');
    vendorTiles[selectIndex].classList.remove('unselected');
    // vendorCard.innerHTML = displayVendorCard(vendors[(current_page-1)*records_per_page + selectIndex]);
    // vendorCard.style.display ="block";
    
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

// everything that needs to appear when page pages
// display vendors
window.onload = function() {    
    getVendors()
    .then( fbVendors => {
        if(!isSearch){
            vendors = fbVendors;
        }
        
        // display page 1 by default
        if (content.style.display = "none") content.style.display = "";
        displayCategories();
        createPagingItems();
        changePage(1); 
     })
};
 