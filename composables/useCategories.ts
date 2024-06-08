import type { Category } from "~/types/category";

export default () => {
  const categories = [
    { value: "fiction", label: "Ficción" },
    { value: "mystery", label: "Misterio" },
    { value: "autobiography", label: "Autobiografía" },
    { value: "history", label: "Historia" },
    { value: "science", label: "Ciencia" },
    { value: "drama", label: "Drama" },
    { value: "poetry", label: "Poesía" },
    { value: "terror", label: "Terror" },
    { value: "romance", label: "Romance" },
    { value: "comedy", label: "Comedia" },
    { value: "children", label: "Infantil" },
    { value: "story", label: "Cuento" },
    { value: "politics", label: "Política" },
    { value: "philosophy", label: "Filosofía" },
    { value: "religion", label: "Religión" },
    { value: "essay", label: "Ensayo" },
    { value: "biography", label: "Biografías" },
    { value: "cooking", label: "Cocina" },
    { value: "guide", label: "Guía" },
    { value: "fantasy", label: "Fantasía" },
    { value: "film", label: "Cine" },
    { value: "music", label: "Música" },
    { value: "design", label: "Diseño" },
    { value: "programming", label: "Programación" },
    { value: "business", label: "Negocios" },
    { value: "health", label: "Salud" },
    { value: "interior_design", label: "Diseño de Interiores" },
  ];

  const getCategory = (categoryValue: string): Category => {
    return (
      categories.find((category) => category.value === categoryValue) ||
      categories.at(0)!
    );
  };

  return {
    categories,
    getCategory,
  };
};
