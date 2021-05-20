import './style.css'

import { IonButton, IonCol, IonContent, IonGrid, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRadio, IonRadioGroup, IonRow } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../auth'
import { Header } from '../core/Header'
import { Plugins } from '@capacitor/core'
import { ProductContext } from '../leaderboard/leaderboardProvider'
import { RouteComponentProps } from 'react-router'
import axios from 'axios'
import { save } from 'ionicons/icons'

// Sa se afiseze informatiile corecte in functie de modulul selectat

const { Storage } = Plugins

export const Quiz: React.FC<RouteComponentProps> = ({history}) => {
  const { products, fetching, fetchingError, saveScor, saveProduct } =
    useContext(ProductContext)
  const { logout, isAuthenticated, token } = useContext(AuthContext)
  const [paragrafCurent, setParagrafCurent] = useState(0)
  const [intrebareCurenta, setIntrebareCurenta] = useState(-1)
  const [scor1, setScor1] = useState(0)
  const [scor2, setScor2] = useState(0)
  const [scor3, setScor3] = useState(0)
  const [scorIntrebare, setScorIntrebare] = useState(0)
  const [idModul, setIdModul] = useState(0)
  const baseUrl = 'localhost:3000'
  const leaderboardUrl = `http://${baseUrl}/api/item`

  const authConfig = (token?: string) => ({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  useEffect(() => {
    ;(async () => {
      await Storage.get({ key: 'id_modul' }).then(e => {
        if (e.value) {
          setIdModul(JSON.parse(e.value).idModul)
        }
      })
    })()
  }, [])

  const finishClicked = (idModul: any, scor1: any) => {
    ;(async () => {
      let username = ''
      await Storage.get({ key: 'username' }).then(e => {
        if (e.value) {
          username = JSON.parse(e.value).username
        }
      })
      await axios.post(
        leaderboardUrl,
        { modul_id: idModul, scor: scor1, user_id: username },
        authConfig(token)
      ).then(() => {
        history.push('/home')
      })
    })()
  }

  return (
    <IonPage>
      <Header />
      <IonContent className='ion-content'>
        <IonGrid className='ion-grid'>
          <IonRow className='ion-row'>
            <IonCol className='ion-col2'>
              <IonRow
                className='ion-row'
                style={{ display: intrebareCurenta === -1 ? '' : 'none'}}>
                <IonCol>
                  <IonButton
                    disabled={(paragrafCurent == 0 ? true:false)}
                    className='ion-button-bubble'
                    color='tertiary'
                    onClick={() =>
                      setParagrafCurent(paragrafCurent => {
                        if (paragrafCurent - 1 === -1) {

                          return 0
                        }
                        else return (paragrafCurent - 1) % 10
                      })
                    }>
                    Inapoi
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    disabled={(paragrafCurent == 9 ? true:false)}
                    className='ion-button-bubble'
                    color='tertiary'
                    onClick={() =>
                      setParagrafCurent(
                        paragrafCurent => (paragrafCurent + 1) % 10
                      )
                    }>
                    Inainte
                  </IonButton>
                </IonCol>
              </IonRow>
              {idModul === 1 && (
                <IonRow
                  className='ion-row'
                  style={{ display: intrebareCurenta === -1 ? '' : 'none' }}>
                  <h3>Bubble {paragrafCurent + 1} / 10</h3>
                  <p
                    className='bubble-text'
                    id='1'
                    style={{
                      display: paragrafCurent === 0 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Cercetările asupra creativității individuale în organizații fac progrese considerabile în înțelegerea modului și a momentelor în care oamenii dezvoltă idei noi și folositoare la locul de muncă. De asemenea, cercetătorii au examinat modul în care creativitatea apare în urma interacțiunii dintre un individ și mediul în care aceasta lucrează.
                  </p>
                  <p
                    className='bubble-text'
                    id='2'
                    style={{
                      display: paragrafCurent === 1 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Creativitatea poate fi definită ca un răspuns adaptativ la mediu, prin care individul poate să ajungă la niște stări dorite sau să depășească niște amenințări din mediu. Stările pozitive și negative influențează creativitatea prin impactul lor asupra funcționării cognitive.
                  </p>
                  <p
                    className='bubble-text'
                    id='3'
                    style={{
                      display: paragrafCurent === 2 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;O stare pozitivă facilitează gândirea asociativă, susține procesarea informației în mod euristic și oferă o viziune mai largă asupra modului de a gândi și de a acționa. Din informațiile pe care le avem până acum, creativitatea poate fi sporită prin măsuri ce stimulează o stare pozitivă cum ar fi, un discurs inspirațional al unui lider sau prin implicarea angajaților în activități care să le aducă satisfacții.
                  </p>
                  <p
                    className='bubble-text'
                    id='4'
                    style={{
                      display: paragrafCurent === 3 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Consecințele stărilor negative asupra creativității sunt mai complexe și se consideră că aceste stări împiedică creativitatea. Totuși, aceasta poate fi o sursă de sporire a creativității. Stările negative apar atunci când indivizii se confruntă cu amenințări și ca o consecință, atenția este îndreptată asupra problemei. Prin urmare, unii autori sustin faptul ca oamenii demonstreaza un nivel ridicat de persistenta intr-o sarcina atunci cand se afla intr-o stare negativa.
                  </p>
                  <p
                    className='bubble-text'
                    id='5'
                    style={{
                      display: paragrafCurent === 4 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Mai mult decât atât, stările negative pot să evoce un răspuns de autoreglare care poate activa un mod de gândire creativ și să rezulte într-o schimbare în starea unui individ. Realizările creative complexe nu sunt un rezultat al unei singure stări dintr-un anumit moment. Experiențele negative pot contribui la creativitate atunci când individul se află într-un mediu în care se simte sprijinit si caracterizat preponderent de stari pozitive.{' '}
                  </p>
                  <p
                    className='bubble-text'
                    id='6'
                    style={{
                      display: paragrafCurent === 5 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Perceptia asupra autoeficacitatii personale a primit atentie considerabila ca fiind un predictor consistent al creativitatii si un mediator al legaturii acesteia cu factorii contextuali.
                  </p>
                  <p
                    className='bubble-text'
                    id='7'
                    style={{
                      display: paragrafCurent === 6 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Spre exemplu, studiile arata ca relatiile de inalta calitate ale angajatilor cu liderii lor si membrii echipelor din care fac parte, au o influenta pozitiva asupra autoeficacitatii, care in schimb are un efect pozitiv asupra creativitatii. Prin urmare, autoeficacitatea, in mod particular atunci cand este relationata cu creativitatea, poate sa fie privita ca si un indicator al acesteia.{' '}
                  </p>
                  <p
                    className='bubble-text'
                    id='8'
                    style={{
                      display: paragrafCurent === 7 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Trebuie sa fie, insa luat in considerare faptul ca, aceste studii nu permit o fundamentare stiintifica in ceea priveste o relatie de cauzalitate intre autoeficacitate si creativitate, mai degraba autoeficacitatea reprezinta dovada ca aspectele motivationale, conditile cognitive si sociale favorizeaza creativitatea.{' '}
                  </p>
                  <p
                    className='bubble-text'
                    id='9'
                    style={{
                      display: paragrafCurent === 8 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;In ceea ce priveste trasaturile de personalitate, proactivitatea a fost identificata ca unul dintre stimulentii principali al creativitatii, iar relatia lor este mediata de perceptia indivizilor asupra autoeficacitatii personale.
                  </p>
                  <p
                    className='bubble-text'
                    id='10'
                    style={{
                      display: paragrafCurent === 9 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Oamenii proactivi interactioneaza cu contextual social intr-un mod care sporeste creativitatea si sunt mai creativi deoarece ei au initiativa de a face schimb de informatie cu cei din jurul lor. Prin urmare cantitatea de informatie pe care o au la dispoziție crește, stabilind, simultan, si o retea sociala caracterizata de relatii bazate pe încredere și siguranță psihologica ce susține dezvoltarea de noi idei. În mod similar, oamenii care nu sunt motivati doar intrinsec, dar si de dorința de a-i ajuta pe ceilalți, sunt mai predispuși la a dezvolta idei noi si utile.
                  </p>
                </IonRow>
              )}

              {idModul === 2 && (
                <IonRow
                  className='ion-row'
                  style={{ display: intrebareCurenta === -1 ? '' : 'none' }}>
                  <h3>Bubble {paragrafCurent + 1} / 10</h3>
                  <p
                    className='bubble-text'
                    id='1'
                    style={{
                      display: paragrafCurent === 0 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Trăsăturile de personalitate Big Five s-au dovedit a avea un impact asupra creativității, și anume, prin interacțiunea cu anumiți factori contextuali acestea sporesc sau restricționează creativitatea.
                  </p>
                  <p
                    className='bubble-text'
                    id='2'
                    style={{
                      display: paragrafCurent === 1 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Trăsăturile Big Five reprezintă dimensiuni fundamentale ale personalității oamenilor. Big Five este o taxonomie formată din cele mai des utilizate cinci trăsături care surprind dispozițiile stabile ale oamenilor: Extraversiune, Agreabilitate, Conștiinciozitate, Neuroticism și Deschidere spre experiență. Acestea sunt considerate a fi universale și stabile de-a lungul vieții (McCrae, R. R., & Costa Jr, P. T.,1997)
                  </p>
                  <p
                    className='bubble-text'
                    id='3'
                    style={{
                      display: paragrafCurent === 2 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;În cadrul diverselor studii s-a examinat modul în care diverse trăsături de personalitate au interacționat cu cerințele fișei postului, având un impact asupra creativității. Au fost luate în calcul : varietatea abilităților, identitatea sarcinii, semnificația sarcinii, autonomia și feedback-ul (Hackman, J. R., & Oldham, G. R. 1980) .
                  </p>
                  <p
                    className='bubble-text'
                    id='4'
                    style={{
                      display: paragrafCurent === 3 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Ce este de notat în urma acestor studii este faptul că atunci când cerințele fișei postului erau ridicate, trăsăturile Neuroticism și Extraversiune se asociau negativ cu creativitatea, iar Deschiderea spre experiență s-a asociat pozitiv cu creativitatea atunci când cerințele fișei postului erau mai scăzute (Hackman, J. R., & Oldham, G. R. 1980)
                  </p>
                  <p
                    className='bubble-text'
                    id='5'
                    style={{
                      display: paragrafCurent === 4 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Relația dintre personalitate și creativitate este una complexă, aceasta fiind conturată de către variabile contextuale! (Anderson, N., Potočnik, K., & Zhou, J.,2014)
                  </p>
                  <p
                    className='bubble-text'
                    id='6'
                    style={{
                      display: paragrafCurent === 5 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Este de notat și faptul că angajații care dețin mai puține trăsături creative de personalitate au posibilitatea de a prezenta o creativitate mai mare în anumite situații contextuale, astfel încât există dovezi solide pe care managerii sunt responsabili să le ia în considerare când vine vorba despre promovarea creativității angajaților care nu sunt predispuși în mod natural să fie creativi (Anderson, N., Potočnik, K., & Zhou, J. 2014)
                  </p>
                  <p
                    className='bubble-text'
                    id='7'
                    style={{
                      display: paragrafCurent === 6 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Indivizii pot avea, de asemenea, diferite orientări spre scopuri. De exemplu, dorințele de auto-dezvoltare (care servesc drept mecanism motivațional) influențează modul în care angajații acționează în situații care reprezintă oportunități de realizare (Elliot, A. J., & Church, M. A. 1997)
                  </p>
                  <p
                    className='bubble-text'
                    id='8'
                    style={{
                      display: paragrafCurent === 7 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Orientarea spre obiectivele de învățare accentuează dezvoltarea personală a competenței, în timp ce orientarea spre performanță se concentrează pe demonstrarea competenței față de observatorii externi. (Anderson, N., Potočnik, K., & Zhou, J.,2014)
                  </p>
                  <p
                    className='bubble-text'
                    id='9'
                    style={{
                      display: paragrafCurent === 8 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Orientarea spre învățare s-a dovedit a avea un efect principal pozitiv asupra creativității. Aceasta presupune asumpția că capacitățile și competențele cuiva sunt schimbătoare și, prin urmare, investirea unui efort mai mare va spori competența și stăpânirea sarcinilor.
                  </p>
                  <p
                    className='bubble-text'
                    id='10'
                    style={{
                      display: paragrafCurent === 9 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Valorile sunt principii directive ale vieții indivizilor; ele oferă direcții de acțiune și servesc drept standarde pentru judecarea și justificarea acțiunilor. Astfel, valorile angajaților pot avea o relevanță asupra generării de idei și asupra implementării acestora (Zhou, J.,&colab.,2009)
                  </p>
                  <p
                    className='bubble-text'
                    id='11'
                    style={{
                      display: paragrafCurent === 10 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;De exemplu, angajații care prezintă un nivel ridicat de valori conservatoare, s-au dovedit a reacționa mai puternic și mai pozitiv la influența leadership-ului transformațional, manifestând o mai mare creativitate. (Shin, S. J., & Zhou, J. 2003)
                  </p>
                </IonRow>
              )}

              {idModul === 3 && (
                <IonRow
                  className='ion-row'
                  style={{ display: intrebareCurenta === -1 ? '' : 'none' }}>
                  <h3>Bubble {paragrafCurent + 1} / 10</h3>
                  <p
                    className='bubble-text'
                    id='1'
                    style={{
                      display: paragrafCurent === 0 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Ești gata să înveți? Urmează tot ce trebuie să știți despre contextul social. Diferite aspecte ale contextului social au fost explorate în creativitate și comportament inovator, la nivel individual. În primul rând trebuie să vorbim despre leadership și supervizare care sunt influențe esențiale asupra creativității. Studiile științifice au dat rezultate mixte în această temă, deci trebuie să vedem un pic din toate părțile acestora.{' '}
                  </p>
                  <p
                    className='bubble-text'
                    id='2'
                    style={{
                      display: paragrafCurent === 1 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Niște cercetători au descoperit că leadership-ul transformațional are un efect pozitiv asupra creativității. Din perspectiva altor observatori leadership-ul transformațional are un efect pozitiv, în timp ce leadershipul tranzacțional are un efect negativ asupra comportamentul inovator. Numai cazurile în care abilitarea psihologică a adepților(followers) a fost ridicată. Un alt studiu a constatat un efect pozitiv moderator (dar nu principal) al unei fațete a conducerii transformaționale - motivația inspirațională asupra relației dintre identificarea echipei angajaților și creativitate.
                  </p>
                  <p
                    className='bubble-text'
                    id='3'
                    style={{
                      display: paragrafCurent === 2 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Alte studii au analizat impactul comportamentelor specifice de supervizare, cum ar fi sprijinul de supervizare, așteptările de supervizare pentru creativitate, abilitarea supervizării, feedback-ul de dezvoltare a supervizării și monitorizarea non-strânsă, bunăvoința de supervizare și supervizare abuzivă asupra creativității. Unele cercetări au examinat, de asemenea, sprijinul de supervizare și influențarea leadership-ului bazate pe comportamentul inovator. Au fost efectuate doar câteva studii privind comportamentul de supervizare specifică, astfel încât rezultatele empirice în toate studiile nu au fost consecvente. Prin urmare, trebuie făcute mai multe cercetări privind leadership și supervizare (așa cum susținem ulterior în această revizuire). Contribuția clienților și încrederea bazată pe afectarea clienților au avut un impact direct și pozitiv asupra creativității legate de servicii. Alte influențe sociale: Feedback, evaluare și justiție. Feedback-ul are o influență semnificativă și totuși complexă asupra creativității, dar puține studii au examinat direct mecanismele prin care apar astfel de influențe. Indivizi care nu se așteptau la o evaluare externă în etapa de variație la care li se spune să genereze cât mai multe idei posibil, dar au avut o astfel de așteptare în etapa de reținere selectivă în care li se spune să selecteze și să rafineze ideile, astfel încât ideile să fie cu adevărat noi și utile, au generat ideile cele mai creative.
                  </p>
                  <p
                    className='bubble-text'
                    id='4'
                    style={{
                      display: paragrafCurent === 3 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Ancheta de feedback a avut o relație directă, pozitivă cu creativitatea. Justițiile distributive, procedurale, interpersonale și informaționale sunt variabile contextuale importante în prezicerea atitudinilor și comportamentului angajaților. Cercetarea ale efectelor influențelor supervizale, colegului de muncă și ale clienților asupra creativității, angajatilor poate beneficia de integrarea cu alte variabile sociale și de sarcini documentate în literatura de creativitate, precum feedback, evaluare și justiție. De exemplu, cercetarea poate compara și contrasta efectele feedback-ului furnizat de supervizare față de colegi în diferite etape ale procesului de creativitate-inovare.
                  </p>
                  <p
                    className='bubble-text'
                    id='5'
                    style={{
                      display: paragrafCurent === 4 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Complexitatea locului de muncă (Job complexity): Când un loc de muncă (a) oferă deținătorului de locuri de muncă să învețe și să utilizeze o varietate de competențe, (b) este identificabil, (c) are implicații semnificative pentru alții și (d) oferă autonomie și feedback,se spune că postul are un nivel ridicat de complexitate (Hackman & Oldham, 1980). Hackman, J. R., & Oldham, G. R. 1980. Work redesign. Reading, MA: Addison-Wesley Complexitatea locului de muncă (operaționalizat ca mijloc al celor cinci caracteristici esențiale ale postului - varietatea abilităților, semnificația sarcini, identitatea sarcini, autonomia și feedback-ul) este un aspect cheie al contextelor sarcinii relevante pentru creativitate.
                  </p>
                  <p
                    className='bubble-text'
                    id='6'
                    style={{
                      display: paragrafCurent === 5 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;O altă caracteristică a joburilor este rutinizarea (Perrow, 1970). Perrow, C. 1970. Organizational analysis: A sociological view. Belmont, CA: Brooks/Cole. După executarea repetată a unui comportament, acesta poate deveni rutinizat, iar executarea acestuia poate să nu necesite multă intenționalitate și conștientizare, ceea ce s-ar putea întâmpla chiar și angajaților care dețin locuri de muncă complexe. Ohly și colab./ Ohly, S., Sonnentag, S., & Pluntke, F. 2006. Routinization, work characteristics and their relationships with creative and proactive behaviors. Journal of Organizational Behavior, 27: 257-279/ a constatat principalele efecte ale rutinizării atât asupra creativității, cât și asupra implementării ideilor.Chiar și așa, s-ar putea argumenta că angajații care efectuează o muncă de rutină își pot pierde interesul pentru a veni cu idei creative.{' '}
                  </p>
                  <p
                    className='bubble-text'
                    id='7'
                    style={{
                      display: paragrafCurent === 6 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Obiective/scopuri și cerințele postului ( Goals and job requirements) Studii care examinează impactul presiunii timpului asupra creativitatea și inovația au dat rezultate mixte: Ohly și Fritz (2010) / Ohly, S., & Fritz, C. 2010. Work characteristics, challenge appraisal, creativity, and proactive behavior: A multilevel study. Journal of Organizational Behavior, 31: 543-565./ au constatat că presiunea zilnică a timpului este legată pozitiv de creativitatea zilnică, în timp ce Baer și Oldham (2006)/ Baer, M., & Oldham, G. R. 2006. The curvilinear relation between experienced creative time pressure and creativity: Moderating effects of openness to experience and support for creativity. Journal of Applied Psychology, 91: 963-970./ au găsit o relație inversă în formă de U între presiunea timpului creativ și creativitate, când sprijinul pentru creativitate și deschiderea spre experiență erau mari.
                  </p>
                  <p
                    className='bubble-text'
                    id='8'
                    style={{
                      display: paragrafCurent === 7 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Un alt factor de context al sarcini este recompensele. Zhou și Shalley (2003) /Zhou, J., & Shalley, C. 2003. Research on employee creativity: A critical review and directions for future research. In J. J. Martocchio & G. R. Ferris (Eds.), Research in personnel and human resources management, vol. 22: 165-217. Oxford, England: Elsevier Science/ au afirmat că recompensele facilitează sau împiedică creativitatea a fost unul dintre cele mai importante și totuși nerezolvate puzzle-uri în cercetarea creativității. Baer și colab. a constatat că recompensa era pozitiv legată de creativitate atunci când angajații aveau un stil cognitiv adaptativ și lucrau la locuri de muncă cu niveluri scăzute de complexitate.
                  </p>
                  <p
                    className='bubble-text'
                    id='9'
                    style={{
                      display: paragrafCurent === 8 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Alge, Ballinger, Tangirala și Oakley (2006)/ Alge, B. J., Ballinger, G. A., Tangirala, S., & Oakley, J. L. 2006. Information privacy in organizations: Empowering creative and extrarole performance. Journal of Applied Psychology, 91: 221-232. / au examinat efectele confidențialității informațiilor - măsura în care angajații percep că au control asupra modului în care informațiile lor personale sunt colectate, stocate și utilizate de către organizația lor - asupra creativității. Ei au descoperit că confidențialitatea informațiilor a fost legată pozitiv de creativitate prin abilitarea psihologică.
                  </p>
                  <p
                    className='bubble-text'
                    id='10'
                    style={{
                      display: paragrafCurent === 9 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp; Madjar, Greenberg și Chen (2011) /Madjar, N., Greenberg, E., & Chen, Z. 2011. Factors for radical creativity, incremental creativity, and routine, noncreative performance. Journal of Applied Psychology, 96: 730-743./ au descoperit că disponibilitatea de a-și asuma riscuri, angajamentul în carieră și resursele pentru creativitate erau asociate cu creativitatea radicală; prezența colegilor creativi și identificarea organizațională au fost asociate cu creativitatea incrementală; și conformitatea (tendința de a se conforma normelor și de a nu fi de bunăvoie diferită de ceilalți) și identificarea organizațională au fost legate de performanța de rutină, necreativă. Janssen (2003) / Janssen, O. 2003. Innovative behaviour and job involvement at the price of conflict and less satisfactory relations with co-workers. Journal of Occupational and Organizational Psychology, 76: 347-364. /a arătat că atunci când implicarea la locul de muncă a angajaților a fost ridicată, comportamentul inovator a fost pozitiv legat de conflictul cu colegii și negativ de satisfacția cu colegii, subliniind costurile potențiale ale comportamentului inovator.
                  </p>
                </IonRow>
              )}
            </IonCol>
            <IonCol id='intrebari' className='ion-col'>
              {idModul === 1 && (
                <IonRow className='q-list' id='set-1'>
                  <IonList
                    style={{
                      display: intrebareCurenta === 0 ? 'block' : 'none',
                    }}>
                    <IonRadioGroup>
                      <IonListHeader>
                        <IonLabel className='question'>
                          &nbsp;Conform informatiilor precizate anterior, care
                          dintre urmatoarele elemente influenteaza creativitatea
                          la nivel individual?
                        </IonLabel>
                      </IonListHeader>

                      <IonItem onClick={() => setScor1(scor1 => scor1 + 10)}>
                        <IonLabel>
                          a{")"} Discursul inspirational al unui lider
                        </IonLabel>
                        <IonRadio value='a' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>
                          b{")"} Frecventa pauzelor din timpul programului de munca
                        </IonLabel>
                        <IonRadio value='b' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>c{")"} Pozitionarea spatiului de lucru</IonLabel>
                        <IonRadio value='c' />
                      </IonItem>
                    </IonRadioGroup>
                  </IonList>

                  <IonList
                    className='q-list'
                    id='set-2'
                    style={{
                      display: intrebareCurenta === 1 ? 'block' : 'none',
                    }}>
                    <IonRadioGroup>
                      <IonListHeader>
                        <IonLabel className='question'>
                          Raportat la trasaturile de personalitate, care dintre
                          urmatoarele reprezinta un stimulent al creativitatii?
                        </IonLabel>
                      </IonListHeader>

                      <IonItem>
                        <IonLabel>a{")"} Constinciozitatea</IonLabel>
                        <IonRadio value='a' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>b{")"} Asertivitatea</IonLabel>
                        <IonRadio value='b' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>c{")"} Proactivitatea</IonLabel>
                        <IonRadio
                          value='c'
                          onClick={() => setScor1(scor1 => scor1 + 10)}
                        />
                      </IonItem>
                    </IonRadioGroup>
                  </IonList>

                  <IonList
                    className='q-list'
                    id='set-3'
                    style={{
                      display: intrebareCurenta === 2 ? 'block' : 'none',
                    }}>
                    <IonRadioGroup>
                      <IonListHeader>
                        <IonLabel className='question'>
                          Conform studiilor unor autori, nivelul individual de
                          proactivitate poate sa creasca atunci când:
                        </IonLabel>
                      </IonListHeader>

                      <IonItem>
                        <IonLabel>
                          a{")"} Individul se afla într-o stare negativă.
                        </IonLabel>
                        <IonRadio
                          value='a'
                          onClick={() => setScor1(scor1 => scor1 + 10)}
                        />
                      </IonItem>

                      <IonItem>
                        <IonLabel>
                          b{")"} Individul a avut o discuție cu liderul echipei.
                        </IonLabel>
                        <IonRadio value='b' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>
                          c{")"} Individul este motivat financiar.
                        </IonLabel>
                        <IonRadio value='c' />
                      </IonItem>
                    </IonRadioGroup>
                  </IonList>

                  <IonList
                    className='q-list'
                    id='set-4'
                    style={{
                      display: intrebareCurenta === 3 ? 'block' : 'none',
                    }}>
                    <IonRadioGroup>
                      <IonListHeader>
                        <IonLabel className='question'>
                          Realizările creative complexe sunt rezultatul:
                        </IonLabel>
                      </IonListHeader>

                      <IonItem>
                        <IonLabel>a{")"} Unei singure stari afective.</IonLabel>
                        <IonRadio value='a' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>b{")"} Unor mai multe stari afective.</IonLabel>
                        <IonRadio
                          value='b'
                          onClick={() => setScor1(scor1 => scor1 + 10)}
                        />
                      </IonItem>

                      <IonItem>
                        <IonLabel>c{")"} Unei stări pozitive.</IonLabel>
                        <IonRadio value='c' />
                      </IonItem>
                    </IonRadioGroup>
                  </IonList>

                  <div
                    id='scor'
                    style={{
                      display: intrebareCurenta === 4 ? 'block' : 'none',
                    }}>
                    <h2 className='score'>Scorul obtinut este: {scor1} /40 </h2>
                  </div>

                  <IonButton
                    className='ion-button-quiz'
                    size='large'
                    color='primary'
                    onClick={() => (
                      setScor1(scor => {
                        let scoraux = scorIntrebare
                        setScorIntrebare(0)
                        return scor + scorIntrebare
                      }),
                      setIntrebareCurenta(intrebareCurenta => {
                        if (intrebareCurenta === 4) {
                          return intrebareCurenta
                        }
                        return (intrebareCurenta + 1) % 10
                      })
                    )}
                    style={{
                      display:
                        intrebareCurenta != 4 && intrebareCurenta != -1
                          ? 'block'
                          : 'none',
                    }}>
                    Urmatoarea intrebare
                  </IonButton>

                  <IonButton
                    className='ion-button-quiz'
                    size='large'
                    color='primary'
                    style={{
                      display: intrebareCurenta === 4 ? 'block' : 'none',
                    }}
                    onClick={() => finishClicked(idModul, scor1)}>
                    Finish
                  </IonButton>

                  <IonLabel
                    className='info'
                    style={{
                      display: intrebareCurenta === -1 ? 'block' : 'none',
                    }}>
                    Scorul maxim posibil pentru acest chestionar este 40.
                  </IonLabel>

                  <IonButton
                    className='ion-button'
                    size='large'
                    color='primary'
                    onClick={() =>
                      setIntrebareCurenta(intrebareCurenta => {
                        if (intrebareCurenta === 4) {
                          return intrebareCurenta
                        }
                        return (intrebareCurenta + 1) % 10
                      })
                    }
                    style={{
                      display: intrebareCurenta === -1 ? 'block' : 'none',
                    }}>
                    Incepe QUIZ-ul
                  </IonButton>
                </IonRow>
              )}

              {idModul === 2 && (
                <IonRow className='q-list' id='set-2'>

                  <IonList
                    style={{
                      display: intrebareCurenta === 0 ? 'block' : 'none',
                    }}>
                    <IonRadioGroup>
                      <IonListHeader>
                        <IonLabel className='question'>
                          &nbsp;Prin intermediul căror factori considerați
                           că personalitatea unui individ poate avea un impact 
                           asupra creativității acestuia?
                        </IonLabel>
                      </IonListHeader>

                      <IonItem>
                        <IonLabel>
                          a{")"} Factori sociali
                        </IonLabel>
                        <IonRadio value='a' />
                      </IonItem>

                      <IonItem onClick={() => setScor1(scor1 => scor1 + 10)}>
                        <IonLabel>
                          b{")"} Factori contextuali
                        </IonLabel>
                        <IonRadio value='b' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>c{")"} Factori culturali</IonLabel>
                        <IonRadio value='c' />
                      </IonItem>
                    </IonRadioGroup>
                  </IonList>

                  <IonList
                    style={{
                      display: intrebareCurenta === 1 ? 'block' : 'none',
                    }}>
                    <IonRadioGroup>
                      <IonListHeader>
                        <IonLabel className='question'>
                          &nbsp;Cu ajutorul căror cerințe ale fișei postului s-a 
                          examinat modul în care diverse trăsături de personalitate 
                          au avut un impact asupra creativității?
                        </IonLabel>
                      </IonListHeader>

                      <IonItem onClick={() => setScor1(scor1 => scor1 + 10)}>
                        <IonLabel>
                          a{")"} Varietatea abilităților, identitatea sarcinii, 
                          semnificația sarcinii, autonomia și feedback-ul.
                        </IonLabel>
                        <IonRadio value='a' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>
                          b{")"} Varietatea sarcinii, creativitatea, autonomia, 
                          colaborarea, identitatea de grup și feedback-ul.
                        </IonLabel>
                        <IonRadio value='b' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>c{")"} Varietatea abilităților, flexibilitatea, 
                        semnificația sarcinii, autonomia și colaborarea.
                        </IonLabel>
                        <IonRadio value='c' />
                      </IonItem>
                    </IonRadioGroup>
                  </IonList>

                  <IonList
                    style={{
                      display: intrebareCurenta === 2 ? 'block' : 'none',
                    }}>
                    <IonRadioGroup>
                      <IonListHeader>
                        <IonLabel className='question'>
                          &nbsp;Imaginați-vă că sunteți team leader-ul unei echipe
                           de Learning and Development. Misiunea dvs este de a promova creativitatea 
                           membrilor echipei astfel încât aceștia să vină cu propuneri noi de concepte 
                           de training care să susțină procesul de dezvoltare personală a angajaților firmei. 
                           Ce variante de promovare a creativității aveți dvs ca și team leader?
                        </IonLabel>
                      </IonListHeader>

                      <IonItem>
                        <IonLabel>
                          a{")"} Să le cereți să lucreze 5 ore suplimentare pe săptămână.
                        </IonLabel>
                        <IonRadio value='a' />
                      </IonItem>

                      <IonItem onClick={() => setScor1(scor1 => scor1 + 10)}>
                        <IonLabel>
                          b{")"} Să vă asigurați că factorii contextuali la 
                          locul de muncă sunt favorabili creativității.
                        </IonLabel>
                        <IonRadio value='b' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>c{")"} Să vă asigurați că factorii sociali la locul
                         de muncă sunt favorabili creativității.
                        </IonLabel>
                        <IonRadio value='c' />
                      </IonItem>
                    </IonRadioGroup>
                  </IonList>

                  <IonList
                    style={{
                      display: intrebareCurenta === 3 ? 'block' : 'none',
                    }}>
                    <IonRadioGroup>
                      <IonListHeader>
                        <IonLabel className='question'>
                          &nbsp;Care dintre cele orientările spre scopuri 
                          discutate prezintă un efect principal pozitiv asupra creativității?
                        </IonLabel>
                      </IonListHeader>

                      <IonItem>
                        <IonLabel>
                          a{")"} Orientarea spre obiectivele de performanță
                        </IonLabel>
                        <IonRadio value='a' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>
                          b{")"} Orientarea spre obiectivele de inovație.
                        </IonLabel>
                        <IonRadio value='b' />
                      </IonItem>

                      <IonItem onClick={() => setScor1(scor1 => scor1 + 10)}>
                        <IonLabel>c{")"} Orientarea spre obiectivele de învățare.
                        </IonLabel>
                        <IonRadio value='c' />
                      </IonItem>
                    </IonRadioGroup>
                  </IonList>

                  <IonList
                    style={{
                      display: intrebareCurenta === 4 ? 'block' : 'none',
                    }}>
                    <IonRadioGroup>
                      <IonListHeader>
                        <IonLabel className='question'>
                          &nbsp; Ce presupune leadership-ul tranformațional?
                        </IonLabel>
                      </IonListHeader>

                      <IonItem>
                        <IonLabel>
                          a{")"} Capacitatea de a dezvolta și utiliza potențialul 
                          echipei pentru atingerea obiectivelor prin exprimarea sprijinului, 
                          manifestarea empatiei, încurajarea și manifestarea încrederii în oameni.
                        </IonLabel>
                        <IonRadio value='a' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>
                          b{")"} Membrii echipei își stabilesc singuri propria strategie pentru fiecare 
                          obiectiv și își împart rolurile, apoi acționează, fără influența liderului.
                        </IonLabel>
                        <IonRadio value='b' />
                      </IonItem>

                      <IonItem onClick={() => setScor1(scor1 => scor1 + 10)}>
                        <IonLabel>c{")"} Capacitatea liderului de percepe nevoia de schimbare,
                         de a proiecta și conduce eficient schimbările organizaționale majore.
                        </IonLabel>
                        <IonRadio value='c' />
                      </IonItem>
                    </IonRadioGroup>
                  </IonList>

                  <div
                    id='scor'
                    style={{
                      display: intrebareCurenta === 5 ? 'block' : 'none',
                    }}>
                    <h2 className='score'>Scorul obtinut este: {scor1} /50 </h2>
                  </div>

                  <IonButton
                    className='ion-button-quiz'
                    size='large'
                    color='primary'
                    onClick={() => (
                      setScor2(scor => {
                        let scoraux = scorIntrebare
                        setScorIntrebare(0)
                        return scor + scorIntrebare
                      }),
                      setIntrebareCurenta(intrebareCurenta => {
                        if (intrebareCurenta === 5) {
                          return intrebareCurenta
                        }
                        return (intrebareCurenta + 1) % 10
                      })
                    )}
                    style={{
                      display:
                        intrebareCurenta != 5 && intrebareCurenta != -1
                          ? 'block'
                          : 'none',
                    }}>
                    Urmatoarea intrebare
                  </IonButton>

                  <IonButton
                    className='ion-button-quiz'
                    size='large'
                    color='primary'
                    onClick={() => finishClicked(idModul, scor1)}
                    style={{
                      display: intrebareCurenta === 5 ? 'block' : 'none',
                    }}>
                    Finish
                  </IonButton>

                  <IonLabel
                    className='info'
                    style={{
                      display: intrebareCurenta === -1 ? 'block' : 'none',
                    }}>
                    Scorul maxim posibil pentru acest chestionar este 50.
                  </IonLabel>

                  <IonButton
                    className='ion-button'
                    size='large'
                    color='primary'
                    onClick={() =>
                      setIntrebareCurenta(intrebareCurenta => {
                        if (intrebareCurenta === 5) {
                          return intrebareCurenta
                        }
                        return (intrebareCurenta + 1) % 10
                      })
                    }
                    style={{
                      display: intrebareCurenta === -1 ? 'block' : 'none',
                    }}>
                    Incepe QUIZ-ul
                  </IonButton>
                </IonRow>
              )}

              {idModul === 3 && (
                <IonRow className='q-list' id='set-3'>

                <IonList
                  style={{
                    display: intrebareCurenta === 0 ? 'block' : 'none',
                  }}>
                  <IonRadioGroup>
                    <IonListHeader>
                      <IonLabel className='question'>
                        &nbsp;Care sunt cele cinci caracteristici de bază a postului?
                      </IonLabel>
                    </IonListHeader>

                    <IonItem>
                      <IonLabel>
                        a{")"} Creativitate, semnificația sarcinii, identitatea sarcinii, autonomia și feedback-ul.
                      </IonLabel>
                      <IonRadio value='a' />
                    </IonItem>

                    <IonItem onClick={() => setScor1(scor1 => scor1 + 10)}>
                      <IonLabel>
                        b{")"} Varietatea abilităților, semnificația sarcini, identitatea sarcini, autonomia și feedback-ul.
                      </IonLabel>
                      <IonRadio value='b' />
                    </IonItem>

                    <IonItem>
                      <IonLabel>c{")"} Varietatea abilităților, semnificația sarcinii, identitatea sarcinii, autonomia și motivare</IonLabel>
                      <IonRadio value='c' />
                    </IonItem>
                  </IonRadioGroup>
                </IonList>

                <IonList
                  style={{
                    display: intrebareCurenta === 1 ? 'block' : 'none',
                  }}>
                  <IonRadioGroup>
                    <IonListHeader>
                      <IonLabel className='question'>
                        &nbsp;Care dintre următoarele este factorul contextual al sarcin?
                      </IonLabel>
                    </IonListHeader>

                    <IonItem onClick={() => setScor1(scor1 => scor1 + 10)}>
                      <IonLabel>
                        a{")"} Recompensele.
                      </IonLabel>
                      <IonRadio value='a' />
                    </IonItem>

                    <IonItem>
                      <IonLabel>
                        b{")"} Motivare.
                      </IonLabel>
                      <IonRadio value='b' />
                    </IonItem>

                    <IonItem>
                      <IonLabel>c{")"}  Feedback.
                      </IonLabel>
                      <IonRadio value='c' />
                    </IonItem>
                  </IonRadioGroup>
                </IonList>


                <div
                  id='scor'
                  style={{
                    display: intrebareCurenta === 3 ? 'block' : 'none',
                  }}>
                  <h2 className='score'>Scorul obtinut este: {scor1} /20 </h2>
                </div>

                <IonButton
                  className='ion-button-quiz'
                  size='large'
                  color='primary'
                  onClick={() => (
                    setScor2(scor => {
                      let scoraux = scorIntrebare
                      setScorIntrebare(0)
                      return scor + scorIntrebare
                    }),
                    setIntrebareCurenta(intrebareCurenta => {
                      if (intrebareCurenta === 2) {
                        return intrebareCurenta
                      }
                      return (intrebareCurenta + 1) % 10
                    })
                  )}
                  style={{
                    display:
                      intrebareCurenta != 2 && intrebareCurenta != -1
                        ? 'block'
                        : 'none',
                  }}>
                  Urmatoarea intrebare
                </IonButton>

                <IonButton
                  className='ion-button-quiz'
                  size='large'
                  color='primary'
                  onClick={() => finishClicked(idModul, scor1)}
                  style={{
                    display: intrebareCurenta === 2 ? 'block' : 'none',
                  }}>
                  Finish
                </IonButton>

                <IonLabel
                  className='info'
                  style={{
                    display: intrebareCurenta === -1 ? 'block' : 'none',
                  }}>
                  Scorul maxim posibil pentru acest chestionar este 50.
                </IonLabel>

                <IonButton
                  className='ion-button'
                  size='large'
                  color='primary'
                  onClick={() =>
                    setIntrebareCurenta(intrebareCurenta => {
                      if (intrebareCurenta === 2) {
                        return intrebareCurenta
                      }
                      return (intrebareCurenta + 1) % 10
                    })
                  }
                  style={{
                    display: intrebareCurenta === -1 ? 'block' : 'none',
                  }}>
                  Incepe QUIZ-ul
                </IonButton>
              </IonRow>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}
