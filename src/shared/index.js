function serviceLocatorFactory() {
    const externalContexts = [];
    const internalServices = {};

    return {
        service(serviceKey) {
            let service = findInExternalContexts(serviceKey);
            return service || internalServices[serviceKey];
        },

        use(serviceKey, serviceObject) {
            if (serviceKey && serviceObject) {
                internalServices[serviceKey] = serviceObject;
            } else {
                throw new Error('Both the key and object must be provided');
            }
            return this; // for chaining
        },

        useExternalContext(externalContext) {
            externalContexts.push(externalContext);
            return this; // for chaining
        }
    };

    function findInExternalContexts(serviceKey) {
        if (externalContexts) {
            let service;
            for (let serviceContext of externalContexts) {
                service = serviceContext.service(serviceKey);
                if (service) {
                    return service;
                }
            }
        }
    }
}

function bcBuilder(app) {
    const serviceLocator = serviceLocatorFactory();
    let repoFactoryFn;
    let ucFactoryFn;
    let serviceFactoryFn;
    let facadeFactoryFn;
    let bcDependencies = [];

    return {
        addRepos(repoFactoryCallback) {
            repoFactoryFn = repoFactoryCallback;
            return this;
        },

        addUcs(ucFactoryCallback) {
            ucFactoryFn = ucFactoryCallback;
            return this;
        },

        addServices(serviceFactoryCallback) {
            serviceFactoryFn = serviceFactoryCallback;
            return this;
        },

        addDependencyTo(bcFacadeKey, bcFacadeObject) {
            bcDependencies.push({bcFacadeKey, bcFacadeObject});
            return this;
        },

        createFacade(facadeFactoryFnCallback) {
            facadeFactoryFn = facadeFactoryFnCallback;
            return this;
        },

        build() {
            if (bcDependencies) {
                bcDependencies.forEach(
                    ({bcFacadeKey, bcFacadeObject}) => serviceLocator.use(bcFacadeKey, bcFacadeObject));
            }
            if (repoFactoryFn) {
                repoFactoryFn(serviceLocator);
            }
            if (ucFactoryFn) {
                ucFactoryFn(serviceLocator);
            }
            if (serviceFactoryFn) {
                serviceFactoryFn(serviceLocator, app);
            }
            if (facadeFactoryFn) {
                return facadeFactoryFn(serviceLocator);
            }
        }
    }
}

module.exports = {
    serviceLocatorFactory,
    bcBuilder
};
