import "./MississaugaTwoProjPage.scss";
import MississaugaTwoProj1 from "../../assets/images/9-Mississauga-project-2/1.jpg";
import MississaugaTwoProj2 from "../../assets/images/9-Mississauga-project-2/2.jpg";
import MississaugaTwoProj3 from "../../assets/images/9-Mississauga-project-2/3.jpg";
import MississaugaTwoProj4 from "../../assets/images/9-Mississauga-project-2/4.jpg";

export default function MississaugaTwoProjPage(){
    return(
        <main>
            <h1 className="mississaugaproject2__maintitle">Mississauga Project No. 2</h1>
            <section className="mississaugaproject2__imageparent">
                <section className="mississaugaproject2__imageparent1">
                    <img loading="lazy" className="mississaugaproject2__image--1" src={MississaugaTwoProj1} alt="kitchen renovation" />
                    <img loading="lazy" className="mississaugaproject2__image--2" src={MississaugaTwoProj2} alt="living room renovation" />
                </section>
                <section className="mississaugaproject2__imageparent2">
                    <img loading="lazy" className="mississaugaproject2__image--3" src={MississaugaTwoProj3} alt="walk-in closet inside building" />
                    <img loading="lazy" className="mississaugaproject2__image--4" src={MississaugaTwoProj4} alt="walk-in closet inside remodeling" />
                </section>
            </section>
        </main>
    )
}