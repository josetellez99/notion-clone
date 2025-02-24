import { AppRouter } from "@/routes/appRouter";
import { PagesProvider } from "./contexts/PageContext";

function App() {
  return (
    <PagesProvider>
      <AppRouter />
    </PagesProvider>
  );
}

export default App;