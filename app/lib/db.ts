import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!);

export default sql; 