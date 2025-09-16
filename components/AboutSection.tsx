// components/AboutSection.tsx
import React from "react";

export default function AboutSection() {
  return (
    <section className="section-about" id="o-nas">
      <div className="container about-inner">
        <h2>O nas</h2>

        <p>
          Harmonia Rząska to wyjątkowa inwestycja mieszkaniowa położona w malowniczej miejscowości
          Rząska, zaledwie kilka kilometrów od granic Krakowa. Nasze osiedle łączy w sobie nowoczesną
          architekturę z poszanowaniem dla naturalnego otoczenia.
        </p>

        <p>
          Oferujemy różnorodne typy mieszkań - od kompaktowych dwupokojowych po przestronne
          czteropokojowe lokale z balkonami, tarasami, a niektóre z prywatnymi ogródkami. Każde
          mieszkanie zostało zaprojektowane z myślą o maksymalnym komforcie i funkcjonalności.
        </p>

        <p>
          Doskonała komunikacja z Krakowem, bliskość lasów i terenów rekreacyjnych oraz rozwijająca
          się infrastruktura lokalna sprawiają, że Harmonia Rząska to idealne miejsce dla rodzin
          poszukujących spokoju bez rezygnacji z miejskich udogodnień.
        </p>
      </div>
    </section>
  );
}
