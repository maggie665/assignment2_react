import React, {Fragment, useEffect, useState} from 'react';
import {BaseUrl} from "./constants";
import axios from "axios";
import Login from "./Login";

function Semester(props) {
    const [token, setToken] = useState("");
    const [showDetail, setShowDetail] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [hasToken, setHasToken] = useState(false);
    const [inputSemester, setInputSemester] = useState("");
    const [inputYear, setInputYear] = useState(0);
    const [inputCourseIds, setInputCourseIds] = useState(0);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem('token'));
            setHasToken(true);
            getSemesters();
        } else {
            console.log("err");
        }
    }, [token]);

    function getSemesters() {
        axios.get(
            BaseUrl + 'semesters/',
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
            setSemesters(datas);
        }).catch(error => {
            console.log(error);
        });
    }

    function detailSemester(id) {
        axios.get(
            BaseUrl + 'semesters/' + id + '/',
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
            setSemesters(datas);
            setShowDetail(true);
        }).catch(error => {
            console.log(error);
        });
    }

    function createSemester() {
        axios.post(
            BaseUrl + 'semesters/',
            {"year": inputYear, "semester": inputSemester, "course": inputCourseIds},
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

    function updateSemester(id) {
        axios.put(
            BaseUrl + 'semesters/' + id+ '/',
            {
                "year": inputYear,
                "semesters": inputSemester,
                "course": inputCourseIds,
            },
            {
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem("token"),
                },
            }
        ).then(response => {
            console.log(response.data);
            getSemesters();
            setShowDetail(false);
        }).catch(error => {
            console.log(error)
        });
    }

    function deleteSemester(id) {
        axios.delete(
            BaseUrl + 'semesters/' + id + '/',
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

    function InputYearHandler(event) {
        setInputYear(event.target.value);
    }

    function InputCourseIdsHandler(event) {
        setInputCourseIds(event.target.value);
    }

    function InputSemesterHandler(event) {
        setInputSemester(event.target.value);
    }

    return (
        <div>
            {hasToken ?
                <>{showDetail ?
                    <table>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>year</th>
                            <th>semester</th>
                            <th>course</th>
                        </tr>
                        </thead>
                        <tbody>
                        {semesters.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.id}</td>
                                    <td>
                                        <input type="number" placeholder="year" onChange={InputYearHandler}/>
                                    </td>
                                    <td><input type="text" placeholder="semester"
                                               onChange={InputSemesterHandler}/>
                                    </td>
                                    <td>
                                        <input type="number" name="courses[]" placeholder="course ids"
                                               onChange={InputCourseIdsHandler}/>
                                    </td>
                                    <td>
                                        <button onClick={updateSemester(val.id)}>update</button>
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
                            <th>year</th>
                            <th>semester</th>
                            <th>course</th>
                        </tr>
                        </thead>
                        <tbody>
                        {semesters.map((val, key) => {
                            return (
                                <tr key={key}>
                                    {/*<td><a href="" onClick={detailSemester(val.id)}>{val.id}</a></td>*/}
                                    <td>{val.id}</td>
                                    <td>{val.year}</td>
                                    <td>{val.semester}</td>
                                    <td>{val.course}</td>
                                    <td>
                                        {/*<a href="" onClick={deleteSemester(val.id)}>delete</a>*/}
                                    </td>
                                </tr>
                            )
                        })}

                        <Fragment>
                            <tr>
                                <td><input type="number" placeholder="year" onChange={InputYearHandler}/></td>
                                <td><input type="text" placeholder="semester" onChange={InputSemesterHandler}/></td>
                                <td><input type="number" name="courses[]" placeholder="course id" onChange={InputCourseIdsHandler}/></td>
                                <td>
                                    <button onClick={createSemester}>create</button>
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

export default Semester;