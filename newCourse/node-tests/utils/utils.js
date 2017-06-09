//MOCHA -
//dev dependencies are the packages that are not needed to be run on server, they are just need for development
/**COMMANDS
 * to run custom scripts via npm
 * check package.json for changes requiired for testing
 * npm run <name>
 */

module.exports.add = (a, b) => a + b;

module.exports.asyncAdd = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 1000);
};

module.exports.square = (a) => a * a;

module.exports.asyncSquare = (a, callback) => {
    setTimeout(() => {
        callback(a * a);
    }, 1000);
};

module.exports.setName = (user, fullName) => {
    var names = fullName.split(' ');

    user.firstName = names[0];
    user.lastName = names[1];

    return user;
};
