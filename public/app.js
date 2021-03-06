var app = angular.module('guthub',
    ['ui.router', 'ngResource', 'guthub.directives', 'guthub.services']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    // for any unmatched url, redirect to home
    $urlRouterProvider.otherwise("/recipe");

    $stateProvider
        .state({
            name: "recipe",
            url: '/recipe',
            templateUrl: 'templates/recipe/main.html'
        })
        .state({
            name: "recipe.list",
            url: '/',
            templateUrl: 'templates/recipe/list.html',
            controller: 'ListCtrl',
            resolve: {
                recipes: ["MultiRecipeLoader", function (MultiRecipeLoader) {
                    return MultiRecipeLoader();
                }]
            }
        })
        .state({
            name: "recipe.show",
            url: '/show/:recipeId',
            templateUrl: 'templates/recipe/show.html',
            controller: 'ShowCtrl',
            xresolve: {
                recipe: ["RecipeLoader", function (RecipeLoader) {
                    return RecipeLoader();
                }]
            }
        })
        .state({
            name: "recipe.edit",
            url: '/edit/:recipeId',
            templateUrl: 'templates/recipe/edit.html',
            controller: 'EditCtrl',
            resolve: {
                recipe: ["RecipeLoader", function (RecipeLoader) {
                    return RecipeLoader();
                }]
            }
        })
        .state({
            name: "recipe.new",
            url: '/new',
            templateUrl: 'templates/recipe/edit.html',
            controller: 'NewCtrl'
        });
}]);
