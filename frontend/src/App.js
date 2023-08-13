import './App.css';
import{BrowserRouter as Router, Routes,Route} from "react-router-dom"
import LandingPage from './Pages/LandingPage';
import SignInPage from './Pages/SignInPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path='/signinpage' element={<SignInPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
