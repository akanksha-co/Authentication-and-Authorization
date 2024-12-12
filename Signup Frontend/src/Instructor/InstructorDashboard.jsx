import React, { useEffect, useState } from 'react';
import './Instructor.css'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Logout from '../Logout/Logout';

const InstructorDashboard = () => {
    const [courseName, setCourseName] = useState('');
    const [enrolledCount, setEnrolledCount] = useState(0);
    const [courses, setCourses] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const verifyToken = async () => {
    //         const token = Cookies.get('jwt'); 
    //         if (!token) {
    //             navigate('/login'); 
    //             return;
    //         }
    //      console.log(token);
         
    //         try {
                
    //             const response = await axios.get('http://localhost:3000/api/v1/decode', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`, // Include the token in the header
    //                 },
    //             });
               

    //                console.log("hi i am data"+response.data.data.user.Role);
                   
                  

    //             if (response.data.success && response.data.data.user && response.data.data.user.Role === 'Instructor') {
    //                 setIsAuthorized(true);
    //             } else {
    //                 navigate('/student'); 
    //             }
    //         } catch (error) {
    //             console.error('Error verifying token:', error);
    //             navigate('/login');
    //         }
    //     };

    //     verifyToken();
    // }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (courseName) {
            setCourses([...courses, { name: courseName, enrolled: enrolledCount }]);
            setCourseName('');
            setEnrolledCount(0);
        }
    };

    return (
        <div className="unique-instructor-dashboard container mt-5">
            <h2 className="text-center">Instructor Dashboard</h2>

            <form className="unique-form mb-4" onSubmit>
                <div className="form-group">
                    <label htmlFor="courseName">Course Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="courseName"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="enrolledCount">Number of Enrolled Students</label>
                    <input
                        type="number"
                        className="form-control"
                        id="enrolledCount"
                        value={enrolledCount}
                        onChange={(e) => setEnrolledCount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Publish Course</button>
            </form>

            <h3>Published Courses</h3>
            <table className="unique-course-table table table-striped">
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Enrolled Students</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => (
                        <tr key={index}>
                            <td>{course.name}</td>
                            <td>{course.enrolled}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Logout/>
        </div>
    );
};

export default InstructorDashboard;
