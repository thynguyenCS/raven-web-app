
const toast = document.getElementById('error');
// display alert
function displayToast(msg){
    toggleOffToast();
    toast.innerHTML = `<p>${msg}<p>`;

    setTimeout(() => {
      toggleOnToast();
    },100);
}
//reset alert's animated classes (bouncing) and hide alert
function toggleOffToast(){
  if (toast.classList.contains('animated') && toast.classList.contains('fadeIn')) {
    toast.classList.remove('animated','fadeIn');
  }
}
// turn on alert's animated classes (bouncing) and show alert
function toggleOnToast(){
  if (!toast.classList.contains('animated') && !toast.classList.contains('fadeIn')) {
    toast.classList.add('animated','fadeIn');
  }
  if (toast.style.display == "none"){
    toast.style.display = 'block';
  }
}