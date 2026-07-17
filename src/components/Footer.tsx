export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-white px-6 py-10 sm:px-10 lg:px-20">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-display text-lg tracking-widest2 text-ink">
          DEVIN HAUSER <span className="text-red">· SUI-134</span>
        </p>
        <p className="font-mono text-xs uppercase tracking-widest2 text-graphite/70">
          © {new Date().getFullYear()} Devin Hauser — Website in Aufbau (V1)
        </p>
      </div>
    </footer>
  );
}
