const express = require('express')
const mongoose = require('mongoose')
const Property = require('./models/propertyModel')
const Tenant = require('./models/tenantModel')
const app = express()

app.use(express.json())
// to use form URL encoded
app.use(express.urlencoded({extended: false}))

// Define the /properties POST endpoint
app.post('/properties', async(req, res)=>{
    try {
        const property = await Property.create(req.body)
        res.status(201).json({message: `Property added successfully`, property});
    } catch (error) {
        res.status(400).json({message: `Bad request`})
    }
})

// Endpoint for editing an existing property
app.put('/properties/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const property = await Property.findByIdAndUpdate(id, req.body);
        // if we cannot find any property in database
        if(!property){
            return res.status(404).json({message: `Cannot find any property with ID ${id}`})
        }
        res.status(200).json({message: `Property edited successfully`, property});
    } catch (error) {
        res.status(400).json({message: `Bad request`})
    }
})

// Delete a property from the portfolio
app.delete('/properties/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const property = await Property.findByIdAndDelete(id);
        if(!property){
            return res.status(404).json({message:`Property not found`})
        }
        res.status(200).json({message:`Property deleted successfully`})
    } catch (error) {
        res.status(400).json({message: `Bad request`})
    }
})

// get property by ID
app.get('/properties/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const property = await Property.findById(id);
        // if we cannot find any property in database
        if(!property){
            return res.status(404).json({message: `Cannot find any property with ID ${id}`})
        }
        res.status(200).json(property);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// get all properties
app.get('/properties', async(req, res)=>{
    try {
        const properties = await Property.find({});
        res.status(200).json(properties);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// add tenant
app.post('/tenants', async(req, res)=>{
    try {
        const tenant = await Tenant.create(req.body)
        res.status(201).json(tenant);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({message: error.message})
    }
})

// Endpoint for editing an existing property
app.put('/tenants/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const tenant = await Tenant.findByIdAndUpdate(id, req.body);
        // if we cannot find any property in database
        if(!tenant){
            return res.status(404).json({message: `Cannot find any tenant with ID ${id}`})
        }
        res.status(200).json({message: `Tenant edited successfully`, tenant});
    } catch (error) {
        res.status(400).json({message: `Bad request`})
    }
})

// Delete a property from the portfolio
app.delete('/tenants/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const tenant = await Tenant.findByIdAndDelete(id);
        if(!tenant){
            return res.status(404).json({message:`Cannot find any tenant with ID ${id}`})
        }
        res.status(200).json({message:`Tenant deleted successfully`})
    } catch (error) {
        res.status(400).json({message: `Bad request`})
    }
})

// get all tenants
app.get('/tenants', async(req, res)=>{
    try {
        const tenants = await Tenant.find({});
        res.status(200).json(tenants);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// get tenant by ID
app.get('/tenants/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const tenant = await Tenant.findById(id);
        res.status(200).json(tenant);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


// Assign a tenant to a property
app.put('/tenants/:tenantId/properties/:propertyId', async(req, res)=>{
    try {
        const {tenantId} = req.params;
        const {propertyId} = req.params;
        const tenant = await Tenant.findByIdAndUpdate(tenantId, req.body);
        const property = await Tenant.findByIdAndUpdate(propertyId, req.body);
        // if we cannot find any property in database
        if(!tenant && !property){
            return res.status(404).json({message: `Cannot find any tenant with ID ${tenantId} and property with ID ${propertyId}`})
        }
        res.status(200).json({message: `Tenant assigned successfully`, tenant, property});
    } catch (error) {
        res.status(400).json({message: `Bad request`})
    }
})




mongoose.
connect('mongodb+srv://admin:123admin@estateapi.d9uc0or.mongodb.net/Estate-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to MongoDB')
    // Start the server
    app.listen(3000, ()=>{
        console.log('Node API is running on port 3000')
    })
}).catch((error)=>{
    console.log(error)
})