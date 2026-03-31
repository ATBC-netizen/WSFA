window.addEventListener('load', start)
var vehicleSearchForm = document.forms.vehicleSearchForm
var vehicles = getVehicles();
var resultsContainer = document.getElementById('display-results')

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
            option.value = item;
            option.innerText = item;
            dropdownContainer.appendChild(option);
        });
    })
}

function handleVehicleSearch(e) {
    e.preventDefault();

    vehicles.then(function (vhcs) {
        searchAndDisplayResults(vhcs);
    });
}

function filterBy(data, searchString, prop) {
    return data.filter(function (item) {
        if (searchString === "") return true;

        if (typeof(item[prop]) === "boolean") {
            return item[prop] === searchString;
        }

        if (typeof(item[prop]) === "string") {
            return item[prop].toLowerCase() === searchString.toLowerCase();
        }
        return false;
    });
}

function searchAndDisplay(vhcs) {
    var chosenMake = vehicleSearchForm.makeFilter.value
    var chosenModel = vehicleSearchForm.modelFilter.value
    var chosenTransmission = vehicleSearchForm.transmissionFilter.value
    var chosenFuelType = vehicleSearchForm.fuelTypeFilter.value

    var vehiclesFound = filterBy(vhcs, chosenMake, "make")
    vehiclesFound = filterBy(vhcs, chosenModel, "model")
    vehiclesFound = filterBy(vhcs, chosenTransmission, "transmission")
    vehiclesFound = filterBy(vhcs, chosenFuelType, "fuelType")
    
    var minYear = Number(document.getElementById('minYear').value) || 0
    var maxYear = Number(document.getElementById('maxYear').value) || Infinity
    vehiclesFound = vehiclesFound.filter(function (item) {
        return item.rrp >= minYear && item.rrp <= maxYear
    })

    var minPrice = Number(document.getElementById('minPrice').value) || 0
    var maxPrice = Number(document.getElementById('maxPrice').value) || Infinity
    vehiclesFound = vehiclesFound.filter(function (item) {
        return item.rrp >= minPrice && item.rrp <= maxPrice
    })

    var minMileage = Number(document.getElementById('minMileage').value) || 0
    var maxMileage = Number(document.getElementById('maxMileage').value) || Infinity
    vehiclesFound = vehiclesFound.filter(function (item) {
        return item.rrp >= minMileage && item.rrp <= maxMileage
    })

    var minMPG = Number(document.getElementById('minMPG').value) || 0
    var maxMPG = Number(document.getElementById('maxMPG').value) || Infinity
    vehiclesFound = vehiclesFound.filter(function (item) {
        return item.rrp >= minMPG && item.rrp <= maxMPG
    })
    var minTax = Number(document.getElementById('minTax').value) || Infinity
    var maxTax = Number(document.getElementById('maxTax').value) || Infinity
    vehiclesFound = vehiclesFound.filter(function (item) {
        return item.rrp >= minTax && item.rrp <= maxTax
    })
    var minEngineSize = Number(document.getElementById('minEngineSize').value) || Infinity
    var maxEngineSize = Number(document.getElementById('maxEngineSize').value) || Infinity
    vehiclesFound = vehiclesFound.filter(function (item) {
        return item.rrp >= minEngineSize && item.rrp <= maxEngineSize
    })

    console.log(vehiclesFound)
}

function start() {
    createDropdown(vehicles, "make")
    createDropdown(vehicles, "model")
    createDropdown(vehicles, "transmission")
    createDropdown(vehicles, "fuelType")
    vehicleSearchForm.addEventListener('submit', handleVehicleSearch)
}


// Things to think about: //
// Add a reset button to clear the search criteria and results? // 
// Fix Search Box //


// Make the following into a recall-able function
    // vehiclesFound = vehiclesFound.filter(function (item) {
    //     return item.rrp >= minYear && item.rrp <= maxYear
    // })

// can do the same for each individual function in the search and display funct