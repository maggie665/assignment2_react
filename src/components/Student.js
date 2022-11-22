import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import Login from "./Login";

function Student(props) {
    const [token, setToken] = useState("");
    const [showDetail, setShowDetail] = useState(false);
    const [students, setStudents] = useState([]);
    const [hasToken, setHasToken] = useState(false);
    const [inputFirstName, setInputFirstName] = useState("");
    const [inputLastName, setInputLastName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputDOB, setInputDOB] = useState(Date.now());

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem('token'));
            setHasToken(true);
            getStudents();
        } else {
            console.log("err");
        }
    }, [token]);

    function getStudents() {
        axios.get(
            BaseUrl + 'students/',
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

    function detailStudent(id) {
        axios.get(
            BaseUrl + 'students/' + id + '/',
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

    function createStudent() {
        axios.post(
            BaseUrl + 'students/',
            {"student_fname": inputFirstName, "student_lname": inputLastName, "student_email": inputEmail, "DOB": inputDOB},
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
            BaseUrl + 'students/' + id + '/',
            {
                "student_fname": inputFirstName,
                "student_lname": inputLastName,
                "student_email": inputEmail,
                "DOB": inputDOB
            },
            {
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem("token"),
                },
            }
        ).then(response => {
            console.log(response.data);
            getStudents();
            setShowDetail(false);
        }).catch(error => {
            console.log(error)
        });
    }

    function deleteStudent(id) {
        axios.delete(
            BaseUrl + 'students/' + id + '/',
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
                            <th>student first name</th>
                            <th>student last name</th>
                            <th>student email</th>
                            <th>student DOB</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map((val, key) => {
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
                            <th>id</th>
                            <th>student first name</th>
                            <th>student last name</th>
                            <th>student email</th>
                            <th>student DOB</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map((val, key) => {
                            return (
                                <tr key={key}>
                                    {/*<td><a href="" onClick={detailStudent(val.id)}>{val.id}</a></td>*/}
                                    <td>{val.id}</td>
                                    <td>{val.student_fname}</td>
                                    <td>{val.student_lname}</td>
                                    <td>{val.student_email}</td>
                                    <td>{val.DOB}</td>
                                    <td>
                                        {/*<a href="" onClick={deleteStudent(val.id)}>delete</a>*/}
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
                                    <button onClick={createStudent}>create</button>
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

export default Student;