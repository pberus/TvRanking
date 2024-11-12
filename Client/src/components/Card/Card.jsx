import PropTypes from "prop-types"

const Card = ({film}) => {
    const {title, image, year, overview, ratings } = film
    return <div>
        <h2>{title}</h2>
        <img src={image} alt={`img of ${title}`} />
        <h4>{year}</h4>
        <h4>{overview}</h4>
        <h4>{ratings}</h4>
    </div>
}

Card.propTypes = {
    film: PropTypes.object.isRequired,
}

export default Card