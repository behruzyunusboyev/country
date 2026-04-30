import { useState, useEffect } from "react";
import "./style/getcountry.css";
function GetCountry() {
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCountryData = async () => {
        try {
            setLoading(true);
            const res = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,currencies,continents,borders,flags,languages,population,region");
            
            const data = await res.json();
            const sotrteddata= data.sort((a,b) => a.name.common.localeCompare(b.name.common));
            setCountry(
                sotrteddata
            )
            console.log(country);
        
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCountryData();
    }, []);

    if (loading) return <div>Yuklanmoqda...</div>;
    if (error) return <div>Xato: {error}</div>;
    
    function setCountryContinents(continent) {
        const filteredCountries = country.filter(item => item.continents && item.continents[0] === continent);
        setCountry(filteredCountries);
        continent ==''
    }
    function setCountryNmae(name) {
        const filteredCountries = country.filter(item => item.name.common === name);
        setCountry(filteredCountries);
    }
    function setCountryBorders(border) {
        const filteredCountries = country.filter(item => item.borders && item.borders.includes(border));
        setCountry(filteredCountries);
    }
    return (
        <div id="item">
            <form action="">
                <select name="country" id="" onChange={(e) => setCountryContinents(e.target.value)}>
                   
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Africa">Africa</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </form>
            {country.map(item =>{
                return(
                    <div key={item.name.common} className="card" onClick={() =>  setCountryBorders(item.borders ? item.borders[0] : "")}>
                        <img src={item.flags.svg} alt={item.name.common} className="flag" />
                        <h3>nomi {item.name.common}</h3>
                        <p><strong>Poytaxt:</strong> {item.capital ? item.capital[0] : "N/A"}</p>
                        <p><strong>Qit'a:</strong> {item.continents ? item.continents[0] : "N/A"}</p>
                        <p><strong>Chegaralar:</strong> {item.borders ? item.borders.join(", ") : "N/A"}</p>
                    </div>
                )
            } ) }
        </div>
    )
}

export default GetCountry;
