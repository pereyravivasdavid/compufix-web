"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MAIN_ACTIONS,
  getIntent,
  resolveReply,
  type QuickAction,
} from "@/lib/compufix-info";

type Mensaje = {
  id: number;
  role: "bot" | "usuario";
  texto: string;
  acciones?: QuickAction[];
};

const BIENVENIDA: Mensaje = {
  id: 0,
  role: "bot",
  texto:
    "¡Hola! Soy el asistente virtual de Compufix. Puedo contarte sobre servicios, presupuestos, horarios y garantías, o pasarte con un técnico por WhatsApp. ¿Qué necesitás?",
  acciones: MAIN_ACTIONS,
};

function IconoChat({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}

function IconoCerrar({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function IconoEnviar({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export default function ChatWidget({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([BIENVENIDA]);
  const [entrada, setEntrada] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);

  const idRef = useRef(1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const siguienteId = () => {
    idRef.current += 1;
    return idRef.current;
  };

  const programar = (fn: () => void, ms: number) => {
    const timer = setTimeout(fn, ms);
    timers.current.push(timer);
  };

  useEffect(() => {
    const activos = timers.current;
    return () => {
      activos.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const alPresionar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", alPresionar);
    return () => window.removeEventListener("keydown", alPresionar);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const enfocar = setTimeout(() => inputRef.current?.focus(), 250);
    return () => clearTimeout(enfocar);
  }, [open]);

  useEffect(() => {
    const cuerpo = bodyRef.current;
    if (cuerpo) cuerpo.scrollTop = cuerpo.scrollHeight;
  }, [mensajes, escribiendo]);

  const agregarUsuario = (texto: string) => {
    setMensajes((prev) => [
      ...prev,
      { id: siguienteId(), role: "usuario", texto },
    ]);
  };

  const responder = (intent: string) => {
    const respuesta = getIntent(intent);
    if (!respuesta) return;
    setEscribiendo(true);
    programar(() => {
      setMensajes((prev) => [
        ...prev,
        {
          id: siguienteId(),
          role: "bot",
          texto: respuesta.text,
          acciones: respuesta.actions,
        },
      ]);
      setEscribiendo(false);
    }, 500);
  };

  const enviar = (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const texto = entrada.trim();
    if (!texto) return;

    agregarUsuario(texto);
    setEntrada("");

    const respuesta = resolveReply(texto);
    setEscribiendo(true);
    programar(() => {
      setMensajes((prev) => [
        ...prev,
        {
          id: siguienteId(),
          role: "bot",
          texto: respuesta.text,
          acciones: respuesta.actions,
        },
      ]);
      setEscribiendo(false);
    }, 500);
  };

  const elegirIntencion = (accion: QuickAction) => {
    if (!accion.intent) return;
    agregarUsuario(accion.label);
    responder(accion.intent);
  };

  const claseAccion =
    "text-[10px] font-mono uppercase tracking-widest px-3 py-2 border transition-colors";

  const renderAccion = (accion: QuickAction, mensajeId: number) => {
    const key = `${mensajeId}-${accion.label}`;

    if (!accion.href) {
      return (
        <button
          key={key}
          type="button"
          onClick={() => elegirIntencion(accion)}
          className={`${claseAccion} border-zinc-700 text-zinc-300 hover:border-white hover:text-white`}
        >
          {accion.label}
        </button>
      );
    }

    const registrar = () => agregarUsuario(accion.label);

    if (accion.href.startsWith("/")) {
      return (
        <Link
          key={key}
          href={accion.href}
          onClick={registrar}
          className={`${claseAccion} border-zinc-700 text-zinc-300 hover:border-white hover:text-white`}
        >
          {accion.label}
        </Link>
      );
    }

    return (
      <a
        key={key}
        href={accion.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={registrar}
        className={`${claseAccion} border-[#E1F030]/60 text-[#E1F030] hover:bg-[#E1F030] hover:text-black`}
      >
        {accion.label}
      </a>
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-controls="compufix-chat-panel"
        aria-label={open ? "Cerrar chat" : "Abrir chat con Compufix"}
        className="w-14 h-14 rounded-full bg-[#E1F030] text-black flex items-center justify-center pointer-events-auto transition-transform duration-300 hover:scale-110 shadow-[0_0_20px_rgba(225,240,48,0.35)] hover:shadow-[0_0_30px_rgba(225,240,48,0.55)]"
      >
        {open ? (
          <IconoCerrar className="w-6 h-6" />
        ) : (
          <IconoChat className="w-7 h-7" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="compufix-chat-panel"
            role="dialog"
            aria-modal="false"
            aria-label="Chat de Compufix"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed z-[55] right-4 bottom-24 md:right-8 md:bottom-28 w-[calc(100vw-2rem)] max-w-sm h-[min(70vh,560px)] flex flex-col bg-[#050505] border border-zinc-800 shadow-2xl overflow-hidden pointer-events-auto"
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-zinc-900 bg-[#0A0A0A]">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-[#E1F030] shadow-[0_0_8px_rgba(225,240,48,0.6)]" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-white">
                    Asistente Compufix
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Respuestas automáticas
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="Cerrar chat"
                className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
              >
                <IconoCerrar className="w-4 h-4" />
              </button>
            </div>

            <div
              ref={bodyRef}
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4"
            >
              {mensajes.map((mensaje) => (
                <div
                  key={mensaje.id}
                  className={`flex flex-col gap-2 ${
                    mensaje.role === "usuario" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-line px-3 py-2 text-[13px] font-mono leading-relaxed ${
                      mensaje.role === "usuario"
                        ? "bg-[#E1F030] text-black"
                        : "bg-zinc-900 text-zinc-200 border border-zinc-800"
                    }`}
                  >
                    {mensaje.texto}
                  </div>
                  {mensaje.acciones && mensaje.acciones.length > 0 && (
                    <div className="flex flex-wrap gap-2 max-w-[95%]">
                      {mensaje.acciones.map((accion) =>
                        renderAccion(accion, mensaje.id),
                      )}
                    </div>
                  )}
                </div>
              ))}

              {escribiendo && (
                <div className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900 border border-zinc-800 w-fit">
                  <span className="w-1.5 h-1.5 bg-zinc-500 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-zinc-500 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-zinc-500 animate-bounce" />
                </div>
              )}
            </div>

            <form
              onSubmit={enviar}
              className="border-t border-zinc-900 p-3 flex items-center gap-2 bg-[#0A0A0A]"
            >
              <label htmlFor="compufix-chat-input" className="sr-only">
                Mensaje para el asistente
              </label>
              <input
                id="compufix-chat-input"
                ref={inputRef}
                type="text"
                value={entrada}
                onChange={(evento) => setEntrada(evento.target.value)}
                placeholder="Escribí tu consulta..."
                autoComplete="off"
                className="flex-1 min-w-0 bg-transparent text-sm font-mono text-white placeholder-zinc-600 px-2 py-2 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!entrada.trim()}
                aria-label="Enviar mensaje"
                className="w-9 h-9 shrink-0 flex items-center justify-center bg-[#E1F030] text-black transition-opacity hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <IconoEnviar className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
