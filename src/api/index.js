import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if(country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

        // const modifiedData = {
        //     confirmed: confirmed,
        //     recovered: recovered,
        //     deaths: deaths,
        //     lastUpdate: lastUpdate,
        // }
        // return modifiedData;
        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        console.log(error);
    }
}

// Old API config, changed it to new working daily one
// export const fetchDailyData = async ()=> {
//     try{
//         const { data } = await axios.get(`${url}/daily`);

//         const modifiedData = data.map((dailyData) => ({
//             confirmed: dailyData.confirmed.total,
//             deaths: dailyData.deaths.total,
//             date: dailyData.reportDate,
//         }));
//         return modifiedData;
//     } catch (error){
//         console.log(error);
//     }
// }

// Instead of Global, this fetches the daily data for the US
export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');

        return data.map(({ positive, recovered, death, dateChecked: date }) => ({
            confirmed: positive, 
            recovered, 
            deaths: death, 
            date
        }))
    } catch (error) {
        console.log(error)
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries }} = await axios.get(`${url}/countries`);

        return countries.map((country)=>country.name);
    }catch (error) {
        console.log(error);
    }
}