const { BadRequest } = require('@feathersjs/errors');

module.exports = class UserRestService {
    userUc;
    userRepo;

    constructor(serviceLocator) {
        this.userUc = serviceLocator.service('userUc');
        this.userRepo = serviceLocator.service('userRepo');
    }

    async find() {
        return this.userRepo.find();
    }

    async create(user) {
        if (user && user.login) {
            try {
                return await this.userUc.addNewUser(user);
            } catch (error) {
                throw new BadRequest(`User '${user.login}' already exists`);
            }
        }
        throw new BadRequest('Property \'login\' not provided');
    }
};
