export const getDogs = () => {
  return fetch("/api/dogs").then((res) => res.json());
};

export const getDogById = (id) => {
  return fetch(`/api/dogs/${id}`).then((res) => res.json());
};

export const addNewDog = (dogObj) => {
  return fetch("/api/dogs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dogObj),
  }).then((response) => {
    return response.json();
  });
};
