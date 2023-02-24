import { nanoid } from 'nanoid';

export function setContent(
	loading: boolean,
	Component: React.ElementType,
	data: {}[]
) {
	switch (loading) {
		case false:
			return data.map((item) => {
				return <Component key={nanoid()} />;
			});
		case true:
			return;
		default:
			throw new Error("Can't search procces in swtich");
	}
}
