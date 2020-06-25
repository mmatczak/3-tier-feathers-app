const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const shared = require('./shared');

// Creates an ExpressJS compatible Feathers application
const index = express(feathers());

// Parse HTTP JSON bodies
index.use(express.json());
// Parse URL-encoded params
index.use(express.urlencoded({extended: true}));
// Host static files from the current folder
index.use(express.static(__dirname));
// Add REST API support
index.configure(express.rest());
// ************ configure all Business Components ***************
index.configure(function (app) {
    const userBcFacade = buildUserBc(app);
    buildBookBc(app, userBcFacade)
});
// Register a nicer error handler than the default Express one
index.use(express.errorHandler());
// Start the server
index.listen(3030).on('listening', () =>
    console.log('Feathers server listening on localhost:3030')
);

function buildUserBc(app) {
    return shared.bcBuilder(app)
        .addRepos(serviceLocator => {
            const setUpUserRepos = require('./user/repo');
            setUpUserRepos(serviceLocator);
        })
        .addUcs(serviceLocator => {
            const setUpUserUcs = require('./user/uc');
            setUpUserUcs(serviceLocator);
        })
        .addServices((serviceLocator, app) => {
            const setUpUserServices = require('./user/service');
            setUpUserServices(serviceLocator, app);
        })
        .createFacade(serviceLocator => {
            const UserBcFacade = require('./user');
            return new UserBcFacade(serviceLocator);
        })
        .build();
}

function buildBookBc(app, userBcFacade) {
    return shared.bcBuilder(app)
        .addRepos(serviceLocator => {
            const setUpBookRepos = require('./book/repo');
            setUpBookRepos(serviceLocator);
        })
        .addUcs(serviceLocator => {
            const setUpBookUcs = require('./book/uc');
            setUpBookUcs(serviceLocator);
        })
        .addServices((serviceLocator, app) => {
            const setUpBookServices = require('./book/service');
            setUpBookServices(serviceLocator, app);
        })
        .addDependencyTo('userBcFacade', userBcFacade)
        .build();
}
