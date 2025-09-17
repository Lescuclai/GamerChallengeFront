import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import like_icon from "../../assets/like_icon.svg";

export const BoardCard = () => {
  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex" }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Live From Space</Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            234
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <img src={like_icon} alt="" />
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};
