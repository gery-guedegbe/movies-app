import axios from "axios";

const BASE_URL = "http://www.omdbapi.com/?apikey=13189ac5";

export const searchMovies = async (query: string, page: number = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        s: query,
        page,
        type: "movie",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (id: string) => {
  // Validation de l'ID
  if (!id.startsWith("tt")) {
    throw new Error("Invalid IMDb ID format");
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        i: id,
        plot: "full",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
