import React, { useState } from 'react';
import './Student.css';

const StudentDashboard = () => {
    const [courses] = useState([
        {
            id: 1,
            name: 'React for Beginners',
            videoUrl: 'https://www.example.com/video1',
            imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
            price: 29.99,
            enrolled: true,
        },
        {
            id: 2,
            name: 'Advanced JavaScript',
            videoUrl: 'https://www.example.com/video2',
            imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
            price: 39.99,
            enrolled: true,
        },
        {
            id: 3,
            name: 'CSS Mastery',
            videoUrl: 'https://www.example.com/video3',
            imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
            price: 19.99,
            enrolled: true,
        },
    ]);

    return (
        <div className="student-dashboard-custom container mt-5">
            <h2 className="student-dashboard-custom__header text-center">Student Dashboard</h2>

            <h3 className="student-dashboard-custom__subheader">Your Courses</h3>
            <table className="student-dashboard-custom__table table table-striped">
                <thead>
                    <tr>
                        <th>Course Image</th>
                        <th>Course Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>
                                <img src={course.imageUrl} alt={course.name} className="student-dashboard-custom__course-image" />
                            </td>
                            <td>{course.name}</td>
                            <td>${course.price.toFixed(2)}</td>
                            <td className="student-dashboard-custom__action-buttons">
                                <button 
                                    onClick={() => window.open(course.videoUrl, '_blank')}
                                    className="student-dashboard-custom__btn-info">
                                    Watch Video
                                </button>
                                <button className="student-dashboard-custom__btn-success">
                                    Buy Now
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentDashboard;
