import { ButtonGroup, styled, Theme } from "@mui/material";


export const StyledFloatingButton = styled(ButtonGroup)(({ theme }: { theme: Theme }) => ({
    // position:'absolute',
    // right:'2rem',
    // bottom:'1rem',
    // width:'60px',
    // height:'60px'
    padding: theme.spacing(2)

}));