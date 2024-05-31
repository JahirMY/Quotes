import { connectorMariaDB }
    from "../config/connectors.ts";

export default  {

    existById: async (id:number) => {
        const [result] = await connectorMariaDB.query(
            `SELECT COUNT(*) count FROM user WHERE id = ? LIMIT 1`,
            [id],
        );
        return result.count > 0;
    },

    isLogin: async ( account:string, password:string) => {
        const [result] = await connectorMariaDB.query(
            `SELECT COUNT(*) count FROM user WHERE account=? AND password=?`,
            [account, password],
        );
        return result.count > 0;
    },

    getAll: async () => {
        return await connectorMariaDB.query(`SELECT * FROM user`);
    },

    getById: async ( id:number) => {
        return await connectorMariaDB.query(
            "select * from user where id = ?",
            [id],
        );
    },

    add: async (account:string, password:string) => {
        return await connectorMariaDB.query(
            `INSERT INTO user(account, password) values(?, ?)`,
            [
                account,
                password,
            ],
        );
    },

    updateById: async (id:number, account:string, password:string) => {

        const result = await connectorMariaDB.query(
            `UPDATE user SET account=?, password=? WHERE id=?`,
            [
                account,
                password,
                id,
            ],
        );
        return result.affectedRows;
    },

    deleteById: async (id:number) => {
        const result = await connectorMariaDB.query(
            `DELETE FROM user WHERE id = ?`,
            [id],
        );
        // return count of rows updated
        return result.affectedRows;
    },
};
