export async function onRequestPost(context) {
    try {
        const { username, passkey, contact } = await context.request.json();
        const db = context.env.DB;

        // Insert new user into the database
        await db.prepare("INSERT INTO users (username, passkey, contact) VALUES (?, ?, ?)")
            .bind(username, passkey, contact || "")
            .run();

        return new Response(JSON.stringify({ success: true }), { 
            status: 200, 
            headers: { "Content-Type": "application/json" } 
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Registration failed or user exists" }), { 
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
}