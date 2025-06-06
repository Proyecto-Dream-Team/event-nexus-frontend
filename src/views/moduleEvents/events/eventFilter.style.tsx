import { Box, Fab, List, Menu, MenuItem, styled, Theme } from "@mui/material";

export const StyleBoxContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '13rem',
    width: '100%',
    flexWrap:'wrap',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
}));

export const StyledList = styled(List)(({ theme }: { theme: Theme }) => ({
    width:'min(100%, 45rem)',
    borderRadius:'1rem'
}));

export const StyleMenuItem = styled(MenuItem)(({ theme }: { theme: Theme }) => ({
    width:'min(100%, 45rem)'
}));

export const StyledFloatingButton = styled(Fab)(({ theme }: { theme: Theme }) => ({
    position:'absolute',
    right:'2rem',
    bottom:'1rem',
    width:'60px',
    height:'60px'

}));