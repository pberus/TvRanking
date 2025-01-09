import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
//import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TvCard from "./card";
import tmdbIcono from "../../assets/tmdb-logo.svg";

export default function ListCard({ tv }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        border: "1px solid black",
        borderRadius: "15px",
        width: "30%",
        height: "15rem",
      }}
    >
      <TvCard tv={tv} cardStyle={true} />
      <CardContent sx={{ width: "70%", "&:last-child": { paddingBottom: 0 } }}>
        <Typography
          variant='h5'
          component='div'
          sx={{ fontSize: "1.2rem", height: "25%", overflow: "hidden" }}
        >
          <span>{`${tv.title} (${tv.date.split("-")[0]})`}</span>
        </Typography>
        <Typography
          variant='body2'
          sx={{ color: "text.secondary", height: "35%", overflow: "hidden" }}
        >
          {tv.overview}
        </Typography>
        <Typography
          variant='body2'
          sx={{
            color: "text.secondary",
            height: "20%",
            overflow: "hidden",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          <img src={tmdbIcono} alt='tmdb-logo' width='60' />
          <span className='d-flex align-items-center mb-0'>
            {tv.rating.toFixed(2)}
          </span>
        </Typography>
        <CardActions
          sx={{
            height: "20%",
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button variant='contained' color='dark' size='small'>
            Share
          </Button>
          {tv.homepage && (
            <Button
              href={tv.homepage}
              target='_blank'
              variant='contained'
              color='dark'
              size='small'
            >
              Visit
            </Button>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
}

ListCard.propTypes = {
  tv: PropTypes.object.isRequired,
};
