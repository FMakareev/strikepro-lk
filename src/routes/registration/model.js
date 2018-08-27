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
                "subscription": false
            }
        ],
        phone: [
            {
                type: 'phone',
                "subscription": false
            }
        ],

    }
}