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

console.log(products);

