import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { CalendarGrid } from "./CalendarGrid";
import { ConfirmForm } from "./ConfirmForm";
import { DetailsForm } from "./DetailsForm";

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
