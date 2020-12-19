const emptyUser = {
    email: "",
    firstName: "",
    lastName: ""
}

export default {
    SET_USER: (state, data) => {
        if (data) {
            Object.assign(state, data)
        }
        else {
            Object.assign(state, { token: null, user: emptyUser })
        }
    },
}