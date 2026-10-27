// Wordmark tipográfico, o mesmo da welcome/. Grafia sempre "QUÉOTA SKIN".

export function Marca({ className = "" }: { className?: string }) {
  return (
    <span
      aria-label="QUÉOTA SKIN"
      className={`inline-flex items-baseline gap-1.5 font-black tracking-tight uppercase italic select-none ${className}`}
    >
      <span aria-hidden className="text-paper">QUÉOTA</span>
      <span aria-hidden className="text-red">SKIN</span>
    </span>
  );
}
