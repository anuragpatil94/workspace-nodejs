const users = [{
    id: 1,
    name: "Anurag",
    schoolId: 101
}, {
    id: 2,
    name: "Jack",
    schoolId: 303
}];


const grades = [{
    id: 1,
    schoolId: 101,
    grade: 89
}, {
    id: 2,
    schoolId: 303,
    grade: 99
}, {
    id: 1,
    schoolId: 101,
    grade: 80
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => {
            return user.id === id
        });

        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}.`)
        }
    })
}

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId))
    });
}

const getStatus = (userId) => {
    var user;
    return getUser(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId)
    }).then((grades) => {
        let average = 0;

        if (grades.length > 0) {
            average = grades
                .map((grade) => grade.grade) // this takes  only grades from object and make a array of it
                .reduce((a, b) => {  //reduce takes 1st 2 elements do something and the put that new value in 'a' and next value in array as 'b'
                    return a + b;
                }) / grades.length;  //map to change array of objects to array of numbers
            return `${user.name} has a ${average}% in the class.`;
        }
    });
}

const getStatusAlt = async (userId) => {
    const user = await getUser(userId);
    //this is same as above sentence
    // .then((tempUser) => {
    //     user = tempUser;
    //     return getGrades(user.schoolId)
    // })
    const grades = await getGrades(user.schoolId);
    let average = 0;

    if (grades.length > 0) {
        average = grades
            .map((grade) => grade.grade) // this takes  only grades from object and make a array of it
            .reduce((a, b) => {  //reduce takes 1st 2 elements do something and the put that new value in 'a' and next value in array as 'b'
                return a + b;
            }) / grades.length;  //map to change array of objects to array of numbers
        return `${user.name} has a ${average}% in the class.`;
    }

};

getStatusAlt(1).then((name) => {

    console.log(name);

}).catch((e) => {
    console.log(e);
});


// getStatus(1).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log(e);
// });
