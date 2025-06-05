import { List, styled, Theme } from "@mui/material";

export const StyledList = styled(List)(({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    height: '100%',
    width: 'fit-content',
    display: 'flex',
    padding: 5,
    gap: 5,
    '& a, & h2': {
        height: 35,
    },
    borderColor: theme.palette.success.main,
    borderWidth: '3px',
    borderStyle: 'solid'
}));