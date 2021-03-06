
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
function closeToast(){
  toast.style.display = "none";
}


function success(msg){
  Swal.fire({
      icon:'success',
      title:'<p style="color:white">' + msg + '</p>',
      width: 420,
      showConfirmButton: false,
      background:'#755ee8'
    })

}