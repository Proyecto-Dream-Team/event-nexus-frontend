import { Box, List, Menu, MenuItem, styled, Theme } from "@mui/material";

export const StyleBoxContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '10rem',
    width: '100%',
    flexWrap:'wrap',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
}));

export const StyledList = styled(List)(({ theme }: { theme: Theme }) => ({
    width:'min(100%, 45rem)'
    // width:'50rem'
    // backgroundColor: theme.palette.secondary.main,
    // height: '100%',
    // width: 'fit-content',
    // display: 'flex',
    // padding: 5,
    // gap: 5,
    // borderColor: theme.palette.success.main,
}));

export const StyleMenuItem = styled(MenuItem)(({ theme }: { theme: Theme }) => ({
    width:'min(100%, 45rem)'
}));