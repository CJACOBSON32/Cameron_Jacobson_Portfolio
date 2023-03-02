
import { getFirestore, collection, Firestore, getDoc, doc, setDoc } from "firebase/firestore";
import {publicIpv4} from "public-ip";
import { initializeApp } from "firebase/app";

class Database {

    // -- Static fields --
    private static firebaseConfig = {
        apiKey: "AIzaSyAjnHyL8h7frEcC2w5tYXawA1XGYAgUIFg",
        authDomain: "cameron-jacobson-portfolio.firebaseapp.com",
        projectId: "cameron-jacobson-portfolio",
        storageBucket: "cameron-jacobson-portfolio.appspot.com",
        messagingSenderId: "20381987579",
        appId: "1:20381987579:web:1a4899628585d6e199365e",
        measurementId: "G-VMZPFWGEHT"
    };

    private static instance: Database;
    // -- Instance fields --

    fireStoreDB: Firestore;

    constructor() {
        // Initialize Firebase
        const app = initializeApp(Database.firebaseConfig);

        this.fireStoreDB = getFirestore(app);
    }

    /**
     * Get the singleton instance. If it has not been initialized, initialize it. (This should be called once at the beginning of the program.
     */
    static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }

    private static checkBrowser(): string {
        if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1 )
        {
            return "Opera";
        }
        else if(navigator.userAgent.indexOf("Chrome") !== -1 )
        {
            return "Chrome";
        }
        else if(navigator.userAgent.indexOf("Safari") !== -1)
        {
            return "Safari";
        }
        else if(navigator.userAgent.indexOf("Firefox") !== -1 )
        {
            return "Firefox";
        }
        else if(navigator.userAgent.indexOf("MSIE") !== -1 ) //IF IE > 10
        {
            return "Internet Explorer";
        }
        else
        {
            return "unknown"
        }
    }

    async addEntry() {
        const entries = collection(this.fireStoreDB, 'entries');

        // Get references to the Entry-Count Document
        const entryCountRef = doc(entries, "entry-count");
        let entryCount = await getDoc(entryCountRef);

        // If the entry-count document does not yet exist, initialize it with 0 entries
        if(!entryCount.exists) {
            await setDoc(entryCountRef, {
                numberOfEntries: 0
            });

            entryCount = await getDoc(entryCountRef);
        }

        // Increment the numberOfEntries Field
        let size: number = entryCount.data()!.numberOfEntries + 1;
        await setDoc(entryCountRef, {
            numberOfEntries: size
        });

        // Log the date and time of the new entry
        const newEntry = doc(entries, `entry-${size}`);

        await setDoc(newEntry, {
            time: new Date(),
            ipv4: publicIpv4(),
            browser: Database.checkBrowser(),
            platform: navigator.platform
        });
    }
}

export default Database;
