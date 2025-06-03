import { Chip, Divider } from "@mui/material"
import './cardInfoDirectiva.css'
import { DirectiveInfoData } from "../../../domain/directiveInfo"

interface Props {
    value: DirectiveInfoData;
}


export const CardInfoDirectiva = ( { value }: Props  ) => {
    return(<>
        <Divider>
            <Chip 
                label="Hoy" 
                size="small"
                variant="outlined"
                color="warning" />
        </Divider>
        <div className="card">
            <img src={value.imageProfile} alt="" className="image-profile" />
            <p className="name">{value.name} <span>12:30</span></p>
        </div>
        <p className="comment">{value.description}</p>
    </>)
}