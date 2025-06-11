import React from 'react';
import Card from './Card';

const CardList = ({ items }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {items.map((item, index) => (
        <Card
          key={index}
          image={item.image}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default CardList;
