import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FormBuilder from './form-builder/FormBuilder';
import FormRenderer from './form-renderer/FormRenderer';

const App = () => {
  const [form, setForm] = useState([
    {id: "5421cb1e-8cf7-4ed6-86b1-a2ae99b04e20", type: "checkbox", data: {}},
    {id: "5421cb1e-8cf7-4ed6-86b1-a2ae99b04e21", type: "select-one", data: {}},
    {id: "5421cb1e-8cf7-4ed6-86b1-a2ae99b04e22", type: "select-at-least-one", data: {}},
    {id: "5421cb1e-8cf7-4ed6-86b1-a2ae99b04e23", type: "short-string", data: {}},
    {id: "5421cb1e-8cf7-4ed6-86b1-a2ae99b04e24", type: "long-string", data: {}},
    {id: "5421cb1e-8cf7-4ed6-86b1-a2ae99b04e25", type: "checkbox", data: {}},
  ]);
  const [answers, setAnswers] = useState([]);

  const updateForm = (updateFunction) => {
    console.table(updateFunction(form))
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
      <Row>
        <Col>
          <FormRenderer
            form={form}
            language="fr"
            answers={answers}
            setAnswers={setAnswers}
            submit={() => console.log('submit!')}
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
