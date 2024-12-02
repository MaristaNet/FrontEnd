import React, { useEffect, useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { getAuth } from "firebase/auth";
import app from "../../../firebase-config";
import { deleteLike, giveLike } from "../../utils/apiCalls/like";

function MPost({
  children,
  username = "Usuario",
  category = "General",
  privacy = "Público",
  avatar,
  id,
  no_likes = 40,
  likes,
  onRefetch,
  ...props
}) {
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  // useEffect(() => {
  //   console.log("usuario actual", currentUser, "id del post", id);
  // }, [currentUser]);
  const [currentLikes, setCurrentLikes] = useState(no_likes);

  const buttonProps = {
    variant: "ghost",
    colorScheme: "orange",
    size: "sm",
    ...props,
  };
  const handleLike = async () => {
    //verificar si el usuario ya le dio like buscando en el array de likes si alguno tiene al usuario actual

    const userLiked = likes.find((like) => like.usuario === currentUser.uid);
    if (userLiked) {
      deleteCurrentLike(userLiked.id);
      onRefetch();
    } else {
      giveNewLike();
      onRefetch();
    }
  };
  const deleteCurrentLike = async (id) => {
    try {
      const res = await deleteLike(id);
      setCurrentLikes(currentLikes - 1);
      console.log("like eliminado", res);
    } catch (e) {
      console.log("error", e);
    }
  };
  const giveNewLike = async () => {
    const body = {
      usuario: currentUser.uid,
      id_post: id,
    };
    try {
      const res = await giveLike(body);
      setCurrentLikes(currentLikes + 1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      position="relative"
      borderRadius="lg"
      backgroundColor="#C7C8FB"
      padding="15px"
      marginTop="50px"
      maxWidth="550px"
    >
      <Text fontSize="lg" fontWeight="bold">
        {children}
      </Text>

      <Box
        position="absolute"
        top="-10%"
        left="0"
        transform="translateY(-40%)"
        backgroundColor="#FF8B60"
        borderRadius="lg"
        padding="4px 10px"
        display="flex"
        alignItems="flex-start"
        zIndex="-1"
      >
        <Text fontSize="sm" color="white" fontWeight="bold">
          @{username}
        </Text>
      </Box>

      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        marginTop="50px"
      >
        <Box
          display="flex"
          alignItems="center"
          color="orange.400"
          marginRight="10px"
        >
          <Text fontSize="xs" marginRight="4px">
            {currentLikes}
          </Text>
          <StarIcon onClick={handleLike} boxSize={5} />
        </Box>
        <Button size="sm" colorScheme="orange" variant="ghost">
          Comentarios
        </Button>
      </Box>
    </Box>
  );
}

export default MPost;
