import { AppBar, Toolbar, useMediaQuery, Chip, Avatar } from "@mui/material"
import avatar from "../assets/avatar.svg"
import logo from "../assets/logo/logo_GamerChallenges.svg"
import logoSmall from "../assets/logo/logogram.svg"

export default function Header() {
  const isSmallScreen = useMediaQuery("(max-width:600px)")

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#333333", color: "#EBEBFF" }}
    >
      <Toolbar className="w-full max-w-7xl mx-auto flex justify-between items-center">
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
            sx={{
              color: "#fff",
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
          <Chip label="CONNEXION" color="primary" size="small"></Chip>
        )}
      </Toolbar>
    </AppBar>
  )
}
