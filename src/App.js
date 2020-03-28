import React, { useState, useEffect, useCallback } from 'react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { Container, Row, Col, FormControl, Button, Form, FormGroup, Alert } from 'react-bootstrap';

function App() {
  const [value, setValue] = useState('');
  const { speak } = useSpeechSynthesis();

  const [valor, setValor] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: result => {
      setValor(result);
    }
  });

  const falar = useCallback(() => {
    speak({ text: value });
  }, [value]);

  return (
    <Container fluid>
      <Row>
        <Col className="p-5">
          <Alert variant="dark">
            <p className="m-0">Digite o texto, clique em falar e aguarde a Black ler o texto para você.</p>
          </Alert>
          <Form>
            <FormGroup>
              <FormControl as="textarea" rows="1" value={value}
                onChange={(event) => setValue(event.target.value)}
              />
            </FormGroup>
            <Button onClick={() => falar()} variant="primary">
              Falar
            </Button>
          </Form>
        </Col>
        <Col className="p-5">
          <Alert variant="secondary">
            <p className="m-0">Pressione o botão gravar, fale o que deseja, solte o botão e aguarde a Black escrever o que foi falado.</p>
          </Alert>
          <FormGroup>
            <FormControl
              value={valor}
              onChange={event => setValor(event.target.value)}
            />
          </FormGroup>
          <Button className="float-right" onMouseDown={listen} onMouseUp={stop}>
            Gravar
          </Button>
          {listening && <div>Gravando</div>}
        </Col>
      </Row>
    </Container>
  )
}

export default App;