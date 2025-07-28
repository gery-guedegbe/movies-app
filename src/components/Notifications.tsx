import { toast } from "react-hot-toast";

export const notifyAddedToFavorites = () =>
  toast.success("Ajouté aux favoris !", { icon: "👍" });

export const notifyRemovedFromFavorites = () =>
  toast.success("Retiré des favoris !", { icon: "❤️" });

export const notifyError = (message: string) =>
  toast.error(message || "Une erreur est survenue");
