"use client";

function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
export default Providers;

// import { createContext, useContext } from "react";

// const GlobalContext = createContext<string | null>(null);

// function Provider({ children }: { children: React.ReactNode }) {
//   return (
//     <GlobalContext.Provider value="test">{children}</GlobalContext.Provider>
//   );
// }

// export const useTheme = useContext(GlobalContext);

// export default Provider;
