import Loader from "react-loader-spinner";
import defaultImg from "../film-default.png"
import css from "./ActorsList.module.css"

function ActorsList({ actors }) {
    const imageLoaded = Boolean(actors.length)

    return (
        <ul className={css.actorsList}>
            {actors.map(actor =>
            (<li key={actor.id} className={css.actorCard}>
                    {!imageLoaded && <Loader type="ThreeDots" color="#cdcdcd" height={100} width={100}/>}
                    {imageLoaded && <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : defaultImg} alt={actor.name} />}
                    <p>{actor.name}</p>
                    <p>{actor.character}</p>
                </li>
            ))}
        </ul>
    )
    
}

export default ActorsList