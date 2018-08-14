var mysql = require("mysql")
var inquirer = require("inquirer")
var cart = [""];
var units = [""];
var total = 0;
var connection = mysql.createConnection({
  host: "localhost",

  // Your port if not 3306
  port: 3306,

  // Your username
  user: "",

  // Your password
  password: "",
  database: "bamazon_db"
})

function interface(){
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
      
      console.log("-------------------\n connection success\n-------------------\n\nID: "+res[0].item_id+"\nName: "+res[0].product_name+"\n$"+res[0].price+"\n-------------\n\n")
      if(res[0].stock_quantity>amount){
        var newStock=res[0].stock_quantity - amount
        console.log("new stock quantity: "+newStock)
        cart.push(res[0].product_name)
        units.push(amount)
        total+=parseFloat(amount)*parseFloat(res[0].price)
        console.log("\nCart: "+cart+"\n Total: $"+total+"\n---------------\n\n")
        connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", newStock, item, function(err, res){
          if (err) throw err
          console.log("-------------\n"+res+"\n-----------------\n")
        })
      }else{
        console.log("OUT OF STOCK")
      }
    })
  })
}

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId)
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err
    console.log(res)
      interface()
    })
  })

