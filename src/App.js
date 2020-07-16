import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FormBuilder from './form-builder/FormBuilder';
import FormRenderer from './form-renderer/FormRenderer';

const App = () => {
  const [form, setForm] = useState([{"data":{"questions":[{"language":"fr","text":"Afin de participer à l'étude, nous vous invitons à remplir ce court questionnaire pour déterminer si vous être éligible à participer à l'étude.\nSi vous ne vous sentez pas confortable de répondre à ces questions, nous vous invitons à contacter directement le MHICC par courriel."}]},"type":"text-zone","id":"5421cb1e-8cf7-4ed6-86b1-a2ae99b04e20"},{"data":{"questions":[{"language":"fr","text":"Souffrez-vous ou avez vous souffert lors des 14 derniers jours de maux de tête, de maux de ventre, de toux, d'écoulements nasales, ou de diarrhée?"}],"required":{"status":true,"values":["4a0d3f21-fefc-44fc-991c-d0646e78374c"]},"answers":[{"id":"3d62db2e-1a35-49bc-ba59-578dd490ed0b","content":[{"language":"fr","text":"Oui"}]},{"id":"4a0d3f21-fefc-44fc-991c-d0646e78374c","content":[{"language":"fr","text":"Non"}]}]},"id":"5421cb1e-8cf7-4ed6-86b1-a2ae99b04e21","type":"select-one"},{"data":{"required":{"status":false,"values":["7bf8d26e-4676-4b0b-908b-6c0818c2cb28","ae479952-3952-457f-b33f-00e81252bb80","0a5e0804-22f9-4314-8a20-2787d1720927"]},"answers":[{"id":"af2e40ed-5111-4364-8cb1-2401507c1998","content":[{"language":"fr","text":"Moins d'un mois"}]},{"id":"0a5e0804-22f9-4314-8a20-2787d1720927","content":[{"language":"fr","text":"Entre un mois et un an"}]},{"id":"ae479952-3952-457f-b33f-00e81252bb80","content":[{"language":"fr","text":"Il y a plus d'un an"}]}],"questions":[{"language":"fr","text":"À quand date votre dernier rendez-vous chez le dentiste?"}]},"type":"select-one","id":"5421cb1e-8cf7-4ed6-86b1-a2ae99b04e22"},{"data":{"questions":[{"language":"fr","text":"Pour chacunes des conditions médicales suivantes, veuillez sélectionner si elle vous concerne."}]},"type":"text-zone","id":"5421cb1e-8cf7-4ed6-86b1-a2ae99b04e23"},{"data":{"required":{"status":true,"value":false},"questions":[{"language":"fr","text":"Anémie"}]},"type":"checkbox","id":"5421cb1e-8cf7-4ed6-86b1-a2ae99b04e24"},{"data":{"required":{"status":true,"value":false},"questions":[{"language":"fr","text":"Sida"}]},"id":"5421cb1e-8cf7-4ed6-86b1-a2ae99b04e25","type":"checkbox"},{"data":{"required":{"status":true,"value":false},"questions":[{"language":"fr","text":"Hépatite A"}]},"id":"97ce2ec3-ebc8-46ac-aa98-c9a296ce9dd6","type":"checkbox"},{"data":{"questions":[{"language":"fr","text":"Diabète de type II"}]},"id":"38a8d90e-9a97-4021-8ed6-738ade9d0a90","type":"checkbox"},{"data":{"questions":[{"language":"fr","text":"Lymphangiome"}]},"id":"3b740170-06f0-4f44-8c9a-8a496876fc3f","type":"checkbox"},{"data":{"required":{"numerical":true,"status":true,"decimal":true,"min":"45"},"questions":[{"language":"fr","text":"Quel est votre poid en kilogrammes? (kg)"}]},"type":"short-string","id":"81b9e680-0788-410f-879b-d6a7ed905544"},{"data":{"required":{"status":false,"value":true},"questions":[{"language":"fr","text":"Pourquoi souhaitez-vous participer à cette étude?"}]},"type":"long-string","id":"226ac7ee-1b34-42e6-a824-b85a876fd926"}]);
  const [answers, setAnswers] = useState([]);

  const updateForm = (updateFunction) => {
    console.table(JSON.stringify(updateFunction(form)));
    setForm(updateFunction)
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <p>
            Quam aptent mi vitae rhoncus vel tempor, praesent elementum. Est curae; tortor scelerisque ac sem luctus taciti rutrum netus. Non pellentesque nisi viverra torquent in parturient fusce montes torquent habitant cras fusce. Adipiscing fusce curabitur consequat et nullam curae; facilisi elementum libero. Interdum fringilla inceptos fusce parturient nisl in himenaeos hac auctor phasellus.
          </p>
          <p>
            Placerat hendrerit in, aenean quis velit dictum sit convallis. Leo conubia est adipiscing. Primis eros curabitur senectus lacinia hac taciti, suspendisse imperdiet. Ut eros etiam condimentum cursus netus lorem pharetra. Maecenas turpis ridiculus congue sociosqu. Purus conubia odio etiam convallis luctus pharetra eget elementum. Aptent ante pretium, ad in pharetra? Dui velit urna facilisis et sed gravida consectetur metus suscipit. Consequat, orci nunc sollicitudin! Laoreet quis sed dictum suspendisse ad dapibus penatibus penatibus sociis. Vitae cursus sociosqu, maecenas morbi tortor lacus senectus molestie viverra class maecenas sapien. Ipsum lorem eros diam tellus ut eget integer quis.
          </p>
          <p>
            Primis natoque nunc platea. Lectus facilisi adipiscing nisi vivamus dictumst facilisis dis tempor. Felis posuere ultricies curabitur mattis orci proin posuere mattis eleifend pretium. Nunc aptent dui ultrices, venenatis mus massa faucibus rutrum ipsum fringilla pellentesque? Lacinia pulvinar dis proin tempus proin erat dictumst felis nulla praesent ornare. Erat congue consectetur himenaeos viverra ad lectus nam. Nulla nisi interdum tincidunt nam a nibh nascetur eget ultrices.
          </p>
          <p>
            Mollis dictumst habitasse enim dis odio ultricies? Ac augue quis egestas volutpat nulla at aliquam mi platea ipsum viverra. Sociis leo sociis penatibus commodo pulvinar ridiculus ligula ipsum euismod. Fames taciti vehicula, dis elementum. Faucibus dis luctus netus id dictumst ut vel. Varius cras nam nostra litora ad sed curabitur? Auctor sit ligula aliquam rutrum dapibus lectus imperdiet quam non integer. Inceptos suspendisse sociis turpis conubia posuere vestibulum luctus felis consectetur. Magnis!
          </p>
          <p>
            Habitant leo quam aliquet ut? Leo interdum per lobortis, mi pulvinar torquent donec luctus penatibus. Augue sollicitudin, magna varius semper et torquent ante. Viverra arcu lectus nascetur dictum semper eleifend. Eros turpis mauris donec per cras aliquet ultrices inceptos mollis rutrum tristique. Felis vel nullam nibh! Semper parturient ligula erat penatibus sapien! Tellus non risus dignissim pellentesque porta ornare donec risus vehicula! Diam interdum habitant mus eget scelerisque. Eros ad egestas, duis mus turpis faucibus sodales semper elit tellus pulvinar! Mollis nibh rutrum nisl fermentum suscipit neque enim. Eu malesuada velit fusce.
          </p>
          <p>
            Diam neque ut vivamus tempus curae; maecenas! Nisi nulla facilisi ornare. Vel tellus senectus tellus interdum vivamus suspendisse vitae venenatis neque gravida integer. Consequat et sapien condimentum dictum mauris venenatis metus sociis augue dignissim euismod. Molestie aptent nam massa ornare vulputate. Magna interdum litora dui non venenatis scelerisque facilisis id erat placerat. Metus curae; malesuada montes placerat felis. Penatibus, ornare integer dolor nam viverra. Varius.
          </p>
          <p>
            Odio conubia congue quam quisque tincidunt laoreet, dolor sociosqu iaculis magna hac eu. Curae; lectus lacus, pellentesque laoreet nisi platea suspendisse cursus nascetur cubilia nascetur justo. Etiam laoreet primis pretium rhoncus sem quis laoreet. Natoque imperdiet a morbi etiam aptent tempor euismod curabitur natoque libero consequat? Est auctor habitasse rhoncus odio luctus. Inceptos pretium nam fames egestas duis ultricies curabitur! Adipiscing placerat adipiscing fermentum primis luctus risus. Venenatis malesuada vestibulum accumsan sagittis. Pulvinar venenatis per sed cursus volutpat. Fusce proin?
          </p>
          <p>
            Odio gravida justo dui libero consectetur mattis! Consequat pulvinar nisi rhoncus tellus velit, dapibus curabitur dolor sapien. Pulvinar dolor lacus molestie etiam dignissim nisi taciti ultricies. Feugiat phasellus suspendisse tincidunt netus praesent cubilia dis orci platea condimentum senectus tempor. Dui adipiscing eget sit interdum accumsan curabitur. Auctor lobortis est suspendisse etiam duis aliquam vulputate consequat fermentum. Tristique rhoncus auctor orci lacus cum auctor? Vitae tellus consectetur ad sociosqu dolor! Odio tincidunt, varius faucibus platea!
          </p>
          <p>
            Sem morbi vel nam varius sit massa. Sodales eros aenean cubilia magnis laoreet condimentum. Fermentum, magna nunc elementum primis! Dui in gravida potenti libero erat enim sapien varius magnis? Cubilia platea mi dis elementum facilisi. Facilisis enim bibendum leo hac integer. Sociosqu molestie metus nibh eu purus. Habitasse, proin ligula rhoncus ipsum. Pretium tempor donec nullam semper laoreet faucibus? Sociosqu diam praesent cum sagittis. Suspendisse curabitur habitant vestibulum congue sodales felis ac arcu lacinia, massa in quis. Fusce nisi nostra.
          </p>
          <p>
            Nunc vitae porta bibendum eget nostra cubilia litora lacinia in. Dictumst facilisis hac elit ullamcorper convallis ut torquent urna lorem ligula laoreet mollis! Penatibus vulputate in blandit, platea ullamcorper gravida varius. Lectus felis, scelerisque imperdiet nisi pretium porttitor tincidunt. Urna curabitur, platea placerat inceptos iaculis maecenas neque aliquam semper eleifend dui? Cras ac cursus mus. Sociis adipiscing.
          </p>
          <p>
            Cum commodo laoreet laoreet dolor eros. Taciti interdum, sem sem mollis risus aptent viverra sagittis eget leo magnis dictumst! Pellentesque ornare nec lectus risus. Rhoncus placerat massa porttitor ultrices mollis luctus risus semper inceptos porttitor. Interdum tellus massa felis ut penatibus sem ad hendrerit. Inceptos vel risus aenean ad massa nisl congue dapibus. Sociis elementum phasellus neque convallis, parturient eros. Sagittis metus aenean feugiat volutpat litora curabitur vehicula ac interdum fermentum! Per orci dictum sapien ullamcorper, etiam auctor laoreet suspendisse ullamcorper lacus penatibus. Nostra facilisi venenatis mollis luctus purus nascetur aenean quis.
          </p>
          <p>
            Ridiculus ultricies eget nam eleifend platea blandit penatibus. Placerat risus consectetur risus ligula porta quis facilisi eget urna. Enim curabitur, et porttitor maecenas mi vulputate. Mattis posuere et urna egestas taciti imperdiet morbi parturient dolor facilisis himenaeos. Dictumst interdum lobortis ante lectus adipiscing bibendum. Faucibus tempus ad nascetur at orci adipiscing vivamus? Rutrum pellentesque aliquet conubia nulla sagittis at felis curabitur ridiculus. Nec sociis.
          </p>
          <p>
            Mus fusce ullamcorper sociis ornare parturient. Aliquam magna lobortis scelerisque dolor cum curabitur. Class, magnis vel netus cursus nulla quis feugiat dictumst vivamus dapibus cubilia. Placerat fringilla auctor hendrerit ut non dignissim nunc magnis imperdiet turpis. Habitant sagittis suspendisse, malesuada in curae; fusce magna cum netus! Morbi eu molestie viverra cum sapien nullam. Pharetra sed elit habitant per. Potenti, curae; non id class quis luctus etiam sollicitudin diam. Sit praesent suspendisse maecenas turpis penatibus sodales volutpat egestas purus bibendum sapien. Porta malesuada volutpat eget leo pellentesque integer sapien dis interdum sed tellus. Diam consectetur accumsan neque penatibus. Potenti faucibus.
          </p>
          <p>
            Quam, feugiat donec libero at ultrices aliquet potenti ornare senectus cubilia. Nunc placerat sociosqu, aliquet sociosqu sed ipsum luctus lacinia! Hendrerit bibendum commodo posuere elit. Aptent, maecenas habitant per pellentesque. Aliquet lacus fusce ut netus. Odio duis magnis habitant lacus nascetur adipiscing? Erat torquent sociosqu montes turpis eleifend elit tortor leo congue. Imperdiet auctor orci auctor eget accumsan? Suscipit tortor urna aenean malesuada nulla molestie dis pharetra tristique sit. Massa leo lectus neque? Sollicitudin morbi facilisi lobortis dignissim, nisi mus dis cum.
          </p> 
        </Col>
      </Row>
      <Row>
        <Col>
          <FormBuilder
            form={form}
            setForm={updateForm}
            languages={['fr', 'en', 'es']}
            preview
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="12" md="10" lg="8" xl="6">
          <FormRenderer
            form={form}
            language="fr"
            answers={answers}
            setAnswers={setAnswers}
            preventValidationOnErrors
            submit={(valid) => console.log('submit!')}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            Odio conubia congue quam quisque tincidunt laoreet, dolor sociosqu iaculis magna hac eu. Curae; lectus lacus, pellentesque laoreet nisi platea suspendisse cursus nascetur cubilia nascetur justo. Etiam laoreet primis pretium rhoncus sem quis laoreet. Natoque imperdiet a morbi etiam aptent tempor euismod curabitur natoque libero consequat? Est auctor habitasse rhoncus odio luctus. Inceptos pretium nam fames egestas duis ultricies curabitur! Adipiscing placerat adipiscing fermentum primis luctus risus. Venenatis malesuada vestibulum accumsan sagittis. Pulvinar venenatis per sed cursus volutpat. Fusce proin?
          </p>
          <p>
            Odio gravida justo dui libero consectetur mattis! Consequat pulvinar nisi rhoncus tellus velit, dapibus curabitur dolor sapien. Pulvinar dolor lacus molestie etiam dignissim nisi taciti ultricies. Feugiat phasellus suspendisse tincidunt netus praesent cubilia dis orci platea condimentum senectus tempor. Dui adipiscing eget sit interdum accumsan curabitur. Auctor lobortis est suspendisse etiam duis aliquam vulputate consequat fermentum. Tristique rhoncus auctor orci lacus cum auctor? Vitae tellus consectetur ad sociosqu dolor! Odio tincidunt, varius faucibus platea!
          </p>
          <p>
            Sem morbi vel nam varius sit massa. Sodales eros aenean cubilia magnis laoreet condimentum. Fermentum, magna nunc elementum primis! Dui in gravida potenti libero erat enim sapien varius magnis? Cubilia platea mi dis elementum facilisi. Facilisis enim bibendum leo hac integer. Sociosqu molestie metus nibh eu purus. Habitasse, proin ligula rhoncus ipsum. Pretium tempor donec nullam semper laoreet faucibus? Sociosqu diam praesent cum sagittis. Suspendisse curabitur habitant vestibulum congue sodales felis ac arcu lacinia, massa in quis. Fusce nisi nostra.
          </p>
          <p>
            Nunc vitae porta bibendum eget nostra cubilia litora lacinia in. Dictumst facilisis hac elit ullamcorper convallis ut torquent urna lorem ligula laoreet mollis! Penatibus vulputate in blandit, platea ullamcorper gravida varius. Lectus felis, scelerisque imperdiet nisi pretium porttitor tincidunt. Urna curabitur, platea placerat inceptos iaculis maecenas neque aliquam semper eleifend dui? Cras ac cursus mus. Sociis adipiscing.
          </p>
          <p>
            Cum commodo laoreet laoreet dolor eros. Taciti interdum, sem sem mollis risus aptent viverra sagittis eget leo magnis dictumst! Pellentesque ornare nec lectus risus. Rhoncus placerat massa porttitor ultrices mollis luctus risus semper inceptos porttitor. Interdum tellus massa felis ut penatibus sem ad hendrerit. Inceptos vel risus aenean ad massa nisl congue dapibus. Sociis elementum phasellus neque convallis, parturient eros. Sagittis metus aenean feugiat volutpat litora curabitur vehicula ac interdum fermentum! Per orci dictum sapien ullamcorper, etiam auctor laoreet suspendisse ullamcorper lacus penatibus. Nostra facilisi venenatis mollis luctus purus nascetur aenean quis.
          </p>
          <p>
            Ridiculus ultricies eget nam eleifend platea blandit penatibus. Placerat risus consectetur risus ligula porta quis facilisi eget urna. Enim curabitur, et porttitor maecenas mi vulputate. Mattis posuere et urna egestas taciti imperdiet morbi parturient dolor facilisis himenaeos. Dictumst interdum lobortis ante lectus adipiscing bibendum. Faucibus tempus ad nascetur at orci adipiscing vivamus? Rutrum pellentesque aliquet conubia nulla sagittis at felis curabitur ridiculus. Nec sociis.
          </p>
          <p>
            Mus fusce ullamcorper sociis ornare parturient. Aliquam magna lobortis scelerisque dolor cum curabitur. Class, magnis vel netus cursus nulla quis feugiat dictumst vivamus dapibus cubilia. Placerat fringilla auctor hendrerit ut non dignissim nunc magnis imperdiet turpis. Habitant sagittis suspendisse, malesuada in curae; fusce magna cum netus! Morbi eu molestie viverra cum sapien nullam. Pharetra sed elit habitant per. Potenti, curae; non id class quis luctus etiam sollicitudin diam. Sit praesent suspendisse maecenas turpis penatibus sodales volutpat egestas purus bibendum sapien. Porta malesuada volutpat eget leo pellentesque integer sapien dis interdum sed tellus. Diam consectetur accumsan neque penatibus. Potenti faucibus.
          </p>
          <p>
            Quam, feugiat donec libero at ultrices aliquet potenti ornare senectus cubilia. Nunc placerat sociosqu, aliquet sociosqu sed ipsum luctus lacinia! Hendrerit bibendum commodo posuere elit. Aptent, maecenas habitant per pellentesque. Aliquet lacus fusce ut netus. Odio duis magnis habitant lacus nascetur adipiscing? Erat torquent sociosqu montes turpis eleifend elit tortor leo congue. Imperdiet auctor orci auctor eget accumsan? Suscipit tortor urna aenean malesuada nulla molestie dis pharetra tristique sit. Massa leo lectus neque? Sollicitudin morbi facilisi lobortis dignissim, nisi mus dis cum.
          </p>  
        </Col>
      </Row>
    </Container>
  );
}

export default App;
