import React, { useEffect, useState, useMemo } from "react";
import ProfileLayout from "../components/layouts/ProfileLayout";
import { Text, Box, Button, Stack, Flex } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../../firebase-config";
import axios from "axios";
import Loading from "../components/Loading";
import MPost from "../components/ui-elements/MPost";
import { getCategoria, getPrivacidad } from "../components/utils/utils";
import { getPosts } from "../utils/apiCalls/posts";

function Profile() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [data, setData] = useState({
    posts: [],
    loading: true,
    error: null,
  });

  const currentUser = auth.currentUser;

  useEffect(() => {
    async function fetchData() {
      try {
        const postsResponse = await getPosts();
        setData({ posts: postsResponse, loading: false, error: null });
        console.log("Data internal:", data);
      } catch (error) {
        console.error("Error al obtener los posts:", error);
        setData({
          posts: [],
          loading: false,
          error: "Error al cargar los posts",
        });
      }
    }

    fetchData();
  }, []);

  const currentUserPosts = useMemo(() => {
    if (!currentUser || !Array.isArray(data.posts) || data.posts.length === 0)
      return [];
    else return data.posts.filter((post) => post.usuario === currentUser.email);
  }, [data, data.posts, currentUser]);

  if (!currentUser) {
    return <Text>No has iniciado sesión.</Text>;
  }

  // Obtener pronombres y correo del currentUser (esto es más confiable que localStorage)
  const pronouns = currentUser.displayName
    ? "No especificado"
    : "No disponible";
  const email = currentUser.email;

  return (
    <ProfileLayout
      avatar={currentUser.photoURL || "https://bit.ly/broken-link"}
      username={currentUser.displayName || currentUser.email}
      bio={
        <Stack spacing={1} mt={2}>
          <Text>
            Descripción:{" "}
            {currentUser.displayName || "Descripción no disponible"}
          </Text>
          <Text>Pronombres: {pronouns}</Text>
          <Text>Correo electrónico: {email}</Text>
        </Stack>
      }
      grupo="default"
      noPublicaciones={currentUserPosts.length}
      noAmigos={0}
    >
      {/* Contenedor Flex para alinear la imagen y el botón */}
      <Flex justify="space-between" align="center" mt={4} position="relative">
        <Box flex="1" />
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

      <Box mt={4}>
        {data.loading ? (
          <Loading />
        ) : data.error ? (
          <Text color="red.500">{data.error}</Text>
        ) : currentUserPosts.length > 0 ? (
          currentUserPosts.map((post) => (
            <MPost
              key={post.id}
              username={post.usuario}
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
