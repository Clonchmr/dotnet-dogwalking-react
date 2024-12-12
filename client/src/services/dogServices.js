export const getDogs = () => {
  return fetch("/api/dogs").then((res) => res.json());
};
