const baseUrl = 'https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e';

export const fetchProductsList = () =>
  fetch(baseUrl).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error('Failed to get data');
  });
