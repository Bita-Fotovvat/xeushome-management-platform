import "./TorontoShelbysTwoProjPage.scss";
import TorontoTwoProj1 from "../../assets/images/12-toronto-shelby's Project-2/1.jpg";
import TorontoTwoProj2 from "../../assets/images/12-toronto-shelby's Project-2/2.jpg";
import TorontoTwoProj3 from "../../assets/images/12-toronto-shelby's Project-2/3.jpg";
import TorontoTwoProj4 from "../../assets/images/12-toronto-shelby's Project-2/4.jpg";
import TorontoTwoProj5 from "../../assets/images/12-toronto-shelby's Project-2/5.jpg";
import TorontoTwoProj6 from "../../assets/images/12-toronto-shelby's Project-2/6.jpg";
import TorontoTwoProj7 from "../../assets/images/12-toronto-shelby's Project-2/7.jpg";
import TorontoTwoProj8 from "../../assets/images/12-toronto-shelby's Project-2/8.jpg";
import TorontoTwoProj9 from "../../assets/images/12-toronto-shelby's Project-2/9.jpg";

export default function TorontoShelbysTwoProjPage(){
    return(
        <main>
            <h1 className="torontoproject2__maintitle">Toronto Restaurant Project No. 2</h1>
            <section className="torontoproject2__imageparent">
                <section className="torontoproject2__imageparent1">
                    <img className="torontoproject2__image--1" src={TorontoTwoProj1} alt="kitchen renovation" loading="lazy" />
                    <img className="torontoproject2__image--2" src={TorontoTwoProj2} alt="living room renovation" loading="lazy" />
                </section>
                <section className="torontoproject2__imageparent2">
                    <img className="torontoproject2__image--3" src={TorontoTwoProj3} alt="walk-in closet inside building" loading="lazy" />
                    <img className="torontoproject2__image--4" src={TorontoTwoProj4} alt="walk-in closet inside remodeling" loading="lazy" />
                </section>
                <section className="torontoproject2__imageparent3">
                    <img className="torontoproject2__image--5" src={TorontoTwoProj5} alt="vinyl flooring" loading="lazy" />
                    <img className="torontoproject2__image--6" src={TorontoTwoProj6} alt="tiling floor" loading="lazy" />
                </section>
                <section className="torontoproject2__imageparent4">
                    <img className="torontoproject2__image--7" src={TorontoTwoProj7} alt="bathroom renovation" loading="lazy" />
                    <img className="torontoproject2__image--8" src={TorontoTwoProj8} alt="living room renovation" loading="lazy" />
                </section>
                <section className="torontoproject2__imageparent5">
                    <img className="torontoproject2__image--9" src={TorontoTwoProj9} alt="bathroom renovation" loading="lazy" />
                </section>
            </section>
        </main>
    )
}