export const getAllWalkers = () => {
  return fetch("/api/walkers").then((res) => res.json());
};

export const assignDogToWalker = (dogId, walkerId) => {
  return fetch(`/api/dogs/${dogId}/assign?walkerId=${walkerId}`, {
    method: "POST",
  });
};

export const getWalkerById = (walkerId) => {
  return fetch(`/api/walkers/${walkerId}`).then((res) => res.json());
};

export const getWalkerCities = () => {
  return fetch("/api/walkercities").then((res) => res.json());
};

export const newWalkerCity = (walkerCityObj) => {
  return fetch("/api/walkercities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(walkerCityObj),
  });
};

export const removeWalkerCity = (id) => {
  return fetch(`/api/walkercities/${id}`, {
    method: "DELETE",
  });
};

export const updateWalker = (walkerObj) => {
  return fetch(`/api/walkers/${walkerObj.id}/update?name=${walkerObj.name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(walkerObj.name),
  });
};

export const removeWalker = (walkerId) => {
  return fetch(`/api/walkers/${walkerId}`, {
    method: "DELETE",
  });
};
