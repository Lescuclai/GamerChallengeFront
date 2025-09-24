import { AppBar, Toolbar, useMediaQuery, Chip, Avatar } from "@mui/material"
import { useState } from "react"
import { AuthModal } from "./AuthModal"
import avatar from "../assets/avatar.svg"
import logo from "../assets/logo/logo_GamerChallenges.svg"
import logoSmall from "../assets/logo/logogram.svg"

export default function Header() {
  const isSmallScreen = useMediaQuery("(max-width:600px)")

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  return (
    <AppBar position="static" sx={{ backgroundColor: "var(--jet)" }}>
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          src={isSmallScreen ? logoSmall : logo}
          alt="Logo Gamer Challenges"
          className="h-10"
        />
        {isSmallScreen ? (
          <Chip
            size="small"
            color="primary"
            avatar={<Avatar src={avatar} alt="Avatar" />}
            onClick={() => setIsAuthModalOpen(true)}
            sx={{
              paddingRight: 0,
              paddingLeft: 1,
              height: 32,
              ".MuiChip-avatar": {
                width: 30,
                height: 30,
                marginLeft: 2,
                marginRight: 1,
              },
              "&:hover": {
                backgroundColor: "#6B6BFF",
              },
            }}
          />
        ) : (
          <Chip
            label="CONNEXION"
            color="primary"
            size="medium"
            onClick={() => setIsAuthModalOpen(true)}
          ></Chip>
        )}
        <AuthModal open={isAuthModalOpen} setOpen={setIsAuthModalOpen} />
      </Toolbar>
    </AppBar>
  )
}
