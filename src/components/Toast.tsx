import { useEffect, useState } from "react";

let push: (msg: string) => void = () => {};

export function toast(msg: string) {
  push(msg);
}

export function ToastHost() {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    push = (m: string) => {
      setMsg(m);
      setTimeout(() => setMsg(null), 2400);
    };
    return () => {
      push = () => {};
    };
  }, []);

  return (
    <div
      className={[
        "pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transition-all duration-300",
        msg ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
      ].join(" ")}
    >
      <div className="rounded-full bg-ink px-6 py-2.5 text-[13px] font-medium tracking-tight text-white shadow-pop">
        {msg}
      </div>
    </div>
  );
}
