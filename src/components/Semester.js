import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {BaseUrl} from "./constants";
import {useLocation} from "react-router-dom";


function Semester(props) {
    const [semesters, setSemesters] = useState([]);
    // const [hasToken, setHasToken] = useState(false);
    // const [userID, setUserID] = useState(0);



    useEffect(()=>{
        axios.get(BaseUrl+"semester/")
            .then(response=>{
                setSemesters(response.data)
            }).catch(error=>{
                console.log(error)
        })
    },[])

    return (
        <Fragment>
            {semesters.map(semester=>
                <p value={semester.id} key={semester.id}>{semester.name}</p>
            )}
        </Fragment>
    );
}




// function SemesterDetail(props) {
//     const location=useLocation();
//     const semester_id = location.state.semester_id
//     const [post, setPost] = useState({});
//     useEffect(()=>{
//         axios.get(BaseUrl+"semester/semester_viewset/"+semester_id)
//             .then(response=>{
//                 setSemester(response.data)
//             }).catch(error=>{
//                 console.log(error)
//         })
//     }, [post])
//
//     return (
//         <div>
//             <h1>{post.title}</h1>
//             <div>
//                 {post.body}
//             </div>
//         </div>
//     );
// }



export default Semester;