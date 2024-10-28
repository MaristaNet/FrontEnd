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
  Flex 
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; 

function EditProfile() {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  const auth = getAuth(app);
  const navigate = useNavigate(); 

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
    setDisplayName(auth.currentUser.displayName || "");
    setBio(userProfile.bio || ""); 
    setPronouns(userProfile.pronouns || ""); 
    setEmail(auth.currentUser.email || ""); 
  }, [auth.currentUser]);

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

        console.log("Perfil actualizado correctamente");
        navigate("/profile"); 
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error.message);
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
        <Flex justify="space-between" align="center">
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
