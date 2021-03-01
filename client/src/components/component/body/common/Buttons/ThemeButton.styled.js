import styled from "styled-components";

export const StyledButton = styled.div`
  :root {
    --light: 80;
    --threshold: 60;
  }
  .btn {
    --switch: calc((var(--light) - var(--threshold)) * -100%);
    color: hsl(0, 0%, var(--switch));
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
`;
