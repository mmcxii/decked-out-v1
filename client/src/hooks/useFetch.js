//* Packages
import { useState, useEffect } from 'react';

export const useFetch = ({ url, params, defaultResponse }) => {
    const [data, setData] = useState(defaultResponse);

    useEffect(() => {
        const getDataFromAPI = async url => {
            try {
                // Fetchs data from provided url, using provided params
                const res = await fetch(url, params);

                // Stores returned data as json
                const data = await res.json();

                // Turns off the loading state and saves data
                setData({ isLoading: false, data });
            } catch (e) {
                console.log(e);
            }
        };

        getDataFromAPI(url);
    }, [url]);

    // Returns data for use
    return data;
};
