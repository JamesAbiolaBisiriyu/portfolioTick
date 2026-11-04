## 5. The living portrait


### 5.1 Principle

One WebGL canvas draws a flat 73×73 vertex mesh. Two textures (the picture on screen and the one it is fading from) are mixed in the fragment shader. A CPU wave simulation moves the vertices; brightness follows the local stretch so the skin shades as it deforms. Pictures are swapped by name; nothing is morphed, so every expression must be a separate image of the same head in the same position.

### 5.2 Frames and aliases

Every frame is a transparent 1024×1024 PNG of identical framing: a full-bleed bust (hair, face, shoulders) filling the frame from 3% to 97.5% across and 3.6% to 100% down. The 16 supplied files:

| Group | Files |
|---|---|
| Neutral | `rest` (also the static fallback), `closed`, `half` |
| Gaze (8 pictures) | `right`, `upright`, `up`, `upleft`, `left`, `downleft`, `down` and `side_left` |
| Reactions | `cross`, `grin`, `hearts`, `ouch`, `angry` |

`side_left` is loaded but nothing refers to it. `upleft.png` is, at the moment, a byte-identical copy of `downleft.png`: the gaze that should look up-left looks down-left. Both are findings, not features: re-generate `upleft` to fix it.

The engine's table `IDS` maps **29 logical names to the 16 files**: the 16 file names map to themselves and 13 more are aliases: `laugh, kiss → grin`; `stars, shock, scared → up`; `tongue, sick, puff → cross`; `snore → closed`; `deadpan, shy → half`; `dizzy, scrunch → ouch`. Names that the engine knows but `IDS` does not list (`winkl, winkr, smug, raised, cry, fish, wind, pink, blue, blonde, yawn, yawn1, yawn2, yawn4, whistle1, whistle2, sneeze1, sneeze2, gum1, gum2, gum3, gumpop`) have **no picture**: the engine silently ignores them (`show()` returns when the texture is missing), so the face simply holds the previous picture. To unlock one, save a PNG with the same framing and add one line to `IDS`, for example `winkl: '/avatar/winkl.png'`.

The 16-direction gaze ring (`e, ene, ne, nne, n, nnw, nw, wnw, w, wsw, sw, ssw, s, sse, se, ese`) maps to the 8 gaze pictures through `EYEFILE`:

| Ring cell | File | Ring cell | File |
|---|---|---|---|
| `e` | `right` | `w` | `left` |
| `ene`, `ne` | `upright` | `wsw`, `sw` | `downleft` |
| `nne`, `n`, `nnw` | `up` | `ssw`, `s`, `sse` | `down` |
| `nw`, `wnw` | `upleft` | `se`, `ese` | `right` |

`half` and `closed` map to themselves; the neutral gaze (cursor near the centre) shows `rest`.

### 5.3 Mesh and shaders

Constants: `OVER = 1.7`, `N = 72` cells (`M = 73` vertices per side), `SPAN = OVER / N`, `ORIGIN = 0.5 − OVER / 2`. Vertex `(i, j)` rests at `(ORIGIN + i·SPAN, ORIGIN + j·SPAN)` in picture units, so the mesh covers 1.7× the picture and the picture occupies its middle.

Vertex shader (attributes `a` rest position, `d` displacement, `s` shade; uniforms `lean`, `overS`):

```glsl
attribute vec2 a, d; attribute float s; varying vec2 vUv; varying float vS;
uniform vec2 lean; uniform float overS;
void main(){ vUv = a; vS = s; vec2 p = a + d + lean;
  gl_Position = vec4(vec2(p.x-.5, .5-p.y)*2./overS, 0., 1.); }
```

Fragment shader (uniforms `faceA`, `faceB`, `fade`):

```glsl
precision highp float; varying vec2 vUv; varying float vS;
uniform sampler2D faceA, faceB; uniform float fade;
void main(){
  if(vUv.x<0.||vUv.y<0.||vUv.x>1.||vUv.y>1.){ gl_FragColor = vec4(0.); return; }
  vec4 c = mix(texture2D(faceA,vUv), texture2D(faceB,vUv), fade);
  if(c.a<.004){ gl_FragColor = vec4(0.); return; }
  gl_FragColor = vec4(c.rgb*vS, c.a);
}
```

GL state: `alpha: true, premultipliedAlpha: true, antialias: true`; blending `ONE, ONE_MINUS_SRC_ALPHA`; `UNPACK_PREMULTIPLY_ALPHA_WEBGL = true`; textures are uploaded on unit `TEXTURE5` so they never disturb the sampler units 0 and 1; clamp-to-edge, linear filtering. The canvas backing store is the CSS size × `min(devicePixelRatio, 2)`, updated by a `ResizeObserver`.

### 5.4 The elastic sheet

A damped wave equation on the displacement `(ux, uy)` of each interior vertex, integrated with a fixed step `H = 1/240 s` (at most 9 sub-steps per frame):

```
WOBBLE = 2.3 · 2π      REACH = 0.085 / SPAN      C = REACH · WOBBLE
GAMMA  = 2 · 0.14 · WOBBLE      NU = 0.2 · C

v += ( C²·laplacian(u) − WOBBLE²·u − GAMMA·v + NU·laplacian(v) ) · dt
u += v · dt
```

* **Hold (drag):** `takeHold(u, v, radius .22)` records the vertices within a Gaussian of the grab point (weights above .02). While held, each gets a spring to `start + pull·weight` with stiffness `3000·w` and damping `90·w`. The pull is soft-clamped to a length of `0.24 · (1 − e^(−L/0.24))`.
* **Poke:** `poke(u, v, dx, dy, radius)` adds a velocity impulse with a Gaussian falloff (used for taps, sneezes, jolts and for rubbing the skin while the pointer moves: `dx·.00035`, radius .07).
* **Smoothing:** each frame the displacement is smoothed with a 1-4-1 cross filter (edge vertices untouched) into `sx, sy`.
* **Untangling:** the mesh must never fold. Every frame each row and column is forced back into order with a minimum gap of `0.34 · SPAN` between neighbours (a forward and a backward pass, two rounds); the picture can squash but never cross itself.
* **Shading:** `shade = clamp(1 − ((sx[k+1] − sx[k−1]) + (sy[k+M] − sy[k−M]))·1.8, .86, 1.16)` for interior vertices, 1 on the edge.
* **Head lean:** a spring toward `(pu−.5)·.012`, `(pv−.46)·.008` (or `pull·.16` while held) plus the act's lean and a slow sine drift, `lvX += ((tx−leanX)·70 − lvX·8)·dt`.

### 5.5 Pictures, cross-fade and loading

* `show(name, ms)` makes `name` the target picture: the previous target becomes `faceA` unless the previous fade is still below half, and the fade time is `min(70, ms)` ms. Only one picture is on screen at a time; the fade is `(now − fadeT) / fadeMs`.
* `compose()` picks what to show: the logical face if it is not `rest`; otherwise the hair-colour picture if a colour is active (gaze pictures do not exist in colour, so the head faces front); otherwise the current eye picture.
* **Loading:** the URL of a frame is the path in `IDS` (`/avatar/<file>.png`, one size for all screens: 16 files of about 1.7 MB). Load `rest` first; when it arrives upload it, build the 128×128 alpha hit map from it, hide `#faceFallback` (`visibility: hidden`) and start the frame loop. Then load `closed` and `half`, then the remaining frames with six parallel workers. A missing frame is skipped silently.
* **Hit test:** a point is on the head when the alpha of the 128×128 map is above 40.

### 5.6 Input, zones and moods

`toUv(x, y)` converts a client point to picture units through the canvas rectangle and the factor `OVER`. Zones, from `zoneAt(u, v)` with `a = (u − .505)/.225`, `b = (v − .485)/.33`:

| Test (in order) | Zone |
|---|---|
| `a² + b² > 1` or `v < .23` | `hair` |
| `v < .385` | `brow` |
| `|v − .455| < .05` and `.33 < u < .455` | `eyeL` |
| `|v − .455| < .05` and `.545 < u < .67` | `eyeR` |
| `|u − .5| < .055` and `v < .6` | `nose` |
| `.6 < v < .71` and `|u − .5| < .1` | `mouth` |
| `v > .71` | `chin` |
| else | `cheek` |

Hover answers (after 80 ms in a zone): `eyeL→winkl, eyeR→winkr, nose→cross, mouth→kiss` (only `cross` has its own picture; `kiss` is an alias of `grin`). Tap answers: `brow→angry, eyeL→ouch, eyeR→ouch, nose→act sneeze, mouth→tongue, cheek→puff, chin→laugh, hair→next hair colour` (`tongue` and `puff` are aliases of `cross`, `laugh` of `grin`; the hair colours have no pictures). A tap is a release with pull length under .03 and press time under 380 ms; non-act answers last 1100 ms.

Eye logic while the face is `rest`: asleep (`closed`) until the first input; blinking every `2200 + random·3400` ms through `half → closed → half` at 62 ms steps; otherwise the gaze cell is the ring direction of the vector from the head centre `(.5, .46)` to the pointer, `rest` if shorter than .13; while scrolling (500 ms) the target is straight down.

Pointer speed: `speed += |Δ|·.004`, decaying `e^(−6·dt)`; `shake` follows `speed > 1.5` and shows `wind` above .55 and `sick` above .92.

### 5.7 Idle acts

After `30 000 + random·15 000` ms without input (and only when `prefers-reduced-motion` is not set) the engine shuffles the 15-act list `yawn, shifty, gum, fly, flirt, roll, sneeze, hair, tug, cross, whistle, doze, cheeky, wow, sad` and plays the next one. An act is a list of steps `[picture or "eye:<cell>", cross-fade ms, hold ms, extras]`, extras being `jolt [u, v, dx, dy, radius]`, `lean [x, y]` and `call(fn)`. Any pointer movement ends the act (except during `doze`, where it jumps to the final shock). The `fly` act moves the SVG fly between points while the eyes track it and the head reacts when it lands on the nose; the `tug` act moves the SVG hand to the cheek, grips (the hand switches to the `.grab` path), pulls the skin to a limit and lets go. With the 16 supplied pictures the acts that read well are `shifty`, `roll` (all gaze pictures exist), `doze` (`half`, `closed`, `snore`→`closed`, then `shock`→`up`), `wow` (`stars`→`up`, `grin`), `fly` and `tug` (props plus `cross`, `ouch`, `angry`, `up`). Acts built from missing pictures (`yawn`, `whistle`, `gum`, `hair`, `sad`) show nothing or hold the previous face, and `flirt`, `cheeky`, `cross` and `sneeze` play only partly, until you add their frames. Both props are placed with percentage `left`/`top` computed from picture units: `left = ((u − .5)·100 + 50)%`.

### 5.8 Engine source

The full, working engine is included in the Master Prompt (appendix) and in `assets/reference-build/src/livingPortrait.ts`. It is wrapped in `startLivingPortrait()`, guarded by `window.__faceEngineStarted`, runs once from `useEffect` in the hero, and attaches window listeners (`pointermove`, `pointerup`, `pointercancel`, `pointerleave`, `scroll`) that are never removed (hence no StrictMode).
