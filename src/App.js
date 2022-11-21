import logo from './logo.svg';
import './App.css';
import {Route, Router, Routes} from "react-router-dom";
import Home from "./components/Home";
import Course from "./components/Course";
import Semester from "./components/Semester";
import NavBar from "./components/NavBar";
import Login from "./components/Login";
import Student from "./components/Student";
import Lecturer from "./components/Lecturer";
import Class from "./components/Class";
import Collegeday from "./components/Collegeday";


function App() {
  return (
    <div className="App">
        <NavBar />
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="semester" element={ <Semester/> } />
          <Route path="login" element={ <Login/> } />
          <Route path={"student"} element = {<Student/>} />
          <Route path={"lecturer"} element = {<Lecturer/>}/>
          <Route path={"class"} element = {<Class/>}/>
          <Route path={"course"} element = {<Course/>}/>
          <Route path={"collegeday"} element = {<Collegeday/>}/>
      </Routes>
    </div>
  );
}

export default App;
