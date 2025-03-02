import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TvCard from "./Card";
import tmdbIcono from "../../assets/tmdb-logo.svg";
import { Link } from "react-router-dom";

export default function ListCard({ tv }) {
  const { title, date, overview, media_type, rating, homepage } = tv;

  const year = date.split("-")[0];

  const slugTitle = title
    .toLowerCase()
    .replace(/[\s]+/g, "-")
    .replace(/[^a-z0-9áéíóúüñ-]+/gi, "");

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        border: "1px solid black",
        borderRadius: "15px",
        width: "400px",
        height: "245px",
        "@media (max-width: 425px)": {
          height: "230px",
        },
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
          }}
        >
          {homepage && (
            <Button
              href={homepage}
              target='_blank'
              variant='contained'
              color='dark'
              size='small'
            >
              Visitar
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
