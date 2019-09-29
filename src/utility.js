/**
 * @param {WebGL2RenderingContext} gl 
 * @param {string} src 
 * @param {number} shaderType 
 * 
 * @return {WebGLShader}
 */
const compileShaderSrc = (gl, src, shaderType) => {
    const shader = gl.createShader(shaderType);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const type = shaderType === gl.VERTEX_SHADER ? 'vertex' : 'fragment';

        throw `could not compile shader (${type}): ` + gl.getShaderInfoLog(shader);
    }

    return shader;
};

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLShader} vertexShader 
 * @param {WebGLShader} fragmentShader
 * 
 * @return {WebGLProgram}
 */
const setupProgram = (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw "program filed to link:" + gl.getProgramInfoLog(program);
    }

    return program;
}

/**
 * 
 * @param {WebGL2RenderingContext} gl 
 * @param {WebGLProgram} program 
 * @param {string} name 
 * @param {number} value 
 */
const applyUniform1f = (gl, program, name, value) => {
    gl.uniform1f(gl.getUniformLocation(program, name), value);
}

const resize = canvas => {
    // Lookup the size the browser is displaying the canvas.
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    if (canvas.width !== displayWidth ||
        canvas.height !== displayHeight) {

        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
}

export { setupProgram, compileShaderSrc, applyUniform1f, resize };
