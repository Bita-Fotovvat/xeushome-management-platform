import "./BurlingtonTwoProjPage.scss";
import BurlingtonTwoProj1 from "../../assets/images/7- burlington-project-2/1.jpg";
import BurlingtonTwoProj2 from "../../assets/images/7- burlington-project-2/2.jpg";
import BurlingtonTwoProj3 from "../../assets/images/7- burlington-project-2/3.jpg";
import BurlingtonTwoProj4 from "../../assets/images/7- burlington-project-2/4.jpg";
import BurlingtonTwoProj5 from "../../assets/images/7- burlington-project-2/5.jpg";
import BurlingtonTwoProj6 from "../../assets/images/7- burlington-project-2/6.jpg";
import BurlingtonTwoProj7 from "../../assets/images/7- burlington-project-2/7.jpg";
import BurlingtonTwoProj8 from "../../assets/images/7- burlington-project-2/8.jpg";
import BurlingtonTwoProj9 from "../../assets/images/7- burlington-project-2/9.jpg";
import BurlingtonTwoProj10 from "../../assets/images/7- burlington-project-2/10.jpg";
import BurlingtonTwoProj11 from "../../assets/images/7- burlington-project-2/11.jpg";
import BurlingtonTwoProj12 from "../../assets/images/7- burlington-project-2/12.jpg";
import BurlingtonTwoProj13 from "../../assets/images/7- burlington-project-2/13.jpg";
import BurlingtonTwoProj14 from "../../assets/images/7- burlington-project-2/14.jpg";
import BurlingtonTwoProj15 from "../../assets/images/7- burlington-project-2/13.jpg";
import BurlingtonTwoProj16 from "../../assets/images/7- burlington-project-2/14.jpg";

export default function BurlingtonTwoProjPage(){
    return(
        <main>
            <h1 className="burlingtonproject2__maintitle">Burlington Project No. 2</h1>
            <section className="burlingtonproject2__imageparent">
                <section className="burlingtonproject2__imageparent1">
                    <img loading="lazy" className="burlingtonproject2__image--1" src={BurlingtonTwoProj1} alt="kitchen renovation" />
                    <img loading="lazy" className="burlingtonproject2__image--2" src={BurlingtonTwoProj2} alt="living room renovation" />
                </section>
                <section className="burlingtonproject2__imageparent2">
                    <img loading="lazy" className="burlingtonproject2__image--3" src={BurlingtonTwoProj3} alt="walk-in closet inside building" />
                    <img loading="lazy" className="burlingtonproject2__image--4" src={BurlingtonTwoProj4} alt="walk-in closet inside remodeling" />
                </section>
                <section className="burlingtonproject2__imageparent3">
                    <img loading="lazy" className="burlingtonproject2__image--5" src={BurlingtonTwoProj5} alt="vinyl flooring" />
                    <img loading="lazy" className="burlingtonproject2__image--6" src={BurlingtonTwoProj6} alt="tiling floor" />
                </section>
                <section className="burlingtonproject2__imageparent4">
                    <img loading="lazy" className="burlingtonproject2__image--7" src={BurlingtonTwoProj7} alt="bathroom renovation" />
                    <img loading="lazy" className="burlingtonproject2__image--8" src={BurlingtonTwoProj8} alt="living room renovation" />
                </section>
                <section className="burlingtonproject2__imageparent5">
                    <img loading="lazy" className="burlingtonproject2__image--9" src={BurlingtonTwoProj9} alt="bathroom renovation" />
                    <img loading="lazy" className="burlingtonproject2__image--10" src={BurlingtonTwoProj10} alt="bathroom renovation" />
                </section>
                <section className="burlingtonproject2__imageparent6">
                    <img loading="lazy" className="burlingtonproject2__image--11" src={BurlingtonTwoProj11} alt="potlight installation" />
                    <img loading="lazy" className="burlingtonproject2__image--12" src={BurlingtonTwoProj12} alt="painting and flooring" />
                </section>
                <section className="burlingtonproject2__imageparent7">
                    <img loading="lazy" className="burlingtonproject2__image--13" src={BurlingtonTwoProj13} alt="flooring services" />
                    <img loading="lazy" className="burlingtonproject2__image--14" src={BurlingtonTwoProj14} alt="fireplace makeover & remodeling" />
                </section>
                <section className="burlingtonproject2__imageparent7">
                    <img loading="lazy" className="burlingtonproject2__image--15" src={BurlingtonTwoProj15} alt="flooring services" />
                    <img loading="lazy" className="burlingtonproject2__image--16" src={BurlingtonTwoProj16} alt="fireplace makeover & remodeling" />
                </section>
            </section>
        </main>
    )
}