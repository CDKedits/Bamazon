const { prompt } = require(`inquirer`)
const { createConnection } = require(`mysql2`)

const db = createConnection({
  host: `localhost`,
  port: 3306,
  user: `root`,
  password: `Conn4726!fort`,
  database: `bamazon`
})

async function getProducts(columns) {
  let response = await new Promise((resolve, reject) => {
    db.query(`SELECT ${columns} FROM products`, (e, r) => {
      if (e) {
        reject(e)
      } else {
        resolve(r)
      }
    })
  })
  return response
}

const userAction = _ => {
  getProducts(`product_name`)
    .then(r => {
      prompt({
        type: `list`,
        name: `selection`,
        message: `What product would you like to buy?`,
        choices: r.map(({ product_name }) => product_name)
      })
        .then(product_name => {
          db.query(`SELECT * FROM products WHERE product_name = ?`, product_name.selection, (e, r) => {
            if (e) { console.log(e) }
            let userSelection = r[0]
            let { product_name, department_name, price, stock_quantity } = userSelection
            console.log(`
            Product: ${product_name}
            Price: ${price}
            Department: ${department_name}
            `)
            prompt({
              type: `number`,
              name: `quantity`,
              message: `How many of these would you like to buy?`,
            })
              .then(({ quantity }) => {
                console.log(product_name)
                prompt({
                  type: `confirm`,
                  name: `confirmation`,
                  message: `Are you sure you want to buy ${quantity} ${product_name}?`
                })
                  .then(r => {
                    db.query(`SELECT stock_quantity FROM products WHERE product_name = ?`, product_name, (e, stockqnty) => {
                      
                      if ()
                    })
                  })
              })
          })
        })
        .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
}

db.connect(e => e ? console.log(e) : userAction())