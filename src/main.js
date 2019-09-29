import { setupProgram, compileShaderSrc, applyUniform1f, resize } from './utility';

import vertexShaderSrc from './shader/vertex/shader.glsl';
import fragmentShaderSrc from './shader/default_fragment_shader.glsl';

const canvas = document.getElementById('magic');
const gl = canvas.getContext('webgl2');

const vertexShader = compileShaderSrc(gl, vertexShaderSrc, gl.VERTEX_SHADER);
const fragmentShader = compileShaderSrc(gl, fragmentShaderSrc, gl.FRAGMENT_SHADER);

const program = setupProgram(gl, vertexShader, fragmentShader);

gl.uniform2fv(gl.getUniformLocation(program, 'iResolution'), new Float32Array([canvas.clientWidth, canvas.clientHeight]));

let time = 0;
const mainLoop = () => {
	resize(canvas);
	gl.viewport(0, 0, canvas.clientWidth, canvas.height);

	window.requestAnimationFrame(mainLoop);
	time += 1 / 60;

	applyUniform1f(gl, program, 'iTime', time);
	gl.drawArrays(gl.TRIANGLES, 0, 6);
}

mainLoop();
