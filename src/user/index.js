module.exports = class UserBcFacade {
    userUc;

    constructor(userServiceLocator) {
        this.userUc = userServiceLocator.service('userUc');
    }

    async getUserById(id) {
        return this.userUc.getUserById(id);
    }
};
