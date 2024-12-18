export const getCities = () => {
  return fetch("/api/cities").then((res) => res.json());
};

export const addCity = (cityObj) => {
  return fetch("/api/cities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cityObj),
  });
};
