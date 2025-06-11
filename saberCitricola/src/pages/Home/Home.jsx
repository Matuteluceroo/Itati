import "./Home.css";

import React from 'react';
import CardList from '../../components/Regionales/CardList';

const data = [
  {
    image: 'https://placekitten.com/400/300',
    title: 'Gatito 1',
    description: 'Este es un gatito muy tierno.',
  },
  {
    image: 'https://placekitten.com/401/300',
    title: 'Gatito 2',
    description: 'Este es otro gatito adorable.',
  },
  {
    image: 'https://placekitten.com/402/300',
    title: 'Gatito 3',
    description: '¿Cuántos gatitos son demasiados gatitos?',
  },
];

const Home = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Galería de Gatitos</h1>
      <CardList items={data} />
    </div>
  );
};

export default Home;
