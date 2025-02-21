export async function GET(req) {
    return new Response(JSON.stringify({ operation_code: 1 }), { status: 200 });
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { data } = body;

        if (!Array.isArray(data)) {
            return new Response(JSON.stringify({ is_success: false, message: "Invalid input format" }), { status: 400 });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));

        const highest_alphabet = alphabets.length > 0
            ? [alphabets.sort((a, b) => b.localeCompare(a)).pop()]
            : [];

        return new Response(JSON.stringify({
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            numbers,
            alphabets,
            highest_alphabet
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ is_success: false, message: "Internal server error" }), { status: 500 });
    }
}
