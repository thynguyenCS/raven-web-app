let vendorTags = new Set(); 
const allTags = ['Education','Banking','Grocery','Tech', 'Food', 'Service', 'A very long tag'];



function filterTags(){
    var input = document.getElementById('tag-input');
    var filter = input.value.toUpperCase();
    var tags = document.getElementById('tags');
    var a = tags.getElementsByTagName("a");
    // console.log(a.length);
    for (var i = 0; i < a.length; i++){
        
        tagValue = a[i].textContent || a[i].innerText;
        if (tagValue.toUpperCase().indexOf(filter) > -1){
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

function displayVendorTags(){
    let arr = Array.from(vendorTags);
    var selected_tags = document.getElementById('selected-tags');
    let html = "";
    for (var i = 0; i < arr.length; i++){
        html += `<div class="tag tag--grey">
                    ${arr[i]}
                    <a class="tag tag--delete" href="#"></a>
                </div>`;
    }
    selected_tags.innerHTML = html;
    deleteTag();
}
function deleteTag(){
    var selected_tags = document.getElementById('selected-tags');
    var a = selected_tags.getElementsByTagName("a");
    for (var i = 0; i < a.length; i ++){
        (function(index){
            a[index].addEventListener('click', () => {
                console.log("delete");
                tagValue = a[index].parentNode.textContent || a[index].parentNode.innerText;
                vendorTags.delete(tagValue.trim());
                console.log(vendorTags);
                displayVendorTags();
            })
        })(i);
    }
}

function initTagList(){
    var tags = document.getElementById('tags');
    // var a = dropdown.getElementsByClassName('a');
    let html = "";
    for (var i = 0; i < allTags.length; i ++){
        html += `<li class="menu-item">
                    <a href="#">${allTags[i]}</a>
                </li>`;
        
    }
    tags.innerHTML = html;
    var a = tags.getElementsByTagName("a");
    for (var j = 0; j < a.length; j++){
        (function (index){
            a[index].addEventListener('click', () => {
                
                vendorTags.add(a[index].innerText || a[index].textContent);
                displayVendorTags();
                if (vendorTags.size == 3 ){
                    document.getElementById('add-tag-button').style.visibility = "hidden";
                }
            })
        })(j);
    }
}
