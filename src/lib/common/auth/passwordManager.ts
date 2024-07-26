'use server';
import bcrypt from 'bcryptjs-react';

export async function hashPassword(cleartext_string: string): Promise<string> {
    const btoa_string = btoa(cleartext_string);
    const hashed_string = bcrypt.hashSync(btoa_string, await bcrypt.genSalt(30));
    return hashed_string;
}
export async function checkPassword(entered_password: string, hashed_password: string): Promise<boolean> {
    const bota_string = Buffer.from(entered_password, 'utf-8').toString('base64');
    const compare = bcrypt.compareSync(bota_string, hashed_password);
    return compare;
}
