import styled from "styled-components";

export const StyledSiteLinks = styled.div`
  filter: drop-shadow(3px 10px 15px rgba(0, 0, 0, 0.45));

  :root {
    --light: 80;
    --threshold: 60;
  }

  .multi-btn btn {
    height: 200px;
    width: 200px;
    font-weight: bold;
    color: hsl(0, 0%, var(--switch));
    border-color: hsl(0, 0%, var(--switch));
    --switch: calc((var(--light) - var(--threshold)) * -100%);
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
    background: ${({ theme }) => theme.success};
  }
  .btn-danger {
    background: ${({ theme }) => theme.danger};
  }
  .btn-light {
    background: ${({ theme }) => theme.light};
  }
  .btn-dark {
    background: ${({ theme }) => theme.dark};
  }
  .btn-secondary {
    background: ${({ theme }) => theme.secondary};
  }
  .btn-primary {
    background: ${({ theme }) => theme.primary};
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

  }

  btn:hover {
    cursor: pointer;
    filter: drop-shadow(3px 5px 5px rgba(0, 0, 0, 0.45));
  }
  btn:active {
    filter: none;
    transform: scale(0.95);
  }
  .bouncy {
     animation: bouncy s infinite linear;
     position: relative;
  }
  @keyframes bouncy {
     0% {
      top: 0em;
    }
     40% {
      top: 0em;
    }
     43% {
      top: -0.9em;
    }
     46% {
      top: 0em;
    }
     48% {
      top: -0.4em;
    }
     50% {
      top: 0em;
    }
     100% {
      top: 0em;
    }
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
    color: ${({ theme }) => theme.primaryDark};
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
