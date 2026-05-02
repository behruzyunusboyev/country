import { useState, useEffect } from "react";
import "./style/getcountry.css";
function GetCountry() {
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [region, setRegion] = useState("");
    const [search, setSearch] = useState("");
    const [borders, setBorders] = useState("");
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
    
    const filterregion = country.filter((item) => {
        const sellectregion = region === "" || item.continents.includes(region);
        return sellectregion;
    })
    const filtersearch = country.filter((item) => {
        const sellectsearch = search === "" || item.name.common.toLowerCase().includes(search.toLowerCase());
        return sellectsearch;
    })
    const filterborders = country.filter((item) => {
        const sellectborders = borders === "" || item.borders.includes(borders);
        return sellectborders;
    })
    const filters = filterregion.filter(item => filtersearch.includes(item)).filter(item => filterborders.includes(item));
    return (
        <div className="main">
            <div className="nav">
                <div className="Nav">
                    <input type="text" name="" id="search" onChange={(e) => setSearch(e.target.value)}/>
                <form action="">
                    <select name="country" id="sellect" onChange={(e) => setRegion(e.target.value)}>
                        <option value="">Barcha qit'alar</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="North America">North America</option>
                        <option value="South America">South America</option>
                        <option value="Africa">Africa</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </form></div>
                
            </div>
        <div id="item">
            
            {filters.map(item =>{
                return(
                    <div key={item.name.common} className="card" onClick={() => setBorders(item.borders ? item.borders[0] : "")}>
                        <img src={item.flags.svg} alt={item.name.common} className="flag" />
                        <h3>nomi {item.name.common}</h3>
                        <p><strong>Poytaxt:</strong> {item.capital ? item.capital[0] : "N/A"}</p>
                        <p><strong>Qit'a:</strong> {item.continents ? item.continents[0] : "N/A"}</p>
                        <p><strong>Chegaralar:</strong> {item.borders ? item.borders.join(", ") : "N/A"}</p>
                    </div>
                )
            } ) }
        </div>
        </div>
        
    )
}

export default GetCountry;
