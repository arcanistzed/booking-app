import type { FormEvent } from "react";
import type { BookingMap, GeneralBooking } from "./Booking";
import Button from "./Button";
import Form from "./Form";

type Booking = BookingMap["confirm"];

type ConfirmFormProps = {
	booking: GeneralBooking;
	onBook: (booking: Booking) => void;
};

export default function ConfirmForm({ booking, onBook }: ConfirmFormProps) {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!booking) return;
		onBook(booking as Booking);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<p className="text-center text-secondary-200">
				Thank you for booking with us!
			</p>
			<p className="text-center text-secondary-200">
				Your appointment will be on:
			</p>
			<div className="text-center text-xl text-secondary-100">
				{booking.date?.toLocaleString("default", {
					weekday: "long",
					day: "numeric",
					month: "long",
					year: "numeric",
					hour: "numeric",
					minute: "numeric",
				})}
			</div>
			<Button intent="primary">Book</Button>
		</Form>
	);
}
