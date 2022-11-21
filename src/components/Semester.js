import React from 'react';
import axios from "axios";
import * as url from "url";
import {BaseUrl} from "./constants";

function Semester(props) {
    function createSemester(){
        axios.post(
            url：BaseUrl + 'semester/',


        )
    }
    return (
        <div>
            This is Semester page
        </div>
    );
}

export default Semester;