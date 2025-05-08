<template>
  <footer>
    <div>
      <ul id="nav">
        <li id="medias">
          <p>IFbooks</p>
          <ul>
            <li><span class="fa-brands fa-square-facebook"></span></li>
            <li><span class="fa-brands fa-square-instagram"></span></li>
            <li><span class="fa-brands fa-square-twitter"></span></li>
          </ul>
        </li>
        <li id="contact">
          <p>Contato</p>
          <ul>
            <li><span class="fa-solid fa-phone"></span>+55 47 40045263</li>
            <li>
              <span class="fa-solid fa-clock"></span>8h às 23h - Seg a Sex
            </li>
            <li>
              <span class="fa-solid fa-envelope"></span>contato@ifbooks.com
            </li>
          </ul>
          <ul>
            <li><img src="../../src/paymentmethods/paipalcard.png" alt="" /></li>
            <li><img src="../../src/paymentmethods/mastercardcard.png" alt="" /></li>
            <li><img src="../../src/paymentmethods/visacard.png" alt="" /></li>
          </ul>
        </li>
      </ul>
    </div>
    <p id="direitos-reservados">© Alguns direitos reservados. IFbooks 2025.</p>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background-color: var(--verde-claro);
  color: var(--branco);
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    width: 100%;
    border-bottom: 1px solid var(--branco);

    #nav {
      padding: calc(20px + 1vw) calc(20px + 4vw);
      display: flex;
      justify-content: space-between;
      li {
        ul {
          display: flex;
        }
        &#contact {
          display: flex;
          flex-direction: column;
          align-items: baseline;
          justify-content: center;
          gap: calc(20px + 0.6vh);

          ul:nth-child(2) {
            gap: calc(8px + 0.5vh);
            flex-direction: column;
            color: var(--branco);

            li {
              opacity: 0.6;
              span {
                font-size: calc(13px + 0.3vw);
                margin-right: calc(3px + 0.3vw);
              }
            }
          }
          ul:last-child {
            gap: calc(10px + 1vw);
            align-items: center;
            justify-content: baseline;
            img {
              width: calc(40px + 0.8vw);
            }
          }
        }
        &#medias {
          ul {
            margin-top: calc(20px + 0.6vh);
            gap: calc(12px + 0.3vw);
            li {
              span {
                font-size: calc(25px + 0.6vw);
              }
            }
          }
        }
      }

      @media (max-width: 500px) {
        &{
          padding: calc(20px + 1vw) calc(13px + 2vw); 
        }
      }

    }
  }
  #direitos-reservados {
    color: var(--branco);
    padding: calc(25px + 1.5vh) calc(30px + 3vw);
    opacity: 0.6;
  }
}
</style>
