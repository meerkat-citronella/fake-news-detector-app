import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "./constants";
import { FadeWrapper, SwitchWrapper } from "./Transitions";

const Container = styled.div`
  height: 50%;
  width: 50%;

  button {
    padding: 0 3em;
    color: ${COLORS.textAccent};
    background: none;
    border: 1px solid ${COLORS.textAccent};
    border-radius: 10px;
  }

  button:hover {
    opacity: 0.5;
  }
`;

const ContainerInner = styled.div`
  background: ${COLORS.backgroundLight};
  border-radius: 10px;
  width: 100%;
  height: 100%;
  margin: 1em 0;

  textarea {
    box-sizing: border-box;
    resize: none;
    background: none;
    border: none;
    height: 40vh;
    width: 100%;
    color: ${COLORS.textPrimary};
  }

  textarea:focus {
    outline: none;
    border: 1px solid ${COLORS.textAccent};
    border-radius: 10px;
  }
`;

const Classification = styled.h2`
  color: ${(props: { classification: string }) =>
    props.classification === "REAL" ? COLORS.textAccent : COLORS.textWarning};
`;

enum WithSwitch {
  noSwitch,
  yesSwitch,
}

export const NewsClassifier = () => {
  const [text, setText] = useState("" as string);
  const [classification, setClassification] = useState("" as string);
  const [inProp, setInProp] = useState(false as boolean);
  const [switchTrigger, setSwitchTrigger] = useState(false as boolean);

  const classifyText = (withSwitch: WithSwitch) => {
    fetch("http://localhost:8080/", {
      method: "POST",
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((data) => {
        withSwitch === WithSwitch.yesSwitch && setSwitchTrigger(!switchTrigger);
        setClassification(data["prediction"]);
        setInProp(true);
      });
  };

  return (
    <Container>
      <h1>Fake News Detector</h1>
      <p>
        Copy/paste some text from a news story, and click "Submit" to see if it
        evaluates to REAL or FAKE.
      </p>

      <FadeWrapper inProp={inProp}>
        <SwitchWrapper state={switchTrigger}>
          <Classification classification={classification}>
            {classification}
          </Classification>
        </SwitchWrapper>
      </FadeWrapper>

      <ContainerInner>
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setText(e.target.value)
          }
        ></textarea>
      </ContainerInner>
      <button
        onClick={() =>
          classification === ""
            ? classifyText(WithSwitch.noSwitch)
            : classifyText(WithSwitch.yesSwitch)
        }
      >
        <h2>Submit</h2>
      </button>
    </Container>
  );
};
