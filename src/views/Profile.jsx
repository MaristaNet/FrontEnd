import React, { useEffect, useState, useMemo } from "react";
import ProfileLayout from "../components/layouts/ProfileLayout";
import { Text, Box, Button, Stack, Flex } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../../firebase-config";
import Loading from "../components/Loading";
import MPost from "../components/ui-elements/MPost";
import { getCategoria, getPrivacidad } from "../components/utils/utils";
import { getPosts } from "../utils/apiCalls/posts";
import { getCarrera } from "../utils/apiCalls/carrera";

function Profile() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [data, setData] = useState({
    posts: [],
    loading: true,
    error: null,
  });
  const [carreraName, setCarreraName] = useState("");

  const currentUser = auth.currentUser;
  const localProfile = JSON.parse(localStorage.getItem("userProfile")) || {};

  // Validar si currentUser está definido antes de extraer propiedades
  const { displayName, bio, pronouns, email, career } = {
    displayName:
      localProfile.displayName || currentUser?.displayName || "Usuario",
    bio: localProfile.bio || "Descripción no disponible",
    //la career es un id, por lo que hay que mapearla a un string
    career: localProfile.career || "Carrera no especificada",
    pronouns: localProfile.pronouns || "No especificado",
    email: currentUser?.email || "Correo no disponible",
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const postsResponse = await getPosts();
        setData({ posts: postsResponse, loading: false, error: null });
      } catch (error) {
        setData({
          posts: [],
          loading: false,
          error: "Error al cargar los posts",
        });
      }
    }
    fetchData();
    async function fetchCarrera(career) {
      const carrera = await getCarrera(career);
      setCarreraName(carrera.nombre);
    }
    fetchCarrera(career);
  }, [career]);

  const currentUserPosts = useMemo(() => {
    if (!currentUser || !Array.isArray(data.posts)) return [];
    return data.posts.filter((post) => post.usuario === currentUser.email);
  }, [data, currentUser]);

  // Mostrar un mensaje si no hay un usuario autenticado
  if (!currentUser) {
    return <Text>No has iniciado sesión.</Text>;
  }

  return (
    <ProfileLayout
      avatar={currentUser.photoURL || "https://bit.ly/broken-link"}
      username={displayName}
      bio={
        <Stack spacing={1} mt={2}>
          <Text>Descripción: {bio}</Text>
          <Text>Carrera: {carreraName}</Text>
          <Text>Pronombres: {pronouns}</Text>
          <Text>Correo electrónico: {email}</Text>
        </Stack>
      }
      grupo="default"
      noPublicaciones={currentUserPosts.length}
      noAmigos={0}
    >
      {/* Contenedor Flex para alinear la imagen y el botón */}
      <Flex justify="flex-end" mt={4} position="relative">
        <Button
          colorScheme="blue"
          onClick={() => navigate("/edit")}
          position="absolute"
          top="10px"
          left="10px"
        >
          Editar Perfil
        </Button>
      </Flex>

      {/* Muestra las publicaciones del usuario */}
      <Box mt={4}>
        {data.loading ? (
          <Loading />
        ) : data.error ? (
          <Text color="red.500">{data.error}</Text>
        ) : currentUserPosts.length > 0 ? (
          currentUserPosts.map((post) => (
            <MPost
              key={post.id}
              username={displayName}
              avatar={currentUser.photoURL || "https://bit.ly/broken-link"}
              category={getCategoria(post.etiqueta)}
              privacy={getPrivacidad(post.privacidad)}
              likes={post.likes.length}
              content={post.contenido}
            />
          ))
        ) : (
          <Text>No hay publicaciones aún</Text>
        )}
      </Box>
    </ProfileLayout>
  );
}

export default Profile;
