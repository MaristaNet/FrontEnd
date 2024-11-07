import React, { useEffect, useState } from "react";
import ProfileLayout from "../components/layouts/ProfileLayout";
import { Text, Box, Button, Flex } from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import app from "../../firebase-config";
import Loading from "../components/Loading";
import MPost from "../components/ui-elements/MPost";
import { getCategoria, getPrivacidad } from "../components/utils/utils";
import { fetchApiKey, getPosts } from "../utils/apiCalls/posts";
import { useNavigate } from "react-router-dom";

function Profile() {
  const auth = getAuth(app);
  const [posts, setPosts] = useState([]);
  const [currentUserPosts, setCurrentUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  //pendiente para backend: traer solo las publicaciones del usuario actual
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const posts = await getPosts();
        setPosts({ posts, loading: false, error: null });
      } catch (error) {
        console.error("Error al obtener los posts:", error);
        setPosts({
          posts: [],
          loading: false,
          error: "Error al cargar los posts",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <ProfileLayout
      avatar={
        auth.currentUser.photoURL
          ? auth.currentUser.photoURL
          : "https://bit.ly/broken-link"
      }
      username={
        auth.currentUser.displayName
          ? auth.currentUser.displayName
          : auth.currentUser.email
      }
      bio="Descripcion de prueba"
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
      {/* Renderizar las publicaciones del usuario actual */}
      <Box mt={4}>
        {!loading ? (
          currentUserPosts.length > 0 ? (
            currentUserPosts.map((post) => (
              <MPost
                key={post.id}
                username={post.usuario}
                avatar={
                  auth.currentUser.photoURL
                    ? auth.currentUser.photoURL
                    : "https://bit.ly/broken-link"
                }
                category={getCategoria(post.etiqueta)}
                privacy={getPrivacidad(post.privacidad)}
                likes={post.likes.length}
                content={post.contenido}
              >
                {post.contenido}
              </MPost>
            ))
          ) : (
            <Text>No hay publicaciones aun</Text>
          )
        ) : (
          <Loading></Loading>
        )}
      </Box>
    </ProfileLayout>
  );
}

export default Profile;
