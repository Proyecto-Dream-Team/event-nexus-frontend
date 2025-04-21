import { Event } from "../../../components/event/event";
import { sesionStorage } from "../../../domain/user";


export const EventsCopy = () => {

    return(
        <Event user={sesionStorage} time={'14/02/2003'} title='juntada en lo de moe' description="vamos a juntarnos a hablar sobre temas de la empresa, como si la vida fuese en eso" participants={10} isActive={true}/>
    );
};