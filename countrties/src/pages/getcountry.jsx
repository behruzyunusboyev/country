import { useState, useEffect } from "react";
import "./style/getcountry.css";
function GetCountry() {
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const randomnumber = Math.floor(Math.random() * 249) + 1;
    const getCountryData = async () => {
        try {
            setLoading(true);
            const res = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,currencies,continents,borders,flags,languages,population,region");
            
            const data = await res.json();

            setCountry({
                   name: data[randomnumber].name.common,
                   flag: data[randomnumber].flags.png, 
                poytaxt: data[randomnumber].capital ? data[randomnumber].capital[0] : "N/A",
                   qita: data[randomnumber].continents ? data[randomnumber].continents[0] : "N/A",
                borders: data[randomnumber].borders ? data[randomnumber].borders.join(", ")     : "N/A",
            });
        
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


    return (
        <div id="item">
            {country && (
                <div key={country.name}>
                    <h1>{country.name}</h1>
                    <img src={country.flag} alt={country.name} style={{ width: "200px", border: "1px solid #ccc" }} />
                    <h3>Qita: {country.qita}</h3>
                    <p>Poytaxt: {country.poytaxt}</p>
                    <p>Borders: {country.borders}</p>
                </div>
            )}
        </div>
    )
}

export default GetCountry;
