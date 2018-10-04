const express = require('express');
const Joi = require('joi');
const app = express();

//db connect string
var connect = "postgres://postgres:dimuthu7%24@localhost/demodb";
console.log(connect);

app.use(express.json());

const customers = [{
        id: 1,
        name: "Dimuthu"
    },
    {
        id: 2,
        name: "Nilesh"
    },
    {
        id: 3,
        name: "Ridmi"
    },
    {
        id: 4,
        name: "Kemila"
    },
    {
        id: 5,
        name: "Hehecdc"
    },


];

//this is a route -it has a path specifier and a callback function
app.get('/', (req, res) => {
    res.send("Hi, this is a HTTP get request!");
});
app.get('/api/customers', (req, res) => {
    res.send(customers);
});

app.put('/api/customer/:id', (req, res) => {
    //Look up the course
    let customer = customers.find(c => c.id === parseInt(req.params.id));
    //if not existing, return 404
    if (!customer) {
        return res.status(404).send("The ID did not match any customers.");
    }
    //validate
    let schema = {
        name: Joi.string().required().min(1)
    }
    //If invalid, return 400 - Bad request
    let result = Joi.validate(req.body, schema);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message)

    }
    //Update course
    customer.name = req.body.name;
    //Return the updated course
    res.send(customer);
});

app.post('/api/customers', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    let result = Joi.validate(req.body, schema);
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    let customer = {
        id: customers.length + 1,
        name: req.body.name
    };
    customers.push(customer);
    res.send(customer);
});

app.get('/api/customer/:id', (req, res) => {
    // res.send(req.query);
    let customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) {
        return res.status(404).send("The ID did not match any customers.");
    }
    res.send(customer);
});

app.delete('/api/customer/:id',(req,res)=>{
    let customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send("The ID did not match any customers.");


    let customerIndex = customers.indexOf(customer);
    customers.splice(customerIndex, 1);

    res.send(customers);
    //Delete
    //return customers

});

app.get('/api/customers/:id/:name', (req, res) => {
    // res.send(req.query);
    //res.send(req.params.id);
    //res.send(req.params);
});
// app.post();
// app.put();
// app.delete();


//app.listen(3000,() => {console.log("Listning on port 3000..")});
//setting the port dynamically
const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`Listing to port ${port}..b`)
});