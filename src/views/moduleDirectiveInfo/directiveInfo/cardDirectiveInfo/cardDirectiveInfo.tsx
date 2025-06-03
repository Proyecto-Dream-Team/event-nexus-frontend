import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import { DirectiveInfoData } from "../../../../domain/directiveInfo";
import "./cardDirectiveInfo.css";

interface CardDirectiveInfoProps {
    info: DirectiveInfoData;
    funcDelete: () => void;
}

export const CardDirectiveInfo = ({ info, funcDelete }: CardDirectiveInfoProps) => {
    const [openDialog, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (): void => {
        setOpen(false);
    };

    const confirmDelete = () => {
        funcDelete();
        setOpen(false);
    };

    return (
        <>
            <div className="containerCardDirectiveInfo">
                <div className="rowCardDirectiveInfo">
                    <div className="titleCardDirectiveInfo">
                        <h2>{info.title}</h2>
                        <p>{info.description}</p>
                        <p>{info.date}</p>
                    </div>
                    <div className='iconCardDirectiveInfo'>
                        <DeleteForeverIcon
                            fontSize='inherit'
                            style={{ color: 'red', fontSize: 30 }}
                            onClick={handleOpen} // Abre el diálogo al hacer clic
                        />
                    </div>
                </div>

                {/* Diálogo de confirmación de eliminación */}
                <Dialog open={openDialog} onClose={handleClose}>
                    <DialogTitle>Confirmar eliminación</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Estás seguro que deseas eliminar la directiva <strong>{info.title}</strong>? Esta acción no se puede deshacer.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancelar</Button>
                        <Button onClick={confirmDelete} color="error" variant="contained">Eliminar</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};