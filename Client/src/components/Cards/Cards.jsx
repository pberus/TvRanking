import { useSelector } from "react-redux"
import Card from "../Card/Card"

const Cards = () => {
    const {films} = useSelector((state) => state)
    return <div>
        {films?.map((film) => (
            <Card key={film.id} film={film}/>
        ))}
    </div>
}

export default Cards