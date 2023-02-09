import React, {useState } from 'react';
import Modal from "./Modal.js";
import {login, singup} from "../behaviour/Authentication.js"

import "../assets/css/loginmodal.css";

export default function LoginModal(){
    const [wannaLogin, setWannaLogin] = useState(true);

    async function handleLogin(e){
        e.preventDefault();

        let form = document.getElementById("login_form");
        let attemptLog = await login(form.username.value, form.password.value);   
        
        clearInputErrors(["username", "password"]);
        showInputError(attemptLog);
    }

    async function handleSingup(e){
        e.preventDefault();

        let form = document.getElementById("singup_form");
        let attemptLog = await singup(form.username.value, form.password.value, form.password2.value);   
        
        clearInputErrors(["username", "password", "password2"]);
        showInputError(attemptLog);
    }

    function showLoginForm () {
        return (
            <>
                <h2>Inicio de sesión</h2>
                <form onSubmit={handleLogin} id="login_form" className="login-form">
                    <label className="bi bi-person-fill" htmlFor="input_user" />
                    <input id="input_user" type="text" placeholder='Nombre de usuario' name="username"/>

                    <label className="bi bi-key-fill"  htmlFor="input_pass" />
                    <input id="input_pass" type="password" placeholder="Contraseña" name="password"/>

                    <a onClick={changeForm}>¿No tienes cuenta? Registrate</a>
                    <button type="submit">Iniciar sesión</button>
                </form>
            </>
        );
    }

    function showSignupForm () {
        return (
            <>
                <h2>Registro de nuevo usuario</h2>
                <form onSubmit={handleSingup} id="signup_form" className="login-form">
                    <label className="bi bi-person-fill" htmlFor="input_user" />
                    <input id="input_user" type="text" placeholder='Nombre de usuario' name="username"/>

                    <label className="bi bi-key-fill"  htmlFor="input_pass" />
                    <input id="input_pass" type="password" placeholder="Contraseña" name="password"/>

                    <label className="bi bi-key-fill"  htmlFor="input_pass_confirm" />
                    <input id="input_pass_confirm" type="password" placeholder="Confirma contraseña" name="password2"/>

                    <a onClick={changeForm}>¿Ya tienes cuenta? Inicia sesión</a>
                    <button type="submit">Registrarse</button>
                </form>
            </>
        );
    }

    function changeForm () {
        let form = document.getElementById(wannaLogin ? "login_form" : "signup_form");

        clearInputErrors(["username", "password", "password2"]);

        setWannaLogin(!wannaLogin);

        form.reset();
    }

    function clearInputErrors(whereError){
        whereError.forEach(inputName => {
            let errorInput = document.getElementsByName(inputName)[0];
            errorInput?.classList?.remove("error");

            clearInputError (inputName);
        });
    }

    function clearInputError (inputName){
        let errors = document.getElementsByName(`${inputName}_error`);
        errors.forEach(error => {
            error.remove();
        });
    }

    function showInputError (errorData) {
        if(!errorData.error){
            return;
        }

        errorData.errorCount.forEach(error => {
            let errorInput = document.getElementsByName(error.whereError)[0];
            errorInput.classList.add("error");

            errorInput.classList.add("error");
            errorInput.insertAdjacentHTML("afterend", `<span class='error' name='${error.whereError}_error'>${error.errorMessage}</span>`);
        });
    }

    return (
        <Modal id='login_modal'>
            {wannaLogin ? 
            showLoginForm() : 
            showSignupForm() }
        </Modal>
    )
}