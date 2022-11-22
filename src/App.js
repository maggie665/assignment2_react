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
import Admin from "./components/Admin";



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
          <Route path={"admin"} element = {<Admin/>}/>
        {/*<Route path={"collegedayDetail"} element={ <collegedayDetail/> } />*/}
        {/*<Route path={"Createcollegeday"} element={ <Createcollegeday/> } />*/}
        {/*<Route path={"Updatecollegeday"} element={ <Updatecollegeday/> } />*/}
        {/*        <Route path={"SemesterDetail"} element={ <SemesterDetail/> } />*/}
        {/*<Route path={"CreateSemester"} element={ <CreateSemester/> } />*/}
        {/*<Route path={"UpdateSemester"} element={ <UpdateSemester/> } />*/}
        {/* <Route path={"StudentDetail"} element={ <StudentDetail/> } />*/}
        {/*<Route path={"CreateStudent"} element={ <CreateStudent/> } />*/}
        {/*<Route path={"UpdateStudent"} element={ <UpdateStudent/> } />*/}
        {/*<Route path={"LecturerDetail"} element={ <LecturerDetail/> } />*/}
        {/*<Route path={"CreateLecturer"} element={ <CreateLecturer/> } />*/}
        {/*<Route path={"UpdateLecturer"} element={ <UpdateLecturer/> } />*/}
        {/*<Route path={"classDetail"} element={ <classDetail/> } />*/}
        {/*<Route path={"Createclass"} element={ <Createclass/> } />*/}
        {/*<Route path={"Updateclass"} element={ <Updateclass/> } />*/}
        {/*<Route path={"courseDetail"} element={ <courseDetail/> } />*/}
        {/*<Route path={"Createcourse"} element={ <Createcourse/> } />*/}
        {/*<Route path={"Updatecourse"} element={ <Updatecourse/> } />*/}
      </Routes>
    </div>
  );
}

export default App;
