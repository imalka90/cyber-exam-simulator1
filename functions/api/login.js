export async function onRequestPost(context) {
    try {
        const { username, passkey } = await context.request.json();
        const db = context.env.DB;

        // Query the database for the matching credentials
        const user = await db.prepare("SELECT * FROM users WHERE username = ? AND passkey = ?")
            .bind(username, passkey)
            .first();

        if (user) {
            return new Response(JSON.stringify({ success: true }), { 
                status: 200,
                headers: { "Content-Type": "application/json" }
            });
        } else {
            return new Response(JSON.stringify({ error: "Invalid ID or Passkey" }), { 
                status: 401,
                headers: { "Content-Type": "application/json" }
            });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: "Server Error" }), { status: 500 });
    }
}