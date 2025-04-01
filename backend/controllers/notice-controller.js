const Notice = require('../models/noticeSchema.js');

// Create a new notice
const noticeCreate = async (req, res) => {
    try {
        // Create a new notice instance with the data from the request body
        const notice = new Notice({
            ...req.body,
            school: req.body.adminID
        })
        // Save the new notice to the database
        const result = await notice.save()
        // Send the saved notice as a response
        res.send(result)

    } catch (err) {
        // If there is an error, send a 500 status code with the error details
        res.status(500).json(err);
    }
};

// Get all notices of a specific school
const noticeList = async (req, res) => {

    try {
        // Find all notices in the database that belong to the school specified by the id in the request parameters
        let notices = await Notice.find({ school: req.params.id })
        // If there are notices found
        if (notices.length > 0) {
            // Send the list of notices as a response
            res.send(notices)
        } 
        // If no notices are found
        else {
            // Send a message indicating that no notices were found
            res.send({ message: "No notices found" });
        }
    } 
    catch (err) {
        // If there is an error, send a 500 status code with the error details
        res.status(500).json(err);
    }
};

// Update a specific notice
const updateNotice = async (req, res) => {
    try {
        // Find the notice by ID and update it with the data from the request body
        const result = await Notice.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })
        // Send the updated notice as a response
        res.send(result)
    } catch (error) {
        // If there is an error, send a 500 status code with the error details
        res.status(500).json(error);
    }
}

// Delete a specific notice
const deleteNotice = async (req, res) => {

    try {
        // Find the notice by ID and delete it
        const result = await Notice.findByIdAndDelete(req.params.id)
        // Send the deleted notice as a response
        res.send(result)
    } 
    catch (error) {
        // If there is an error, send a 500 status code with the error details
        res.status(500).json(err);
    }
}

// Delete all notices of a specific school
const deleteNotices = async (req, res) => {
    try {
        // Delete all notices that belong to the school specified by the id in the request parameters
        const result = await Notice.deleteMany({ school: req.params.id })
        // If no notices are found to delete
        if (result.deletedCount === 0) {
            // Send a message indicating that no notices were found to delete
            res.send({ message: "No notices found to delete" })
        } else {
            // Send the result of the deletion operation as a response
            res.send(result)
        }
    } catch (error) {
        res.status(500).json(err);
    }
}

module.exports = { noticeCreate, noticeList, updateNotice, deleteNotice, deleteNotices };
