import { sql } from "../config/db.js";

// GET messages (optionally by id or username)
export const getMessages = async (req, res) => {
  const { id, username } = req.query;

  try {
    let rows;

    if (id) {
      rows = await sql`SELECT * FROM messages WHERE id = ${id}`;
    } else if (username) {
      rows = await sql`SELECT * FROM messages WHERE username = ${username}`;
    } else {
      rows = await sql`SELECT * FROM messages ORDER BY created_at DESC`;
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: error.message });
  }
};

// POST message (create a new message)
export const createMessage = async (req, res) => {
  const { username, message } = req.body;

  try {
    const result = await sql`
      INSERT INTO messages (username, message)
      VALUES (${username}, ${message})
      RETURNING id
    `;

    res.status(201).json({ id: result[0].id, username, message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteMessages = async (req, res) => {
  const { id, username } = req.params;

  try {
    if (id) {
      await sql`DELETE FROM messages WHERE id = ${id}`;
    } else if (username) {
      await sql`DELETE FROM messages WHERE username = ${username}`;
    } else {
      // Delete all if neither id nor username is provided
      await sql`DELETE FROM messages`;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
