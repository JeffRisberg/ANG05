'use strict';

app.controller('ListCtrl', ['$scope', '$state', 'recipes', function ($scope, $state, recipes) {
    $scope.recipes = recipes;
}]);


app.controller('ShowCtrl', ['$scope', '$state', '$q', 'Recipe', function ($scope, $state, $q, Recipe) {
    var delay = $q.defer();

    var recipeId = parseInt($state.params.recipeId);

    $scope.recipe = Recipe.get({id: recipeId}, function (recipe) {
        delay.resolve(recipe);
    }, function () {
        delay.reject('Unable to fetch recipe ' + recipeId);
    });

    $scope.edit = function () {
        $state.go('recipe.edit', {recipeId: recipe.id});
    };
}]);

app.controller('EditCtrl', ['$scope', '$state', '$q', 'Recipe', function ($scope, $state, $q, Recipe) {
    var delay = $q.defer();

    var recipeId = parseInt($state.params.recipeId);

    $scope.recipe = Recipe.get({id: recipeId}, function (recipe) {
        delay.resolve(recipe);
    }, function () {
        delay.reject('Unable to fetch recipe ' + recipeId);
    });

    $scope.save = function () {
        $scope.recipe.$save(function (recipe) {
            $state.go('recipe.show', {recipeId: recipe.id});
        });
    };

    $scope.remove = function () {
        delete $scope.recipe;
        $state.go('recipe.list');
    };
}]);

app.controller('NewCtrl', ['$scope', '$state', 'Recipe', function ($scope, $state, Recipe) {
    $scope.recipe = new Recipe({
        ingredients: [
            {}
        ]
    });

    $scope.save = function () {
        $scope.recipe.$save(function (recipe) {
            $state.go('recipe.show', {recipeId: recipe.id});
        });
    };
}]);

app.controller('IngredientsCtrl', ['$scope', function ($scope) {
    $scope.addIngredient = function () {
        var ingredients = $scope.recipe.ingredients;
        ingredients[ingredients.length] = {};
    };
    $scope.removeIngredient = function (index) {
        $scope.recipe.ingredients.splice(index, 1);
    };
}]);
