import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

export function Bottom() {
	return (
		<AppBar
			position='relative'
			color='primary'
			sx={{
				height: '50px',
				bottom: 0,
				textAlign: 'center',
			}}
			component='footer'
		>
			<Typography component={'div'} sx={{ lineHeight: '50px' }}>
				2023 All rights were reserved
			</Typography>
		</AppBar>
	);
}
