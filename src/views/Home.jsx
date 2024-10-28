import React, { useState, useEffect } from "react";
import GeneralLayout from "../components/layouts/GeneralLayout";
import MPost from "../components/ui-elements/MPost";
import { getAuth } from "firebase/auth";
import app from "../../firebase-config";
import Loading from "../components/Loading";
import { Text } from "@chakra-ui/react";
import { getCategoria, getPrivacidad } from "../components/utils/utils";
import MyModal from "../components/MyModal";
import MButton from "../components/ui-elements/MButton";
import { DateTime } from "luxon";
import { fetchApiKey, getPosts } from "../utils/apiCalls/posts";

function Home() {
  // const postData = {
  //   userImage: "ruta/a/la/imagen.png",
  //   username: "Usuario Ejemplo",
  //   category: "Entretenimiento",
  //   privacy: "Público",
  //   likes: 0,
  //   content: "Contenido del post aquí",
  // };
  const auth = getAuth(app);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      // Obtener los posts usando la función exportada
      const postsData = await getPosts();
      const sortedPosts = postsData.sort((a, b) => {
        const fechaA = DateTime.fromISO(a.fecha_publicacion); //es fromISO porque el formato es tipo "2024-09-23"
        const fechaB = DateTime.fromISO(b.fecha_publicacion);
        return fechaB.diff(fechaA).as("milliseconds");
      });
      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };
  const onOpen = () => setIsOpen(true);
  return (
    <GeneralLayout avatar={auth.currentUser.photoURL}>
      <MButton onClick={onOpen}>Crear publicación</MButton>
      <MyModal isOpen={isOpen} onClose={onClose} />{" "}
      {/* Pasa isOpen y onClose como props */}
      {!loading ? (
        posts.length > 0 ? (
          posts.map((post) => (
            <MPost
              key={post.id}
              username={post.usuario}
              avatar={null}
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
    </GeneralLayout>
  );
}

export default Home;
