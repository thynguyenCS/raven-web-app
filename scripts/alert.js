function success(msg){
    Swal.fire({
        icon:'success',
        title:'<p style="color:white">' + msg + '</p>',
        width: 420,
        showConfirmButton: false,
        background:'#755ee8'
      })

}
function error(msg){
    Swal.fire({
        icon:'error',
        title:'<p style="color:white">' + msg + '</p>',
        width: 420,
        showConfirmButton: false,
        background:'#484f5b'
      })
}