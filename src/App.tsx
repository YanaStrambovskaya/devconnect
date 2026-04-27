import "./App.css";
import AppRouter from "./components/AppRouter/AppRouter";
import { Header } from "./components/Header/Header";
import { AuthProvider } from "./contexts/AuthProvider";
import { ModalProvider } from "./contexts/ModalProvider";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <Header></Header>
        <main>
          <AppRouter></AppRouter>
        </main>
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
