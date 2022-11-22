import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import Login from "./Login";

function Collegedays(props) {
    const [token, setToken] = useState("");
    const [showDetail, setShowDetail] = useState(false);
    const [collegedays, setCollegedays] = useState([]);
    const [hasToken, setHasToken] = useState(false);
    const [inputDate, setInputDate] = useState(Date.now());
    const [inputClasses, setInputClasses] = useState("");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem('token'));
            setHasToken(true);
            getCollegedays();
        } else {
            console.log("err");
        }
    }, [token]);


    function getCollegedays() {
        axios.get(
            BaseUrl + 'collegedays/',
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
            setCollegedays(datas);
        }).catch(error => {
            console.log(error);
        });
    }

    function detailCollegeday(id) {
        axios.get(
            BaseUrl + 'collegedays/' + id + '/',
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
            setCollegedays(datas);
            setShowDetail(true);
        }).catch(error => {
            console.log(error);
        });
    }

    function createCollegeday() {
        axios.post(
            BaseUrl + 'collegedays/',
            {"date": inputDate, "class": inputClasses},
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

    function updateCollegeday(id) {
        axios.put(
            BaseUrl + 'collegedays/' + id+ '/',
            {
                "date": inputDate,
                "class": inputClasses,
            },
            {
                headers: {
                    'Authorization': 'Token ' + localStorage.getItem("token"),
                },
            }
        ).then(response => {
            console.log(response.data);
            getCollegedays();
            setShowDetail(false);
        }).catch(error => {
            console.log(error)
        });
    }

    function deleteCollegeday(id) {
        axios.delete(
            BaseUrl + 'collegedays/' + id + '/',
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

    function InputDateHandler(event) {
        setInputDate(event.target.value);
    }

    function InputClassesHandler(event) {
        setInputClasses(event.target.value);
    }

    return (
        <div>
            {hasToken ?
                <>{showDetail ?
                    <table>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>date</th>
                            <th>class</th>
                        </tr>
                        </thead>
                        <tbody>
                        {collegedays.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.id}</td>
                                    <td>
                                        <input type="date" placeholder="date" onChange={InputDateHandler}/>
                                    </td>
                                    <td>
                                        <input type="number" name="classes[]" placeholder="classes ids" onChange={InputClassesHandler}/>
                                    </td>
                                    <td>
                                        <button onClick={updateCollegeday(val.id)}>update</button>
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
                        {collegedays.map((val, key) => {
                            return (
                                <tr key={key}>
                                    {/*<td><a href="" onClick={detailCourse(val.id)}>{val.id}</a></td>*/}
                                    <td>{val.id}</td>
                                    <td>{val.date}</td>
                                    <td>{val.class}</td>
                                    <td>
                                        {/*<a href="" onClick={deleteCourse(val.id)}>delete</a>*/}
                                    </td>
                                </tr>
                            )
                        })}

                        <Fragment>
                            <tr>
                                <td>
                                    <input type="date" placeholder="date" onChange={InputDateHandler}/>
                                </td>
                                <td>
                                    <input type="number" name="classes[]" placeholder="classes ids" onChange={InputClassesHandler}/>
                                </td>
                                <td>
                                    <button onClick={createCollegeday}>create</button>
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

export default Collegedays;