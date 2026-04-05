import "./App.css";
import AppRouter from "./components/AppRouter/AppRouter";
import { Header } from "./components/Header/Header";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Header></Header>
      <main>
        <AppRouter></AppRouter>
      </main>
    </AuthProvider>
  );
}

export default App;
