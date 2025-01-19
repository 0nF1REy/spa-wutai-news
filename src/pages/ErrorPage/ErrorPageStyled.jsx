import styled from "styled-components";

export const ErrorContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  background-color: #f5f5f5;

  h1 {
    font-size: 2.5rem;
    color: #e74c3c;
    margin-bottom: 1rem;
  }

  img {
    max-width: 100%;
    width: 400px;
    height: auto;
    object-fit: contain;
  }
`;

export const ErrorMessage = styled.article`
  max-width: 40em;
  margin: 1.5em auto;
  text-align: center;
  background-color: #161a25;
  padding: 2rem 1rem;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  p {
    font-size: 1.2rem;
    line-height: 1.5;
    color: paleturquoise;
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 1.5rem 0.7rem;
  }
`;
