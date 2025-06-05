import { Grid, styled, Theme } from "@mui/material";

export const StyledGrid = styled(Grid)(({ theme }:{ theme:Theme }) => ({
    // backgroundColor: "#3949ab",
    height: '100%',
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
	gridAutoRows: '22rem',
	overflowY: 'scroll',
	padding: "clamp(16px, 5vw, 30px);",
	gap: "clamp(10px, 5vw, 20px);",

}));