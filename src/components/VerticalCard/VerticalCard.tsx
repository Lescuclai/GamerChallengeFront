import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material"
import type { ReactNode } from "react"

interface VerticalCardProps {
  image: string
  text_chip: string
  children?: ReactNode
}
export const VerticalCard = ({
  image,
  text_chip,
  children,
}: VerticalCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" src={image} alt="Card Image" />
        <CardContent
          sx={{
            backgroundColor: "#333333",
            color: "#EBEBFF",
          }}
        >
          {children}
          <CardActions className="flex justify-end">
            <Chip label={text_chip} color="primary"></Chip>
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
