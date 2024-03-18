export const fetchAvailablePlaces = async () => {
  const response = await fetch('http://localhost:3000/places');

  if (!response.ok) {
    throw new Error('Failed to fetch places.');
  }

  const resData = await response.json();

  return resData.places;
};

export const fetchUSerPlaces = async () => {
  const response = await fetch('http://localhost:3000/user-places');

  if (!response.ok) {
    throw new Error('Failed to fetch user places.');
  }

  const resData = await response.json();

  return resData.places;
};

export const updateUserPlaces = async places => {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const resData = await response.json();
    throw new Error(resData.message || 'Failed to update user data.');
  }

  const resData = await response.json();

  return resData.message;
};
