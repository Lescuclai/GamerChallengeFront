import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import like_icon from "../../assets/like_icon.svg";
interface BoarCardProps {
  likes_number: number;
  img: string;
  description: string;
}
export const BoardCard = ({
  likes_number,
  img,
  description,
}: BoarCardProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        width: { xs: "342px", md: "564px" },
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={img}
        alt="image card"
      />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          backgroundColor: "var(--jet)",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "14px",
                md: "16px",
              },
            }}
          >
            {description}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>{likes_number}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <img src={like_icon} alt="like icon" />
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};
