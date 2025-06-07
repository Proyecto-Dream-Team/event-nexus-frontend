import { Chip, Divider } from "@mui/material"
import './cardDirectiveInfo.css'
import { DirectiveInfoData } from "../../../domain/directiveInfo"
import { utils } from "../../../utils/formatDate";

interface Props {
    value: DirectiveInfoData;
}

export const CardDirectiveInfo = ( { value }: Props  ) => {

    return(<>
        <Divider >
            <Chip 
                label={value.priorityName} 
                size="small"
                variant="outlined"
                color={
                    value.priorityName === 'urgente'
                      ? 'error'
                      : value.priorityName === 'importante'
                      ? 'warning'
                      : 'primary'
                  } />
        </Divider>
        <article className="card">
            <img src={value.creatorImage!} alt="" className="image-profile" />
            
            <div className="atributos">
                <h2 className="title">{value.title}</h2>
                <p className="name">From: {value.name}</p>
                <span>{` ${utils.setDate(value.date!)} - ${utils.setStartTime(value.date!)}` }</span>
            </div>
        </article>
        <p className="comment">{value.description}</p>
    </>)
}