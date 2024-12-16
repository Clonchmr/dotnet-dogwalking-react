export const getAllWalkers = () => {
  return fetch("/api/walkers").then((res) => res.json());
};
