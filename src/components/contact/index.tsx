"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

type FormState = "idle" | "sending" | "success" | "error";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setState("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Erro desconhecido");

      setState("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setState("idle"), 6000);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Falha ao enviar mensagem.";
      setErrorMsg(message);
      setState("error");
      setTimeout(() => setState("idle"), 6000);
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "var(--muted)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    color: "var(--foreground)",
    padding: "12px 16px",
    width: "100%",
    outline: "none",
    fontSize: "14px",
    transition: "border-color 0.2s",
  };

  const infoItems = [
    {
      icon: Mail,
      label: "Email",
      value: "wesleyviniciusfreitas.jr@gmail.com",
      href: "mailto:wesleyviniciusfreitas.jr@gmail.com",
    },
    {
      icon: Phone,
      label: "Telefone",
      value: "(43) 99956-7359",
      href: "tel:+5543999567359",
    },
    {
      icon: MapPin,
      label: "Localização",
      value: "Londrina - PR, Brasil",
      href: null,
    },
  ];

  return (
    <section className="py-24" id="contato">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1.5 rounded-full glass"
            style={{ color: "var(--primary-light)" }}
          >
            Vamos conversar
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              color: "var(--foreground)",
            }}
          >
            Entre em <span className="text-gradient">Contato</span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "var(--muted-foreground)" }}
          >
            Disponível para freelance e oportunidades de trabalho. Se você tem
            um projeto em mente ou apenas quer dizer oi, fique à vontade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Info */}
          <div className="glass rounded-2xl p-8 flex flex-col justify-between gap-8">
            <div>
              <h3
                className="text-xl font-bold mb-2"
                style={{
                  fontFamily: "var(--font-syne)",
                  color: "var(--foreground)",
                }}
              >
                Informações de contato
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                Prefere contato direto? Use uma das opções abaixo.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {infoItems.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(124,111,247,0.12)",
                      color: "var(--primary)",
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p
                      className="text-xs mb-0.5 font-medium"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium transition-colors hover:opacity-80"
                        style={{ color: "var(--foreground)" }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--foreground)" }}
                      >
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability badge */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(124,111,247,0.08)",
                border: "1px solid rgba(124,111,247,0.2)",
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <span
                className="text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                Disponível para projetos — resposta em até 24h
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="glass rounded-2xl p-8">
            <div className="flex flex-col gap-5">
              <div>
                <label
                  className="block text-xs font-semibold mb-2"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Nome
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  disabled={state === "sending"}
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--primary)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>

              <div>
                <label
                  className="block text-xs font-semibold mb-2"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  disabled={state === "sending"}
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--primary)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>

              <div>
                <label
                  className="block text-xs font-semibold mb-2"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  Mensagem
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Me conte sobre o seu projeto..."
                  rows={5}
                  disabled={state === "sending"}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "var(--primary)")
                  }
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>

              {/* Feedback de erro */}
              {state === "error" && (
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    color: "#f87171",
                  }}
                >
                  <AlertCircle size={16} className="flex-shrink-0" />
                  {errorMsg || "Falha ao enviar. Tente novamente."}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={
                  state === "sending" ||
                  state === "success" ||
                  !form.name ||
                  !form.email ||
                  !form.message
                }
                className="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed"
                style={{
                  background:
                    state === "success"
                      ? "rgba(74,222,128,0.85)"
                      : "linear-gradient(135deg, var(--primary-dark), var(--primary))",
                  boxShadow: "0 4px 24px rgba(124,111,247,0.3)",
                  opacity: !form.name || !form.email || !form.message ? 0.6 : 1,
                }}
              >
                {state === "success" ? (
                  <>
                    <CheckCircle size={18} />
                    Enviado! Verifique seu email.
                  </>
                ) : state === "sending" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Enviar mensagem
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
