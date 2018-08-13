var mysql = require("mysql")
var inquirer = require("inquirer")
var cart = [""];
var units = [""];
var total = 0;
var connection = mysql.createConnection({
  host: "",

  // Your port if not 3306
  port: ,

  // Your username
  user: "",

  // Your password
  password: "",
  database: ""
})
/*function AddToCart(item, amount){
      cart.push(item)
      units.push(amount)
      total+=total.push(parseFloat(amount) * data[i].price)
      continueShopping()
  
}

function goToCart() {
  console.log("------------------------------------\nHere is your cart: " + cart[i] + " amount:" + units[i] + "\n-------------------------------\n0HAVE A NICE DAY")
}
function continueShopping() {
  inquirer.prompt([
    {
      name: "continue",
      message: "Would you like to continue shopping?y/n"
    }.then(function (shopping) {
      if (shopping.continue === "y" || shopping.continue === "yes") {
        interface()
      } else { goToCart() }
    })
  ])
}*/


connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId)
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err
    console.log(res)
    inquirer.prompt([
      {
        name: "item",
        message: "Type the id # of the item you would like to buy"
      }, {
        name: "amount",
        message: "How many units would you like?"
      }
    ]).then(function (answers) {
      console.log("-------------------\ninquiry success\n-------------------\n\n")
      var item=parseInt(answers.item)
      var amount=parseInt(answers.amount)
      console.log("----------------\n"+item+"\n"+amount+"\n-----------------\n\n")
      connection.query("SELECT * FROM products WHERE item_id=?", item, function(err, res){
        if (err) throw err
        //console.log(res)
        //console.log(res[0].product_name)
        
        console.log("-------------------\n connection success\n-------------------\n\n"+res[0].item_id+"\n"+res[0].product_name+"\n$"+res[0].price+"\n-------------\n\n")
        if(res[0].stock_quantity>amount){
          cart.push(res[0].product_name)
          units.push(amount)
          total+=parseFloat(amount)*parseFloat(res[0].price)
          console.log("\nCart: "+cart+"\n Total: $"+total+"\n---------------\n\n")

        }else{
          console.log("OUT OF STOCK")
        }
      })
      connection.end()
    })
  })
}) 