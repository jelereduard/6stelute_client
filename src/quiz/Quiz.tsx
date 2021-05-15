import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonCol, IonContent, IonGrid, IonRow, IonButton, IonItem, IonLabel, IonList, IonListHeader, IonRadio, IonRadioGroup } from '@ionic/react';
import './style.css'
import { Header } from '../core/Header';


export const Quiz: React.FC<RouteComponentProps> = () => {

  const [paragrafCurent, setParagrafCurent] = useState(0);
  const [intrebareCurenta, setIntrebareCurenta] = useState(-1);
  const [scor, setScor] = useState(0);
  const [scorIntrebare, setScorIntrebare] = useState(0);

  return(
    <IonPage>
      
      <Header/>

      <IonContent className="ion-content">
        <IonGrid className="ion-grid">
          <IonRow className="ion-row">
            <IonCol className="ion-col2">
              <IonRow className="ion-row" style={{display:(intrebareCurenta ===-1 ? '' : 'none')}}>
                <IonCol>
                <IonButton className="ion-button-bubble" color="tertiary"onClick={() =>
                    setParagrafCurent(paragrafCurent=>{
                      if(paragrafCurent-1 === -1)
                        return 9
                      else
                        return (paragrafCurent-1)%10
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
              <IonRow className="ion-row" style={{display:(intrebareCurenta ===-1 ? '' : 'none')}}>
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
            <IonCol id="intrebari" className="ion-col">
              
                <IonRow className="q-list" id="set-1">

                  <IonList style={{display:(intrebareCurenta === 0 ? 'block' : 'none')}}>
                    <IonRadioGroup>
                      <IonListHeader>
                        <IonLabel className="question">
                          &nbsp;Conform informatiilor precizate anterior, care dintre urmatoarele elemente influenteaza creativitatea la nivel individual?
                        </IonLabel>
                      </IonListHeader>

                      <IonItem onClick={ () => setScorIntrebare(10)}>
                        <IonLabel>a) Discursul inspirational al unui lider</IonLabel>
                        <IonRadio value="a" />
                      </IonItem>

                      <IonItem>
                        <IonLabel>b) Frecventa pauzelor din timpul programului de munca</IonLabel>
                        <IonRadio value="b" onClick={ () => setScorIntrebare(0)} />
                      </IonItem>

                      <IonItem>
                        <IonLabel>c)	Pozitionarea spatiului de lucru</IonLabel>
                        <IonRadio value="c" onClick={ () => setScorIntrebare(0)} />
                      </IonItem>
                    </IonRadioGroup>
                  </IonList>


                  <IonList className="q-list" id="set-2" style={{display:(intrebareCurenta === 1 ? 'block' : 'none')}}>
                    <IonRadioGroup>
                      <IonListHeader>
                        <IonLabel className="question">
                          Raportat la trasaturile de personalitate, care dintre urmatoarele reprezinta un stimulent al creativitatii?
                        </IonLabel>
                      </IonListHeader>

                      <IonItem>
                        <IonLabel>a) Constinciozitatea</IonLabel>
                        <IonRadio value="a" onClick={ () => setScorIntrebare(0)} />
                      </IonItem>

                      <IonItem>
                        <IonLabel>b) Asertivitatea</IonLabel>
                        <IonRadio value="b" onClick={ () => setScorIntrebare(0)} />
                      </IonItem>

                      <IonItem>
                        <IonLabel>c) Proactivitatea</IonLabel>
                        <IonRadio value="c" onClick={ () => setScorIntrebare(10)} />
                      </IonItem>
                    </IonRadioGroup>
                  </IonList>


                  <IonList className="q-list" id="set-3" style={{display:(intrebareCurenta === 2 ? 'block' : 'none')}}>
                    <IonRadioGroup>
                      <IonListHeader>
                        <IonLabel className="question">
                          Conform studiilor unor autori, nivelul individual de proactivitate poate sa creasca atunci când:
                        </IonLabel>
                      </IonListHeader>

                      <IonItem>
                        <IonLabel>a) Individul se afla într-o stare negativă.</IonLabel>
                        <IonRadio value="a" onClick={ () => setScorIntrebare(10)} />
                      </IonItem>

                      <IonItem>
                        <IonLabel>b) Individul a avut o discuție cu liderul echipei.</IonLabel>
                        <IonRadio value="b" onClick={ () => setScorIntrebare(0)} />
                      </IonItem>

                      <IonItem>
                        <IonLabel>c) Individul este motivat financiar.</IonLabel>
                        <IonRadio value="c" onClick={ () => setScorIntrebare(0)} />
                      </IonItem>
                    </IonRadioGroup>
                  </IonList>
                  
                  <IonList className="q-list" id="set-4" style={{display:(intrebareCurenta === 3 ? 'block' : 'none')}}>
                    <IonRadioGroup>
                      <IonListHeader>
                        <IonLabel className="question">
                          Realizările creative complexe sunt rezultatul:
                        </IonLabel>
                      </IonListHeader>

                      <IonItem>
                        <IonLabel>a) Unei singure stari afective.</IonLabel>
                        <IonRadio value="a" onClick={ () => setScorIntrebare(0)} />
                      </IonItem>

                      <IonItem>
                        <IonLabel>b) Unor mai multe stari afective.</IonLabel>
                        <IonRadio value="b" onClick={ () => setScorIntrebare(10)} />
                      </IonItem>

                      <IonItem>
                        <IonLabel>c) Unei stări pozitive.</IonLabel>
                        <IonRadio value="c" onClick={ () => setScorIntrebare(0)} />
                      </IonItem>
                    </IonRadioGroup>
                  </IonList>

                  <div id="scor" style={{display:(intrebareCurenta === 4 ? 'block' : 'none')}} >
                    <h2 className="score">Scorul obtinut este: {scor} /40 </h2>
                  </div>

                  <IonButton className="ion-button-quiz"  size="large" color="primary"onClick={() =>(

                    setScor(scor => {
                      let scoraux=scorIntrebare
                      setScorIntrebare(0)
                      return scor + scorIntrebare
                    }),

                    setIntrebareCurenta(intrebareCurenta => {
                      if(intrebareCurenta === 4) {
                        
                        return intrebareCurenta
                      }
                      return (intrebareCurenta+1)%10
                    }))}
                    style={{ display:(intrebareCurenta != 4 && intrebareCurenta != -1 ? 'block' : 'none') }}>
                  Urmatoarea intrebare
                </IonButton>
                
                <IonButton className="ion-button-quiz"  size="large" color="primary"href="/home"
                    style={{display:(intrebareCurenta === 4 ? 'block' : 'none')}}>
                  finish
                </IonButton>
                
                <IonLabel className="info" style={{display:(intrebareCurenta === -1 ? 'block' : 'none')}}>
                  Scorul maxim posibil pentru acest chestionar este 40. 
                </IonLabel>

                <IonButton className="ion-button"  size="large" color="primary"onClick={() =>(
                  setIntrebareCurenta(intrebareCurenta => {
                    if(intrebareCurenta === 4) {
                      
                      return intrebareCurenta
                    }
                    return (intrebareCurenta+1)%10
                  }))}
                    style={{display:(intrebareCurenta === -1 ? 'block' : 'none')}}>
                  Incepe QUIZ-ul
                </IonButton>


                </IonRow>


            </IonCol>
          </IonRow>
        </IonGrid>
        
      </IonContent>

      </IonPage>
  )
}