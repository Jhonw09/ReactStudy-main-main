import React, { useRef } from "react";
import "./style.css";

export default function Card3D() {
  const cardRef = useRef(null);
  const decorLeftRef = useRef(null);
  const decorRightRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const decorLeft = decorLeftRef.current;
    const decorRight = decorRightRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / 25).toFixed(2);
    const rotateY = (x / 25).toFixed(2);

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    if (decorLeft && decorRight) {
      decorLeft.style.transform = `translateX(-40px) translateZ(-20px) rotateY(-45deg)`;
      decorRight.style.transform = `translateX(40px) translateZ(-20px) rotateY(45deg)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const decorLeft = decorLeftRef.current;
    const decorRight = decorRightRef.current;

    if (!card) return;

    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    if (decorLeft && decorRight) {
      decorLeft.style.transform = `translateX(0) translateZ(0) rotateY(0)`;
      decorRight.style.transform = `translateX(0) translateZ(0) rotateY(0)`;
    }
  };

  return (
    <div className="container">
      <div
        ref={cardRef}
        className="card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-front">
          <h2>Bem-vindo!</h2>
          <p>Estude com a StudyConnect+</p>
        </div>
        <div ref={decorLeftRef} className="card-decor-left">
          🌟
        </div>
        <div ref={decorRightRef} className="card-decor-right">
          🚀
        </div>
      </div>
    </div>
  );
}
