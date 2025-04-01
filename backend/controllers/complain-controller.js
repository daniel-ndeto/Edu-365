const Complain = require('../models/complainSchema.js');

// Create a new complain
const complainCreate = async (req, res) => {

    try {
        // Create a new complain instance with the data from the request body
        const complain = new Complain(req.body)
        // Save the new complain to the database
        const result = await complain.save()
        // Send the saved complain as a response
        res.send(result)
    } catch (err) {
        // If there is an error, send a 500 status code with the error details
        res.status(500).json(err);
    }
};

// Get all complains of a specific school
const complainList = async (req, res) => {

    try {
        // Find all complains in the database that belong to the school specified by the id in the request parameters
        // Populate the 'user' field with the 'name' of the user who created the complain
        let complains = await Complain.find({ school: req.params.id }).populate("user", "name");
        
        // If there are complains found
        if (complains.length > 0) {
            // Send the list of complains as a response
            res.send(complains)
        } 
        
        // If no complains are found
        else {
            // Send a message indicating that no complains were found
            res.send({ message: "No complains found" });
        }
    } 
    
    catch (err) {
        // If there is an error, send a 500 status code with the error details
        res.status(500).json(err);
    }
};

module.exports = { complainCreate, complainList };
