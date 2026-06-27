import "./MiltonOneProjectPage.scss";
import MiltonOneProj1 from "../../assets/images/6-milton-project-1/1.jpg";
import MiltonOneProj2 from "../../assets/images/6-milton-project-1/2.jpg";
import MiltonOneProj3 from "../../assets/images/6-milton-project-1/3.jpg";
import MiltonOneProj4 from "../../assets/images/6-milton-project-1/4.jpg";
import MiltonOneProj5 from "../../assets/images/6-milton-project-1/5.jpg";
import MiltonOneProj6 from "../../assets/images/6-milton-project-1/6.jpg";

export default function MiltonOneProjectPage(){
    return(
        <main>
        <h1 className="miltonproject1__maintitle">Milton Project</h1>
        <section className="miltonproject1__imageparent">
            <section className="miltonproject1__imageparent1">
                <img className="miltonproject1__image--1" src={MiltonOneProj1} alt="kitchen renovation" loading="lazy" />
                <img className="miltonproject1__image--2" src={MiltonOneProj2} alt="living room renovation" loading="lazy" />
            </section>
            <section className="miltonproject1__imageparent2">
                <img className="miltonproject1__image--3" src={MiltonOneProj3} alt="walk-in closet inside building" loading="lazy" />
                <img className="miltonproject1__image--4" src={MiltonOneProj4} alt="walk-in closet inside remodeling" loading="lazy" />
            </section>
            <section className="miltonproject1__imageparent3">
                <img className="miltonproject1__image--5" src={MiltonOneProj5} alt="vinyl flooring" loading="lazy" />
                <img className="miltonproject1__image--6" src={MiltonOneProj6} alt="tiling floor" loading="lazy" />
            </section>
        </section>
    </main>
    )
}