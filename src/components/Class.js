import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import Login from "./Login";


function Classes(props) {
    const [token, setToken] = useState("");
    const [showDetail, setShowDetail] = useState(false);
    const [classes, setClasses] = useState([]);
    const [hasToken, setHasToken] = useState(false);
    const [inputNumber, setInputNumber] = useState(Date.now());
    const [inputCourse, setInputCourse] = useState("");
    const [inputSemester, setInputSemester] = useState(Date.now());
    const [inputLecturer, setInputLecturer] = useState("");
    const [inputStudents, setInputStudents] = useState("");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem('token'));
            setHasToken(true);
            getClasses();
        } else {
            console.log("err");
        }
    }, [token]);

    function getClasses() {
        axios.get(
            BaseUrl + 'classes/',
            {
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem("token"),
                },
            }
        ).then(response => {
            let datas = [];
            for (let i = 0; i < response.data.length; i++) {
                console.log(response.data[i]);
                datas.push(response.data[i]);
            }
            setClasses(datas);
        }).catch(error => {
            console.log(error);
        });
    }

    function detailClass(id) {
        axios.get(
            BaseUrl + 'classes/' + id + '/',
            {
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem("token"),
                },
            }
        ).then(response => {
            let datas = [];
            for (let i = 0; i < response.data.length; i++) {
                console.log(response.data[i]);
                datas.push(response.data[i]);
            }
            setClasses(datas);
            setShowDetail(true);
        }).catch(error => {
            console.log(error);
        });
    }

    function createClass() {
        axios.post(
            BaseUrl + 'classes/',
            {"number": inputNumber, "course": inputCourse, "semester": inputSemester, "lecturer": inputLecturer, "student": inputStudents},
            {
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem("token"),
                },
            }
        ).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error)
        });
    }

    function updateClass(id) {
        axios.put(
            BaseUrl + 'classes/' + id+ '/',
            {"number": inputNumber, "course": inputCourse, "semester": inputSemester, "lecturer": inputLecturer, "student": inputStudents},
            {
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem("token"),
                },
            }
        ).then(response => {
            console.log(response.data);
            getClasses();
            setShowDetail(false);
        }).catch(error => {
            console.log(error)
        });
    }

    function deleteClass(id) {
        axios.delete(
            BaseUrl + 'classes/' + id + '/',
            {},
            {
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem("token"),
                },
            }
        ).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error)
        });
    }

    function InputNumberHandler(event) {
        setInputNumber(event.target.value);
    }

    function InputCourseHandler(event) {
        setInputCourse(event.target.value);
    }

    function InputSemesterHandler(event) {
        setInputSemester(event.target.value);
    }

    function InputLecturerHandler(event) {
        setInputLecturer(event.target.value);
    }

    function InputStudentHandler(event) {
        setInputStudents(event.target.value);
    }

    return (
        <div>
            {hasToken ?
                <>{showDetail ?
                    <table>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>number</th>
                            <th>course</th>
                            <th>semester</th>
                            <th>lecturer</th>
                            <th>student</th>
                        </tr>
                        </thead>
                        <tbody>
                        {classes.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.id}</td>
                                    <td>
                                        <input type="number" placeholder="number" onChange={InputNumberHandler}/>
                                    </td>
                                    <td>
                                        <input type="number" placeholder="course" onChange={InputCourseHandler}/>
                                    </td>
                                    <td>
                                        <input type="number" placeholder="semester" onChange={InputSemesterHandler}/>
                                    </td>
                                    <td>
                                        <input type="number" name="lecturer" placeholder="lecturer id" onChange={InputLecturerHandler}/>
                                    </td>
                                    <td>
                                        <input type="number" name="students[]" placeholder="student ids" onChange={InputStudentHandler}/>
                                    </td>
                                    <td>
                                        <button onClick={updateClass(val.id)}>update</button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    :
                    <table>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>number</th>
                            <th>course</th>
                            <th>semester</th>
                            <th>lecturer</th>
                            <th>student</th>
                        </tr>
                        </thead>
                        <tbody>
                        {classes.map((val, key) => {
                            return (
                                <tr key={key}>
                                    {/*<td><a href="" onClick={detailCourse(val.id)}>{val.id}</a></td>*/}
                                    <td>{val.id}</td>
                                    <td>{val.number}</td>
                                    <td>{val.course}</td>
                                    <td>{val.semester}</td>
                                    <td>{val.lecturer}</td>
                                    <td>{val.student}</td>
                                    <td>
                                        {/*<a href="" onClick={deleteCourse(val.id)}>delete</a>*/}
                                    </td>
                                </tr>
                            )
                        })}

                        <Fragment>
                            <tr>
                                <td>
                                    <input type="number" placeholder="number" onChange={InputNumberHandler}/>
                                </td>
                                <td>
                                    <input type="number" placeholder="course" onChange={InputCourseHandler}/>
                                </td>
                                <td>
                                    <input type="number" placeholder="semester" onChange={InputSemesterHandler}/>
                                </td>
                                <td>
                                    <input type="number" name="lecturer" placeholder="lecturer id" onChange={InputLecturerHandler}/>
                                </td>
                                <td>
                                    <input type="number" name="students[]" placeholder="student ids" onChange={InputStudentHandler}/>
                                </td>
                                <td>
                                    <button onClick={createClass}>create</button>
                                </td>
                            </tr>
                        </Fragment>
                        </tbody>
                    </table>
                }
                </>
                :
                <Login/>
            }
        </div>
    );
}

export default Classes;