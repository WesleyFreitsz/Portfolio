import React from "react";

export const Contact = () => {
  return (
    <section className="py-20" id="contato">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 text-primary">CONTATO</h2>
        <p className="text-foreground text-xl mb-8 max-w-2xl mx-auto">
          Estou disponível para freelance e oportunidades de trabalho. Se você
          tem um projeto em mente ou apenas quer dizer oi, sinta-se à vontade
          para me contatar.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-foreground text-lg">
          <div className="info-item">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:wesleyviniciusfreitas.jr@gmail.com"
              className="hover:text-primary transition-colors"
            >
              wesleyviniciusfreitas.jr@gmail.com
            </a>
          </div>
          <div className="info-item">
            <strong>Telefone:</strong>{" "}
            <a
              href="tel:+5543999567359"
              className="hover:text-primary transition-colors"
            >
              (43) 99956-7359
            </a>
          </div>
          <div className="info-item">
            <strong>Localização:</strong> Londrina - PR
          </div>
        </div>
      </div>
    </section>
  );
};
