export const getAllWalkers = () => {
  return fetch("/api/walkers").then((res) => res.json());
};

export const assignDogToWalker = (dogId, walkerId) => {
  return fetch(`/api/dogs/${dogId}/assign?walkerId=${walkerId}`, {
    method: "POST",
  });
};
