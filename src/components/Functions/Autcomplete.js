// Autocomplete function using datalist
export function InitializeAutocomplete(inp, arr) {

  // Create a datalist element
  var dataList = document.createElement("datalist");
  dataList.id = inp.id + "autocomplete-datalist";
  document.body.appendChild(dataList);

  // Add options to the datalist
  arr.forEach(function (option) {
    var optionElement = document.createElement("option");
    optionElement.value = option;
    dataList.appendChild(optionElement);
  });

  // Set the datalist attribute on the input
  inp.setAttribute("list", dataList.id);  
  inp.addEventListener("input", function (e) {
    var val = this.value.trim().toLowerCase();

    // Filter options based on the input value
    var filteredOptions = arr.filter(function (option) {
      return option.toLowerCase().includes(val);
    });
    // Remove existing options from datalist
    dataList.innerHTML = "";
    // Add filtered options to datalist
    filteredOptions.forEach(function (option) {
      var optionElement = document.createElement("option");
      optionElement.value = option;
      dataList.appendChild(optionElement);
    });
  });
}

// Add options to the datalist for the autocomplete function to use
export const autocompleteArray = ["if", "do", "repeat", "while", "for", "else", "function"];