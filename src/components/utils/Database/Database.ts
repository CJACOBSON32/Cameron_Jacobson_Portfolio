
import firebase from "firebase/app";
import "firebase/firestore"
import publicIp from "public-ip";

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

    fireStoreDB: firebase.firestore.Firestore;

    constructor() {
        // Initialize Firebase
        firebase.initializeApp(Database.firebaseConfig);

        this.fireStoreDB = firebase.firestore();
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
        if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 )
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
        const entries: firebase.firestore.CollectionReference<firebase.firestore.DocumentData> = this.fireStoreDB.collection('entries');

        // Get references to the Entry-Count Document
        const entryCountRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = entries.doc("entry-count");
        let entryCount: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> = await entryCountRef.get();

        // If the entry-count document does not yet exist, initialize it with 0 entries
        if(!entryCount.exists) {
            await entryCountRef.set({
                numberOfEntries: 0
            });

            entryCount = await entryCountRef.get();
        }

        // Increment the numberOfEntries Field
        let size: number = entryCount.data()!.numberOfEntries + 1;
        await entryCountRef.set({
            numberOfEntries: size
        });

        // Log the date and time of the new entry
        const newEntry: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = entries.doc(`entry-${size}`);

        await newEntry.set({
            time: new Date(),
            ipv4: await publicIp.v4(),
            browser: Database.checkBrowser(),
            platform: navigator.platform
        });
    }
}

export default Database;
