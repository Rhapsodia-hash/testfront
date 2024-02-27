import React, { useState, useEffect } from "react";
import SubscribeFormView from "./SubscribeFormView";
import axios from "axios";
import Cookies from "js-cookie";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:8000/whitelist/crsf/');
        //const csrfToken = response.data["X_CSRFTOKEN"]
        // Configura la cookie con el mismo nombre que en Django
        Cookies.set("X_CSRFTOKEN", response.data.X_CSRFTOKEN, { sameSite: "None", secure: true });
        const newcsrf = Cookies.get("X_CSRFTOKEN");
        console.log(response.data.X_CSRFTOKEN);
        setCsrfToken(newcsrf);
      } catch (error) {
        console.error('Error al obtener el token CSRF:', error);
      }
    };

    fetchCsrfToken();
  }, []);
  useEffect(() => {
    console.log("Token CSRF después de actualizar el estado:", csrfToken);
  }, [csrfToken]); // Este efecto se ejecutará cada vez que csrfToken se actualice


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Enviar el correo electrónico al backend utilizando Axios
      console.log("entro al post y hago un ", Cookies.get("X_CSRFTOKEN"))
      console.log("seuimo",csrfToken)
      const response = await axios.post(
        'http://localhost:8000/whitelist/save/',
        { email },
        {
          headers: {
            //credentials: 'include',
            //"HTTP_X_CSRFTOKEN": csrfToken,
            "X-CSRFToken": csrfToken,
            //mode: 'same-origin',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      // Manejar la respuesta del backend (puede ser opcional)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <SubscribeFormView
      onSubmit={handleSubmit}
      onChange={handleEmailChange}
      email={email}
    />
  );
};

export default SubscribeForm;