import {
	faAngleDoubleLeft,
	faAngleDoubleRight,
	faAngleLeft,
	faAngleRight,
	faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";
import { api } from "../../utils/api";
import {
	BookingSteps,
	type BookingMap,
	type BookingStepIndex,
	type GeneralBooking,
} from "./Booking";

type Booking = BookingMap["date"];

type CalendarGridProps = {
	booking: GeneralBooking;
	setBooking: (booking: Booking) => void;
	updateStep: (step: BookingStepIndex) => void;
};

export default function CalendarGrid({
	booking,
	setBooking,
	updateStep,
}: CalendarGridProps) {
	const { data: disabled = [] } = api.booking.getDisabled.useQuery();
	const [date, setDate] = useState(new Date());

	const monthYear = useMemo(() => {
		return date.toLocaleString("default", {
			month: "long",
			year: "numeric",
		});
	}, [date]);

	const firstWeekday = useMemo(() => {
		return date.getDate() - date.getDay();
	}, [date]);

	const handleSelect = () => {
		booking.date = date;
		setBooking(booking as Booking);
		updateStep(
			Object.values(BookingSteps).indexOf("details") as BookingStepIndex
		);
	};

	return (
		<div className="sm: m-4 flex w-full flex-col gap-2 bg-secondary-600/20 p-2 sm:w-[unset] sm:rounded-xl md:p-4">
			<nav className="flex flex-row justify-evenly gap-1">
				<button
					className="text-2xl text-secondary-100"
					onClick={() =>
						setDate(
							new Date(date.getFullYear(), date.getMonth() - 1)
						)
					}
				>
					<FontAwesomeIcon icon={faAngleDoubleLeft} />
				</button>
				<button
					className="text-2xl text-secondary-100"
					onClick={() => {
						setDate(
							new Date(
								date.getFullYear(),
								date.getMonth(),
								firstWeekday - 7
							)
						);
					}}
				>
					<FontAwesomeIcon icon={faAngleLeft} />
				</button>
				<div className="text-center text-2xl text-secondary-100">
					{monthYear}
				</div>
				<button
					className="text-2xl text-secondary-100"
					onClick={() => {
						setDate(
							new Date(
								date.getFullYear(),
								date.getMonth(),
								firstWeekday + 7
							)
						);
					}}
				>
					<FontAwesomeIcon icon={faAngleRight} />
				</button>
				<button
					className="text-2xl text-secondary-100"
					onClick={() =>
						setDate(
							new Date(date.getFullYear(), date.getMonth() + 1)
						)
					}
				>
					<FontAwesomeIcon icon={faAngleDoubleRight} />
				</button>
			</nav>
			<div className="flex flex-row gap-1">
				{[...Array.from({ length: 7 })].map((_, i) => (
					<DayColumn
						key={i}
						setDate={setDate}
						onSelect={handleSelect}
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
			today.getDate() === day &&
			today.getMonth() === date.getMonth() &&
			today.getFullYear() === date.getFullYear()
		);
	}, [date, day]);

	return (
		<div
			className={`flex flex-auto flex-col sm:w-[max(3rem,6vw)] md:gap-1 ${
				isToday ? "rounded-xl bg-primary-800" : ""
			}`}
		>
			<div className="whitespace-nowrap p-1 text-center text-secondary-100">
				{new Date(
					date.getFullYear(),
					date.getMonth(),
					day
				).toLocaleString("default", {
					weekday: "short",
					day: "numeric",
				})}
			</div>
			<div className="flex flex-col gap-1">
				{[...Array.from({ length: 10 })].map((_, i) => (
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
	const handleClick = () => {
		if (isDisabled) return;
		setDate(new Date(date.getFullYear(), date.getMonth(), day, time));
		onSelect(date);
	};

	const isSlot = useMemo(() => {
		return date.getDate() === day && date.getHours() === time;
	}, [date, day, time]);

	const isDisabled = useMemo(() => {
		return disabled.some(d => d.getDate() === day && d.getHours() === time);
	}, [disabled, day, time]);

	return (
		<div
			className={`flex cursor-pointer flex-col place-items-center rounded-xl bg-black/10 py-1 text-center text-secondary-100 ${
				isSlot ? "bg-secondary-800" : ""
			} ${
				isDisabled
					? "cursor-not-allowed bg-primary/10"
					: "hover:bg-secondary/20 active:bg-secondary/30"
			}`}
			onClick={handleClick}
		>
			{isSlot ? (
				<FontAwesomeIcon
					icon={faCheck}
					className="text-4xl text-primary-100"
				/>
			) : (
				[...Array.from({ length: 2 })].map((_, i) => (
					<div key={i}>
						{time + i > 12 ? `${time + i - 12}pm` : `${time + i}am`}
					</div>
				))
			)}
		</div>
	);
}
