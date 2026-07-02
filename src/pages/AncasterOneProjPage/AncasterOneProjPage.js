import "./AncasterOneProjPage.scss";
import AncasterOneProj1 from "../../assets/images/3-Ancaster-1-Project/1.jpg";
import AncasterOneProj2 from "../../assets/images/3-Ancaster-1-Project/2.jpg";
import AncasterOneProj3 from "../../assets/images/3-Ancaster-1-Project/3.jpg";
import AncasterOneProj4 from "../../assets/images/3-Ancaster-1-Project/4.jpg";
import AncasterOneProj5 from "../../assets/images/3-Ancaster-1-Project/5.jpg";
import AncasterOneProj6 from "../../assets/images/3-Ancaster-1-Project/6.jpg";
import AncasterOneProj7 from "../../assets/images/3-Ancaster-1-Project/7.jpg";
import AncasterOneProj8 from "../../assets/images/3-Ancaster-1-Project/8.jpg";
import AncasterOneProj9 from "../../assets/images/3-Ancaster-1-Project/9.jpg";
import AncasterOneProj10 from "../../assets/images/3-Ancaster-1-Project/10.jpg";
import AncasterOneProj11 from "../../assets/images/3-Ancaster-1-Project/11.jpg";
import AncasterOneProj12 from "../../assets/images/3-Ancaster-1-Project/12.jpg";
import AncasterOneProj13 from "../../assets/images/3-Ancaster-1-Project/13.jpg";
import AncasterOneProj14 from "../../assets/images/3-Ancaster-1-Project/14.jpg";

export default function AncasterOneProjPage(){
    return(
        <main>
            <h1 className="ancasterproject1__maintitle">Ancaster Project</h1>
            <section className="ancasterproject1__imageparent">
                <section className="ancasterproject1__imageparent1">
                    <img loading="lazy" className="ancasterproject1__image--1" src={AncasterOneProj1} alt="kitchen renovation" />
                    <img loading="lazy" className="ancasterproject1__image--2" src={AncasterOneProj2} alt="living room renovation" />
                </section>
                <section className="ancasterproject1__imageparent2">
                    <img loading="lazy" className="ancasterproject1__image--3" src={AncasterOneProj3} alt="walk-in closet inside building" />
                    <img loading="lazy" className="ancasterproject1__image--4" src={AncasterOneProj4} alt="walk-in closet inside remodeling" />
                </section>
                <section className="ancasterproject1__imageparent3">
                    <img loading="lazy" className="ancasterproject1__image--5" src={AncasterOneProj5} alt="vinyl flooring" />
                    <img loading="lazy" className="ancasterproject1__image--6" src={AncasterOneProj6} alt="tiling floor" />
                </section>
                <section className="ancasterproject1__imageparent4">
                    <img loading="lazy" className="ancasterproject1__image--7" src={AncasterOneProj7} alt="bathroom renovation" />
                    <img loading="lazy" className="ancasterproject1__image--8" src={AncasterOneProj8} alt="living room renovation" />
                </section>
                <section className="ancasterproject1__imageparent5">
                    <img loading="lazy" className="ancasterproject1__image--9" src={AncasterOneProj9} alt="bathroom renovation" />
                    <img loading="lazy" className="ancasterproject1__image--10" src={AncasterOneProj10} alt="bathroom renovation" />
                </section>
                <section className="ancasterproject1__imageparent6">
                    <img loading="lazy" className="ancasterproject1__image--11" src={AncasterOneProj11} alt="potlight installation" />
                    <img loading="lazy" className="ancasterproject1__image--12" src={AncasterOneProj12} alt="painting and flooring" />
                </section>
                <section className="ancasterproject1__imageparent7">
                    <img loading="lazy" className="ancasterproject1__image--13" src={AncasterOneProj13} alt="flooring services" />
                    <img loading="lazy" className="ancasterproject1__image--14" src={AncasterOneProj14} alt="fireplace makeover & remodeling" />
                </section>
            </section>
        </main>
    )
}