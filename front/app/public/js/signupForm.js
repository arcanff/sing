import { showMessage } from "./showMessage.js";

const signUpForm = document.querySelector("#register-form");

signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = signUpForm["id"].value;
    const names = signUpForm["names"].value;
    const dress = signUpForm["dress"].value;
    const phone = signUpForm["phone"].value;
    const email = signUpForm["mail"].value;
    const password = signUpForm["pass"].value;
    const role = signUpForm["rol"].value;

    try {
        const response = await axios.post('http://localhost:3000/api/user', {
            identificacion: id,
            nombres: names,
            direccion: dress,
            telefono: phone,
            correo: email,
            contrasena: password,
            rol: role,
            estado: "Activo"
        });

        console.log(response.data); // Verifica los datos de la respuesta en la consola

        if (response.status === 200) { // Cambiado a 200
            // Reset the form
            signUpForm.reset();

            // Show welcome message
            showMessage("Usuario creado correctamente " + email);

            // Redirect to another page
            window.location.href = "/login"; // Replace with the actual URL
        } else {
            throw new Error('Unexpected response status');
        }

    } catch (error) {
        console.error(error); // Muestra el error en la consola para debugging

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const serverError = error.response.data;
            if (serverError.code === 'email_already_in_use') {
                showMessage("Email already in use", "error");
            } else if (serverError.code === 'invalid_email') {
                showMessage("Invalid email", "error");
            } else if (serverError.code === 'weak_password') {
                showMessage("Weak password", "error");
            } else {
                showMessage("Something went wrong", "error");
            }
        } else if (error.request) {
            // The request was made but no response was received
            showMessage("No response from server", "error");
        } else {
            // Something happened in setting up the request that triggered an Error
            showMessage("Error: " + error.message, "error");
        }
    }
});
