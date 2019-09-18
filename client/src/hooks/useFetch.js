import { useState, useEffect } from 'react';

export const useFetch = ({ url, params, defaultResponse }) => {
    const [data, setData] = useState(defaultResponse);

    useEffect(() => {
        const getDataFromAPI = async url => {
            try {
                const res = await fetch(url, params);
                const data = await res.json();

                setData({ isLoading: false, data });
            } catch (e) {
                console.log(e);
            }
        };

        getDataFromAPI(url);
    }, [url]);

    return data;
};
