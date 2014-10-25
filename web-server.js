var express = require("express"),
    app = express(),
    port = parseInt(process.env.PORT, 10) || 3000;

app.configure(function () {
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/app'));
    app.use(app.router);
});

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
        'instructions': '1.  Cook 1 pound of ground beef.  2. Drain and add taco seasoning.  3. Simmer to boil for 20 minutes.  4.  spoon out onto tortillas',
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
