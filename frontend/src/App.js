import './App.css';
import{BrowserRouter as Router, Routes,Route} from "react-router-dom"
import LandingPage from './Pages/LandingPage';
import SignInPage from './Pages/SignInPage';
import ChatFlowBuilder from './Pages/ChatFlowBuilder';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signinpage" element={<SignInPage />} />
          <Route path='chatpage' element={ <ChatFlowBuilder/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
