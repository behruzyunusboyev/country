import { useState, useEffect } from "react";

function GetCountry() {
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCountryData = async () => {
        try {
            setLoading(true);
            const res = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,currencies,continents,borders,flags,languages,population,region");
            
            const data = await res.json();

            setCountry({
                name: data[249].name.common,
                flag: data[249].flags.png, 
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
        <div className="main_ctr_div" style={{color:"black", width: "100%", padding: "20px", background: "#f0f0f0", textAlign: "center" }}>
            <h1 style={{color:"black"}}>{country?.name}</h1>
            <img src={country?.flag} alt={country?.name} style={{ width: "200px", border: "1px solid #ccc" }} />
        </div>
    );
}

export default GetCountry;
