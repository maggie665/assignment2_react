import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import Login from "./Login";

function Lecturer(props) {
    const [token, setToken] = useState("");
    const [showDetail, setShowDetail] = useState(false);
    const [lecturers, setStudents] = useState([]);
    const [hasToken, setHasToken] = useState(false);
    const [inputFirstName, setInputFirstName] = useState("");
    const [inputLastName, setInputLastName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputDOB, setInputDOB] = useState(Date.now());

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem('token'));
            setHasToken(true);
            getLecturers();
        } else {
            console.log("err");
        }
    }, [token]);

    function getLecturers() {
        axios.get(
            BaseUrl + 'lecturers/',
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
            setStudents(datas);
        }).catch(error => {
            console.log(error);
        });
    }

    function detailLecturer(id) {
        axios.get(
            BaseUrl + 'lecturers/' + id + '/',
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
            setStudents(datas);
            setShowDetail(true);
        }).catch(error => {
            console.log(error);
        });
    }

    function createLecturer() {
        axios.post(
            BaseUrl + 'lecturers/',
            {"lecturer_fname": inputFirstName, "lecturer_lname": inputLastName, "lecturer_email": inputEmail, "DOB": inputDOB},
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

    function updateStudent(id) {
        axios.put(
            BaseUrl + 'lecturers/' + id + '/',
            {
                "lecturer_fname": inputFirstName,
                "lecturer_lname": inputLastName,
                "lecturer_email": inputEmail,
                "DOB": inputDOB
            },
            {
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem("token"),
                },
            }
        ).then(response => {
            console.log(response.data);
            getLecturers();
            setShowDetail(false);
        }).catch(error => {
            console.log(error)
        });
    }

    function deleteLecturer(id) {
        axios.delete(
            BaseUrl + 'lecturers/' + id + '/',
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

    function InputFirstNameHandler(event) {
        setInputFirstName(event.target.value);
    }

    function InputLastNameHandler(event) {
        setInputLastName(event.target.value);
    }

    function InputEmailHandler(event) {
        setInputEmail(event.target.value);
    }

    function InputDOBHandler(event) {
        setInputDOB(event.target.value);
    }

    return (
        <div>
            {hasToken ?
                <>{showDetail ?
                    <table>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>lecturer first name</th>
                            <th>lecturer last name</th>
                            <th>lecturer email</th>
                            <th>lecturer DOB</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lecturers.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.id}</td>
                                    <td>
                                        <input type="text" placeholder="first name" onChange={InputFirstNameHandler}/>
                                    </td>
                                    <td>
                                        <input type="text" placeholder="last name" onChange={InputLastNameHandler}/>
                                    </td>
                                    <td>
                                        <input type="text" placeholder="email" onChange={InputEmailHandler}/>
                                    </td>
                                    <td>
                                        <input type="date" placeholder="DOB" onChange={InputDOBHandler}/>
                                    </td>
                                    <td>
                                        <button onClick={updateStudent(val.id)}>update</button>
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
                            <th>lecturer id</th>
                            <th>lecturer first name</th>
                            <th>lecturer last name</th>
                            <th>lecturer email</th>
                            <th>lecturer DOB</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lecturers.map((val, key) => {
                            return (
                                <tr key={key}>
                                    {/*<td><a href="" onClick={detailLecturer(val.id)}>{val.id}</a></td>*/}
                                    <td>{val.id}</td>
                                    <td>{val.lecturer_fname}</td>
                                    <td>{val.lecturer_lname}</td>
                                    <td>{val.student_email}</td>
                                    <td>{val.DOB}</td>
                                    <td>
                                        {/*<a href="" onClick={deleteLecturer(val.id)}>delete</a>*/}
                                    </td>
                                </tr>
                            )
                        })}
                        <Fragment>
                            <tr>
                                <td>
                                    <input type="text" placeholder="first name" onChange={InputFirstNameHandler}/>
                                </td>
                                <td>
                                    <input type="text" placeholder="last name" onChange={InputLastNameHandler}/>
                                </td>
                                <td>
                                    <input type="text" placeholder="email" onChange={InputEmailHandler}/>
                                </td>
                                <td>
                                    <input type="date" placeholder="DOB" onChange={InputDOBHandler}/>
                                </td>
                                <td>
                                    <button onClick={createLecturer}>create</button>
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

export default Lecturer;