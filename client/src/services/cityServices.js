export const getCities = () => {
  return fetch("/api/cities").then((res) => res.json());
};
