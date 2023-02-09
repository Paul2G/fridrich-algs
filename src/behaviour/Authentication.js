import validations from "../assets/json/regex.json"

const fetchURL = "http://localhost:3001"

export function login(userUsername, userPassword){
    let dataCheck = checkData(userUsername, userPassword);
    return dataCheck.error ? dataCheck : authentication(userUsername, userPassword, "login");
}

export function singup(userUsername, userPassword, userPasswordConfirm){
    let passwordMatchCheck = checkEqualsPasswords(userPassword, userPasswordConfirm);
    if (passwordMatchCheck.error){
        return passwordMatchCheck;
    }

    let dataCheck = checkData(userUsername, userPassword);
    return dataCheck.error ? dataCheck : authentication(userUsername, userPassword, "singup");
}

async function authentication(userUsername, userPassword, action){
    let datos = JSON.stringify({username: userUsername, password: userPassword});

    let apiResponse = await fetch(fetchURL + '/api/user/' + action, {
        method: 'POST',
        body: datos,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    })
    .then(res => res.json(), e => {
        return {
            error: true,
            errorCount: [{
                errorType: "server_error",
                errorMessage: "Error en el servidor"
            }]
        }
    })
    .then(data => {
        return data;
    });

    return apiResponse;
}

function checkData(userUsername, userPassword){
    let usernameCheck = syntaxCheck(userUsername, "username");
    let passwordCheck = syntaxCheck(userPassword, "password");

    if ( usernameCheck  || passwordCheck ){
        let error = {
            error: true,
            errorCount: []
        }

        if ( usernameCheck  ){
            error.errorCount.push(usernameCheck);
        }
        if ( passwordCheck ){
            error.errorCount.push(passwordCheck);
        }

        return error;
    }

    return {
        error: false
    }
}

function checkEqualsPasswords(password1, password2){
    if(password1 === password2){
        return {
            error: false
        }
    } else {
        return {
            error: true,
            errorCount: {
                whereError: "password2", 
                errorType: "nomatch_error",
                errorMessage: "Las contraseñas no coninciden"
            }
        }
    }
}

function syntaxCheck(datum, datumType){
    if (datum.length === 0){
        return {
            whereError: datumType,
            errorType: "nodata_error", 
            errorMessage: "Este campo no puede estar vacio"
        };
    }

    let syntaxResponse;
    validations[datumType].forEach(validation => {
        let val = new RegExp(validation.regex);
        let check = val.exec(datum);

        if(check === null){
            syntaxResponse = {
                whereError: datumType,
                errorType: "syntax_error", 
                errorMessage: validation.error
            };
        }
    });

    return syntaxResponse !== undefined ? syntaxResponse : false;
}
