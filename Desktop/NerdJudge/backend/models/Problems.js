// models/Problem.js

const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    testCases: [
        {
            input: { type: String, required: true },
            output: { type: String, required: true }
        }
    ],
    tags: [
        {
            type: String
        }
    ],
    issolved:
        {
            type: Number,default:0
        }
    
});

module.exports = mongoose.model('Problem', problemSchema);
