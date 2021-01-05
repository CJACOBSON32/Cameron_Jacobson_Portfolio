
// Calls document.getElementById but throws an error if the element does not exist
function safeGetElementByID(id: string): HTMLElement {
    try {
        let element = document.getElementById(id);
        if (element == null) {
            throw new Error(`${id} is not a valid ElementID`);
        } else {
            return element;
        }
    } catch(e) {
        console.log(e);
    }

    // Code should never get here but Typescript seems to think it should
    try{
        throw new Error("If the code has gotten here there is a SERIOUS problem");
    } catch(e) {
        console.log(e);
    }

    return new HTMLElement();
}

export default safeGetElementByID;