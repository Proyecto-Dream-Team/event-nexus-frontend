import { Grid, styled, Theme } from "@mui/material";

export const StyledGrid = styled(Grid)(({ theme }:{ theme:Theme }) => ({
    backgroundColor: "#3949ab",
    height: '100%',
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
	gridAutoRows: '10rem',
	overflowY: 'scroll',
	padding: theme.spacing(2),
	gap: theme.spacing(1),

}));