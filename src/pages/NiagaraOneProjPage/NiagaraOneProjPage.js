import "./NiagaraOneProjPage.scss";
import NiagaraOneProj1 from "../../assets/images/1-Niagara-1-project/1.jpg";
import NiagaraOneProj2 from "../../assets/images/1-Niagara-1-project/2.jpg";
import NiagaraOneProj3 from "../../assets/images/1-Niagara-1-project/3.jpg";
import NiagaraOneProj4 from "../../assets/images/1-Niagara-1-project/4.jpg";
import NiagaraOneProj5 from "../../assets/images/1-Niagara-1-project/5.jpg";
import NiagaraOneProj6 from "../../assets/images/1-Niagara-1-project/6.jpg";
import NiagaraOneProj7 from "../../assets/images/1-Niagara-1-project/7.jpg";
import NiagaraOneProj8 from "../../assets/images/1-Niagara-1-project/8.jpg";
import NiagaraOneProj9 from "../../assets/images/1-Niagara-1-project/9.jpg";
import NiagaraOneProj10 from "../../assets/images/1-Niagara-1-project/10.jpg";

export default function NiagaraOneProjPage(){
    return(
        <main>
            <h1 className="niagaraproject1__maintitle">Niagara Project</h1>
            <section className="niagaraproject1__imageparent">
                <section className="niagaraproject1__imageparent1">
                    <img className="niagaraproject1__image--1" src={NiagaraOneProj1} alt="living room renovation drywall and framing" loading="lazy" />
                    <img className="niagaraproject1__image--2" src={NiagaraOneProj2} alt="dining room renovation drywall and framing" loading="lazy" />
                </section>
                <section className="niagaraproject1__imageparent2">
                    <img className="niagaraproject1__image--3" src={NiagaraOneProj3} alt="bedroom renovation drywall and framing" loading="lazy" />
                    <img className="niagaraproject1__image--4" src={NiagaraOneProj4} alt="bedroom renovation drywall" loading="lazy" />
                </section>
                <section className="niagaraproject1__imageparent3">
                    <img className="niagaraproject1__image--5" src={NiagaraOneProj5} alt="renovation ceiling drywall" loading="lazy" />
                    <img className="niagaraproject1__image--6" src={NiagaraOneProj6} alt="renovation plumbing & electrical services" loading="lazy" />
                </section>
                <section className="niagaraproject1__imageparent4">
                    <img className="niagaraproject1__image--7" src={NiagaraOneProj7} alt="bedroom renovation" loading="lazy" />
                    <img className="niagaraproject1__image--8" src={NiagaraOneProj8} alt="living room renovation" loading="lazy" />
                </section>
                <section className="niagaraproject1__imageparent5">
                    <img className="niagaraproject1__image--9" src={NiagaraOneProj9} alt="bathroom renovation" loading="lazy" />
                    <img className="niagaraproject1__image--10" src={NiagaraOneProj10} alt="kitchen renovation" loading="lazy" />
                </section>
                
            </section>
        </main>
    )
}