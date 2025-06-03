import { Chip, Divider } from "@mui/material"
import './cardDirectiveInfo.css'
import { DirectiveInfoData } from "../../../domain/directiveInfo"
import { utils } from "../../../utils/formatDate";

interface Props {
    value: DirectiveInfoData;
}

export const CardDirectiveInfo = ( { value }: Props  ) => {

    return(<>
        <Divider>
            <Chip 
                label="Hoy" 
                size="small"
                variant="outlined"
                color={value.priority == 'HIGH' ? "error" : "warning"} />
        </Divider>
        <div className="card">
            <img src={value.creatorImage} alt="" className="image-profile" />
            <p className="name">{value.title} <span>{utils.setDate(value.date)}</span></p>
        </div>
        <p className="comment">{value.description}</p>
    </>)
}