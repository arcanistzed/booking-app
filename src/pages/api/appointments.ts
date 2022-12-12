import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const appointments = async (req: NextApiRequest, res: NextApiResponse) => {
	const appointments = await prisma.appointment.findMany();
	res.status(200).json(appointments);
};

export default appointments;
