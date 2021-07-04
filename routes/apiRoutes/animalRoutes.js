const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } =  require('../../lib/animals');
const { animals } = require('../../data/animals');

router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// app.get retrieves information from the server
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }    
});

// app.post allows the user to post information to the server
router.post('/animals', (req, res) => {
    // Set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // If any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        // Add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);

        // req.body is where our incoming content will be
        console.log(req.body);
        res.json(req.body);
    }
});

module.exports = router;