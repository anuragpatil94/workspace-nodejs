var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Anurag'
    };
    console.log('Hello');
    
    callback(user);
};

getUser(30, (userObject) => {
    console.log(userObject);
});