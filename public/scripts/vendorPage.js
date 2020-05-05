var reviewsHTML = '';
//console.log(reviewsHTML)
var reviewsList = document.getElementById("reviews-list");

db.collection("reviews").orderBy("vendorId").get().then(snap=>{
    let changes = snap.docChanges();
    changes.forEach(change=>{
        data = change.doc.data();
        if(data.vendorId == showingVendor.id){
           reviewsHTML += 
           `<div class="tile review-tile">
                <div class="tile__icon">
                    <figure class="avatar">
                        <img src="https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png">
                    </figure>
                </div>
                <div class="tile__container" >
                    ${data.rating} <span class="fa fa-star checked yellow"></span>                    
                    <p class="tile__title u-no-margin">Robert Downey Jr.</p>
                    <p class="tile__subtitle u-no-margin">${data.reviewContent}</p>
                    <span class="info">23 minutes ago</span>
                    <p class="tile__buttons u-no-margin">                        
                    <button class="btn-tiny uppercase">Reply</button>
                    </p>
                </div>
            </div>`;    
        console.log(reviewsHTML)       
        }
    });   
    reviewsList.innerHTML = reviewsHTML;
});






//console.log(localStorage.getItem("reviews"))
var review_button = document.getElementById('review-button');
var review_text = document.getElementById('review-text');
var submit_review = document.getElementById('submit-review');
var leave_review = document.getElementById('leave-review');

review_button.addEventListener('click', () => {
    submit_review.style.display = "block";
    leave_review.style.display = "none";
})
//Modify the html element corresponding with the vendor
//console.log(localStorage.getItem("showingVendor"));
let showingVendor = JSON.parse(localStorage.getItem("showingVendor"));
document.getElementById("vendor-name").innerHTML = showingVendor.name;
document.getElementById("vendor-loc").innerHTML = showingVendor.location;
document.getElementById("vendor-category").innerHTML = createCategoryStr(showingVendor.category);
document.getElementById("vendor-logo").src = showingVendor.logo;
document.getElementById("vendor-rating").innerHTML =  ` ${showingVendor.rating} <span class="fa fa-star yellow"></span>`

//getting the list of reviews












// Function to convert the category array to string
function createCategoryStr(category){
    str  = '';
    for(let i=0; i <category.length; i++){
        if(i!=category.length-1){
            str += category[i] + ' . ';
        }
        else{
            str += category[i];
        }
    }
    return str;
}








