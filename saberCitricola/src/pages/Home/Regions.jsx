import React, { useState } from 'react';
import backgroundImage from '../../assets/images/montanaspatagonia.jpg';
import { Link } from 'react-router-dom';
import './Regions.css';

const Header = ({ language, setLanguage }) => (
  <header className="header-bar">
    <div className="language-toggle">
      <button className={language === 'es' ? 'active' : ''} onClick={() => setLanguage('es')}>Español</button>
      <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>English</button>
      <button className={language === 'both' ? 'active' : ''} onClick={() => setLanguage('both')}>Ambos</button>
    </div>
  </header>
);
const regions = [
  {
    id: 1,
    name: "Región Noroeste (NOA)",
    provinces: "Salta, Jujuy, Tucumán",
    es: "La región del NOA es conocida por sus montañas, su música folclórica y su cocina rica en ingredientes autóctonos como el maíz, el ají y la papa andina. Sus platos son herencia viva de las culturas originarias y de la colonización hispana. Comer aquí es viajar al pasado.",
    en: "Northwestern Argentina offers majestic mountains, folk traditions, and a cuisine rooted in native ingredients like corn, chili pepper, and Andean potatoes. Its dishes are a living heritage of indigenous and Spanish influences. Eating here is a journey through time."
  },
  {
    id: 2,
    name: "Región Noreste (NEA)",
    provinces: "Corrientes, Misiones, Formosa, Chaco",
    es: "En el litoral argentino la cocina se mezcla con la selva, los ríos y la influencia guaraní. El almidón de mandioca, los quesos frescos y la cocción sobre plancha marcan una identidad culinaria inconfundible.",
    en: "In Argentina’s northeast, cuisine blends rainforest aromas, riverside traditions, and Guarani heritage. Cassava starch, fresh cheeses, and flat grilling define this region’s unmistakable culinary voice."
  },
  {
    id: 3,
    name: "Región Cuyo",
    provinces: "Mendoza, San Juan, San Luis",
    es: "La tierra del vino ofrece también una cocina con carnes, condimentos intensos y dulces artesanales. Cuyo es fuego, montaña, y sabor a horno de barro.",
    en: "In the land of wine, Cuyo also delivers bold meats, rich flavors and handmade sweets. This is a region of fire, mountains, and clay-oven delights."
  },
  {
    id: 4,
    name: "Región Centro",
    provinces: "Córdoba, Santa Fe, Entre Ríos, La Pampa",
    es: "Una zona de inmigración europea, con platos caseros, pastas y postres con sabor a infancia. Aquí la cocina es calidez familiar.",
    en: "The heartland of Argentina boasts European immigrant roots, homemade pastas, and desserts that taste like childhood. Cooking here is all about comfort and family."
  },
  {
    id: 5,
    name: "Región Patagónica",
    provinces: "Neuquén, Río Negro, Chubut, Santa Cruz, Tierra del Fuego",
    es: "La cocina patagónica es de fuego, mar y bosque. Corderos, truchas, frutos rojos y hierbas silvestres construyen un menú que respira naturaleza.",
    en: "Patagonian cuisine is born from fire, sea and forest. Lamb, trout, berries and wild herbs make up a menu that breathes nature."
  }
];
const RegionCard = ({ region, language }) => (
  <div className="region-card">
    <h2 className="region-title">{region.name}</h2>
    <p className="region-subtitle">📍 <span className="italic">Provincias:</span> {region.provinces}</p>
    <div className="region-text">
      {language === 'es' && <p>{region.es}</p>}
      {language === 'en' && <p>{region.en}</p>}
      {language === 'both' && (
        <>
          <p><strong>ES:</strong> {region.es}</p>
          <p><strong>EN:</strong> {region.en}</p>
        </>
      )}
    </div>
    <div className="text-center mt-4">
      <Link to={`/comida/${region.id}`} className="btn-discover">
        Conocer comida típica
      </Link>
    </div>
  </div>
);

export default function Regions() {
  const [language, setLanguage] = useState('es');

  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header language={language} setLanguage={setLanguage} />

      <div className="content-wrapper">
        <div className="space-y-10 pb-16">
          {regions.map(region => (
            <RegionCard key={region.id} region={region} language={language} />
          ))}
        </div>
      </div>
    </div>
  );
}