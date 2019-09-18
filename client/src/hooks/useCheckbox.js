import { useState } from 'react';

export const useCheckbox = intialValues => {
    const [values, setValues] = useState(intialValues);

    return [values, e => setValues({ ...values, [e.target.name]: e.target.checked })];
};
