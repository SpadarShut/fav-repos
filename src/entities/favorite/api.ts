import { create } from "zustand";
import { Repository } from "@/entities/repo/api";

type RepoMeta = {
  name: string;
  owner: string;
};

type Store = {
  favorites: Map<string, RepoMeta>;
};

export const useFavorites = create<Store>(() => ({
  favorites: new Map(),
}));

export const toggleFavorite = ({ id, owner, name }: Repository) => {
  useFavorites.setState(({ favorites }) => {
    const newFavorites = new Map(favorites);
    if (favorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.set(id, { name, owner: owner.login });
    }
    return {
      favorites: newFavorites,
    };
  });
};
