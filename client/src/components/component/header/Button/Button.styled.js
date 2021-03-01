import styled from "styled-components";

export const StyledButton = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

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

  .btn-1 a,
  .btn-2 a {
    text-decoration: none;
    border: 2px solid #010100;
    padding: 15px;
    color: #000;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;
    display: inline-block;
  }

  span {
    position: relative;
    /* z-index coz when we put bg to before and after this span text will not be visible */
    z-index: 3;
  }

  .btn-1 a::before {
    content: "";
    position: absolute;
    top: 5px;
    left: -2px;
    width: calc(100% + 6px);
    /*100% plus double the times left values*/
    height: calc(100% - 10px);
    background-color: #ffffff;
    transition: all 0.5s ease-in-out;
    transform: scaleY(1);
  }

  .btn-1 a:hover::before,
  .btn-2 a:hover::before {
    transform: scaleY(0);
  }

  .btn-1 a::after {
    content: "";
    position: absolute;
    left: 5px;
    top: -5px;
    width: calc(100% - 10px);
    /*100% plus double the times left values*/
    height: calc(100% + 10px);
    background-color: #ffffff;
    transition: all 0.5s ease-in-out;
    transform: scaleX(1);
  }

  .btn-1 a:hover::after,
  .btn-2 a:hover::after {
    transform: scaleX(0);
  }

  .btn-2 a {
    color: #ffffff;
    transition: all 0.5s ease-in-out;
  }

  .btn-2 a:hover {
    color: #000000;
    transition: all 0.5s ease-in-out;
  }

  .btn-2 a::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    transition: all 0.5s ease-in-out;
    transform: scaleY(1);
  }

  .btn-2 a::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    transition: all 0.5s ease-in-out;
    transform: scaleX(1);
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
