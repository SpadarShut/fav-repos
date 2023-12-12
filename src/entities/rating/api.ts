import { create } from "zustand";

type Store = {
  ratings: Record<string, number>;
  setRating: (repoId: string, rating: number) => void;
};

export const useRating = create<Store>((set) => ({
  ratings: {},
  setRating: (repoId, rating) =>
    set((store) => ({
      ratings: {
        ...store.ratings,
        [repoId]: rating,
      },
    })),
}));
