import "./styles/Career.css";
import MathematicalModels from "./MathematicalModels";
import { Suspense } from "react";

const Career = () => {
  return (
    <div className="career-section section-container" style={{ position: "relative" }}>
      <Suspense fallback={null}>
        <MathematicalModels />
      </Suspense>
      <div className="career-container" style={{ zIndex: 1, position: "relative" }}>
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Assistant Professor of Mathematics</h4>
                <h5>Govt. Degree College, Chaman</h5>
              </div>
              <h3>2018 - Now</h3>
            </div>
            <p>
              Leading academic instruction in mathematics while engaging in advanced research in fractional calculus, CAGD, and AI integration for complex problem solving.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Lecturer in Mathematics (B-17)</h4>
                <h5>Govt. Degree College, Brewery & Govt. Musa College, Quetta</h5>
              </div>
              <h3>2008 - 2018</h3>
            </div>
            <p>
              Delivered foundational and advanced mathematics courses, cultivating a strong analytical framework for hundreds of students.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Early Career Instruction</h4>
                <h5>St. Francis Grammar School | APS Seven Streams, Quetta</h5>
              </div>
              <h3>Early</h3>
            </div>
            <p>
              Built early career teaching experience, emphasizing foundational academic concepts to younger students.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
