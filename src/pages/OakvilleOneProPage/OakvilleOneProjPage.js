import "./OakvilleOneProjPage.scss";
import OakvilleOneProj1 from "../../assets/images/2-oakville-bath-project/1.jpg";
import OakvilleOneProj2 from "../../assets/images/2-oakville-bath-project/2.jpg";
import OakvilleOneProj3 from "../../assets/images/2-oakville-bath-project/3.jpg";
import OakvilleOneProj4 from "../../assets/images/2-oakville-bath-project/4.jpg";
import OakvilleOneProj5 from "../../assets/images/2-oakville-bath-project/5.jpg";
import OakvilleOneProj6 from "../../assets/images/2-oakville-bath-project/6.jpg";
import OakvilleOneProj7 from "../../assets/images/2-oakville-bath-project/7.jpg";
import OakvilleOneProj8 from "../../assets/images/2-oakville-bath-project/8.jpg";
import OakvilleOneProj9 from "../../assets/images/2-oakville-bath-project/9.jpg";

export default function OakvilleOneProjPage(){
    return(
        <main>
            <h1 className="oakvilleproject1__maintitle">Oakville Project</h1>
            <section className="oakvilleproject1__imageparent">
                <section className="oakvilleproject1__imageparent1">
                    <img loading="lazy" className="oakvilleproject1__image--1" src={OakvilleOneProj1} alt="" />
                    <img loading="lazy" className="oakvilleproject1__image--2" src={OakvilleOneProj2} alt="" />
                </section>
                <section className="oakvilleproject1__imageparent2">
                    <img loading="lazy" className="oakvilleproject1__image--3" src={OakvilleOneProj3} alt="" />
                    <img loading="lazy" className="oakvilleproject1__image--4" src={OakvilleOneProj4} alt="" />
                </section>
                <section className="oakvilleproject1__imageparent3">
                    <img loading="lazy" className="oakvilleproject1__image--5" src={OakvilleOneProj5} alt="" />
                    <img loading="lazy" className="oakvilleproject1__image--6" src={OakvilleOneProj6} alt="" />
                </section>
                <section className="oakvilleproject1__imageparent4">
                    <img loading="lazy" className="oakvilleproject1__image--7" src={OakvilleOneProj7} alt="" />
                    <img loading="lazy" className="oakvilleproject1__image--8" src={OakvilleOneProj8} alt="" />
                </section>
                <img loading="lazy" className="oakvilleproject1__image--9" src={OakvilleOneProj9} alt="" />
            </section>
        </main>
    )
}