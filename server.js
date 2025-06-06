const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/prayers', (req, res) => {
    fs.readFile('prayers.json', (err, data) => {
        if (err) return res.status(500).send('Error reading prayers.');
        res.json(JSON.parse(data));
    });
});

app.post('/prayers', (req, res) => {
    const newPrayer = req.body;
    fs.readFile('prayers.json', (err, data) => {
        if (err) return res.status(500).send('Error reading prayers.');
        const prayers = JSON.parse(data);
        prayers.push(newPrayer);
        fs.writeFile('prayers.json', JSON.stringify(prayers, null, 2), err => {
            if (err) return res.status(500).send('Error saving prayer.');
            res.status(201).send('Prayer saved.');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
