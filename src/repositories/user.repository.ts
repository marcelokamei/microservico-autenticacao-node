import { db } from "../db";
import DatabaseError from "../models/errors/database.error.model";
import { User } from "../models/user.model";

class UserRepository {

    async create(user: User): Promise<string> {
        try {
            const script = `
                INSERT INTO application_user (username, password) VALUES ($1, crypt($2, 'my_salt_kamei'))
                RETURNING uuid
            `;

            const values = [user.username, user.password]

            const { rows } = await db.query<{ uuid: string, }>(script, values);
            const [newUser] = rows;
            return newUser.uuid;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    async update(user: User): Promise<void> {
        try {
            const script = `
                UPDATE application_user SET username = $1, password = crypt($2, 'my_salt_kamei') WHERE uuid = $3
            `;

            const values = [user.username, user.password, user.uuid]
            await db.query(script, values);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async remove(uuid: string): Promise<void> {
        try {
            const script = `
                DELETE FROM application_user WHERE uuid = $1
            `;
            const values = [uuid];
            await db.query(script, values);

        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    async findByUsernameAndPassword(username: string, password: string): Promise<User | null> {

        try {
            const query = `
                SELECT uuid, username FROM application_user WHERE username = $1 AND password = crypt($2, 'my_salt_kamei')
            `;
            const queryResult = await db.query(query, [username, password]);
            const [row] = queryResult.rows;
            return !row ? null : row;

        } catch (error) {
            throw new DatabaseError('Erro na consulta por username and password', error);
        }
    };

    async findById(uuid: string): Promise<User | null> {
        try {
            const query = `
                SELECT uuid, username FROM application_user WHERE uuid = $1
            `;
            const queryResult = await db.query<User>(query, [uuid]);
            const [row] = queryResult.rows;
            return !row ? null : row;

        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    async findAllUsers(): Promise<User[]> {
        try {
            const query = `
                SELECT uuid, username FROM application_user;
            `;

            const { rows } = await db.query<User>(query);
            return rows || [];

        } catch (error) {
            throw new DatabaseError('Erro na consulta por ID', error);
        }
    }


}



export default new UserRepository();