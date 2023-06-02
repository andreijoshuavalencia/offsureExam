import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Car from "./pages/Car";
import Login from "./pages/Login";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          {/* <Route exact path="/" element={<Home />}></Route> */}
          <Route exact path="/home/:id" element={<Home />}></Route>
          <Route exact path="/car/:id" element={<Car />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;


// tasks
// add, edit, search, enquiry