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
import { getPosts } from "../utils/apiCalls/posts";
import { getLikesByPost } from "../utils/apiCalls/like";

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
      const postConLikes = await Promise.all(
        sortedPosts.map(async (post) => {
          try {
            const res = await getLikesByPost(post.id);
            return { ...post, no_likes: res.total, likes: res.data };
          } catch (e) {
            console.log(e);
            return { ...post, no_likes: 0, likes: [] };
          }
        })
      );
      setPosts(postConLikes);
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
              id={post.id}
              username={post.usuario}
              avatar={null}
              category={getCategoria(post.etiqueta)}
              privacy={getPrivacidad(post.privacidad)}
              no_likes={post.no_likes}
              likes={post.likes}
              content={post.contenido}
              onRefetch={fetchData}
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
