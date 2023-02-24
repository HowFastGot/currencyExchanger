import './errorMessage.scss';

export const ErrorMessage = (props?: { errorText: string }) => {
	return (
		<div className='error-boundary'>
			<p>Ой... что то пошло не так !</p>
			<p>{props ? props.errorText : null}</p>
		</div>
	);
};
