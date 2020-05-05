var review_button = document.getElementById('review-button');
var review_text = document.getElementById('review-text');
var submit_review = document.getElementById('submit-review');
var leave_review = document.getElementById('leave-review');

review_button.addEventListener('click', () => {
    submit_review.style.display = "block";
    leave_review.style.display = "none";
})