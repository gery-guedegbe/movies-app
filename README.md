# MovieFinder

MovieFinder est une application web moderne développée avec **React**, **TypeScript** et **Vite** qui permet de rechercher, consulter et gérer vos films favoris grâce à l'API OMDb. L'interface est élégante, responsive et s'appuie sur **TailwindCSS** pour le style, avec des animations fluides grâce à **Motion**.

## Fonctionnalités principales

- **Recherche de films** : Trouvez rapidement des films par titre via l'API OMDb.
- **Accueil dynamique** : Section Hero avec carrousel de films vedettes, catégories (Nouveautés, Tendances, Action, Comédies).
- **Détails complets** : Consultez la fiche détaillée d'un film (synopsis, casting, note IMDb, genres, etc.).
- **Favoris** : Ajoutez ou retirez des films de vos favoris (stockés dans le state Redux).
- **Authentification simulée** : Accès à la page des favoris réservé aux utilisateurs connectés (identifiants de test : admin / 1234).
- **Animations et transitions** : Expérience utilisateur enrichie avec des effets visuels modernes.
- **Responsive** : Adapté à tous les écrans (mobile, tablette, desktop).
- **Notifications** : Feedback utilisateur via des toasts (ajout/retrait favoris, erreurs...).

## Stack technique

- **React** + **TypeScript**
- **Vite** (build ultra-rapide)
- **Redux Toolkit** (gestion d'état)
- **React Router DOM** (navigation)
- **TailwindCSS** (design)
- **Motion** (animations)
- **React Hot Toast** (notifications)
- **Axios** (requêtes HTTP)
- **OMDb API** (données films)
- **React Lazy Load Image** (optimisation images)
- **ESLint** & **Prettier** (qualité du code)

## Prise en main

1. **Installation des dépendances**

   ```sh
   npm install
   ```

2. **Lancement du serveur de développement**

   ```sh
   npm run dev
   ```

3. **Accès à l'application**
   Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## Authentification

- Accédez à la page **/login**.
- Utilisez les identifiants suivants :
  - **Nom d'utilisateur** : `admin`
  - **Mot de passe** : `1234`
- Une fois connecté, vous pouvez accéder à la page **/favorites** pour gérer vos films favoris.

## Structure du projet

```
src/
  api/           # Appels API (OMDb, auth)
  app/           # Store Redux, hooks personnalisés
  assets/        # Images et ressources statiques
  components/    # Composants UI réutilisables
  features/      # Slices Redux (auth, movies)
  hooks/         # Hooks personnalisés
  layout/        # Layout principal
  pages/         # Pages principales (Home, Search, Login, MovieDetails, Favorites)
  styles/        # Fichiers CSS (incl. Tailwind)
  types/         # Types TypeScript
  utils/         # Fonctions utilitaires
```

## Aperçu

- **Page d'accueil** : Carrousel de films, catégories, recherche rapide.
- **Recherche** : Saisie dynamique, résultats instantanés.
- **Détails film** : Infos complètes, ajout aux favoris.
- **Favoris** : Liste personnalisée, suppression possible.
- **Connexion** : Accès sécurisé aux favoris.

## Personnalisation

- Les clés d'API OMDb sont configurées dans [`src/api/omdb.ts`](src/api/omdb.ts).

- Les images de fond et posters sont personnalisables dans [`src/assets/images/`](src/assets/images/).

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request pour proposer des améliorations ou corriger des bugs.

---

**MovieFinder** – Un projet pédagogique pour explorer les meilleures pratiques React, TypeScript et l'intégration d'API tierces.
