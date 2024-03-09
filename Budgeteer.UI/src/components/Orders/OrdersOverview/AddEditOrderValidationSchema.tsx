import * as Yup from 'yup';

export function AddEditOrderValidationSchema(t: any) {
    const schema = Yup.object().shape({
        number: Yup.string()
            .min(1, t('Enter a min of 1 chars'))
            .max(25, t('Enter a maximum of 25 chars'))
            .required(t('Number required')),
        client: Yup.string()
            .min(1, t('Enter a min of 1 chars'))
            .max(25, t('Enter a maximum of 25 chars'))
            .required(t('Client required')),
        value: Yup.number()
            .max(9999, t('Max value allowed is 9999'))
            .min(0, t('Min value allowed is 0'))
            .required(t('Value required'))
            .typeError(t('This field should be a number')),
        capacity: Yup.number()
            .max(9999, t('Max value allowed is 9999'))
            .min(0, t('Min value allowed is 0'))
            .required(t('Capacity required'))
            .typeError(t('This field should be a number')),
    });
    return schema;
}
