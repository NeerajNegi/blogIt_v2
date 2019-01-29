const express = require('express');
const router = express.Router();

//importing Suggestion Schema
const Suggestion = require('../models/suggestion');

//get all suggestions
router.get('/', (req, res) => {
    Suggestion.find((err, suggestions) => {
        if(err) {
            res.status(400).send({
                message: 'Error getting suggestions'
            });
        } else {
            res.status(200).send({
                message: 'Suggestions received',
                suggestions
            });
        }
    });
});

//post suggestion
router.post('/', (req, res) => {
    let newSug = new Suggestion();

    newSug.title = req.body.title;
    newSug.content = req.body.content;

    newSug.save((err) => {
        if(err) {
            res.status(400).send({
                message: 'Failed to add suggestion.'
            })
        } else {
            res.status(200).send({
                message: 'Suggestion added'
            });
        }
    });
});

module.exports = router;
