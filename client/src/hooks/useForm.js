import { useState } from 'react';

/*
    Custom hook to consolidate form state management.
    Depends on each input having a 'name' prop.
*/

export const useForm = initialValues => {
    const [values, setValues] = useState(initialValues);

    return [values, e => setValues({ ...values, [e.target.name]: e.target.value })];
};
