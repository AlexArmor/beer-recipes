import { create } from 'zustand';

export const useRecipes = create((set, get) => ({
    recipes: [],
    error: null,
    page: 1,
    fetchRecipes: async () => {
        try {
            const res = await fetch(`https://api.punkapi.com/v2/beers?page=${get().page}`);

            if (!res.ok) throw new Error('Failed to fetch! Try again.');

            set({ recipes: [...get().recipes, ...await res.json()], error: null });
        } catch (error) {
            set({ error: error.message });
        }
    },
    deleteItems: (filteredData) => set({ recipes: filteredData }),
    setPage: () => set({ page: get().page + 1 })
}));