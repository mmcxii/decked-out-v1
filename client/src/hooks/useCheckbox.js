//* Packages
import { useState } from 'react';

export const useCheckbox = intialValues => {
    const [values, setValues] = useState(intialValues);

    // @return values: stores values
    // @return setValues: finds changed checkbox by 'name' prop and sets its value to the html tag's value
    return [values, e => setValues({ ...values, [e.target.name]: e.target.checked })];
};
