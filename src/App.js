import './App.css';
import Main from './pages/Main/Main';
import Result from './pages/Result/Result';
import { Routes, Route, BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/main" element = {<Main />}/>
        <Route path = "/main/result" element = {<Result />}/>
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
