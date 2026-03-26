window.addEventListener('load', start)
var vehicleSearchForm = document.forms.vehicleSearchForm
var vehicles = getVehicles();

function getVehicles() {
    return fetch("vehicleStorage.json")
    .then(function (data) {
        return data.json();
    })
}

function createDropdown(vehicleData, fieldID) {
    vehicleData.then(function (allVehicles) {
        var data = allVehicles.map(function (item) {
            return item[fieldID];
        });
        data = new Set(data);

        var dropdownContainer = document.getElementById(fieldID + 'Filter')
        data.forEach(function (item) {
            var option = document.createElement('option');
            option.value = item.toLowerCase();
            option.innerText = item;
            dropdownContainer.appendChild(option);
        });
    })
}

function start() {
    createDropdown(vehicles, "make")
    createDropdown(vehicles, "model")
    createDropdown(vehicles, "transmission")
    createDropdown(vehicles, "mileage")
    createDropdown(vehicles, "fuelType")
    createDropdown(vehicles, "tax")
    createDropdown(vehicles, "mpg")
    createDropdown(vehicles, "engineSize")
    vehicleSearchForm.addEventListener('submit', handleVehicleSearch)
}