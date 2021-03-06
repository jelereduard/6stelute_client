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
                    &nbsp;&nbsp;&nbsp;Cercet??rile asupra creativit????ii individuale ??n organiza??ii fac progrese considerabile ??n ??n??elegerea modului ??i a momentelor ??n care oamenii dezvolt?? idei noi ??i folositoare la locul de munc??. De asemenea, cercet??torii au examinat modul ??n care creativitatea apare ??n urma interac??iunii dintre un individ ??i mediul ??n care aceasta lucreaz??.
                  </p>
                  <p
                    className='bubble-text'
                    id='2'
                    style={{
                      display: paragrafCurent === 1 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Creativitatea poate fi definit?? ca un r??spuns adaptativ la mediu, prin care individul poate s?? ajung?? la ni??te st??ri dorite sau s?? dep????easc?? ni??te amenin????ri din mediu. St??rile pozitive ??i negative influen??eaz?? creativitatea prin impactul lor asupra func??ion??rii cognitive.
                  </p>
                  <p
                    className='bubble-text'
                    id='3'
                    style={{
                      display: paragrafCurent === 2 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;O stare pozitiv?? faciliteaz?? g??ndirea asociativ??, sus??ine procesarea informa??iei ??n mod euristic ??i ofer?? o viziune mai larg?? asupra modului de a g??ndi ??i de a ac??iona. Din informa??iile pe care le avem p??n?? acum, creativitatea poate fi sporit?? prin m??suri ce stimuleaz?? o stare pozitiv?? cum ar fi, un discurs inspira??ional al unui lider sau prin implicarea angaja??ilor ??n activit????i care s?? le aduc?? satisfac??ii.
                  </p>
                  <p
                    className='bubble-text'
                    id='4'
                    style={{
                      display: paragrafCurent === 3 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Consecin??ele st??rilor negative asupra creativit????ii sunt mai complexe ??i se consider?? c?? aceste st??ri ??mpiedic?? creativitatea. Totu??i, aceasta poate fi o surs?? de sporire a creativit????ii. St??rile negative apar atunci c??nd indivizii se confrunt?? cu amenin????ri ??i ca o consecin????, aten??ia este ??ndreptat?? asupra problemei. Prin urmare, unii autori sustin faptul ca oamenii demonstreaza un nivel ridicat de persistenta intr-o sarcina atunci cand se afla intr-o stare negativa.
                  </p>
                  <p
                    className='bubble-text'
                    id='5'
                    style={{
                      display: paragrafCurent === 4 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Mai mult dec??t at??t, st??rile negative pot s?? evoce un r??spuns de autoreglare care poate activa un mod de g??ndire creativ ??i s?? rezulte ??ntr-o schimbare ??n starea unui individ. Realiz??rile creative complexe nu sunt un rezultat al unei singure st??ri dintr-un anumit moment. Experien??ele negative pot contribui la creativitate atunci c??nd individul se afl?? ??ntr-un mediu ??n care se simte sprijinit si caracterizat preponderent de stari pozitive.{' '}
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
                    &nbsp;&nbsp;&nbsp;Oamenii proactivi interactioneaza cu contextual social intr-un mod care sporeste creativitatea si sunt mai creativi deoarece ei au initiativa de a face schimb de informatie cu cei din jurul lor. Prin urmare cantitatea de informatie pe care o au la dispozi??ie cre??te, stabilind, simultan, si o retea sociala caracterizata de relatii bazate pe ??ncredere ??i siguran???? psihologica ce sus??ine dezvoltarea de noi idei. ??n mod similar, oamenii care nu sunt motivati doar intrinsec, dar si de dorin??a de a-i ajuta pe ceilal??i, sunt mai predispu??i la a dezvolta idei noi si utile.
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
                    &nbsp;&nbsp;&nbsp;Tr??s??turile de personalitate Big Five s-au dovedit a avea un impact asupra creativit????ii, ??i anume, prin interac??iunea cu anumi??i factori contextuali acestea sporesc sau restric??ioneaz?? creativitatea.
                  </p>
                  <p
                    className='bubble-text'
                    id='2'
                    style={{
                      display: paragrafCurent === 1 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Tr??s??turile Big Five reprezint?? dimensiuni fundamentale ale personalit????ii oamenilor. Big Five este o taxonomie format?? din cele mai des utilizate cinci tr??s??turi care surprind dispozi??iile stabile ale oamenilor: Extraversiune, Agreabilitate, Con??tiinciozitate, Neuroticism ??i Deschidere spre experien????. Acestea sunt considerate a fi universale ??i stabile de-a lungul vie??ii (McCrae, R. R., & Costa Jr, P. T.,1997)
                  </p>
                  <p
                    className='bubble-text'
                    id='3'
                    style={{
                      display: paragrafCurent === 2 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;??n cadrul diverselor studii s-a examinat modul ??n care diverse tr??s??turi de personalitate au interac??ionat cu cerin??ele fi??ei postului, av??nd un impact asupra creativit????ii. Au fost luate ??n calcul : varietatea abilit????ilor, identitatea sarcinii, semnifica??ia sarcinii, autonomia ??i feedback-ul (Hackman, J. R., & Oldham, G. R. 1980) .
                  </p>
                  <p
                    className='bubble-text'
                    id='4'
                    style={{
                      display: paragrafCurent === 3 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Ce este de notat ??n urma acestor studii este faptul c?? atunci c??nd cerin??ele fi??ei postului erau ridicate, tr??s??turile Neuroticism ??i Extraversiune se asociau negativ cu creativitatea, iar Deschiderea spre experien???? s-a asociat pozitiv cu creativitatea atunci c??nd cerin??ele fi??ei postului erau mai sc??zute (Hackman, J. R., & Oldham, G. R. 1980)
                  </p>
                  <p
                    className='bubble-text'
                    id='5'
                    style={{
                      display: paragrafCurent === 4 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Rela??ia dintre personalitate ??i creativitate este una complex??, aceasta fiind conturat?? de c??tre variabile contextuale! (Anderson, N., Poto??nik, K., & Zhou, J.,2014)
                  </p>
                  <p
                    className='bubble-text'
                    id='6'
                    style={{
                      display: paragrafCurent === 5 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Este de notat ??i faptul c?? angaja??ii care de??in mai pu??ine tr??s??turi creative de personalitate au posibilitatea de a prezenta o creativitate mai mare ??n anumite situa??ii contextuale, astfel ??nc??t exist?? dovezi solide pe care managerii sunt responsabili s?? le ia ??n considerare c??nd vine vorba despre promovarea creativit????ii angaja??ilor care nu sunt predispu??i ??n mod natural s?? fie creativi (Anderson, N., Poto??nik, K., & Zhou, J. 2014)
                  </p>
                  <p
                    className='bubble-text'
                    id='7'
                    style={{
                      display: paragrafCurent === 6 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Indivizii pot avea, de asemenea, diferite orient??ri spre scopuri. De exemplu, dorin??ele de auto-dezvoltare (care servesc drept mecanism motiva??ional) influen??eaz?? modul ??n care angaja??ii ac??ioneaz?? ??n situa??ii care reprezint?? oportunit????i de realizare (Elliot, A. J., & Church, M. A. 1997)
                  </p>
                  <p
                    className='bubble-text'
                    id='8'
                    style={{
                      display: paragrafCurent === 7 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Orientarea spre obiectivele de ??nv????are accentueaz?? dezvoltarea personal?? a competen??ei, ??n timp ce orientarea spre performan???? se concentreaz?? pe demonstrarea competen??ei fa???? de observatorii externi. (Anderson, N., Poto??nik, K., & Zhou, J.,2014)
                  </p>
                  <p
                    className='bubble-text'
                    id='9'
                    style={{
                      display: paragrafCurent === 8 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Orientarea spre ??nv????are s-a dovedit a avea un efect principal pozitiv asupra creativit????ii. Aceasta presupune asump??ia c?? capacit????ile ??i competen??ele cuiva sunt schimb??toare ??i, prin urmare, investirea unui efort mai mare va spori competen??a ??i st??p??nirea sarcinilor.
                  </p>
                  <p
                    className='bubble-text'
                    id='10'
                    style={{
                      display: paragrafCurent === 9 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Valorile sunt principii directive ale vie??ii indivizilor; ele ofer?? direc??ii de ac??iune ??i servesc drept standarde pentru judecarea ??i justificarea ac??iunilor. Astfel, valorile angaja??ilor pot avea o relevan???? asupra gener??rii de idei ??i asupra implement??rii acestora (Zhou, J.,&colab.,2009)
                  </p>
                  <p
                    className='bubble-text'
                    id='11'
                    style={{
                      display: paragrafCurent === 10 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;De exemplu, angaja??ii care prezint?? un nivel ridicat de valori conservatoare, s-au dovedit a reac??iona mai puternic ??i mai pozitiv la influen??a leadership-ului transforma??ional, manifest??nd o mai mare creativitate. (Shin, S. J., & Zhou, J. 2003)
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
                    &nbsp;&nbsp;&nbsp;E??ti gata s?? ??nve??i? Urmeaz?? tot ce trebuie s?? ??ti??i despre contextul social. Diferite aspecte ale contextului social au fost explorate ??n creativitate ??i comportament inovator, la nivel individual. ??n primul r??nd trebuie s?? vorbim despre leadership ??i supervizare care sunt influen??e esen??iale asupra creativit????ii. Studiile ??tiin??ifice au dat rezultate mixte ??n aceast?? tem??, deci trebuie s?? vedem un pic din toate p??r??ile acestora.{' '}
                  </p>
                  <p
                    className='bubble-text'
                    id='2'
                    style={{
                      display: paragrafCurent === 1 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Ni??te cercet??tori au descoperit c?? leadership-ul transforma??ional are un efect pozitiv asupra creativit????ii. Din perspectiva altor observatori leadership-ul transforma??ional are un efect pozitiv, ??n timp ce leadershipul tranzac??ional are un efect negativ asupra comportamentul inovator. Numai cazurile ??n care abilitarea psihologic?? a adep??ilor(followers) a fost ridicat??. Un alt studiu a constatat un efect pozitiv moderator (dar nu principal) al unei fa??ete a conducerii transforma??ionale - motiva??ia inspira??ional?? asupra rela??iei dintre identificarea echipei angaja??ilor ??i creativitate.
                  </p>
                  <p
                    className='bubble-text'
                    id='3'
                    style={{
                      display: paragrafCurent === 2 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Alte studii au analizat impactul comportamentelor specifice de supervizare, cum ar fi sprijinul de supervizare, a??tept??rile de supervizare pentru creativitate, abilitarea superviz??rii, feedback-ul de dezvoltare a superviz??rii ??i monitorizarea non-str??ns??, bun??voin??a de supervizare ??i supervizare abuziv?? asupra creativit????ii. Unele cercet??ri au examinat, de asemenea, sprijinul de supervizare ??i influen??area leadership-ului bazate pe comportamentul inovator. Au fost efectuate doar c??teva studii privind comportamentul de supervizare specific??, astfel ??nc??t rezultatele empirice ??n toate studiile nu au fost consecvente. Prin urmare, trebuie f??cute mai multe cercet??ri privind leadership ??i supervizare (a??a cum sus??inem ulterior ??n aceast?? revizuire). Contribu??ia clien??ilor ??i ??ncrederea bazat?? pe afectarea clien??ilor au avut un impact direct ??i pozitiv asupra creativit????ii legate de servicii. Alte influen??e sociale: Feedback, evaluare ??i justi??ie. Feedback-ul are o influen???? semnificativ?? ??i totu??i complex?? asupra creativit????ii, dar pu??ine studii au examinat direct mecanismele prin care apar astfel de influen??e. Indivizi care nu se a??teptau la o evaluare extern?? ??n etapa de varia??ie la care li se spune s?? genereze c??t mai multe idei posibil, dar au avut o astfel de a??teptare ??n etapa de re??inere selectiv?? ??n care li se spune s?? selecteze ??i s?? rafineze ideile, astfel ??nc??t ideile s?? fie cu adev??rat noi ??i utile, au generat ideile cele mai creative.
                  </p>
                  <p
                    className='bubble-text'
                    id='4'
                    style={{
                      display: paragrafCurent === 3 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Ancheta de feedback a avut o rela??ie direct??, pozitiv?? cu creativitatea. Justi??iile distributive, procedurale, interpersonale ??i informa??ionale sunt variabile contextuale importante ??n prezicerea atitudinilor ??i comportamentului angaja??ilor. Cercetarea ale efectelor influen??elor supervizale, colegului de munc?? ??i ale clien??ilor asupra creativit????ii, angajatilor poate beneficia de integrarea cu alte variabile sociale ??i de sarcini documentate ??n literatura de creativitate, precum feedback, evaluare ??i justi??ie. De exemplu, cercetarea poate compara ??i contrasta efectele feedback-ului furnizat de supervizare fa???? de colegi ??n diferite etape ale procesului de creativitate-inovare.
                  </p>
                  <p
                    className='bubble-text'
                    id='5'
                    style={{
                      display: paragrafCurent === 4 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Complexitatea locului de munc?? (Job complexity): C??nd un loc de munc?? (a) ofer?? de??in??torului de locuri de munc?? s?? ??nve??e ??i s?? utilizeze o varietate de competen??e, (b) este identificabil, (c) are implica??ii semnificative pentru al??ii ??i (d) ofer?? autonomie ??i feedback,se spune c?? postul are un nivel ridicat de complexitate (Hackman & Oldham, 1980). Hackman, J. R., & Oldham, G. R. 1980. Work redesign. Reading, MA: Addison-Wesley Complexitatea locului de munc?? (opera??ionalizat ca mijloc al celor cinci caracteristici esen??iale ale postului - varietatea abilit????ilor, semnifica??ia sarcini, identitatea sarcini, autonomia ??i feedback-ul) este un aspect cheie al contextelor sarcinii relevante pentru creativitate.
                  </p>
                  <p
                    className='bubble-text'
                    id='6'
                    style={{
                      display: paragrafCurent === 5 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;O alt?? caracteristic?? a joburilor este rutinizarea (Perrow, 1970). Perrow, C. 1970. Organizational analysis: A sociological view. Belmont, CA: Brooks/Cole. Dup?? executarea repetat?? a unui comportament, acesta poate deveni rutinizat, iar executarea acestuia poate s?? nu necesite mult?? inten??ionalitate ??i con??tientizare, ceea ce s-ar putea ??nt??mpla chiar ??i angaja??ilor care de??in locuri de munc?? complexe. Ohly ??i colab./ Ohly, S., Sonnentag, S., & Pluntke, F. 2006. Routinization, work characteristics and their relationships with creative and proactive behaviors. Journal of Organizational Behavior, 27: 257-279/ a constatat principalele efecte ale rutiniz??rii at??t asupra creativit????ii, c??t ??i asupra implement??rii ideilor.Chiar ??i a??a, s-ar putea argumenta c?? angaja??ii care efectueaz?? o munc?? de rutin?? ????i pot pierde interesul pentru a veni cu idei creative.{' '}
                  </p>
                  <p
                    className='bubble-text'
                    id='7'
                    style={{
                      display: paragrafCurent === 6 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Obiective/scopuri ??i cerin??ele postului ( Goals and job requirements) Studii care examineaz?? impactul presiunii timpului asupra creativitatea ??i inova??ia au dat rezultate mixte: Ohly ??i Fritz (2010) / Ohly, S., & Fritz, C. 2010. Work characteristics, challenge appraisal, creativity, and proactive behavior: A multilevel study. Journal of Organizational Behavior, 31: 543-565./ au constatat c?? presiunea zilnic?? a timpului este legat?? pozitiv de creativitatea zilnic??, ??n timp ce Baer ??i Oldham (2006)/ Baer, M., & Oldham, G. R. 2006. The curvilinear relation between experienced creative time pressure and creativity: Moderating effects of openness to experience and support for creativity. Journal of Applied Psychology, 91: 963-970./ au g??sit o rela??ie invers?? ??n form?? de U ??ntre presiunea timpului creativ ??i creativitate, c??nd sprijinul pentru creativitate ??i deschiderea spre experien???? erau mari.
                  </p>
                  <p
                    className='bubble-text'
                    id='8'
                    style={{
                      display: paragrafCurent === 7 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Un alt factor de context al sarcini este recompensele. Zhou ??i Shalley (2003) /Zhou, J., & Shalley, C. 2003. Research on employee creativity: A critical review and directions for future research. In J. J. Martocchio & G. R. Ferris (Eds.), Research in personnel and human resources management, vol. 22: 165-217. Oxford, England: Elsevier Science/ au afirmat c?? recompensele faciliteaz?? sau ??mpiedic?? creativitatea a fost unul dintre cele mai importante ??i totu??i nerezolvate puzzle-uri ??n cercetarea creativit????ii. Baer ??i colab. a constatat c?? recompensa era pozitiv legat?? de creativitate atunci c??nd angaja??ii aveau un stil cognitiv adaptativ ??i lucrau la locuri de munc?? cu niveluri sc??zute de complexitate.
                  </p>
                  <p
                    className='bubble-text'
                    id='9'
                    style={{
                      display: paragrafCurent === 8 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp;Alge, Ballinger, Tangirala ??i Oakley (2006)/ Alge, B. J., Ballinger, G. A., Tangirala, S., & Oakley, J. L. 2006. Information privacy in organizations: Empowering creative and extrarole performance. Journal of Applied Psychology, 91: 221-232. / au examinat efectele confiden??ialit????ii informa??iilor - m??sura ??n care angaja??ii percep c?? au control asupra modului ??n care informa??iile lor personale sunt colectate, stocate ??i utilizate de c??tre organiza??ia lor - asupra creativit????ii. Ei au descoperit c?? confiden??ialitatea informa??iilor a fost legat?? pozitiv de creativitate prin abilitarea psihologic??.
                  </p>
                  <p
                    className='bubble-text'
                    id='10'
                    style={{
                      display: paragrafCurent === 9 ? 'block' : 'none',
                    }}>
                    &nbsp;&nbsp;&nbsp; Madjar, Greenberg ??i Chen (2011) /Madjar, N., Greenberg, E., & Chen, Z. 2011. Factors for radical creativity, incremental creativity, and routine, noncreative performance. Journal of Applied Psychology, 96: 730-743./ au descoperit c?? disponibilitatea de a-??i asuma riscuri, angajamentul ??n carier?? ??i resursele pentru creativitate erau asociate cu creativitatea radical??; prezen??a colegilor creativi ??i identificarea organiza??ional?? au fost asociate cu creativitatea incremental??; ??i conformitatea (tendin??a de a se conforma normelor ??i de a nu fi de bun??voie diferit?? de ceilal??i) ??i identificarea organiza??ional?? au fost legate de performan??a de rutin??, necreativ??. Janssen (2003) / Janssen, O. 2003. Innovative behaviour and job involvement at the price of conflict and less satisfactory relations with co-workers. Journal of Occupational and Organizational Psychology, 76: 347-364. /a ar??tat c?? atunci c??nd implicarea la locul de munc?? a angaja??ilor a fost ridicat??, comportamentul inovator a fost pozitiv legat de conflictul cu colegii ??i negativ de satisfac??ia cu colegii, subliniind costurile poten??iale ale comportamentului inovator.
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
                          proactivitate poate sa creasca atunci c??nd:
                        </IonLabel>
                      </IonListHeader>

                      <IonItem>
                        <IonLabel>
                          a{")"} Individul se afla ??ntr-o stare negativ??.
                        </IonLabel>
                        <IonRadio
                          value='a'
                          onClick={() => setScor1(scor1 => scor1 + 10)}
                        />
                      </IonItem>

                      <IonItem>
                        <IonLabel>
                          b{")"} Individul a avut o discu??ie cu liderul echipei.
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
                          Realiz??rile creative complexe sunt rezultatul:
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
                        <IonLabel>c{")"} Unei st??ri pozitive.</IonLabel>
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
                          &nbsp;Prin intermediul c??ror factori considera??i
                           c?? personalitatea unui individ poate avea un impact 
                           asupra creativit????ii acestuia?
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
                          &nbsp;Cu ajutorul c??ror cerin??e ale fi??ei postului s-a 
                          examinat modul ??n care diverse tr??s??turi de personalitate 
                          au avut un impact asupra creativit????ii?
                        </IonLabel>
                      </IonListHeader>

                      <IonItem onClick={() => setScor1(scor1 => scor1 + 10)}>
                        <IonLabel>
                          a{")"} Varietatea abilit????ilor, identitatea sarcinii, 
                          semnifica??ia sarcinii, autonomia ??i feedback-ul.
                        </IonLabel>
                        <IonRadio value='a' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>
                          b{")"} Varietatea sarcinii, creativitatea, autonomia, 
                          colaborarea, identitatea de grup ??i feedback-ul.
                        </IonLabel>
                        <IonRadio value='b' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>c{")"} Varietatea abilit????ilor, flexibilitatea, 
                        semnifica??ia sarcinii, autonomia ??i colaborarea.
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
                          &nbsp;Imagina??i-v?? c?? sunte??i team leader-ul unei echipe
                           de Learning and Development. Misiunea dvs este de a promova creativitatea 
                           membrilor echipei astfel ??nc??t ace??tia s?? vin?? cu propuneri noi de concepte 
                           de training care s?? sus??in?? procesul de dezvoltare personal?? a angaja??ilor firmei. 
                           Ce variante de promovare a creativit????ii ave??i dvs ca ??i team leader?
                        </IonLabel>
                      </IonListHeader>

                      <IonItem>
                        <IonLabel>
                          a{")"} S?? le cere??i s?? lucreze 5 ore suplimentare pe s??pt??m??n??.
                        </IonLabel>
                        <IonRadio value='a' />
                      </IonItem>

                      <IonItem onClick={() => setScor1(scor1 => scor1 + 10)}>
                        <IonLabel>
                          b{")"} S?? v?? asigura??i c?? factorii contextuali la 
                          locul de munc?? sunt favorabili creativit????ii.
                        </IonLabel>
                        <IonRadio value='b' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>c{")"} S?? v?? asigura??i c?? factorii sociali la locul
                         de munc?? sunt favorabili creativit????ii.
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
                          &nbsp;Care dintre cele orient??rile spre scopuri 
                          discutate prezint?? un efect principal pozitiv asupra creativit????ii?
                        </IonLabel>
                      </IonListHeader>

                      <IonItem>
                        <IonLabel>
                          a{")"} Orientarea spre obiectivele de performan????
                        </IonLabel>
                        <IonRadio value='a' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>
                          b{")"} Orientarea spre obiectivele de inova??ie.
                        </IonLabel>
                        <IonRadio value='b' />
                      </IonItem>

                      <IonItem onClick={() => setScor1(scor1 => scor1 + 10)}>
                        <IonLabel>c{")"} Orientarea spre obiectivele de ??nv????are.
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
                          &nbsp; Ce presupune leadership-ul tranforma??ional?
                        </IonLabel>
                      </IonListHeader>

                      <IonItem>
                        <IonLabel>
                          a{")"} Capacitatea de a dezvolta ??i utiliza poten??ialul 
                          echipei pentru atingerea obiectivelor prin exprimarea sprijinului, 
                          manifestarea empatiei, ??ncurajarea ??i manifestarea ??ncrederii ??n oameni.
                        </IonLabel>
                        <IonRadio value='a' />
                      </IonItem>

                      <IonItem>
                        <IonLabel>
                          b{")"} Membrii echipei ????i stabilesc singuri propria strategie pentru fiecare 
                          obiectiv ??i ????i ??mpart rolurile, apoi ac??ioneaz??, f??r?? influen??a liderului.
                        </IonLabel>
                        <IonRadio value='b' />
                      </IonItem>

                      <IonItem onClick={() => setScor1(scor1 => scor1 + 10)}>
                        <IonLabel>c{")"} Capacitatea liderului de percepe nevoia de schimbare,
                         de a proiecta ??i conduce eficient schimb??rile organiza??ionale majore.
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
                        &nbsp;Care sunt cele cinci caracteristici de baz?? a postului?
                      </IonLabel>
                    </IonListHeader>

                    <IonItem>
                      <IonLabel>
                        a{")"} Creativitate, semnifica??ia sarcinii, identitatea sarcinii, autonomia ??i feedback-ul.
                      </IonLabel>
                      <IonRadio value='a' />
                    </IonItem>

                    <IonItem onClick={() => setScor1(scor1 => scor1 + 10)}>
                      <IonLabel>
                        b{")"} Varietatea abilit????ilor, semnifica??ia sarcini, identitatea sarcini, autonomia ??i feedback-ul.
                      </IonLabel>
                      <IonRadio value='b' />
                    </IonItem>

                    <IonItem>
                      <IonLabel>c{")"} Varietatea abilit????ilor, semnifica??ia sarcinii, identitatea sarcinii, autonomia ??i motivare</IonLabel>
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
                        &nbsp;Care dintre urm??toarele este factorul contextual al sarcin?
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
