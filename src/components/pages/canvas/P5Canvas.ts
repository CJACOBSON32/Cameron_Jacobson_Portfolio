
import * as P5 from "p5"

interface P5Canvas {

    /**
     * Takes in the canvas and parent React component and initializes the respective fields. This should be called at the beginning of any overriding implimentations. all parameters are passed in automatically by react-p5.
     * @param p5 The P5 js canvas
     * @param canvasParentRef The parent react component that the canvas belongs to
     */
    setup(p5: P5, canvasParentRef: Element): void;

    /**
     * Takes in the P5 canvas and runs every loop. Pass this into the 'draw' field if the Sketch component.
     * @param p5
     */
    draw(p5: P5): void;
}

export default P5Canvas;