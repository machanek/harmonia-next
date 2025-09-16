// components/AboutSection.tsx
import React from "react";

export default function AboutSection() {
  return (
    <section className="section-about" id="o-nas" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-text">
          <p>
            Harmonia Rząska to wyjątkowa inwestycja mieszkaniowa położona w malowniczej miejscowości Rząska,
            zaledwie kilka kilometrów od granic Krakowa. Nasze osiedle łączy w sobie nowoczesną architekturę
            z poszanowaniem dla naturalnego otoczenia.
          </p>
          <p>
            Oferujemy różnorodne typy mieszkań – od kompaktowych dwupokojowych po przestronne czteropokojowe
            lokale z balkonami, tarasami, a niektóre z prywatnymi ogródkami. Każde mieszkanie zostało
            zaprojektowane z myślą o maksymalnym komforcie i funkcjonalności.
          </p>
          <p>
            Doskonała komunikacja z Krakowem, bliskość lasów i terenów rekreacyjnych oraz rozwijająca się
            infrastruktura lokalna sprawiają, że Harmonia Rząska to idealne miejsce dla rodzin poszukujących
            spokoju bez rezygnacji z miejskich udogodnień.
          </p>
        </div>

        <div className="about-heading">
          <h2 id="about-title" className="about-title">
            <span>TARASY</span><br />
            <span>HARMONIA</span><br />
            <span>RZĄSKA</span>
          </h2>
          <p className="about-subtitle">
            Nowoczesne mieszkania<br />pod Krakowem
          </p>
        </div>
      </div>
    </section>
  );
}
