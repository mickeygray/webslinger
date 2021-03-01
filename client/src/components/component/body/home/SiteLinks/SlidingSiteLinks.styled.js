import styled from "styled-components";

export const StyledSiteLinks = styled.div`
  :root {
    --border-size: 0.125rem;
    --light: 80;
    --threshold: 60;
    --duration: 250ms;
    --ease: cubic-bezier(0.215, 0.61, 0.355, 1);
    --font-family: monospace;
    --color-primary: ${({ theme }) => theme.primary});
    --color-secondary: ${({ theme }) => theme.secondary});
    --color-light: ${({ theme }) => theme.light});
    --color-dark: ${({ theme }) => theme.dark});
    --color-danger: ${({ theme }) => theme.danger});
    --color-success: ${({ theme }) => theme.success});
    --shadow: rgba(0, 0, 0, 0.1);
    --space: 1rem;
  }

  .multi-btn {
    display: flex;
    width: 100%;
    box-shadow: var(--shadow) 4px 4px;
  }

  .multi-btn btn {
    flex-grow: 1;
    cursor: pointer;
    position: relative;
    padding: calc(var(--space) / 1.125) var(--space) var(--space);
    color: hsl(0, 0%, var(--switch));
    --switch: calc((var(--light) - var(--threshold)) * -100%);
    font-size: 1.5rem;
    font-family: var(--font-family);
    text-transform: lowercase;
    text-shadow: var(--shadow) 2px 2px;
    transition: flex-grow var(--duration) var(--ease);
    display: inline-block;
    box-sizing: border-box;
    text-decoration: none;
    padding: 0.35em 1.2em;
    border: var(--border-size) solid hsl(0, 0%, var(--switch));
    margin: 0 0.3em 0.3em 0;
    font-family: ${({ theme }) => theme.font};
    text-align: center;
    transition: all 0.2s;
  }

  .multi-btn btn + btn {
    border-left: var(--border-size) solid black;
    margin-left: calc(var(--border-size) * -1);
  }

  .multi-btn btn-primary:hover,
  .multi-btn btn:focus {
    flex-grow: 2;
    color: white;
    outline: none;
    text-shadow: none;
    background-color: var(--color-secondary);
  }

  .multi-btn btn-primary:focus {
    outline: var(--border-size) dashed var(--color-primary);
    outline-offset: calc(var(--border-size) * -3);
  }

  .multi-btn:hover btn-primary:focus:not(:hover) {
    flex-grow: 1;
    color: var(--color-secondary);
    background-color: var(--color-primary);
    outline-color: var(--color-t);
  }

   .multi-btn btn-dark:hover,
  .multi-btn btn-dark:focus {
    flex-grow: 2;
    color: white;
    outline: none;
    text-shadow: none;
    background-color: var(--color-dark);
  }

  .multi-btn btn-dark:focus {
    outline: var(--border-size) dashed var(--color-light);
    outline-offset: calc(var(--border-size) * -3);
  }

  .multi-btn:hover btn-dark:focus:not(:hover) {
    flex-grow: 1;
    color: var(--color-se);
    background-color: var(--color-light);
    outline-color: var(--color-tertiary);
  }

   .multi-btn btn-danger:hover,
  .multi-btn btn-danger:focus {
    flex-grow: 2;
    color: white;
    outline: none;
    text-shadow: none;
    background-color: var(--color-danger);
  }

  .multi-btn btn-danger:focus {
    outline: var(--border-size) dashed var(--color-light);
    outline-offset: calc(var(--border-size) * -3);
  }

  .multi-btn:hover btn-danger:focus:not(:hover) {
    flex-grow: 1;
    color: var(--color-secondary);
    background-color: var(--color-success);
    outline-color: var(--color-tertiary);
  }



  .multi-btn btn:active {
    transform: translateY(var(--border-size));
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
