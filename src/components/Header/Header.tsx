import { AppBar, Button, Toolbar, useMediaQuery } from "@mui/material";
import Avatar from "../../assets/avatar.svg";
import Logo from "../../assets/logo_GamerChallenges.svg";
import LogoSmall from "../../assets/logogram.svg";

export default function Header() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#333333", color: "#EBEBFF" }}
    >
      <Toolbar className="w-full max-w-7xl mx-auto flex justify-between items-center">
        <img
          src={isSmallScreen ? LogoSmall : Logo}
          alt="Logo Gamer Challenges"
          className="h-10"
        />

        {isSmallScreen ? (
          <Button
            size="small"
            sx={{
              backgroundColor: "#8585FF",
              color: "#EBEBFF",
              borderRadius: "9999px",
              padding: "8px 20px",
              "&:hover": {
                backgroundColor: "#6B6BFF",
              },
            }}
          >
            <img src={Avatar} alt="Avatar" className="h-10" />
          </Button>
        ) : (
          <Button
            size="small"
            sx={{
              backgroundColor: "#8585FF",
              color: "#EBEBFF",
              borderRadius: "9999px",
              padding: "8px 20px",
              "&:hover": {
                backgroundColor: "#6B6BFF",
              },
            }}
          >
            CONNECTION
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
