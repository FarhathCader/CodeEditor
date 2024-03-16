const mongoose = require('mongoose')
const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    category : {
        type : String,
        required: true
    },
    description: {
        type: String,
    },
    initialCode : {
        type : String
    },
    //testcases has input and expected output
    testCases: {
        type: [
            [String] // Define each test case as an array of strings
        ],
        default: []
    },
    //grade
    grade : {
        type : Number
    },
    //programming language
    programmingLanguage : {
        type : String
    },
    

    })

module.exports = mongoose.model('Problem',problemSchema)