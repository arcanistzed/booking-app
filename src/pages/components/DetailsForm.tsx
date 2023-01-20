import { useRef, type FormEvent } from "react";
import {
	BookingSteps,
	type BookingMap,
	type BookingStepIndex,
	type GeneralBooking,
} from "./Booking";
import Button from "./Button";
import { input } from "./cva";
import Form from "./Form";

type Booking = BookingMap["details"];

type DetailsFormProps = {
	booking: GeneralBooking;
	setBooking: (booking: Booking) => void;
	updateStep: (step: BookingStepIndex) => void;
};

export default function DetailsForm({
	booking,
	setBooking,
	updateStep,
}: DetailsFormProps) {
	const name = useRef<HTMLInputElement>(null);
	const email = useRef<HTMLInputElement>(null);
	const phone = useRef<HTMLInputElement>(null);
	const message = useRef<HTMLTextAreaElement>(null);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!name.current || !email.current || !phone.current) return;
		setBooking({
			...(booking as Booking),
			name: name.current.value,
			email: email.current.value,
			phone: phone.current.value,
			message: message.current?.value,
		});
		updateStep(
			Object.values(BookingSteps).indexOf("details") as BookingStepIndex
		);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<div className="flex flex-col gap-2">
				<label className="text-secondary-100">Name</label>
				<input className={input()} ref={name} required />
			</div>
			<div className="flex flex-col gap-2">
				<label className="text-secondary-100">Email</label>
				<input className={input()} ref={email} required />
			</div>
			<div className="flex flex-col gap-2">
				<label className="text-secondary-100">Phone</label>
				<input className={input()} ref={phone} required />
			</div>
			<div className="flex flex-col gap-2">
				<label className="text-secondary-100">Message</label>
				<textarea className={input()} ref={message} />
			</div>
			<Button intent="primary">Book</Button>
		</Form>
	);
}
