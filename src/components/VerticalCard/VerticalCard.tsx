import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from "@mui/material"


interface VerticalCardProps {
    image: string
    date: Date,
    pseudo: string,
    title: string
}
export const VerticalCard =({image, pseudo,date,title}: VerticalCardProps) => {
    const formatedDate = new Intl.DateTimeFormat("fr-FR").format(date)
    return(
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            src={image}
            alt="Card Image"
          />
          <CardContent  sx={{
            backgroundColor:"#333333",
            color:"#EBEBFF"
            }}>
            <Box display="flex" mb={1}   alignItems="center">
                <Typography variant="h5" >
                {pseudo}
                </Typography>
                <Typography marginLeft={1} >
                {formatedDate}
                </Typography>
            </Box>
            <Typography align="left" >
                {title}
            </Typography>
            <CardActions className="flex justify-end">
                <Button size="small" sx={{
                    backgroundColor:"#8585FF", 
                    color:"#EBEBFF",
                    borderRadius: "9999px",     // arrondi max = style chip
                    padding: "12px", 
                    }}>
                    Détails
                </Button>
            </CardActions>
          </CardContent>
        </CardActionArea>
      </Card>
    )
}