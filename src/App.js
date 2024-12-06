import './App.css';
import Main from './pages/Main/Main';
import Result from './pages/Result/Result';
import { Routes, Route, BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Main />}/>
        <Route path = "/result" element = {<Result />}/>
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
