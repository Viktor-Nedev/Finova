import { motion } from "framer-motion";

type MascotProps = {
  mood?: "happy" | "celebrate" | "thinking";
  size?: "sm" | "md" | "lg";
  message?: string;
};

const sizes = {
  sm: "h-16 w-16",
  md: "h-24 w-24",
  lg: "h-36 w-36",
};

export function Mascot({ mood = "happy", size = "md", message }: MascotProps) {
  const eyeClass = mood === "thinking" ? "h-2 w-2" : "h-3 w-3";
  const wingRotate = mood === "celebrate" ? [-18, 22, -18] : [-8, 8, -8];

  return (
    <div className="flex items-center gap-3">
      <motion.div
        className={`relative ${sizes[size]}`}
        animate={{ y: mood === "celebrate" ? [0, -10, 0] : [0, -4, 0] }}
        transition={{ duration: mood === "celebrate" ? 0.65 : 2.6, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Finny the Finova mascot"
        role="img"
      >
        <div className="absolute inset-x-4 bottom-0 h-5 rounded-full bg-black/10 blur-sm" />
        <div className="absolute inset-2 rounded-[42%_42%_48%_48%] border-4 border-duo-green-dark bg-duo-green shadow-duo">
          <div className="absolute left-1/2 top-0 h-6 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-duo-green-dark bg-duo-yellow" />
          <motion.div
            className="absolute -left-5 top-9 h-10 w-7 origin-right rounded-full border-4 border-duo-green-dark bg-duo-green-light"
            animate={{ rotate: wingRotate }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-5 top-9 h-10 w-7 origin-left rounded-full border-4 border-duo-green-dark bg-duo-green-light"
            animate={{ rotate: wingRotate.map((value) => -value) }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute left-1/2 top-9 flex -translate-x-1/2 gap-4">
            <div className={`${eyeClass} rounded-full bg-white`}>
              <div className="ml-1 mt-1 h-1.5 w-1.5 rounded-full bg-duo-ink" />
            </div>
            <div className={`${eyeClass} rounded-full bg-white`}>
              <div className="ml-1 mt-1 h-1.5 w-1.5 rounded-full bg-duo-ink" />
            </div>
          </div>
          <div className="absolute left-1/2 top-14 h-4 w-7 -translate-x-1/2 rounded-b-full border-b-4 border-duo-ink" />
          <div className="absolute bottom-4 left-1/2 h-7 w-10 -translate-x-1/2 rounded-full bg-white/85" />
        </div>
      </motion.div>
      {message && (
        <div className="relative rounded-3xl border-2 border-slate-100 bg-white px-4 py-3 text-sm font-extrabold text-slate-700 shadow-soft">
          <span className="absolute -left-2 top-7 h-4 w-4 rotate-45 border-b-2 border-l-2 border-slate-100 bg-white" />
          {message}
        </div>
      )}
    </div>
  );
}
