import { trpc } from "../utils/trpc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";

export function CalendarGrid({ onSelect }: { onSelect: (date: Date) => void }) {
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
