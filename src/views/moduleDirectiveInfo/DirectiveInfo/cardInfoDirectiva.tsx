import { Chip, Divider } from "@mui/material"
import './cardInfoDirectiva.css'

export const CardInfoDirectiva = () => {
    return(<>
        <Divider>
            <Chip 
                label="Hoy" 
                size="small"
                variant="outlined"
                color="warning" />
        </Divider>
        <div className="card">
            <img src="profileImage.png" alt="" className="image-profile" />
            <p className="name">Pedro Geraghty <span>12:30</span></p>
        </div>
        <p className="comment">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque mollitia rem exercitationem, minima dolorum quod eius natus deserunt reprehenderit.</p>
    </>)
}