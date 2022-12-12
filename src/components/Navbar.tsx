import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
	const { data: session } = useSession();

	return (
		<header className="bg-red flex w-full items-center justify-between px-4 py-4">
			<a href="//acupuncturerelief.ca" target="_blank" className="flex items-center gap-4" rel="noreferrer">
				<Image
					src="//acupuncturerelief.ca/wp-content/uploads/2020/02/cropped-sunset-75x75.png"
					alt="Acupuncture Relief"
					className="h-10 w-10"
					width={40}
					height={40}
				/>
				<h1 className="text-2xl font-bold text-cyan-900">Acupuncture Relief</h1>
			</a>
			<div className="flex items-center gap-4">
				<button
					className="rounded-xl bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
					onClick={() => {
						if (session?.user) {
							signOut();
						} else {
							signIn();
						}
					}}
				>
					{session ? `Sign out (${session.user?.email})` : "Sign in"}
				</button>
			</div>
		</header>
	);
}
