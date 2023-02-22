import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function Header() {
	return (
		<AppBar position='static' sx={{ height: '50px' }}>
			<Box
				sx={{
					padding: '0 15px',
					maxWidth: '1500px',
					width: '100%',
					margin: '0 auto',
				}}
			>
				<Typography
					variant='h6'
					component='h1'
					sx={{
						lineHeight: '50px',
					}}
				>
					Currency calculator
				</Typography>
			</Box>
		</AppBar>
	);
}
