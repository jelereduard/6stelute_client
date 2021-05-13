import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonCol, IonContent, IonGrid, IonRow, IonButton } from '@ionic/react';
import './style.css'

interface Utils{
  showing?:boolean;
  id?:string
}



export const Quiz: React.FC<RouteComponentProps> = () => {

  let [state, setState] = useState<Utils>({});
  const [paragrafCurent, setParagrafCurent] = useState(0);
  const { showing, id } = state;

  return(
    <IonPage>
      
      <IonHeader>
        <IonToolbar>
          <IonTitle className="title"><h1 className="header-logo">QuizzLearn<i className="fab fa-react"></i></h1></IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-content">
        <IonGrid className="ion-grid">
          <IonRow className="ion-row">
            <IonCol className="ion-col">
              <IonRow className="ion-row">
                <IonCol>
                <IonButton className="ion-button-bubble" color="tertiary"onClick={() =>
                    setParagrafCurent(paragrafCurent=>{
                      if(paragrafCurent-1 === -1)
                        return 9
                      else
                        return paragrafCurent-1%10
                    })}>
                Inapoi
              </IonButton>
                </IonCol>
                <IonCol>
                <IonButton className="ion-button-bubble" color="tertiary"onClick={() =>
                    setParagrafCurent(paragrafCurent=>(paragrafCurent+1)%10)}>
                Inainte
              </IonButton>
                </IonCol>
              </IonRow>
              <IonRow className="ion-row">
                <h3>Bubble {paragrafCurent+1} / 10</h3>
                <p className="bubble-text" id='1' style={{display:(paragrafCurent === 0 ? 'block' : 'none')}}>&nbsp;&nbsp;&nbsp;Cercetările asupra creativității individuale în organizații fac progrese considerabile în înțelegerea modului și a momentelor în care oamenii dezvoltă idei noi și folositoare la locul de muncă. De asemenea, cercetătorii au examinat modul în care creativitatea apare în urma interacțiunii dintre un individ și mediul în care aceasta lucrează.</p>
                <p className="bubble-text" id='2' style={{display:(paragrafCurent === 1 ? 'block' : 'none')}}>&nbsp;&nbsp;&nbsp;Creativitatea poate fi definită ca un răspuns adaptativ la mediu, prin care individul poate să ajungă la niște stări dorite sau să depășească niște amenințări din mediu. Stările pozitive și negative influențează creativitatea prin impactul lor asupra funcționării cognitive.</p>
                <p className="bubble-text" id='3' style={{display:(paragrafCurent === 2 ? 'block' : 'none')}}>&nbsp;&nbsp;&nbsp;O stare pozitivă facilitează gândirea asociativă, susține procesarea informației în mod euristic și oferă o viziune mai largă asupra modului de a gândi și de a acționa. Din informațiile pe care le avem până acum, creativitatea poate fi sporită prin măsuri ce stimulează o stare pozitivă cum ar fi, un discurs inspirațional al unui lider sau prin implicarea angajaților în activități care să le aducă satisfacții.</p>
                <p className="bubble-text" id='4' style={{display:(paragrafCurent === 3 ? 'block' : 'none')}}>&nbsp;&nbsp;&nbsp;Consecințele stărilor negative asupra creativității sunt mai complexe și se consideră că aceste stări împiedică creativitatea. Totuși, aceasta poate fi o sursă de sporire a creativității. Stările negative apar atunci când indivizii se confruntă cu amenințări și ca o consecință, atenția este îndreptată asupra problemei. Prin urmare, unii autori sustin faptul ca oamenii demonstreaza un nivel ridicat de persistenta intr-o sarcina atunci cand se afla intr-o stare negativa.</p>
                <p className="bubble-text" id='5' style={{display:(paragrafCurent === 4 ? 'block' : 'none')}}>&nbsp;&nbsp;&nbsp;Mai mult decât atât, stările negative pot să evoce un răspuns de autoreglare care poate activa un mod de gândire creativ și să rezulte într-o schimbare în starea unui individ. Realizările creative complexe nu sunt un rezultat al unei singure stări dintr-un anumit moment. Experiențele negative pot contribui la creativitate atunci când individul se află într-un mediu în care se simte sprijinit si caracterizat preponderent de stari pozitive. </p>
                <p className="bubble-text" id='6' style={{display:(paragrafCurent === 5 ? 'block' : 'none')}}>&nbsp;&nbsp;&nbsp;Perceptia asupra autoeficacitatii personale a primit atentie considerabila ca fiind un predictor consistent al creativitatii si un mediator al legaturii acesteia cu factorii contextuali.</p>
                <p className="bubble-text" id='7' style={{display:(paragrafCurent === 6 ? 'block' : 'none')}}>&nbsp;&nbsp;&nbsp;Spre exemplu, studiile arata ca relatiile de inalta calitate ale angajatilor cu liderii lor si membrii echipelor din care fac parte, au o influenta pozitiva asupra autoeficacitatii, care in schimb are un efect pozitiv asupra creativitatii. Prin urmare, autoeficacitatea, in mod particular atunci cand este relationata cu creativitatea, poate sa fie privita ca si un indicator al acesteia. </p>
                <p className="bubble-text" id='8' style={{display:(paragrafCurent === 7 ? 'block' : 'none')}}>&nbsp;&nbsp;&nbsp;Trebuie sa fie, insa luat in considerare faptul ca, aceste studii nu permit o fundamentare stiintifica in ceea priveste o relatie de cauzalitate intre autoeficacitate si creativitate, mai degraba autoeficacitatea reprezinta dovada ca aspectele motivationale, conditile cognitive si sociale favorizeaza creativitatea. </p>
                <p className="bubble-text" id='9' style={{display:(paragrafCurent === 8 ? 'block' : 'none')}}>&nbsp;&nbsp;&nbsp;In ceea ce priveste trasaturile de personalitate, proactivitatea a fost identificata ca unul dintre stimulentii principali al creativitatii, iar relatia lor este mediata de perceptia indivizilor asupra autoeficacitatii personale.</p>
                <p className="bubble-text" id='10' style={{display:(paragrafCurent === 9 ? 'block' : 'none')}}>&nbsp;&nbsp;&nbsp;Oamenii proactivi interactioneaza cu contextual social intr-un mod care sporeste creativitatea si sunt mai creativi deoarece ei au initiativa de a face schimb de informatie cu cei din jurul lor.  Prin urmare cantitatea de informatie pe care o au la dispoziție crește, stabilind, simultan, si o retea sociala caracterizata de relatii bazate pe încredere și siguranță psihologica ce susține dezvoltarea de noi idei. În mod similar, oamenii care nu sunt motivati doar intrinsec, dar si de dorința de a-i ajuta pe ceilalți, sunt mai predispuși la a dezvolta idei noi si utile.</p>
              
              </IonRow>
            </IonCol>
            <IonCol className="ion-col">
              <div>
                <h2>Tabel scor </h2>
                <IonRow className="header-row">

                  <div id="1">
                    <p>Conform informatiilor precizate anterior, care dintre urmatoarele elemente influenteaza creativitatea la nivel individual?</p>
                  </div>


                
                </IonRow>


              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
        
      </IonContent>

      </IonPage>
  )
}