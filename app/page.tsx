import Link from "next/link";

export default function Home() {
	return (
		<div className="gad-iframe-root gad-iframe-root--stacked">
			<header className="gad-seo-strip shrink-0 border-white/10 border-b bg-black px-4 py-3 text-center md:px-6 md:py-3.5 md:text-left">
				<h1 className="font-semibold text-[10px] text-white/80 uppercase tracking-[0.28em] sm:text-[11px]">
					Gad Studios · UGC · Video · Cinematography · Photography · Sound
				</h1>
				<p className="mx-auto mt-1.5 max-w-3xl text-[11px] text-white/55 leading-snug sm:text-xs md:mx-0">
					Creative studio for on-camera campaigns, UGC packages, and cinematic
					brand films — plus education at{" "}
					<Link
						className="text-white/75 underline decoration-white/25 underline-offset-2 hover:text-white hover:decoration-white/50"
						href="https://tcs.gad-studios.com"
						rel="noopener noreferrer"
					>
						The Creative Shift
					</Link>{" "}
					(mindset & systems for creators).
				</p>
			</header>
			<div className="gad-iframe-slot relative min-h-0 flex-1">
				<iframe
					className="gad-iframe"
					src="/gad-studios-wf/index.html"
					title="Gad Studios | UGC · Video · Cinematography · Photography · Sound"
				/>
			</div>
		</div>
	);
}
