import { useState, useEffect } from 'react';

export const Meals = () => {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    // 268-1. Fetching Data
    async function fetchMeals() {
      const response = await fetch('http://localhost:3000/meals');

      //   268-2. Handling HTTP Errors
      if (!response.ok) {
        // ...
      }

      //   268-3. Transforming Data
      const meals = await response.json();
      //   268-4. Setting Data States
      setLoadedMeals(meals);
    }

    fetchMeals();
  }, []);

  const mealsList = loadedMeals.map(meal => <li key={meal.id}>{meal.name}</li>);

  return <ul id='meals'>{mealsList}</ul>;
};
