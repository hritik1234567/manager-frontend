import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../utility/about.css'; // For custom styles
import Navbar from './Navbar';

function About() {
  return (
    <>
    <Navbar/>
    <div className="about-container">
      <div className="container py-2">
        <div className="row">
          <div className="col-lg-6 mb-4">
            <h2 className="mb-3">Our Mission</h2>
            <p>
              At HealthTrack, our mission is to empower individuals to take control of their health and well-being through innovative technology and personalized insights. We believe in making health tracking accessible, intuitive, and engaging for everyone.
            </p>
            <p>
              We are committed to providing users with accurate health data, actionable insights, and a user-friendly experience. Our platform is designed to help you track your fitness progress, monitor health metrics, and achieve your wellness goals.
            </p>
          </div>
          <div className="col-lg-6 mb-4">
            <h2 className="mb-3">Our Team</h2>
            <p>
              Our team is composed of passionate professionals with diverse expertise in health technology, data analysis, and user experience design. We work collaboratively to ensure that our platform meets the highest standards of quality and user satisfaction.
            </p>
            <p>
              Meet our dedicated team members who are committed to delivering an exceptional health tracking experience. From developers to health experts, each member of our team plays a crucial role in advancing our mission and vision.
            </p>
          </div>
        </div>
        <div className="text-center mt-5">
          <h2>Contact Us</h2>
          <p>If you have any questions or feedback, feel free to contact us. We're here to help and support you on your health journey.</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default About;
