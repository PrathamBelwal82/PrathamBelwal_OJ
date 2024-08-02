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
    correctlySolved: [
        {
            type: String,
            ref: 'User'
        }
    ],
    incorrectlySolved: [
        {
            type: String,
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model('Problem', problemSchema);
