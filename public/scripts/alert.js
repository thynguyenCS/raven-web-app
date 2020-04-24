//  this function should not be used right now
function success(msg){
    Swal.fire({
        icon:'success',
        title:'<p style="color:white">' + msg + '</p>',
        width: 420,
        showConfirmButton: false,
        background:'#755ee8'
      })

}

// display alert
function toast(type, msg){
    var toast = document.getElementById(type);
    toggleOffToast(toast);
    toast.innerHTML = `<p>${msg}<p>`;
    toggleOnToast(toast);

  }
//reset alert's animated classes (bouncing) and hide alert
function toggleOffToast(toast){
  if (toast.classList.contains('animated') && toast.classList.contains('bounce')) {
    toast.classList.remove('animated','bounce');
  }
  if (toast.style.display == "block"){
    toast.style.display = "none";
  }
}
// turn on alert's animated classes (bouncing) and show alert
function toggleOnToast(toast){
  if (!toast.classList.contains('animated') && !toast.classList.contains('bounce')) {
    toast.classList.add('animated','bounce');
  }
  if (toast.style.display == "none"){
    toast.style.display = 'block';
  }
}