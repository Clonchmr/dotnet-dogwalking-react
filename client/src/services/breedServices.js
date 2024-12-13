export const getBreeds = () => {
  return fetch("/api/breeds").then((res) => res.json());
};

export const postNewBreed = (breedObj) => {
  return fetch("/api/breeds", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(breedObj),
  });
};
