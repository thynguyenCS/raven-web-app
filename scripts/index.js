// DOM elements
//need to change guides to vendors
const VendorList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if (user) {
    // account info
    const html = `
      <div>Logged in as ${user.email}</div>
    `;
    accountDetails.innerHTML = html;
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup vendors
const setupVendors = (data) => {

  if (data.length) {
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
  } else {
    VendorList.innerHTML = '<h5 class="center-align">Login to view vendors</h5>';
  }

};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});