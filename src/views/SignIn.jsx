import { Box, Button, Flex, Input, Text, VStack, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import app from "../../firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Importación de imágenes                                                                                                       
import icon1 from "../assets/imagenes/arriba.png";
import icon2 from "../assets/imagenes/abajo.png";
import logoM from "../assets/imagenes/logo.png";

function SignIn() {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        const user = credentials.user;
        console.log("Se autenticó con el email", user.email);
        navigate("/home");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Flex height="100vh">
      {/* Left side with graphics and text */}
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
          {/* Top icon with adjustable width and height */}
          <Image src={icon1} width="2000px" height="400px" alt="Icono superior" />

          <Text fontSize="5xl" color="orange.400" fontWeight="bold">
            una comunidad.
          </Text>

          {/* Bottom icon with adjustable width and height */}
          <Image src={icon2} width="2000px" height="400px" alt="Icono inferior" />
        </VStack>
      </Box>

      {/* Right side with login form */}
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
          {/* Contenedor centrado del logo M */}
          <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
            <Image src={logoM} width="200px" height="200px" alt="Logo M" />
          </Box>
          <Text fontSize="4xl" fontWeight="extrabold" mb={4} color="Pink.500">
            Log in
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
            onClick={handleLogin}
            bg="#FF3F00AA"
            color="white"
            width="100%"
            mb={3}
            _hover={{ bg: "#FF3F00" }}
          >
            Iniciar sesión
          </Button>
          <Text fontSize="sm" color="grey">
            <NavLink to="/forgot-password">Olvidé mi contraseña</NavLink>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default SignIn;
