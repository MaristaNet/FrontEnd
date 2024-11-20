import React, { useState } from "react";
import { Box, Input, useToast, Button, Flex, Text } from "@chakra-ui/react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import app from "../../firebase-config";
import RootLayout from "../components/layouts/RootLayout";
import AuthCard from "../components/ui-elements/AuthCard";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignUp = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@umg\.edu\.mx$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error al registrarse",
        description:
          "El correo electrónico debe ser de la Universidad Marista de Guadalajara",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return; // Salir de la función si el correo electrónico no es válido
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast({
          title: "Registro exitoso",
          description: "Por favor, completa tu perfil para continuar.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        // Redirige a "Editar perfil" pasando `fromRegistration: true`
        navigate("/edit", { state: { fromRegistration: true } });
      })
      .catch((error) => {
        let errorMessage = "";
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage =
              "Ya existe un usuario registrado con ese e-mail. Por favor, registrate con otro perfil.";
            break;
          case "auth/weak-password":
            errorMessage = "Tu contraseña debe tener al menos 6 caracteres";
            break;
          default:
            errorMessage =
              "Parece que hubo un error. Intenta de nuevo más tarde.";
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
    <RootLayout>
      <Flex align={"center"} justifyContent="center">
        <Box
          px={60}
          backgroundSize={"cover"}
          backgroundPosition={"center"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          textAlign="center"
        >
          <AuthCard>
            <Text fontSize="5xl" fontWeight="extrabold" mb={4}>
              {" "}
              Registro
            </Text>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              mt={5}
            />
            <Input
              placeholder="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              mt={5}
            />
            <Box>
              <Button
                onClick={handleSignUp}
                borderRadius={30}
                bgColor="#FF3F00AA"
                m={5}
              >
                Registrarse
              </Button>
              <Button
                as={NavLink}
                borderRadius={"30px"}
                bg={"null"}
                to={"/signin"}
                m={5}
              >
                Iniciar Sesión
              </Button>
            </Box>
          </AuthCard>
        </Box>
      </Flex>
    </RootLayout>
  );
}

export default SignUp;
