import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Footer from "../Footer";
import { Grid, GridItem } from "@chakra-ui/react";

function GeneralLayout({ children, avatar }) {
  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "footer footer"`}
      gridTemplateRows={"50px 100% 90px"}
      gridTemplateColumns={"150px 1fr"}
      gap="4"
    >
      <GridItem area={"header"}>
        <Navbar />
      </GridItem>
      <GridItem pl="2" area={"nav center"}>
        <Sidebar avatar={avatar} />
      </GridItem>
      <GridItem pl="2" area={"main"}>
        {children}
      </GridItem>
      <GridItem pl="2" bg="blue.300" area={"footer"}>
        <Footer />
      </GridItem>
    </Grid>
  );
}

export default GeneralLayout;
