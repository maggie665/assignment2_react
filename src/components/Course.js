import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import Login from "./Login";

function Course(props) {
    const [token, setToken] = useState("");
    const [showDetail, setShowDetail] = useState(false);
    const [courses, setCourses] = useState([]);
    const [hasToken, setHasToken] = useState(false);
    const [inputCode, setInputCode] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputHoursPerDay, setInputHoursPerDay] = useState(0);
    const [inputTotalhours, setInputTotalhours] = useState(0);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem('token'));
            setHasToken(true);
            getCourses();
        } else {
            console.log("err");
        }
    }, [token]);

    function getCourses() {
        axios.get(
            BaseUrl + 'courses/',
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
            setCourses(datas);
        }).catch(error => {
            console.log(error);
        });
    }

    function detailCourse(id) {
        axios.get(
            BaseUrl + 'courses/' + id + '/',
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
            setCourses(datas);
            setShowDetail(true);
        }).catch(error => {
            console.log(error);
        });
    }

    function createCourse() {
        axios.post(
            BaseUrl + 'courses/',
            {"code": inputCode, "name": inputName, "hours_per_day": inputHoursPerDay, "totalhours": inputTotalhours},
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

    function updateCourse(id) {
        axios.put(
            BaseUrl + 'courses/' + id+ '/',
            {
                "code": inputCode,
                "name": inputName,
                "hours_per_day": inputHoursPerDay,
                "totalhours": inputTotalhours,
            },
            {
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem("token"),
                },
            }
        ).then(response => {
            console.log(response.data);
            getCourses();
            setShowDetail(false);
        }).catch(error => {
            console.log(error)
        });
    }

    function deleteCourse(id) {
        axios.delete(
            BaseUrl + 'courses/' + id + '/',
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

    function InputCodeHandler(event) {
        setInputCode(event.target.value);
    }

    function InputNameHandler(event) {
        setInputName(event.target.value);
    }

    function InputHoursPerDayHandler(event) {
        setInputHoursPerDay(event.target.value);
    }

    function InputTotalhoursHandler(event) {
        setInputTotalhours(event.target.value);
    }

    return (
        <div>
            {hasToken ?
                <>{showDetail ?
                    <table>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>code</th>
                            <th>name</th>
                            <th>hours per day</th>
                            <th>total hours</th>
                        </tr>
                        </thead>
                        <tbody>
                        {courses.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.id}</td>
                                    <td>
                                        <input type="text" placeholder="code" onChange={InputCodeHandler}/>
                                    </td>
                                    <td>
                                        <input type="text" placeholder="name" onChange={InputNameHandler}/>
                                    </td>
                                    <td><input type="number" placeholder="hours per day" onChange={InputHoursPerDayHandler}/>
                                    </td>
                                    <td>
                                        <input type="number" placeholder="total hours" onChange={InputTotalhoursHandler}/>
                                    </td>
                                    <td>
                                        <button onClick={updateCourse(val.id)}>update</button>
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
                            <th>code</th>
                            <th>name</th>
                            <th>hours per day</th>
                            <th>total hours</th>
                        </tr>
                        </thead>
                        <tbody>
                        {courses.map((val, key) => {
                            return (
                                <tr key={key}>
                                    {/*<td><a href="" onClick={detailCourse(val.id)}>{val.id}</a></td>*/}
                                    <td>{val.id}</td>
                                    <td>{val.code}</td>
                                    <td>{val.name}</td>
                                    <td>{val.hours_per_day}</td>
                                    <td>{val.totalhours}</td>
                                    <td>
                                        {/*<a href="" onClick={deleteCourse(val.id)}>delete</a>*/}
                                    </td>
                                </tr>
                            )
                        })}

                        <Fragment>
                            <tr>
                                <td>
                                    <input type="text" placeholder="code" onChange={InputCodeHandler}/>
                                </td>
                                <td>
                                    <input type="text" placeholder="name" onChange={InputNameHandler}/>
                                </td>
                                <td><input type="number" placeholder="hours per day" onChange={InputHoursPerDayHandler}/>
                                </td>
                                <td>
                                    <input type="number" placeholder="total hours" onChange={InputTotalhoursHandler}/>
                                </td>
                                <td>
                                    <button onClick={createCourse}>create</button>
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

export default Course;