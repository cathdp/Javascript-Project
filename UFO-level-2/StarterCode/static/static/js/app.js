// from data.js
//var tableData = data;
var tableData = data;
var filteredData = tableData;
//extract filters from data
const states = data.map( (r) => r.state)
const cities = data.map((r) =>  r.city);
const countries = data.map((r) => r.country);
const shapes = data.map((r) => r.shape);
console.log("states", states);
console.log("cities", cities);
console.log("countries", countries);
console.log("shapes", shapes);
//assign input filters  to variables
var $cityFilter = document.getElementById("cityFilter"); // Filter by Cyty Dropdown
var $countryFilter = document.getElementById("countryFilter"); // Filter by country Dropdown
var $stateFilter = document.getElementById("stateFilter"); // Filter by state Dropdown
var $shapeFilter = document.getElementById("shapeFilter"); // Filter by shape Dropdown
var $applyFilter = document.getElementById("applyFilter"); // Filter Button
//Initialize Filters
var selectedCountry = "-";
var selectedState  = "-";
var selectedCity =  "-";
var selectedShape =  "-";
//load functions to load data in input filters
var loadFilterCityData = function () {
    const unique = new Set(cities);
    console.log(unique); // Select distinct records
    for (var it = unique.values(), val= null; val=it.next().value; ) {
        var option = document.createElement("option");
        option.text = val;
        option.value = val;
        $cityFilter.add(option);
        console.log(val);
    }
};
var loadFilterStateData = function () {
    const unique = new Set(states);
    console.log(unique); // Select distinct records
    for (var it = unique.values(), val= null; val=it.next().value; ) {
        var option = document.createElement("option");
        option.text = val;
        option.value = val;
        $stateFilter.add(option);
        console.log(val);
    }
};
var loadFilterCountryData = function () {
    const unique = new Set(countries);
    console.log(unique); // Select distinct records
    for (var it = unique.values(), val= null; val=it.next().value; ) {
        var option = document.createElement("option");
        option.text = val;
        option.value = val;
        $countryFilter.add(option);
        console.log(val);
    }
};
var loadFilterShapeData = function () {
    const unique = new Set(shapes);
    console.log(unique); // Select distinct records
    for (var it = unique.values(), val= null; val=it.next().value; ) {
        var option = document.createElement("option");
        option.text = val;
        option.value = val;
        $shapeFilter.add(option);
        console.log(val);
    }
};
var getFilter = function () {
  //Get values from  filters
  selectedCountry = $countryFilter.value;
  selectedState = $stateFilter.value;
  selectedCity = $cityFilter.value;
  selectedShape = $shapeFilter.value;
  return {
    country: selectedCountry,
    state: selectedState,
    city: selectedCity,
    shape: selectedShape,
  };
};
//Bind click evenbt toapply filter button
$applyFilter.addEventListener('click', function() { 
filteredData= getFiteredData(); //Get the filtered Data
console.log('filtered',filteredData);
deleteTbody();
tableDisplay(filteredData);
}, false);
var getFiteredData= function(){
    var f= getFilter();
    var filtered = data;//.filter(r => r.datetime === dateInput);
    //Apply Filter or  include all records?
    if(f.city!="-1")  filtered = filtered.filter(r => r.city === f.city);
    if(f.country!="-1")  filtered = filtered.filter(r => r.country === f.country);
    if(f.state!="-1")  filtered = filtered.filter(r => r.state === f.state);
    if(f.shape!="-1")  filtered = filtered.filter(r => r.shape === f.shape);
    return filtered;
}
// from data.js
//console.log(tableData)
// YOUR CODE HERE!
//function to display UFO sightings
function tableDisplay(uforeport) {
  var tbody = d3.select("tbody");
  uforeport.forEach((ufofile) => {
    var row = tbody.append("tr");
    Object.entries(ufofile).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.html(value);
    });
  });
}
// clear the table for new data
function deleteTbody() {
  d3.select("tbody").selectAll("tr").remove().selectAll("td").remove();
}
// initial display of all UFO sightings
//console.log(tableData);
tableDisplay(tableData);
// 'Filter Table' button
var button = d3.select("#filter-btn");
// filter the database and display
button.on("click", function (event) {
  d3.event.preventDefault();
  deleteTbody();
  var dateInput = d3.select("#datetime").property("value");
  if (dateInput.trim() === "") {
    // display the whole database if the date field has no date
  } else {
    // otherwise, display the filtered dataset
    var filteredData = tableData.filter(
      (uforeport) => uforeport.datetime === dateInput.trim()
    );
  }
  // display message if no records found
  if (filteredData.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
      .attr("colspan", 7)
      .html("<h4>No Records Found</h4>");
  }
  // console.log(filteredData);
  tableDisplay(filteredData);
});
loadFilterCityData();
loadFilterCountryData();
loadFilterStateData();
loadFilterShapeData();
// YOUR CODE HERE!
