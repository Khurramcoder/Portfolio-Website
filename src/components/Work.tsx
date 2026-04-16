import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            { name: "SigmaMath-Visual-Core (8B)", category: "AI & LLM Engineering", tools: "Transformers, PyTorch, LLaMA", image: "/images/sigmamath.png" },
            { name: "Qwen-GeoGebra-Coder-7B", category: "AI & Math Visualization", tools: "GeoGebra, Qwen, SymPy", image: "/images/geogebra.png" },
            { name: "Shaheen-Gemma4-Urdu (5B)", category: "Vision-Language Models & OCR", tools: "Gemma, Nastaliq OCR, RAG", image: "/images/shaheen_logo.png" },
            { name: "Fractional-Calculus", category: "Computational Mathematics Software", tools: "Python, NumPy, SciPy", image: "/images/fderiv.gif" },
            { name: "IncompressibleNavierStokes.jl", category: "Fluid Dynamics Solver", tools: "Julia, High-performance Computing", image: "/images/TaylorGreenVortex3D.png" },
            { name: "Allama-Iqbal-RAG", category: "Cultural AI Preservation", tools: "FAISS, Llama 3.1, LangChain", image: "/images/iqbal_rag.png" }
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
