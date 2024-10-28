import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

function Footer() {
  return (
    <Box bg={"ccccff"} py={4} width={"100%"}>
      <Container spacing={3} justify={"center"} align={"center"}>
        <Stack direction={"row"} spacing={6} justify={"center"}>
          <Link href={"#"}>Inicio</Link>
          <Link href={"#"}>Productos</Link>
          <Link href={"#"}>Servicios</Link>
          <Link href={"#"}>Contacto</Link>
        </Stack>
        <Text>
          2024. Maristanet - Ingeniería Cibernética y en Sistemas
          Computacionales. Todos los derechos reservados
        </Text>
      </Container>
    </Box>
  );
}
export default Footer;
