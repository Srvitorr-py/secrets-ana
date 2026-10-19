
import { useState, useRef, useEffect } from "react";
import "./App.css";

const capitulos = [
  {
    titulo: "Capítulo I — Um encontro inesperado",
    subtitulo: "Toda história começa com um detalhe.",
    texto:
      "No momento que te conheci, entre tantos rostos e tantos caminhos, existe algo bonito na maneira como uma pessoa passa a ocupar um espaço especial em nossos pensamentos. Às vezes, a história começa discretamente: em uma conversa, em um sorriso ou na vontade de conhecer alguém um pouquinho mais.",
  },
  {
    titulo: "Capítulo II — Um pequeno segredo",
    subtitulo: "Algumas coisas merecem ser guardadas com carinho.",
    texto:
      "Se Lady Whistledown conhecesse esta história kkkkkk, talvez ela encontrasse motivos para escrever uma edição inteira. Mas tem sentimentos que não precisam ser anunciados para todo o mundo. Alguns podem ser cultivados em silêncio — tipo uma declaração de amor, talvez... Eu acho que são os detalhes e os pequenos gestos que tornam alguém especial.",
  },
  {
    titulo: "Capítulo III — Uma senhorita inesquecível",
    subtitulo: "Há pessoas que tornam os dias mais bonitos e alegres.",
    texto:
      "Em uma sociedade cheia de aparências e regras, eu acho que o mais raro seria encontrar alguém que despertasse sentimentos sinceros. E talvez o verdadeiro encanto esteja justamente nisso: perceber que, entre tantas possibilidades, existe uma pessoa que faz você querer escrever mais um capítulo.",
  },
];

const escolhas = [
  {
    titulo: "Uma carta perfumada",
    emoji: "💌",
    mensagem:
      "Eu acredito que algumas palavras ficam ainda mais bonitas quando estão sendo escritas pensando em alguém especial. Que esta carta seja um pequeno lembrete de que você merece receber carinho nos detalhes.",
  },
  {
    titulo: "Um convite para dançar",
    emoji: "🌷",
    mensagem:
      "Imagine um salão iluminado, uma música suave e uma dança sem pressa. Às vezes, tudo o que precisamos é de um momento bonito para guardar na memória, tipo aquela vez que fomos comer pizza, em que você estava maravilhosa.",
  },
  {
    titulo: "Um segredo da gazeta",
    emoji: "🪶",
    mensagem:
      "O maior segredo deste projeto não está nas fofocas da sociedade. Está na intenção de fazer uma senhorita sorrir e lembrar que ela é especial para mim.",
  },
];

function App() {
  const [secao, setSecao] = useState("inicio");
  const [cartaAberta, setCartaAberta] = useState(false);
  const [segredos, setSegredos] = useState([]);
  const [capituloAberto, setCapituloAberto] = useState(null);
  const [escolha, setEscolha] = useState(null);
  const [finalDesbloqueado, setFinalDesbloqueado] = useState(false);
  const [declaracaoAberta, setDeclaracaoAberta] = useState(false);
  const [musicaLigada, setMusicaLigada] = useState(false);
  const [erroMusica, setErroMusica] = useState(false);

  const audioRef = useRef(null);

  const progresso =
    (Number(cartaAberta) +
      Number(segredos.length >= 3) +
      Number(escolha !== null)) /
    3;

  useEffect(() => {
    if (cartaAberta && segredos.length >= 3 && escolha !== null) {
      setFinalDesbloqueado(true);
    }
  }, [cartaAberta, segredos, escolha]);

  async function alternarMusica() {
    const audio = audioRef.current;

    if (!audio) return;

    if (musicaLigada) {
      audio.pause();
      setMusicaLigada(false);
      return;
    }

    try {
      await audio.play();
      setMusicaLigada(true);
      setErroMusica(false);
    } catch {
      setErroMusica(true);
      setMusicaLigada(false);
    }
  }

  function revelarSegredo(indice) {
    setSegredos((atuais) =>
      atuais.includes(indice) ? atuais : [...atuais, indice]
    );
  }

  function irPara(secaoNova) {
    setSecao(secaoNova);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function abrirDeclaracao() {
    setDeclaracaoAberta(true);
    irPara("final");
  }

  return (
    <div className="site">
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}regencia.mp3`}
        loop
        preload="none"
        onError={() => {
          setErroMusica(true);
          setMusicaLigada(false);
        }}
      />

      <div className="ornamento-topo">✦ ❦ ✦</div>

      <header className="cabecalho">
        <button
          className="marca"
          onClick={() => irPara("inicio")}
          aria-label="Voltar ao início"
        >
          <span className="marca-pequena">UMA EDIÇÃO ESPECIAL DE</span>
          <span className="marca-grande">A Gazeta Secreta</span>
          <span className="marca-pequena">DA SOCIEDADE • 1813</span>
        </button>

        <nav className="navegacao">
          {[
            ["inicio", "Início"],
            ["gazeta", "A Gazeta"],
            ["cartas", "Cartas"],
            ["livro", "Os Capítulos"],
            ["baile", "O Baile"],
          ].map(([id, nome]) => (
            <button
              key={id}
              className={secao === id ? "nav-ativo" : ""}
              onClick={() => irPara(id)}
            >
              {nome}
            </button>
          ))}
        </nav>

        <button
          className="botao-musica"
          onClick={alternarMusica}
          aria-label={musicaLigada ? "Desligar música" : "Tocar música"}
        >
          {musicaLigada ? "♫ Música ligada" : "♫ Música"}
        </button>
      </header>

      {erroMusica && (
        <p className="aviso-musica">
          Não foi possível carregar a música. Confira se o arquivo
          <code> regencia.mp3 </code>
          está na raiz do repositório e se a publicação terminou.
        </p>
      )}

      <main>
        {secao === "inicio" && (
          <section className="pagina inicio animar">
            <div className="selo-superior">EDIÇÃO EXCLUSIVA Nº 001</div>

            <p className="sobretitulo">
              Prezada senhorita, temos um assunto a tratar...
            </p>

            <h1>
              Uma história
              <br />
              <em>escrita em segredo.</em>
            </h1>

            <div className="flor-separadora">❦</div>

            <p className="introducao">
              Entre bailes, cartas e segredos da alta sociedade, surgiu uma
              edição muito especial. E, desta vez, a protagonista é você.
            </p>

            <div className="nome-destaque">Ana Luiza</div>

            <p className="legenda-nome">
              A senhorita mais aguardada desta edição.
            </p>

            <div className="envelope-area">
              <button
                className={`envelope ${
                  cartaAberta ? "envelope-aberto" : ""
                }`}
                onClick={() => setCartaAberta(!cartaAberta)}
                aria-expanded={cartaAberta}
              >
                <span className="envelope-linha">
                  Uma correspondência para
                </span>
                <span className="envelope-nome">Miss Ana Luiza</span>
                <span className="lacre">A</span>
                <span className="envelope-instrucao">
                  {cartaAberta
                    ? "Fechar a correspondência"
                    : "Toque no lacre para abrir"}
                </span>
              </button>
            </div>

            {cartaAberta && (
              <article className="carta-revelada animar">
                <p className="carta-sauda">Minha querida Ana Luiza,</p>

                <p>
                  Se esta fosse uma edição escrita por Lady Whistledown, eu
                  certamente teria de revelar que existe alguém por trás
                  destas palavras que deseja arrancar um sorriso seu.
                </p>

                <p>
                  Prepare-se para algumas páginas, pequenos segredos e uma
                  surpresa reservada especialmente para você.
                </p>

                <p className="assinatura">Com carinho, Vitor. ♡</p>

                <button
                  className="botao-principal"
                  onClick={() => irPara("gazeta")}
                >
                  Descobrir esta edição <span>→</span>
                </button>
              </article>
            )}

            <div className="progresso-area">
              <div className="progresso-texto">
                <span>O caminho até o último segredo</span>
                <span>{Math.round(progresso * 100)}%</span>
              </div>

              <div className="progresso-trilho">
                <div
                  className="progresso-preenchido"
                  style={{ width: `${progresso * 100}%` }}
                />
              </div>
            </div>
          </section>
        )}

        {secao === "gazeta" && (
          <section className="pagina animar">
            <div className="cabecalho-secao">
              <span>EDIÇÃO EXTRAORDINÁRIA</span>
              <h2>
                Os segredos da <em>sociedade</em>
              </h2>
              <p>
                Uma pequena investigação sobre os assuntos que realmente
                importam.
              </p>
            </div>

            <article className="jornal">
              <div className="jornal-topo">
                <span>PUBLICAÇÃO CONFIDENCIAL</span>
                <span>EDIÇÃO Nº 001</span>
              </div>

              <div className="jornal-titulo">
                <span>THE</span>
                <h2>GAZETA</h2>
                <span>DE LADY WHISTLEDOWN</span>
              </div>

              <div className="jornal-data">
                LONDRES, UM DIA ESPECIAL • CIRCULAÇÃO RESTRITA
              </div>

              <h3>
                UMA CERTA SENHORITA
                <br />
                ROUBA A CENA
              </h3>

              <p className="jornal-subtitulo">
                Fontes próximas à redação confirmam: este projeto guarda
                intenções muito mais doces do que aparenta.
              </p>

              <div className="jornal-colunas">
                <p>
                  Prezada leitora, poucas coisas despertam tanta curiosidade
                  quanto uma história que começa com um nome cuidadosamente
                  escrito em um envelope.
                </p>

                <p>
                  Neste projeto, a atenção desta autora volta-se para Ana Luiza,
                  uma senhorita que merece mais do que uma simples nota nas
                  páginas da sociedade.
                </p>

                <p>
                  Dizem que o verdadeiro mistério não seria descobrir quem
                  escreveu uma gazeta, mas por que alguém preparou cada
                  detalhe pensando nela.
                </p>
              </div>

              <div className="jornal-assinatura">
                Com a mais doce curiosidade,
                <br />
                <strong>Lady Whistledown</strong>
                <span>✦</span>
              </div>
            </article>

            <div className="segredos-area">
              <h3>Três pequenos segredos</h3>

              <p className="texto-suave">
                Dizem que há mais neste projeto do que os olhos conseguem ver.
                Toque nos lacres para descobrir.
              </p>

              <div className="segredos-grade">
                {[
                  {
                    titulo: "O primeiro indício",
                    icone: "✉",
                    texto:
                      "Nem toda correspondência traz notícias da sociedade. Algumas existem apenas para fazer alguém sorrir.",
                  },
                  {
                    titulo: "Uma doce suspeita",
                    icone: "❦",
                    texto:
                      "Há nomes que ficam mais bonitos quando aparecem em nossos pensamentos sem aviso algum, principalmente o seu.",
                  },
                  {
                    titulo: "A última pista",
                    icone: "♡",
                    texto:
                      "Eu espero que você chegue até a última página. Há algo que desejo lhe dizer.",
                  },
                ].map((item, i) => (
                  <button
                    className={`segredo-card ${
                      segredos.includes(i) ? "segredo-descoberto" : ""
                    }`}
                    key={item.titulo}
                    onClick={() => revelarSegredo(i)}
                    aria-expanded={segredos.includes(i)}
                  >
                    <span className="segredo-icone">
                      {segredos.includes(i) ? item.icone : "🔒"}
                    </span>

                    <strong>{item.titulo}</strong>

                    <span className="segredo-dica">
                      {segredos.includes(i)
                        ? item.texto
                        : "Clique para revelar"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="centralizado">
              <button
                className="botao-principal"
                onClick={() => irPara("cartas")}
              >
                Continuar a investigação →
              </button>
            </div>
          </section>
        )}

        {secao === "cartas" && (
          <section className="pagina animar">
            <div className="cabecalho-secao">
              <span>CORRESPONDÊNCIAS CONFIDENCIAIS</span>
              <h2>
                Palavras guardadas <em>com carinho</em>
              </h2>
              <p>
                Algumas mensagens só precisam da pessoa certa para existir.
              </p>
            </div>

            <div className="cartas-grade">
              {[
                {
                  numero: "01",
                  titulo: "Uma lembrança",
                  texto:
                    "Que você encontre motivos para sorrir mesmo nos dias comuns, e que nunca lhe faltem pequenos gestos que tornem a vida um pouco mais leve.",
                  selo: "A",
                },
                {
                  numero: "02",
                  titulo: "Um desejo",
                  texto:
                    "Que a vida lhe reserve encontros bonitos, conversas que durem horas e pessoas que saibam valorizar a delicadeza que existe em você.",
                  selo: "♡",
                },
                {
                  numero: "03",
                  titulo: "Uma confidência",
                  texto:
                    "Esta página é apenas uma pequena parte de algo preparado com cuidado. Continue explorando: a última carta ainda está à sua espera.",
                  selo: "✦",
                },
              ].map((carta) => (
                <article className="carta-card" key={carta.numero}>
                  <span className="carta-numero">{carta.numero}</span>
                  <div className="carta-card-selo">{carta.selo}</div>
                  <h3>{carta.titulo}</h3>
                  <p>{carta.texto}</p>
                  <span className="carta-linha">
                    Escrita especialmente para você
                  </span>
                </article>
              ))}
            </div>

            <div className="centralizado">
              <button
                className="botao-principal"
                onClick={() => irPara("livro")}
              >
                Ler os próximos capítulos →
              </button>
            </div>
          </section>
        )}

        {secao === "livro" && (
          <section className="pagina animar">
            <div className="cabecalho-secao">
              <span>UMA PEQUENA OBRA EM TRÊS ATOS</span>
              <h2>
                O livro dos <em>sentimentos</em>
              </h2>
              <p>
                Inspirado no charme da Regência e nas histórias que aquecem o
                coração.
              </p>
            </div>

            <div className="livro-layout">
              <div className="capa-livro">
                <div className="capa-borda">
                  <span>UMA HISTÓRIA ORIGINAL</span>
                  <div className="capa-flor">❦</div>
                  <h3>
                    Pequenos
                    <br />
                    Segredos
                  </h3>
                  <p>Uma edição para Ana Luiza</p>
                  <span className="capa-rodape">
                    COM TODO O CARINHO ♡
                  </span>
                </div>
              </div>

              <div className="capitulos">
                {capitulos.map((capitulo, i) => (
                  <article className="capitulo" key={capitulo.titulo}>
                    <button
                      className="capitulo-botao"
                      onClick={() =>
                        setCapituloAberto(capituloAberto === i ? null : i)
                      }
                      aria-expanded={capituloAberto === i}
                    >
                      <span className="capitulo-numero">0{i + 1}</span>

                      <span className="capitulo-titulo">
                        <strong>{capitulo.titulo}</strong>
                        <small>{capitulo.subtitulo}</small>
                      </span>

                      <span className="capitulo-sinal">
                        {capituloAberto === i ? "−" : "+"}
                      </span>
                    </button>

                    {capituloAberto === i && (
                      <div className="capitulo-texto animar">
                        <p>{capitulo.texto}</p>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>

            <div className="centralizado">
              <button
                className="botao-principal"
                onClick={() => irPara("baile")}
              >
                Receber um convite especial →
              </button>
            </div>
          </section>
        )}

        {secao === "baile" && (
          <section className="pagina animar">
            <div className="cabecalho-secao">
              <span>UMA NOITE NA ALTA SOCIEDADE</span>
              <h2>
                O convite para <em>o baile</em>
              </h2>
              <p>
                Escolha uma pequena surpresa. Cada uma guarda uma mensagem
                diferente.
              </p>
            </div>

            <div className="escolhas-grade">
              {escolhas.map((item, i) => (
                <button
                  className={`escolha-card ${
                    escolha === i ? "escolha-ativa" : ""
                  }`}
                  key={item.titulo}
                  onClick={() => setEscolha(i)}
                >
                  <span className="escolha-emoji">{item.emoji}</span>
                  <span className="escolha-numero">
                    CONVITE Nº 0{i + 1}
                  </span>
                  <strong>{item.titulo}</strong>
                  <span className="escolha-instrucao">
                    {escolha === i
                      ? "Seu convite escolhido ♡"
                      : "Escolher convite"}
                  </span>
                </button>
              ))}
            </div>

            {escolha !== null && (
              <article className="mensagem-escolhida animar">
                <span className="flor-separadora">❦</span>
                <h3>{escolhas[escolha].titulo}</h3>
                <p>{escolhas[escolha].mensagem}</p>
                <span className="assinatura">Com carinho, ♡</span>
              </article>
            )}

            <div className="progresso-area">
              <div className="progresso-texto">
                <span>Segredos descobertos</span>
                <span>
                  {Number(cartaAberta) +
                    Number(segredos.length >= 3) +
                    Number(escolha !== null)}{" "}
                  de 3
                </span>
              </div>

              <div className="progresso-trilho">
                <div
                  className="progresso-preenchido"
                  style={{ width: `${progresso * 100}%` }}
                />
              </div>
            </div>

            <div className="centralizado">
              {finalDesbloqueado ? (
                <button
                  className="botao-principal"
                  onClick={abrirDeclaracao}
                >
                  Abrir a última carta ♡
                </button>
              ) : (
                <p className="texto-suave">
                  Ainda há segredos para descobrir. Visite a carta inicial e
                  revele os três segredos da Gazeta.
                </p>
              )}
            </div>
          </section>
        )}

        {secao === "final" && (
          <section className="pagina final-pagina animar">
            {declaracaoAberta ? (
              <article className="declaracao">
                <span className="selo-superior">
                  A ÚLTIMA CORRESPONDÊNCIA
                </span>

                <div className="flor-separadora">❦</div>

                <h1>
                  Para você,
                  <br />
                  <em>Ana Luiza.</em>
                </h1>

                <p className="declaracao-texto">
                  Se eu pudesse escrever uma última linha nesta pequena
                  história, gostaria que ela dissesse o quanto você merece
                  carinho, sinceridade e momentos que façam seu coração sorrir.
                </p>

                <p className="declaracao-texto">
                  Preparei estas páginas pensando em você, nos detalhes que
                  poderiam te arrancar um sorriso e na alegria de transformar
                  uma ideia simples em algo especial.
                </p>

                <p className="declaracao-texto">
                  Talvez Lady Whistledown chamasse isso de um escândalo
                  romântico. Eu prefiro chamar de uma pequena coragem: a de
                  demonstrar o carinho que sinto por você.
                </p>

                <div className="declaracao-destaque">
                  Ana, você é alguém muito especial para mim e gostaria muito
                  de começar uma história com você, se tiver vontade. ♡
                </div>

                <div className="flor-separadora">✦ ❦ ✦</div>

                <p className="assinatura final-assinatura">
                  Com todo o carinho,
                  <br />
                  alguém que quis preparar algo só para você.
                </p>

                <p className="final-nota">
                  Fim deste projeto. O próximo capítulo fica a critério de
                  você, senhorita.
                </p>
              </article>
            ) : (
              <div className="final-bloqueado">
                <span className="selo-superior">
                  CORRESPONDÊNCIA SELADA
                </span>

                <div className="flor-separadora">🔒</div>

                <h2>A última carta ainda está fechada...</h2>

                <p>
                  A Gazeta guarda uma última mensagem. Descubra os segredos
                  anteriores e escolha seu convite para abri-la.
                </p>

                <button
                  className="botao-principal"
                  onClick={() => irPara("baile")}
                >
                  Voltar aos segredos →
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="rodape">
        <div className="flor-separadora">❦</div>

        <p>Uma edição feita com carinho para Ana Luiza.</p>

        <p className="rodape-menor">
          Inspirada no encanto dos romances de época e no universo de
          Bridgerton.
        </p>

        <button
          className="rodape-botao"
          onClick={() => irPara("inicio")}
        >
          Voltar ao início ↑
        </button>
      </footer>

      <div className="ornamento-base">✦ ❦ ✦</div>
    </div>
  );
}

export default App;
