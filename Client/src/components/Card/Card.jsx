import PropTypes from "prop-types"

const IMAGE_URL = "https://image.tmdb.org/t/p/w500"

const Card = ({film}) => {
    const {title, image, year, overview, rating } = film
    return <div>
        <h2>{title}</h2>
        <img src={IMAGE_URL + image} alt={`img of ${title}`} />
        <h4>Release date: {year}</h4>
        <h4>Overview: {overview}</h4>
        <h4>Rating: {rating}</h4>
    </div>
}

Card.propTypes = {
    film: PropTypes.object.isRequired,
}

export default Card