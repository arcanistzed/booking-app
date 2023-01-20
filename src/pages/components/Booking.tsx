import { useState } from "react";
import CalendarGrid from "./CalendarGrid";
import ConfirmForm from "./ConfirmForm";
import DetailsForm from "./DetailsForm";
import Carousel from "./Carousel";

export const BookingSteps = {
	0: "date",
	1: "details",
	2: "confirm",
} as const;
export type BookingStepIndex = keyof typeof BookingSteps;

type ConfirmedBooking = {
	date: Date;
	name: string;
	email: string;
	phone: string;
	message?: string;
};

// This is a utility type to make a property required
type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export type BookingMap = {
	date: Partial<ConfirmedBooking>;
	// Now date is no longer optional
	details: WithRequired<ConfirmedBooking, "date">;
	// Now name, email and phone are no longer optional
	confirm: WithRequired<
		ConfirmedBooking,
		"date" | "name" | "email" | "phone"
	>;
};

export type GeneralBooking = BookingMap[(typeof BookingSteps)[BookingStepIndex]];

// Type guard to check if a booking is confirmed
export function isConfirmedBooking(
	booking: GeneralBooking
): booking is ConfirmedBooking {
	return (
		booking.date !== undefined &&
		booking.name !== undefined &&
		booking.email !== undefined &&
		booking.phone !== undefined
	);
}

function isValidBookingStepIndex(step: number): step is BookingStepIndex {
	return step >= 0 && step <= 2;
}

export default function Booking() {
	const [booking, setBooking] = useState<GeneralBooking>({});

	const [step, setStep] = useState<BookingStepIndex>(0);

	const handleBook = () => {
		if (isConfirmedBooking(booking)) {
			console.log("Booked", booking);
		} else {
			console.error("Invalid booking", booking);
		}
	};

	const updateStep = (step: number) => {
		if (!isValidBookingStepIndex(step)) {
			console.error("Invalid step", step);
			return;
		}

		setStep(step);
	};

	return (
		<div className="flex h-[calc(100vh-5rem)] flex-col items-center justify-center gap-2">
			<h1 className="text-3xl text-primary-50">Book an Appointment</h1>
			<Carousel
				step={step}
				updateStep={updateStep}
				steps={[
					<CalendarGrid
						key={"date"}
						booking={booking}
						setBooking={setBooking}
						updateStep={updateStep}
					/>,
					<DetailsForm
						key={"details"}
						booking={booking}
						setBooking={setBooking}
						updateStep={updateStep}
					/>,
					<ConfirmForm
						key={"confirm"}
						booking={booking}
						onBook={handleBook}
					/>,
				]}
			/>
		</div>
	);
}
