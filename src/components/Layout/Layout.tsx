// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Box, Container } from "@mui/material";

export default function Layout() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Outlet /> {/* Toutes les pages s'afficheront ici */}
      </Container>
    </Box>
  );
}
