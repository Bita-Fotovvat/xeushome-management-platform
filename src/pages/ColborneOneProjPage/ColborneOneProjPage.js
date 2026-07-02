import "./ColborneOneProjPage.scss";
import ColborneOneProj1 from "../../assets/images/8-colborne-project-1/1.png";
import ColborneOneProj2 from "../../assets/images/8-colborne-project-1/2.png";
import ColborneOneProj3 from "../../assets/images/8-colborne-project-1/3.png";
import ColborneOneProj4 from "../../assets/images/8-colborne-project-1/4.png";
import ColborneOneProj5 from "../../assets/images/8-colborne-project-1/5.png";
import ColborneOneProj6 from "../../assets/images/8-colborne-project-1/6.png";
import ColborneOneProj7 from "../../assets/images/8-colborne-project-1/7.png";
import ColborneOneProj8 from "../../assets/images/8-colborne-project-1/8.png";
import ColborneOneProj9 from "../../assets/images/8-colborne-project-1/9.png";
import ColborneOneProj10 from "../../assets/images/8-colborne-project-1/10.png";
import ColborneOneProj11 from "../../assets/images/8-colborne-project-1/11.png";
import ColborneOneProj12 from "../../assets/images/8-colborne-project-1/12.png";
import ColborneOneProj13 from "../../assets/images/8-colborne-project-1/13.png";
import ColborneOneProj14 from "../../assets/images/8-colborne-project-1/14.png";

export default function ColborneOneProjPage(){
    return(
        <main>
            <h1 className="colborneproject1__maintitle">Colborne Project</h1>
            <section className="colborneproject1__imageparent">
                <section className="colborneproject1__imageparent1">
                    <img loading="lazy" className="colborneproject1__image--1" src={ColborneOneProj1} alt="kitchen renovation" />
                    <img loading="lazy" className="colborneproject1__image--2" src={ColborneOneProj2} alt="living room renovation" />
                </section>
                <section className="colborneproject1__imageparent2">
                    <img loading="lazy" className="colborneproject1__image--3" src={ColborneOneProj3} alt="walk-in closet inside building" />
                    <img loading="lazy" className="colborneproject1__image--4" src={ColborneOneProj4} alt="walk-in closet inside remodeling" />
                </section>
                <section className="colborneproject1__imageparent3">
                    <img loading="lazy" className="colborneproject1__image--5" src={ColborneOneProj5} alt="vinyl flooring" />
                    <img loading="lazy" className="colborneproject1__image--6" src={ColborneOneProj6} alt="tiling floor" />
                </section>
                <section className="colborneproject1__imageparent4">
                    <img loading="lazy" className="colborneproject1__image--7" src={ColborneOneProj7} alt="bathroom renovation" />
                    <img loading="lazy" className="colborneproject1__image--8" src={ColborneOneProj8} alt="living room renovation" />
                </section>
                <section className="colborneproject1__imageparent5">
                    <img loading="lazy" className="colborneproject1__image--9" src={ColborneOneProj9} alt="bathroom renovation" />
                    <img loading="lazy" className="colborneproject1__image--10" src={ColborneOneProj10} alt="bathroom renovation" />
                </section>
                <section className="colborneproject1__imageparent6">
                    <img loading="lazy" className="colborneproject1__image--11" src={ColborneOneProj11} alt="potlight installation" />
                    <img loading="lazy" className="colborneproject1__image--12" src={ColborneOneProj12} alt="painting and flooring" />
                </section>
                <section className="colborneproject1__imageparent7">
                    <img loading="lazy" className="colborneproject1__image--13" src={ColborneOneProj13} alt="flooring services" />
                    <img loading="lazy" className="colborneproject1__image--14" src={ColborneOneProj14} alt="fireplace makeover & remodeling" />
                </section>
            </section>
        </main>
    )
}