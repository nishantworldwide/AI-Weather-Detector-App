import React, { useState } from 'react';
import axios from 'axios';

function WeatherPredictor() {
    const [formData, setFormData] = useState({
        humidity: '',
        pressure: '',
        lux: '',
        minute: '',
        second: '',
        hour_sin: '',
        hour_cos: ''
    });
    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/predict', formData);
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error('Error predicting weather data:', error);
        }
    };

    return (
        <div>
            <h1>Weather Prediction</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Humidity:
                    <input type="number" name="humidity" value={formData.humidity} onChange={handleChange} />
                </label>
                <label>
                    Pressure:
                    <input type="number" name="pressure" value={formData.pressure} onChange={handleChange} />
                </label>
                <label>
                    Lux:
                    <input type="number" name="lux" value={formData.lux} onChange={handleChange} />
                </label>
                <label>
                    Minute:
                    <input type="number" name="minute" value={formData.minute} onChange={handleChange} />
                </label>
                <label>
                    Second:
                    <input type="number" name="second" value={formData.second} onChange={handleChange} />
                </label>
                <label>
                    Hour Sin:
                    <input type="number" name="hour_sin" value={formData.hour_sin} onChange={handleChange} />
                </label>
                <label>
                    Hour Cos:
                    <input type="number" name="hour_cos" value={formData.hour_cos} onChange={handleChange} />
                </label>
                <button type="submit">Predict</button>
            </form>
            {prediction && <div>Prediction: {prediction}</div>}
        </div>
    );
}

export default WeatherPredictor;
