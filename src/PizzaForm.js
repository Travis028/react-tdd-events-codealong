import React, { useState } from 'react';

function PizzaForm() {
  const [toppings, setToppings] = useState({
    pepperoni: false,
    mushrooms: false,
    olives: false
  });

  const handleToppingChange = (e) => {
    const { name, checked } = e.target;
    setToppings(prev => ({ ...prev, [name]: checked }));
  };

  const selectedToppings = [
    'Cheese',
    ...(toppings.pepperoni ? ['Pepperoni'] : []),
    ...(toppings.mushrooms ? ['Mushrooms'] : []),
    ...(toppings.olives ? ['Olives'] : [])
  ];

  return (
    <div>
      <h1>Select Pizza Toppings</h1>
      
      <div>
        <input
          type="checkbox"
          id="pepperoni"
          name="pepperoni"
          checked={toppings.pepperoni}
          onChange={handleToppingChange}
        />
        <label htmlFor="pepperoni">Pepperoni</label>
      </div>
      
      <div>
        <input
          type="checkbox"
          id="mushrooms"
          name="mushrooms"
          checked={toppings.mushrooms}
          onChange={handleToppingChange}
        />
        <label htmlFor="mushrooms">Mushrooms</label>
      </div>
      
      <div>
        <input
          type="checkbox"
          id="olives"
          name="olives"
          checked={toppings.olives}
          onChange={handleToppingChange}
        />
        <label htmlFor="olives">Olives</label>
      </div>

      <h2>Your Toppings:</h2>
      <ul>
        {selectedToppings.map((topping, index) => (
          <li key={index}>{topping}</li>
        ))}
      </ul>
    </div>
  );
}

export default PizzaForm;
