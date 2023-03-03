import axios from "axios";

const perrosApi = {
  obtenerImagenRandom: async (inputValue: string) => {
    const response = await axios.get(
      `https://dog.ceo/api/breed/${inputValue}/images/random`
    );
    return response.data.message;
  },
  obtenerRazas: async (query: string) => {
    const response = await axios.get("https://dog.ceo/api/breeds/list/all");
    const razas = Object.keys(response.data.message);
    const opciones = razas.flatMap((raza) => {
      const subrazas = response.data.message[raza];
      if (subrazas.length > 0) {
        return subrazas.map((subraza: string) => `${raza} ${subraza}`);
      } else {
        return raza;
      }
    });
    const sugerencias = opciones.filter(
      (opcion) =>
        opcion.toLowerCase().startsWith(query.toLowerCase()) ||
        opcion.toLowerCase().includes(query.toLowerCase())
    );
    return sugerencias;
  },
};

export default perrosApi;
