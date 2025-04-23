import { useLocation } from "react-router-dom";
import { Event } from "../../../components/event/event";
import { sesionStorage } from "../../../domain/user";

export const Events = () => {
  const location = useLocation();
  const isVisible = location.pathname === "/module-events/all-events";

  return isVisible ? (
    <Event
      user={sesionStorage}
      time={"14/02/2003"}
      title="juntada en lo de moe"
      description="vamos a juntarnos a hablar sobre temas de la empresa, como si la vida fuese en eso"
      participants={10}
      isActive={false}
    />
  ) : (
    <Event
      user={sesionStorage}
      time={"14/02/2003"}
      title="juntada en lo de moe"
      description="vamos a juntarnos a hablar sobre temas de la empresa, como si la vida fuese en eso"
      participants={10}
      isActive={true}
    />
  );
};
