export const initialValues = {
	form_type: 'individual_entrepreneur',
	company: {
		places: [
			{
				type: 'LEGAL',
			}, {
				type: 'POSTAL',
			}
		],
		email: [
			{
				type: 'email',
				is_main: true
			}
		],
		phone: [
			{
				type: 'phone',
			}
		],

	}
};
