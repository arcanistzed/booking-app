import { trpc } from "../utils/trpc";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useRef, useState } from "react";

enum BookingStep {
	DATE,
	DETAILS,
	CONFIRM,
}

export default function Booking() {
	const [booking, setBooking] = useState<Date | null>(null);

	function handleDateSelect(date: Date) {
		setBooking(date);
		setStep(BookingStep.DETAILS);
	}

	function handleSubmitDetails() {
		setStep(BookingStep.CONFIRM);
	}

	function handleSubmitBooking(date: Date) {
		console.log(`Booking ${date}`);
		setBooking(date);
	}

	const [step, setStep] = useState<BookingStep>(BookingStep.DATE);

	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<div className="flex flex-col items-center justify-center gap-2">
				<h1 className="text-3xl text-cyan-900">Book an Appointment</h1>
				<p className="text-cyan-800">
					{step === BookingStep.DATE
						? "Select a date and time for your appointment"
						: step === BookingStep.DETAILS
						? "Enter your contact details"
						: "Confirm your booking"}
				</p>
			</div>
			{step === BookingStep.DATE || booking === null ? (
				<CalendarGrid onSelect={handleDateSelect} />
			) : step === BookingStep.DETAILS ? (
				<DetailsForm onSubmit={handleSubmitDetails} />
			) : (
				<ConfirmForm booking={booking} onBook={handleSubmitBooking} />
			)}
			<ReturnButton step={step} setStep={setStep} />
		</div>
	);
}

function ReturnButton({ step, setStep }: { step: BookingStep; setStep: (step: BookingStep) => void }) {
	if (step === BookingStep.DATE) return null;
	return (
		<button className="text-cyan-800" onClick={() => setStep(step - 1)}>
			<FontAwesomeIcon icon={["fas", "angle-left"]} /> Back
		</button>
	);
}

function CalendarGrid({ onSelect }: { onSelect: (date: Date) => void }) {
	const { data: disabled = [] } = trpc.booking.getDisabled.useQuery();
	const [date, setDate] = useState(new Date());

	const monthYear = useMemo(() => {
		return date.toLocaleString("default", { month: "long", year: "numeric" });
	}, [date]);

	const firstWeekday = useMemo(() => {
		return date.getDate() - date.getDay();
	}, [date]);

	return (
		<div className="m-4 flex flex-col gap-2 rounded-xl bg-slate-600/80 p-4">
			<nav className="flex flex-row justify-between gap-1">
				<button
					className="text-2xl text-white"
					onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1))}
				>
					<FontAwesomeIcon icon={["fas", "angle-double-left"]} />
				</button>
				<button
					className="text-2xl text-white"
					onClick={() => {
						setDate(new Date(date.getFullYear(), date.getMonth(), firstWeekday - 7));
					}}
				>
					<FontAwesomeIcon icon={["fas", "angle-left"]} />
				</button>
				<div className="text-center text-2xl text-white">{monthYear}</div>
				<button
					className="text-2xl text-white"
					onClick={() => {
						setDate(new Date(date.getFullYear(), date.getMonth(), firstWeekday + 7));
					}}
				>
					<FontAwesomeIcon icon={["fas", "angle-right"]} />
				</button>
				<button
					className="text-2xl text-white"
					onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1))}
				>
					<FontAwesomeIcon icon={["fas", "angle-double-right"]} />
				</button>
			</nav>
			<div className="flex flex-row gap-1">
				{[...Array(7)].map((_, i) => (
					<DayColumn
						key={i}
						setDate={setDate}
						onSelect={onSelect}
						date={date}
						day={firstWeekday + i}
						disabled={disabled}
					/>
				))}
			</div>
		</div>
	);
}

function DayColumn({
	setDate,
	date,
	day,
	disabled,
	onSelect,
}: {
	setDate: (date: Date) => void;
	date: Date;
	day: number;
	disabled: Date[];
	onSelect: (date: Date) => void;
}) {
	const isToday = useMemo(() => {
		const today = new Date();
		return (
			today.getDate() === day && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()
		);
	}, [date, day]);

	return (
		<div className={`flex flex-col gap-1 ${isToday ? "rounded-xl bg-blue-900/20" : ""}`}>
			<div className="p-1 text-center text-white">
				{new Date(date.getFullYear(), date.getMonth(), day).toLocaleString("default", {
					weekday: "short",
					day: "numeric",
				})}
			</div>
			<div className="flex flex-col gap-1">
				{[...Array(10)].map((_, i) => (
					<TimeSlot
						key={i}
						setDate={setDate}
						onSelect={onSelect}
						date={date}
						day={day}
						time={i + 9}
						disabled={disabled}
					/>
				))}
			</div>
		</div>
	);
}

function TimeSlot({
	setDate,
	date,
	day,
	time,
	disabled,
	onSelect,
}: {
	setDate: (date: Date) => void;
	date: Date;
	day: number;
	time: number;
	disabled: Date[];
	onSelect: (date: Date) => void;
}) {
	function handleClick() {
		if (isDisabled) return;
		setDate(new Date(date.getFullYear(), date.getMonth(), day, time));
		onSelect(date);
	}

	const isSlot = useMemo(() => {
		return date.getDate() === day && date.getHours() === time;
	}, [date, day, time]);

	const isDisabled = useMemo(() => {
		return disabled.some(d => d.getDate() === day && d.getHours() === time);
	}, [disabled, day, time]);

	return (
		<div
			className={`grid h-[3.5rem] w-[6rem] cursor-pointer place-items-center rounded-xl bg-black/10 text-center text-white
			${isSlot ? "bg-cyan-900" : ""}
			${isDisabled ? "cursor-not-allowed bg-white/10" : "hover:bg-black/20 active:bg-black/30"}`}
			onClick={handleClick}
		>
			{isSlot ? (
				<FontAwesomeIcon icon={["fas", "check"]} className="text-4xl text-cyan-100" />
			) : (
				[...Array(2)].map((_, i) => <div key={i}>{time + i > 12 ? `${time + i - 12} PM` : `${time + i} AM`}</div>)
			)}
		</div>
	);
}

function DetailsForm({
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
						message.current?.value,
					);
				}}
			>
				Book
			</button>
		</div>
	);
}

function ConfirmForm({ booking, onBook }: { booking: Date; onBook: (date: Date) => void }) {
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
