import { Card, CardContent, IconButton, Paper, styled, Theme, Typography } from "@mui/material";


export const StyledCard = styled(Paper)(({ theme }: { theme: Theme }) => ({

	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	boxShadow: theme.shadows[24],
    borderColor: theme.palette.success.main,
	// backgroundColor: theme.palette.primary.light,
    borderWidth: '3px',
    borderStyle: 'solid'
}));

export const StyledCardContent = styled(CardContent)(({ theme }: { theme: Theme }) => ({

	height: '100%',
	display: 'grid',
    padding: theme.spacing(1),
	gridTemplateAreas: `
		"description" 		
		"description"
		"participants"
	`,

}));

export const StyleTypographyA = styled(Typography)(({ theme }: { theme: Theme }) => ({
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	color: theme.palette.common.black,
	fontWeight: theme.typography.fontWeightBold,
	border: '1px solid black',
	padding: theme.spacing(0.5),
	// backgroundColor: theme.palette.primary.dark,
	color: theme.palette.common.white,
	borderRadius: theme.shape.borderRadius,
}));

export const StyledIconButton = styled(IconButton)(({ theme }: { theme: Theme }) => ({
	borderRadius: "0.5rem",
	":hover": {
		backgroundColor: theme.palette.grey[300],
	},
	// backgroundColor: theme.palette.primary.main,
	height: theme.spacing(3),
	width: theme.spacing(5),
}));
