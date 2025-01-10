import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
//import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TvCard from "./card";
import tmdbIcono from "../../assets/tmdb-logo.svg";
import { Link } from "react-router-dom";

export default function ListCard({ tv }) {
  const { title, date, overview, media_type, rating, homepage } = tv;

  const year = date.split("-")[0];

  const slugTitle = title
    .toLowerCase()
    .replace(/[\s]+/g, "-")
    .replace(/[^\w-]+/g, "");

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
          <Link
            to={`/${
              media_type === "movie" ? "pelicula" : "serie"
            }/${slugTitle}-${year}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span>{`${title} (${year})`}</span>
          </Link>
        </Typography>
        <Typography
          variant='body2'
          sx={{ color: "text.secondary", height: "35%", overflow: "hidden" }}
        >
          {overview}
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
            {rating.toFixed(2)}
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
          {homepage && (
            <Button
              href={homepage}
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
