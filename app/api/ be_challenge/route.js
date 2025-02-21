export async function OPTIONS(req) {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}

export async function GET(req) {
    return new Response(JSON.stringify({ operation_code: 1 }), {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*", // Allow all origins
            "Content-Type": "application/json",
        },
    });
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { data } = body;

        if (!Array.isArray(data)) {
            return new Response(JSON.stringify({ is_success: false, message: "Invalid input format" }), {
                status: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
            });
        }

        const numbers = data.filter((item) => !isNaN(item));
        const alphabets = data.filter((item) => /^[A-Za-z]$/.test(item));

        const highest_alphabet =
            alphabets.length > 0 ? [alphabets.sort((a, b) => b.localeCompare(a)).pop()] : [];

        return new Response(
            JSON.stringify({
                is_success: true,
                user_id: "john_doe_17091999",
                email: "john@xyz.com",
                roll_number: "ABCD123",
                numbers,
                alphabets,
                highest_alphabet,
            }),
            {
                status: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        return new Response(JSON.stringify({ is_success: false, message: "Internal server error" }), {
            status: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
        });
    }
}
