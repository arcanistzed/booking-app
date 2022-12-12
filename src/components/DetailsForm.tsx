import { useRef } from "react";

export function DetailsForm({
	onSubmit,
}: {
	onSubmit: (name: string, email: string, phone: string, message?: string) => void;
}) {
	const name = useRef<HTMLInputElement>(null);
	const email = useRef<HTMLInputElement>(null);
	const phone = useRef<HTMLInputElement>(null);
	const message = useRef<HTMLTextAreaElement>(null);

	return (
		<div className="m-4 flex flex-col gap-2 rounded-xl bg-slate-600/80 p-4">
			<div className="text-center text-2xl text-white">Enter Details</div>
			<div className="flex flex-col gap-2">
				<label className="text-white">Name</label>
				<input className="rounded-xl bg-slate-600/80 text-white" ref={name} required />
			</div>
			<div className="flex flex-col gap-2">
				<label className="text-white">Email</label>
				<input className="rounded-xl bg-slate-600/80 text-white" ref={email} required />
			</div>
			<div className="flex flex-col gap-2">
				<label className="text-white">Phone</label>
				<input className="rounded-xl bg-slate-600/80 text-white" ref={phone} required />
			</div>
			<div className="flex flex-col gap-2">
				<label className="text-white">Message</label>
				<textarea className="rounded-xl bg-slate-600/80 text-white" ref={message} />
			</div>
			<button
				className="rounded-xl bg-cyan-900 p-2 text-white"
				onClick={() => {
					onSubmit(
						name.current?.value ?? "",
						email.current?.value ?? "",
						phone.current?.value ?? "",
						message.current?.value
					);
				}}
			>
				Book
			</button>
		</div>
	);
}
