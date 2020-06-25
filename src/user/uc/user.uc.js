module.exports = class UserUc {
    userRepo;

    constructor(serviceLocator) {
        this.userRepo = serviceLocator.service('userRepo');
    }

    async getUserById(id) {
        return this.userRepo.get(id);
    }

    async addNewUser(user) {
        const userAlreadyExists = await this.userRepo.userExists(user.login);
        if (userAlreadyExists) {
            throw new Error('Already exists');
        }
        return this.userRepo.create(user);
    }
};
