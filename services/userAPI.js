function apiGetUsers() {
    return axios({
        url: "https://630e21e1b37c364eb7139bed.mockapi.io/user",
        method: "GET",
    });
}

function apiAddUser(user) {
    return axios({
        url: "https://630e21e1b37c364eb7139bed.mockapi.io/user",
        method: "POST",
        data : user,
    });
}

function apiGetUserById(userId) {
    return axios({
        url: `https://630e21e1b37c364eb7139bed.mockapi.io/user/${userId}`,
        method: "GET",
    });
}

function apiUpdateUserById(userId, user) {
    return axios({
        url: `https://630e21e1b37c364eb7139bed.mockapi.io/user/${userId}`,
        method: "PUT",
        data: user,
    });
}

function apiDeleteUser(userId) {
    return axios({
        url: `https://630e21e1b37c364eb7139bed.mockapi.io/user/${userId}`,
        method: "DELETE",
    });
}


