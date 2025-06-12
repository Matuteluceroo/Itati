import React from 'react';
import './Comida.css';
import { useParams, Link } from 'react-router-dom';
import noa from '../../assets/images/nea.png'
import nea from '../../assets/images/noa.jpg'
import centro from '../../assets/images/centro.jpeg'
import locro from '../../assets/images/locro.jpeg'
import cordero from '../../assets/images/cordero.jpeg'
import trucha from '../../assets/images/trucha.jpg'
import cuyo from '../../assets/images/cuyo.jpg'
import patagonia from '../../assets/images/patagonia.jpg'
import empanadas from '../../assets/images/empanadas.png'
import MBEYU from '../../assets/images/MBEYU.png'
import tamal from '../../assets/images/tamal.jpg'
import humita from '../../assets/images/humita.jpg'
import sopa from '../../assets/images/sopa.jpg'
import chipaguazu from '../../assets/images/chipa.jpg'
import chivito from '../../assets/images/chivito.jpg'
import carnevino from '../../assets/images/carnevino.jpg'
import tortita from '../../assets/images/tortita.jpg'
import agno from '../../assets/images/agno.jpg'
import arroz from '../../assets/images/arroz.jpg'
import dulce from '../../assets/images/dulce.jpg'


const Header = ({ language, setLanguage }) => (
  <header className="header-bar">
    <div className="language-toggle">
      <button className={language === 'es' ? 'active' : ''} onClick={() => setLanguage('es')}>Español</button>
      <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')}>English</button>
      <button className={language === 'both' ? 'active' : ''} onClick={() => setLanguage('both')}>Ambos</button>
    </div>
    <Link to="/" className="back-home">Volver al inicio</Link>
  </header>
);
const comidaData = {
  1: {
    region: 'Región Noroeste (NOA)',
    backgroundUrl: noa,
    slogan: {
      es: 'Donde el maíz se convierte en historia',
      en: 'Where corn becomes culture'
    },
    platos: [
      {
        nombre: 'Empanadas salteñas',
        descripcion: 'Masa fina, rellenas de carne cortada a cuchillo, papa, huevo y especias. Se hornean y se sirven calientes, con limón.',
        descripcionEn: 'Thin dough pastries filled with diced beef, potato, boiled egg, and spices. Oven-baked and served warm, often with a splash of lemon.',
        imagen: empanadas
      },
      {
        nombre: 'Tamales norteños',
        descripcion: 'Masa de maíz cocida al vapor en chala, con relleno de carne, condimentos y a veces pasas.',
        descripcionEn: 'Steamed cornmeal dough wrapped in corn husk, filled with seasoned meat and sometimes raisins.',
        imagen: tamal
      },
      {
        nombre: 'Humita en chala',
        descripcion: 'Puré de maíz fresco con queso y condimentos, cocido al vapor en su propia hoja.',
        descripcionEn: 'Creamy blend of fresh corn, cheese and spices, steamed inside corn leaves.',
        imagen: humita
      }
    ]
  },
  2: {
    region: 'Región Noreste (NEA)',
    backgroundUrl: nea,
    slogan: {
      es: 'Sabor guaraní, corazón del litoral',
      en: 'Guaraní flavors from the river’s heart'
    },
    platos: [
      {
        nombre: 'Mbeyú',
        descripcion: 'Torta fina de almidón de mandioca con queso, cocida a la plancha.',
        descripcionEn: 'Thin flatbread made with cassava starch and cheese, grilled on a hotplate.',
        imagen: MBEYU
      },
      {
        nombre: 'Chipa guasú',
        descripcion: 'Pastel húmedo de maíz tierno, queso, leche y cebolla.',
        descripcionEn: 'Savory corn pie with cheese, milk, and onion.',
        imagen: chipaguazu
      },
      {
        nombre: 'Sopa paraguaya',
        descripcion: 'Bizcochuelo salado de harina de maíz, cebolla y queso.',
        descripcionEn: 'Savory cornbread with onion and cheese. Despite its name, it’s not a soup!',
        imagen: sopa
      }
    ]
  },
  3: {
    region: 'Región Cuyo',
    backgroundUrl: cuyo,
    slogan: {
      es: 'El sabor que acompaña al vino',
      en: 'The flavor that walks with wine'
    },
    platos: [
      {
        nombre: 'Chivito a la llama',
        descripcion: 'Cabrito asado entero al fuego vivo, típico de reuniones familiares.',
        descripcionEn: 'Whole baby goat slowly roasted over open flames, perfect for gatherings.',
        imagen: chivito
      },
      {
        nombre: 'Tortitas mendocinas',
        descripcion: 'Panecillos chatos con grasa, típicos para el mate.',
        descripcionEn: 'Flat savory buns made with lard, ideal for sharing with mate.',
        imagen: tortita
      },
      {
        nombre: 'Carne al vino',
        descripcion: 'Estofado de carne con vino tinto y especias, cocido a fuego lento.',
        descripcionEn: 'Slow-cooked beef stew with red wine and herbs.',
        imagen: carnevino
      }
    ]
  },
  4: {
    region: 'Región Centro',
    backgroundUrl: centro,
    slogan: {
      es: 'Tradición que se amasa',
      en: 'Tradition you can knead'
    },
    platos: [
      {
        nombre: 'Locro cordobés',
        descripcion: 'Guiso espeso de maíz, porotos, carne de cerdo, zapallo y condimentos.',
        descripcionEn: 'Hearty corn and pork stew with beans, squash and spices.',
        imagen: locro
      },
      {
        nombre: 'Agnolotis caseros',
        descripcion: 'Pasta rellena artesanal, habitualmente de ricota y nuez moscada.',
        descripcionEn: 'Handmade stuffed pasta, often filled with ricotta and nutmeg.',
        imagen: agno
      },
      {
        nombre: 'Arroz con leche y canela',
        descripcion: 'Postre tradicional hecho con leche, arroz y canela.',
        descripcionEn: 'Creamy dessert of rice, milk, and cinnamon. A nostalgic treat.',
        imagen: arroz
      }
    ]
  },
  5: {
    region: 'Región Patagónica',
    backgroundUrl: patagonia,
    slogan: {
      es: 'El sur también se come',
      en: 'The South is meant to be tasted'
    },
    platos: [
      {
        nombre: 'Cordero patagónico al asador',
        descripcion: 'Carne de cordero cocida lentamente a la cruz, sobre brasas.',
        descripcionEn: 'Lamb slowly cooked on a metal cross over hot embers.',
        imagen: cordero
      },
      {
        nombre: 'Trucha al limón con hierbas',
        descripcion: 'Trucha de río cocinada al horno con limón, ajo y hierbas.',
        descripcionEn: 'River trout baked with lemon, garlic and Patagonian herbs.',
        imagen: trucha
      },
      {
        nombre: 'Dulce de rosa mosqueta',
        descripcion: 'Mermelada artesanal elaborada con frutos silvestres de montaña.',
        descripcionEn: 'Wild mountain rosehip jam, handmade and fragrant.',
        imagen: dulce
      }
    ]
  }
};

export default function Comida() {
  const { id } = useParams();
  const regionInfo = comidaData[id];
  const [language, setLanguage] = React.useState('es');

  if (!regionInfo) return <div className="error">Región no encontrada</div>;

  return (
    <div
      className="comida-page"
      style={{ backgroundImage: `url(${regionInfo.backgroundUrl})` }}
    >
      <Header language={language} setLanguage={setLanguage} />

      <div className="comida-content">
        <h1>{regionInfo.region}</h1>
        <p className="slogan">{regionInfo.slogan.es} / {regionInfo.slogan.en}</p>

        {regionInfo.platos.map((plato, index) => (
          <div key={index} className="plato-card">
            <img src={plato.imagen} alt={plato.nombre} className="plato-img" />
            <div>
              <h2>{plato.nombre}</h2>
              {(language === 'es' || language === 'both') && <p>{plato.descripcion}</p>}
              {(language === 'en' || language === 'both') && <p><em>{plato.descripcionEn}</em></p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
