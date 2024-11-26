import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  VStack,
  Image,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import app from "../../firebase-config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Importación de imágenes
import icon1 from "../assets/imagenes/arriba.png";
import icon2 from "../assets/imagenes/abajo.png";
import logoM from "../assets/imagenes/logo.png";

function SignUp() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleSignUp = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@umg\.edu\.mx$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error al registrarse",
        description:
          "El correo electrónico debe ser de la Universidad Marista de Guadalajara.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast({
          title: "Registro exitoso",
          description: "Por favor, completa tu perfil para continuar.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/edit", { state: { fromRegistration: true } });
      })
      .catch((error) => {
        let errorMessage = "";
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage =
              "Ya existe un usuario registrado con ese e-mail. Por favor, regístrate con otro correo.";
            break;
          case "auth/weak-password":
            errorMessage = "Tu contraseña debe tener al menos 6 caracteres.";
            break;
          default:
            errorMessage =
              "Ocurrió un error. Por favor, inténtalo de nuevo más tarde.";
        }
        toast({
          title: "Error al registrarse",
          description: errorMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex height="100vh">
      {/* Lado izquierdo con imágenes y texto */}
      <Box
        width="50%"
        bg="#f8f6ff"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={10}
      >
        <VStack spacing={8} textAlign="center">
          <Image
            src={icon1}
            width="2000px"
            height="400px"
            alt="Icono superior"
          />
          <Text fontSize="5xl" color="orange.400" fontWeight="bold">
            Regístrate y forma parte de la comunidad.
          </Text>
          <Image
            src={icon2}
            width="2000px"
            height="400px"
            alt="Icono inferior"
          />
        </VStack>
      </Box>

      {/* Lado derecho con el formulario de registro */}
      <Box
        width="50%"
        bg="#e3dbff"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        padding={10}
        borderTopRightRadius="md"
        borderBottomRightRadius="md"
      >
        <Box width="300px" textAlign="center">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={4}
          >
            <Image src={logoM} width="200px" height="200px" alt="Logo M" />
          </Box>
          <Text fontSize="4xl" fontWeight="extrabold" mb={4} color="Pink.500">
            Registro
          </Text>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb={4}
          />
          <Input
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            mb={4}
          />
          <Button
            onClick={handleSignUp}
            bg="#FF3F00AA"
            color="white"
            width="100%"
            mb={3}
            _hover={{ bg: "#FF3F00" }}
          >
            Registrarse
          </Button>
          <Text fontSize="sm" color="grey">
            ¿Ya tienes cuenta?{" "}
            <NavLink to="/signin" style={{ color: "blue" }}>
              Inicia sesión
            </NavLink>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default SignUp;
