const vendorList = document.querySelector('#Vendor-list');
//create render and element
function renderVendor(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let location = document.createElement('span');
    let job = document.createElement('span');


    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    location.textContent = doc.data().location;
    job.textContent = doc.data().job;

    li.appendChild(name);
    li.appendChild(location);
    li.appendChild(job);

    vendorList.appendChild(li);
}



db.collection('Vendor').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderVendor(doc);
    });
    
})