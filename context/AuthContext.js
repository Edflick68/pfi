import { createContext, useContext, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { setAppLanguage } from "../i18n";

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
          setAppLanguage(result.langue);
        }

        return result;
      }
      return null;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return null;
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
