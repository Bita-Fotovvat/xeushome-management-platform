import "./TorontoShelbysOnePage.scss";
import TorontoOneProj1 from "../../assets/images/10-toronto-shelby's Project-1/1.jpg";
import TorontoOneProj2 from "../../assets/images/10-toronto-shelby's Project-1/2.jpg";
import TorontoOneProj3 from "../../assets/images/10-toronto-shelby's Project-1/3.jpg";
import TorontoOneProj4 from "../../assets/images/10-toronto-shelby's Project-1/4.jpg";
import TorontoOneProj5 from "../../assets/images/10-toronto-shelby's Project-1/5.jpg";

export default function TorontoShelbysOnePage(){
    return(
        <main>
            <h1 className="torontoproject1__maintitle">Toronto Restaurant Project</h1>
            <section className="torontoproject1__imageparent">
                <section className="torontoproject1__imageparent1">
                    <img loading="lazy" className="torontoproject1__image--1" src={TorontoOneProj1} alt="kitchen renovation" />
                    <img loading="lazy" className="torontoproject1__image--2" src={TorontoOneProj2} alt="living room renovation" />
                </section>
                <section className="torontoproject1__imageparent2">
                    <img loading="lazy" className="torontoproject1__image--3" src={TorontoOneProj3} alt="walk-in closet inside building" />
                    <img loading="lazy" className="torontoproject1__image--4" src={TorontoOneProj4} alt="walk-in closet inside remodeling" />
                </section>
                <section className="torontoproject1__imageparent3">
                    <img loading="lazy" className="torontoproject1__image--5" src={TorontoOneProj3} alt="walk-in closet inside building" />
                </section>
            </section> 
        </main>
    )
}