const express = require('express');
const router = express.Router();
const pdf = require('html-pdf');
const pdfTemplate = require('../../document/index.js');

router.post('/', (req, res) => {
    const [boardMembers, filteredActivity, getCards, boardDescription, listsOfBoard, boardTitle, boardDeadline] = req.body
    pdf.create(pdfTemplate(boardMembers, filteredActivity, getCards, boardDescription, listsOfBoard, boardTitle, boardDeadline), {}).toFile('routes/api/result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});


router.get('/fetch-pdf', (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`)
})

module.exports = router;
