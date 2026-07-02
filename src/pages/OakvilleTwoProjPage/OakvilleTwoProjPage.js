import "./OakvilleTwoProjPage.scss";
import OakvilleTwoProj1 from "../../assets/images/11-oakville-project-2/1.jpg";
import OakvilleTwoProj2 from "../../assets/images/11-oakville-project-2/2.jpg";
import OakvilleTwoProj3 from "../../assets/images/11-oakville-project-2/3.jpg";
import OakvilleTwoProj4 from "../../assets/images/11-oakville-project-2/4.jpg";
import OakvilleTwoProj5 from "../../assets/images/11-oakville-project-2/5.jpg";
import OakvilleTwoProj6 from "../../assets/images/11-oakville-project-2/6.jpg";
import OakvilleTwoProj7 from "../../assets/images/11-oakville-project-2/7.jpg";
import OakvilleTwoProj8 from "../../assets/images/11-oakville-project-2/8.jpg";
import OakvilleTwoProj9 from "../../assets/images/11-oakville-project-2/9.jpg";

export default function OakvilleTwoProjPage(){
    return(
        <main>
            <h1 className="oakvilleproject2__maintitle">Oakville Project No. 2</h1>
            <section className="oakvilleproject2__imageparent">
                <section className="oakvilleproject2__imageparent1">
                    <img loading="lazy" className="oakvilleproject2__image--1" src={OakvilleTwoProj1} alt="kitchen renovation" />
                    <img loading="lazy" className="oakvilleproject2__image--2" src={OakvilleTwoProj2} alt="living room renovation" />
                </section>
                <section className="oakvilleproject2__imageparent2">
                    <img loading="lazy" className="oakvilleproject2__image--3" src={OakvilleTwoProj3} alt="walk-in closet inside building" />
                    <img loading="lazy" className="oakvilleproject2__image--4" src={OakvilleTwoProj4} alt="walk-in closet inside remodeling" />
                </section>
                <section className="oakvilleproject2__imageparent3">
                    <img loading="lazy" className="oakvilleproject2__image--5" src={OakvilleTwoProj5} alt="vinyl flooring" />
                    <img loading="lazy" className="oakvilleproject2__image--6" src={OakvilleTwoProj6} alt="tiling floor" />
                </section>
                <section className="oakvilleproject2__imageparent4">
                    <img loading="lazy" className="oakvilleproject2__image--7" src={OakvilleTwoProj7} alt="bathroom renovation" />
                    <img loading="lazy" className="oakvilleproject2__image--8" src={OakvilleTwoProj8} alt="living room renovation" />
                </section>
                <section className="oakvilleproject2__imageparent5">
                    <img loading="lazy" className="oakvilleproject2__image--9" src={OakvilleTwoProj9} alt="bathroom renovation" />
                </section>
            </section>
        </main>
    )
}