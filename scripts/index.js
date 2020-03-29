// DOM elements
const VendorList = document.querySelector('.guides');

// setup vendors
const setupVendors = (data) => {

  let html = '';
  data.forEach(doc => {
    const vendor = doc.data();
    const li = `
      <li>
        <div class="collapsible-header grey darken-1"> ${vendor.name} </div>
        <div class="collapsible-body white"> ${vendor.city} </div>
      </li>
    `;
    html += li;
  });
  VendorList.innerHTML = html;

};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});