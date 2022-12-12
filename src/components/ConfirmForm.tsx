export function ConfirmForm({ booking, onBook }: { booking: Date; onBook: (date: Date) => void }) {
	return (
		<div className="m-4 flex flex-col gap-2 rounded-xl bg-slate-600/80 p-4">
			<div className="text-center text-2xl text-white">Confirm Booking</div>
			<div className="text-center text-white">
				{booking.toLocaleString("default", {
					weekday: "long",
					day: "numeric",
					month: "long",
					year: "numeric",
					hour: "numeric",
					minute: "numeric",
				})}
			</div>
			<button
				className="rounded-xl bg-cyan-900 p-2 text-white"
				onClick={() => {
					onBook(booking);
				}}
			>
				Book
			</button>
		</div>
	);
}
