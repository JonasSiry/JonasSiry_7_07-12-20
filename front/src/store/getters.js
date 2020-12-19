export default {
    checkError: () => (inputs, checkPassword = true) => {
        let check = false;
        let checkNumber = /[0-9]/;
        let checkMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;

        for (let i of inputs) {
            i.error = "";
            if (i.id == "firstName" || i.id == "lastName") {
                if (
                    checkNumber.test(i.value) == true ||
                    checkSpecialCharacter.test(i.value) == true ||
                    i.value == ""
                ) {
                    check = true;
                    i.error = "Pas de nombres ou caractères spéciaux !";
                }
            } else if (i.id == "email") {
                if (checkMail.test(i.value) == false) {
                    check = true;
                    i.error = "Adresse email invalide !";
                }
            } else if (i.id == "password" && checkPassword) {
                if (i.value.length < 8) {
                    check = true;
                    i.error = "Au moins 8 caractères !";
                }
            }
        }
        return check;
    },
    loggedIn: (state) => (!!state.token)
}