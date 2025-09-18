import { Box, Container } from "@mui/material"
import { Outlet } from "react-router"
import Footer from "./Footer"
import Header from "./Header"

export default function Layout() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container component="main" sx={{ flexGrow: 1, py: 3 }}>
        <Outlet /> {/* Toutes les pages s'afficheront ici */}
      </Container>
      <Footer />
    </Box>
  )
}
