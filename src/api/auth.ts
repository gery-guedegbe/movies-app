// Simulation d'une API d'authentification
export const fakeAuth = {
  isAuthenticated: false,

  signIn(cb: () => void) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },

  signOut(cb: () => void) {
    this.isAuthenticated = false;
    setTimeout(cb, 100); // fake async
  },
};
