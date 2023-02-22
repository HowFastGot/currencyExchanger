import Container from '@mui/material/Container';

import { IContainerProps } from '../../types';

export function MainContainer({ children }: IContainerProps) {
	return (
		<Container
			maxWidth='xl'
			children={children}
			component='main'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: '40px',
				gap: '40px',
				height: 'calc(100% - 120px)',
				marginBottom: '20px',
				overflow: 'auto',
			}}
		/>
	);
}
