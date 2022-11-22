import React, {useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";

function SemesterDetail(props) {
    const [token, setToken] = useState("");
    const [showDetail, setShowDetail] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [hasToken, setHasToken] = useState(false);
    const [inputSemester, setInputSemester] = useState("");
    const [inputYear, setInputYear] = useState(0);
    const [inputCourseIds, setInputCourseIds] = useState(0);

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



    return (
        <div>

        </div>
    );
}

export default SemesterDetail;