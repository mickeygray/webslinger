import styled from "styled-components";

export const StyledSiteLinks = styled.div`
  filter: drop-shadow(3px 10px 15px rgba(0, 0, 0, 0.45));

  .multi-btn btn {
    height: 200px;
    width: 200px;
    font-weight: bold;
    color: white;
    font-size: 1.2rem;
    border: none;
    margin: -5px;
    padding: 0;
    stroke: black;
    outline: none;
    display: inline-block;
    box-sizing: border-box;
    text-decoration: none;
    padding: 0.35em 1.2em;
    border: 0.1em solid hsl(0, 0%, var(--switch));
    margin: 0 0.3em 0.3em 0;
    font-family: ${({ theme }) => theme.font};
    text-align: center;
    transition: all 0.2s;
  }

  .btn-success {
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.success};,
      ${({ theme }) => theme.danger};
    );
  }
  .btn-danger {
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.danger};,
      ${({ theme }) => theme.success};
    );
  }
  .btn-light {
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.light};,
      ${({ theme }) => theme.dark};
    );
  }
  .btn-dark {
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.dark};,
      ${({ theme }) => theme.light};
    );
  }
  .btn-secondary {
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.secondary};,
      ${({ theme }) => theme.primary};
    );
  }
  .btn-primary {
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.primary};,
      ${({ theme }) => theme.secondary};
    );
  }
  .btn-background {
    background: ${({ theme }) => theme.background};
  }
  .btn-smradius {
    border-radius: 4px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  }

  .btn-xsmall {
    font-size: 70%;
  }
  .btn-small {
    font-size: 85%;
  }
  .btn-large {
    font-size: 110%;
  }
  .btn-xlarge {
    font-size: 125%;
  }

  .multi-btn :nth-child(1) {
    border-radius: 20px 0 0 20px;
  }
  .multi-btn :nth-child(3) {
    border-radius: 0 20px 20px 0;
  }
  btn:hover {
    cursor: pointer;
    filter: drop-shadow(3px 5px 5px rgba(0, 0, 0, 0.45));
  }
  btn:active {
    filter: none;
    transform: scale(0.95);
  }

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;
