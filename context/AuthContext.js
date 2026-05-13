import { createContext, useContext, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const db = useSQLiteContext();

  const login = async (nom, mdp) => {
    try {
      const result = await db.getFirstAsync(
        "SELECT * FROM client WHERE nom = ? AND mdp = ?",
        [nom, mdp],
      );

      if (result) {
        setUser(result);

        if (result.langue) {
          i18n.changeLanguage(result.langue);
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
