export const SELECTONE = `SELECT * FROM notes WHERE id = ?`;
export const SELECT = `SELECT * FROM notes ORDER BY id`;
export const INSERT = `INSERT INTO notes SET ?`;
export const DELETE = `DELETE FROM notes WHERE id = ?`;
export const UPDATE = `UPDATE notes SET ? WHERE id = ?`;