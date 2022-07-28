let Product = function (name, price) {
    this.name = name
    this.price = price
}
Product.prototype.toString = function() {
    return `toString: Name: ${this.name}, Price: ${this.price}`
}
let TaxedProduct = function (name, price, taxRate) {
    Product.call(this, name, price)
    this.taxRate = taxRate
    this.getPriceIncTax = function() {
        return Number(this.price) * this.taxRate
    }
    this.toTaxString = function() {
        return `${this.toString()}, Tax: ${this.getPriceIncTax()}`
    }
}
//TaxedProduct.prototype.toString = function() {
//    return Product.prototype.toString.call(this)
    //return `haha jack`
//}
Object.setPrototypeOf(TaxedProduct.prototype, Product.prototype)
//Object.setPrototypeOf(TaxedProduct, Product)
//let taxproto = Object.getPrototypeOf(TaxedProduct)
//let prodproto = Object.getPrototypeOf(Product)
//console.log(`TaxedProduct.prototype = Product.prototype ? ${taxproto === Product.prototype}`)
/*
console.log('TaxedProduct.prototype = ' + TaxedProduct.prototype)
console.log('Product.prototype = ' + Product.prototype)

Object.setPrototypeOf(TaxedProduct, Product)

console.log('TaxedProduct.prototype = ' + TaxedProduct.prototype)
console.log('Product.prototype = ' + Product.prototype)
*/
let hat = new TaxedProduct('hat1', 900, 1.2)
let boots = new Product('boots', 1000)
console.log(` ${Object.getPrototypeOf(hat) === TaxedProduct.prototype}`)
console.log(hat.toTaxString())
//console.log(hat.toString())
//console.log(boots.toString())