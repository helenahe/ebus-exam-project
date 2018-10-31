class Product {
    constructor(pid, pname, pcategory, pdestination, pduration, pprice) {
        this.pid = pid;
        this.pname = pname; 
        this.pcategory = pcategory;
        this.pdestination = pdestination;
        this.pduration = pduration;
        this.pprice = pprice;
    }
}

//create empty product array
var products = [];
// filling product array
products.push(new Product("1","Bella Italia","Backpacking","Italy","10","100"));
products.push(new Product("2", "Party in Paris", "City Trip", "France", "3", "200"));


// display products ---- NOT WORKING 
var listproducts = document.getElementById('listproducts');

console.log(products);

document.getElementById('listproducts').innerHTML = products;

var rows = products; // source: https://stackoverflow.com/questions/44127872/convert-array-of-objects-into-html-table-with-jquery-or-javascript
 var html = '<table>';
 html += '<tr>';
 for( var j in rows[0] ) {
  html += '<th>' + j + '</th>';
 }
 html += '</tr>';
 for( var i = 0; i < rows.length; i++) {
  html += '<tr>';
  for( var j in rows[i] ) {
    html += '<td>' + rows[i][j] + '</td>';
  }
 }
 html += '</table>';
 document.getElementById('listproducts').innerHTML = html;
// TO DO: figure out how to display array in HTML