import React, { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import app from "../../firebase-config";
import Navbar from "../components/Navbar"; 
import { 
  Box, 
  Input, 
  Button, 
  Text, 
  Stack, 
  Avatar, 
  Flex, 
  useToast
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom"; 

function EditProfile() {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const auth = getAuth(app);
  const navigate = useNavigate(); 
  const location = useLocation();
  const toast = useToast();
  const fromRegistration = location.state?.fromRegistration || false;

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
    setDisplayName(auth.currentUser.displayName || "");
    setBio(userProfile.bio || ""); 
    setPronouns(userProfile.pronouns || ""); 
    setEmail(auth.currentUser.email || ""); 

    // Mostrar toast de instrucciones si el usuario viene del registro
    if (fromRegistration) {
      toast({
        title: "Completa tu perfil",
        description: "Por favor, ingresa el resto de tus datos para completar tu perfil.",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [auth.currentUser, fromRegistration, toast]);

  const handleUpdateProfile = () => {
    const user = auth.currentUser;
    updateProfile(user, {
      displayName: displayName || user.displayName,
      photoURL: image ? URL.createObjectURL(image) : user.photoURL,
    })
      .then(() => {
        localStorage.setItem("userProfile", JSON.stringify({
          bio: bio || "Descripción de prueba", 
          pronouns: pronouns || "",
          email: email || user.email 
        }));

        toast({
          title: "Perfil actualizado",
          description: "Tus cambios han sido guardados.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        // Redirigir según la fuente de acceso
        if (fromRegistration) {
          navigate("/home");
        } else {
          navigate("/profile");
        }
      })
      .catch((error) => {
        toast({
          title: "Error al actualizar el perfil",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <Box>
      <Navbar /> 
      <Box bg="orange.100" py={6} px={6}>
        <Flex justify="space-between" align="center" >
          <Flex justify="center" flex="1">
            <Avatar 
              size="xl" 
              src={image ? URL.createObjectURL(image) : "https://bit.ly/broken-link"} 
            />
          </Flex>
        </Flex>
      </Box>

      <Box textAlign="center" p={5}>
        <Text fontSize="2xl" mb={5}>Editar Perfil</Text>
        <Stack spacing={4} align="center">
          <Input
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            width="300px"
            borderColor="orange.500"
          />
          <Input
            type="text"
            placeholder="Nombre de usuario"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            width="300px"
            borderColor="orange.500"
          />
          <Input
            type="text"
            placeholder="Presentación/Descripción"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            width="300px"
            borderColor="orange.500"
          />
          <Input
            type="text"
            placeholder="Pronombres"
            value={pronouns}
            onChange={(e) => setPronouns(e.target.value)}
            width="300px"
            borderColor="orange.500"
          />
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            width="300px"
            borderColor="orange.500"
          />
        </Stack>
        {/* Botón aplicar cambios*/}
        <Button 
          onClick={handleUpdateProfile} 
          colorScheme="blue" 
          mt={4} 
          float="left" 
        >
          Aplicar Cambios
        </Button>
      </Box>
    </Box>
  );
}

export default EditProfile;
