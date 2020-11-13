import React from 'react';

//import Cards from './compenents/Cards/Cards';
//import Chart from './compenents/Chart/Chart';
//import CountryPicker from './compenents/CountryPicker/CountryPicker';
//Can import all above in one line below

import { Cards, Chart, CountryPicker } from './compenents';
import styles from './App.module.css';
import { fetchData } from './api';

import coronaImage from './images/covid.png'

class App extends React.Component {

    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        //console.log(fetchedData);
        //fetch the data
        //set the state
        this.setState({ data: fetchedData, country: country });
    }

    render() {
        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19" />
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;