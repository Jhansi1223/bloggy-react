import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";
import { useSelector } from "react-redux";
import { LOGIN_URI, SIGN_UP_URI } from "./backendUrls";

export class AuthService {


    constructor() {
        
    }

    async createAccount ( { email, password, name  } ) {
        try {
            const response = await fetch(SIGN_UP_URI);
            const userAccount = await response.json();

            if (userAccount) {
                return this.login({email,password});
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("appwrite :: AuthService :: createAccount :: error ", error);
        }

    }

    async login ( { email, password } ) {
        try {
            return await this.account.createEmailSession( email, password );
        } catch (error) {
            console.log("appwrite :: AuthService :: login :: error ",error);
        }
        
    }

    async getCurrentUser () {

        try {
            return await this.account.get();
        } catch (error) {
            console.log("appwrite :: AuthService :: getCurrentUser :: error ",error);
        }
        return null;
        
    }

    async logout () {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("appwrite :: AuthService :: logout :: error ",error);
        }
    }

    

}

const authService = new AuthService();

export default authService;
