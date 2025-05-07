import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  document.title = "Fundesoemco";
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
