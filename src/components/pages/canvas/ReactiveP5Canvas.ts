import P5Canvas from "./P5Canvas";
import * as P5 from "p5";

/**
 * Serves a similar function as P5Canvas, but implements a windowResized function to react to when the window is resized.
 */
interface ReactiveP5Canvas extends P5Canvas {

    /**
     * Pass this into the 'windowResized' field of the Sketch component.
     * @param p5 The P5 js canvas. This parameter is passed in automatically by react-p5.
     */
    windowResized(p5: P5): void;
}

export default ReactiveP5Canvas;