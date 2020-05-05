// var userEmail = (localStorage.getItem("userEmail"))
// var userName = ''
// db.collection("users").then(()=>{

//     console.log(yes)
// })
//get the list of reviews of the corresponding vendor
var userName = localStorage.getItem("userName");
var userEmail = localStorage.getItem("userEmail");
console.log(userEmail + " " + userName);
var reviewsHTML = '';
var reviewsList = document.getElementById("reviews-list");

db.collection("reviews").orderBy("vendorId").get().then(snap=>{
    var vendorRating = 0;
    var countReviews = 0;
    let changes = snap.docChanges();
    changes.forEach(change=>{
        data = change.doc.data();
        //display the reviews
        if(data.vendorId == showingVendor.id){
            countReviews++;
            vendorRating += parseFloat(data.rating);
            reviewsHTML += 
           `<div class="tile review-tile">
                <div class="tile__icon">
                    <figure class="avatar">
                        <img src="https://www.seoclerk.com/pics/319222-1IvI0s1421931178.png">
                    </figure>
                </div>
                <div class="tile__container" >
                    ${data.rating} <span class="fa fa-star checked yellow"></span>                    
                    <p class="tile__title u-no-margin">${userName}</p>
                    <p class="tile__subtitle u-no-margin">${data.reviewContent}</p>
                    <span class="info">${data.date}</span>
                    <p class="tile__buttons u-no-margin">                        
                    <button class="btn-tiny uppercase">Reply</button>
                    </p>
                </div>
            </div>`;    
        }
    });   
    document.getElementById("total-reviews").innerHTML = `Reviews (${countReviews})`,
    reviewsList.innerHTML = reviewsHTML;
    //calculate the new average rating and store back to vendor.rating
    if(countReviews == 0){
        db.collection("vendors").doc(showingVendor.id).update({
            rating: 0
        })
    }
    else{
        console.log(vendorRating + " " + countReviews)
        let avg = (vendorRating/countReviews).toFixed(1);
        db.collection("vendors").doc(showingVendor.id).update({
            rating: avg
        })
        
    }
    
    
});


//Modify the html element corresponding with the vendor
//console.log(localStorage.getItem("showingVendor"));
let showingVendor = JSON.parse(localStorage.getItem("showingVendor"));
document.getElementById("vendor-name").innerHTML = showingVendor.name;
document.getElementById("vendor-loc").innerHTML = showingVendor.location;
document.getElementById("vendor-category").innerHTML = createCategoryStr(showingVendor.category);
document.getElementById("vendor-logo").src = showingVendor.logo;
document.getElementById("vendor-rating").innerHTML =  ` ${showingVendor.rating} <span class="fa fa-star yellow"></span>`
 

//Review
var review_button = document.getElementById('review-button');
var review_text = document.getElementById('review-text');
var submit_review = document.getElementById('submit-review');
var leave_review = document.getElementById('leave-review');

review_button.addEventListener('click', () => {
    submit_review.style.display = "block";
    leave_review.style.display = "none";
})
//Function to rate vendor after clicking Leave a review button


var rateValue = '';
var reviewValue = '';
submit_review.addEventListener("submit", e=>{
    e.preventDefault();
    submit_review.style.display = "none";
    var reviewTime = new Date();
    var reviewTimeStr = reviewTime.toUTCString();
    var review_content = document.getElementById("review-content");        
    var rating = document.getElementsByName("rating"); 
    reviewValue = review_content.value;       
    for(let i = 0; i < rating.length; i++){
        if(rating[i].checked){
            rateValue= rating[i].value;
        }
    } 
    
    db.collection("reviews").add({
        vendorId: showingVendor.id,
        reviewContent: reviewValue,
        rating: rateValue,
        date: reviewTimeStr,
        user: localStorage.getItem("userEmail")    
    }).then(()=>{
        //reset the form
        for(let i=0;i<rating.length;i++){
            rating[i].checked = false;
        }   
        review_content.value = "";  
    });     

});

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








