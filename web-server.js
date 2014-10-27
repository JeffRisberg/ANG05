// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var port = process.env.PORT || 3000; // set our port

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

var recipes_map = {
    '1': {
        "id": "1",
        "title": "Cookies",
        "description": "Delicious, crisp on the outside, chewy on the outside, oozing with chocolatey goodness cookies. The best kind",
        "ingredients": [
            {
                "amount": "1",
                "amountUnits": "packet",
                "ingredientName": "Chips Ahoy"
            }
        ],
        "instructions": "1. Go buy a packet of Chips Ahoy\n2. Heat it up in an oven\n3. Enjoy warm cookies\n4. Learn how to bake cookies from somewhere else"
    },
    '2': {
        id: 2,
        'title': 'Tacos',
        'description': 'Warm beef tacos',
        'instructions': '1. Cook 1 pound of ground beef.\n2. Drain and add taco seasoning.\n3. Simmer to boil for 20 minutes.\n4. Spoon out onto tortillas',
        ingredients: [
            {amount: 1, amountUnits: 'pounds', ingredientName: 'Ground beef'},
            {amount: 1, amountUnits: 'pouch', ingredientName: 'Seasoning'},
            {amount: 12, amountUnits: 'units', ingredientName: 'Tortilla shells'},
            {amount: 8, amountUnits: 'ounces', ingredientName: 'Cheese and tomates'}

        ]
    }
};
var next_id = 3;

app.get('/recipes', function (req, res) {
    var recipes = [];

    for (var key in recipes_map) {
        recipes.push(recipes_map[key]);
    }

    // Simulate delay in server
    setTimeout(function () {
        res.send(recipes);
    }, 500);
});

app.get('/recipes/:id', function (req, res) {
    res.send(recipes_map[req.params.id]);
});

app.post('/recipes', function (req, res) {
    var recipe = {};
    recipe.id = next_id++;
    recipe.title = req.body.title;
    recipe.description = req.body.description;
    recipe.ingredients = req.body.ingredients;
    recipe.instructions = req.body.instructions;

    recipes_map[recipe.id] = recipe;

    res.send(recipe);
});

app.post('/recipes/:id', function (req, res) {
    var recipe = {};
    recipe.id = req.params.id;
    recipe.title = req.body.title;
    recipe.description = req.body.description;
    recipe.ingredients = req.body.ingredients;
    recipe.instructions = req.body.instructions;

    recipes_map[recipe.id] = recipe;

    res.send(recipe);
});

app.listen(port);
console.log('Now serving the app at http://localhost:' + port + '/');
exports = module.exports = app; 						// expose app