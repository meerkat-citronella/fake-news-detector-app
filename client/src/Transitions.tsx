import React from "react";
import {
  Transition,
  SwitchTransition,
  CSSTransition,
} from "react-transition-group";
import { FADE_DURATION, TRANSITION_DURATION } from "./constants";
import styled from "styled-components";

const defaultStyle = {
  transition: `opacity ${FADE_DURATION}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
} as any;

interface FadeProps {
  inProp: boolean;
  children: React.ReactChild;
}

export const FadeWrapper = ({ inProp, children }: FadeProps) => (
  <Transition in={inProp} timeout={FADE_DURATION}>
    {(state) => (
      <div
        style={{
          ...defaultStyle,
          ...transitionStyles[state],
        }}
      >
        {children}
      </div>
    )}
  </Transition>
);

const SwitchContainer = styled.div`
  .fade-enter .switch-target {
    opacity: 0;
    transform: translateX(-100%);
  }
  .fade-enter-active .switch-target {
    opacity: 1;
    transform: translateX(0%);
  }
  .fade-exit .switch-target {
    opacity: 1;
    transform: translateX(0%);
  }
  .fade-exit-active .switch-target {
    opacity: 0;
    transform: translateX(100%);
  }
  .fade-enter-active .switch-target,
  .fade-exit-active .switch-target {
    transition: opacity ${TRANSITION_DURATION}ms,
      transform ${TRANSITION_DURATION}ms;
  }
`;

export const SwitchWrapper = ({
  state,
  children,
}: {
  state: boolean;
  children: React.ReactChild;
}) => {
  return (
    <SwitchContainer>
      <SwitchTransition mode={"out-in"}>
        <CSSTransition
          //@ts-ignore
          key={state}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames="fade"
        >
          <div className="fade-container">
            <div className="switch-target">{children}</div>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </SwitchContainer>
  );
};
