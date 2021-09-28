var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var alert = document.getElementsByClassName("error");
var siteContainer;

if (localStorage.getItem("siteList") != null) {
    siteContainer = JSON.parse(localStorage.getItem("siteList"));
    displaySites();
}
else {
    siteContainer = [];
}

function addSite() {

    if (validationInput()) {
        if (!checkSiteName(siteNameInput.value) && !checkSiteURL(siteURLInput.value)) {
            showNameError("Name and URL already exist");
        }
        else {
            hideAlerts();
            var site = {
                name: siteNameInput.value,
                url: siteURLInput.value,
            }
            siteContainer.push(site);
            localStorage.setItem("siteList", JSON.stringify(siteContainer));
            displaySites();
            clearData();
        }
    }
}

function clearData() {
    siteNameInput.value = "";
    siteURLInput.value = "";
}
function hideAlerts() {
    for (var i = 0; i < alert.length; i++)
        alert[i].style.display = "none";
}

function displaySites() {
    var cartona = '';
    for (var i = 0; i < siteContainer.length; i++) {
        cartona += `
        <div class="display">
        <h4 class="p-5  d-inline-flex">${siteContainer[i].name}</h4>
        <button class=" btn bg-primary  m-5 "> <a class="text-white text-decoration-none " target="_blank" href="${siteContainer[i].url}">Visit</a></button> 
        <button class=" btn bg-danger   m-5" onclick="deleteSite(${i})">Delete</button>
       </div>`


    }
    document.getElementById("displayBody").innerHTML = cartona;

}

function validationInput() {

    if (siteNameInput.value == "" || siteNameInput.value == null) {
        showNameError("Name is required");

    }
    if (siteURLInput.value == "" || siteURLInput.value == null) {
        showURLError("URL is required");
    }
    else {
        return true;
    }

}

function deleteSite(index) {
    siteContainer.splice(index, 1);
    displaySites();
}


function checkSiteName(name) {
    if (name == null || name == "") {
        return false;
    }

    for (var i = 0; i < siteContainer.length; i++) {
        if (siteContainer[i].name === name)
            return false;
    }
    return true;
}

function checkSiteURL(url) {
    if (url == null || url == "") {
        return false;
    }
    for (var i = 0; i < siteContainer.length; i++) {
        if (siteContainer[i].url === url)
            return false;
    }
    return true;
}

function showNameError(message) {
    var nameError = document.getElementById('nameError');
    nameError.innerHTML = message;
    nameError.style.display = 'block';
}

function showURLError(message) {
    var urlError = document.getElementById('urlError');
    urlError.innerHTML = message;
    urlError.style.display = 'block';

}
