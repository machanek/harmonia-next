// components/AboutSection.tsx
import React from "react";

export default function AboutSection() {
  return (
    <section className="section-about" id="o-nas">
      <div className="container about-inner">

        {/* Nagłówek 1:1 z legacy */}
        <div className="about-heading">
          <h2>O nas</h2>
          <p className="about-subtitle">
            Nowoczesne osiedle domów i mieszkań pod Krakowem. Idealne miejsce dla rodzin.
          </p>
        </div>

        {/* Treść sekcji */}
        <div className="about-content">
          <p>
            Harmonia Rząska to wyjątkowa inwestycja mieszkaniowa położona w malowniczej miejscowości
            Rząska, zaledwie kilka kilometrów od granic Krakowa. Nasze osiedle łączy w sobie nowoczesną
            architekturę z poszanowaniem dla naturalnego otoczenia.
          </p>
          <p>
            Oferujemy różnorodne typy mieszkań – od kompaktowych po przestronne lokale z balkonami,
            tarasami lub prywatnymi ogródkami. Każde mieszkanie zostało zaprojektowane z myślą o
            komforcie i funkcjonalności.
          </p>
          <p>
            Doskonała komunikacja z Krakowem, bliskość terenów rekreacyjnych oraz rozwijająca się
            infrastruktura lokalna sprawiają, że Harmonia Rząska to idealne miejsce dla rodzin,
            które szukają spokoju bez rezygnacji z miejskich udogodnień.
          </p>
        </div>

      </div>
    </section>
  );
}
