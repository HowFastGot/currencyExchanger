import Skeleton from '@mui/material/Skeleton';

export function TableSceleton({ position }: { position: string }) {
	return (
		<>
			<Skeleton
				animation='wave'
				height='40px'
				width='95%'
				variant='rounded'
				component={'tr'}
				sx={{
					margin: '10px 5px',
				}}
			/>
			<Skeleton
				animation='wave'
				height='20px'
				width='20px'
				variant='rounded'
				component={'tr'}
				sx={{
					position: 'absolute',
					right: '45px',
					top: position,
				}}
			/>
			<Skeleton
				animation='wave'
				height='20px'
				width='20px'
				variant='rounded'
				component={'tr'}
				sx={{
					position: 'absolute',
					right: '160px',
					top: position,
				}}
			/>
		</>
	);
}
