import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Button from "./Button";

export default function Navbar() {
	const { data: session } = useSession();

	const handleClick = () => {
		if (session?.user) {
			void signOut();
		} else {
			void signIn();
		}
	};

	return (
		<header className="bg-red flex w-full items-center justify-between px-4 py-4">
			<a
				href="//acupuncturerelief.ca"
				target="_blank"
				className="flex items-center gap-4"
				rel="noreferrer"
			>
				<Image
					src="https://acupuncturerelief.ca/wp-content/uploads/2020/02/cropped-sunset-75x75.png"
					alt="Acupuncture Relief"
					className="h-10 w-10"
					width={40}
					height={40}
				/>
				<h1 className="text-2xl font-bold text-white">
					Acupuncture Relief
				</h1>
			</a>
			<div className="flex items-center gap-4">
				<Button intent="nav" onClick={handleClick}>
					{session ? `Sign out (${session.user?.email ?? ""})` : "Sign in"}
				</Button>
			</div>
		</header>
	);
}
