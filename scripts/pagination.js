var current_page = 1;
var records_per_page = 10;
var records_per_row = 2;
var vendors = [];

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

function changePage(page){
    var btn_next = document.getElementById('next-button');
    var btn_prev = document.getElementById('prev-button');
    var listing_table = document.getElementById('default-list');
   
    //validate page
    if (page < 1) page=1;
    if (page > numPages()) page = numPages();
    console.log(current_page);
    listing_table.innerHTML = "";
    let html ="";
    for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++){
        let vendorCard =""; 
        if (vendors[i]){
            vendorCard = 
                        `<div class="col-6" style="padding:16px;">
                            <div class="tile u-no-padding">
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
                        </div>`;
        }       
        if ((i % 2) == 0){
            html += '<div class="row u-no-padding">' + vendorCard;       
        }
        if( (i % 2) > 0){
            html += vendorCard +'</div>';
        }
    }
    listing_table.innerHTML += html;
}
// display vendors as soon as page loads
window.onload = function() {
    getVendors()
    .then( fbVendors => { 
       vendors = fbVendors;
       changePage(1);
    })
};
