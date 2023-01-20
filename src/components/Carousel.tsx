import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type ReactNode } from "react";
import { BookingSteps, type BookingStepIndex } from "./Booking";
import Button from "./Button";

type CarouselProps = {
	steps: [ReactNode, ReactNode, ReactNode];
	step: BookingStepIndex;
	updateStep: (step: number) => void;
};

export default function Carousel({ steps, step, updateStep }: CarouselProps) {
	// If touch end is less than touch start, then the user swiped left
	// If touch end is greater than touch start, then the user swiped right
	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);

	const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
		setTouchStart(e.touches[0]?.clientX ?? 0);
	};

	const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
		setTouchEnd(e.changedTouches[0]?.clientX ?? 0);
		if (touchEnd < touchStart) {
			updateStep(step + 1);
		} else if (touchEnd > touchStart) {
			updateStep(step - 1);
		}
	};

	return (
		<div className="relative h-full w-full overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
			{steps.map((component, index) => (
				<div
					key={index}
					className="absolute top-0 left-0 h-full w-full transition-transform duration-500"
					style={{
						transform: `translateX(${(index - step) * 100}%)`,
					}}
				>
					<div className="flex h-full flex-col items-center justify-center gap-2">
						<StepDescription step={index as BookingStepIndex} />
						{component}
						{BookingSteps[index as BookingStepIndex] !== "date" && <ReturnButton step={step} updateStep={updateStep} />}
					</div>
				</div>
			))}
		</div>
	);
}

const stepDescriptions: Record<keyof typeof BookingSteps, string> = [
	"Select a date",
	"Enter your details",
	"Confirm your booking",
];

type StepDescriptionProps = { step: BookingStepIndex };

export function StepDescription({ step }: StepDescriptionProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<h2 className="text-2xl text-primary-100">{stepDescriptions[step]}</h2>
		</div>
	);
}

type ReturnButtonProps = { step: BookingStepIndex; updateStep: (step: number) => void };

function ReturnButton({ step, updateStep }: ReturnButtonProps) {
	return (
		<Button intent="link" onClick={() => updateStep(step - 1)}>
			<FontAwesomeIcon icon={faAngleLeft} /> Back
		</Button>
	);
}
