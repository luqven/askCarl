// based on equations by christopher4lis - gist.github.com/christopher4lis

//////////////////////////////////////
// Elastic collision logic
// 
// "An elastic collision is when two objects collide and
// bounce back with little or no loss of energy.
// 
// In the simplest case, no kinetic energy is lost, 
// and so the kinetic energy of the two objects after
//  the collision is equal to their total kinetic
//  energy before the collision."
// 
// Relativistic derivation using hyperbolic functions ->
// 
// v_{1}={\frac {2m_{1}m_{2}c^{2}u_{2}Z+2m_{2}^{2}c^{2}u_{2}-(m_{1}^{2}+m_{2}^{2})u_{1}u_{2}^{2}+(m_{1}^{2}-m_{2}^{2})c^{2}u_{1)){2m_{1}m_{2}c^{2}Z-2m_{2}^{2}u_{1}u_{2}-(m_{1}^{2}-m_{2}^{2})u_{2}^{2}+(m_{1}^{2}+m_{2}^{2})c^{2))}
// v_{2}={\frac {2m_{1}m_{2}c^{2}u_{1}Z+2m_{1}^{2}c^{2}u_{1}-(m_{1}^{2}+m_{2}^{2})u_{1}^{2}u_{2}+(m_{2}^{2}-m_{1}^{2})c^{2}u_{2)){2m_{1}m_{2}c^{2}Z-2m_{1}^{2}u_{1}u_{2}-(m_{2}^{2}-m_{1}^{2})u_{1}^{2}+(m_{1}^{2}+m_{2}^{2})c^{2))}
// 
// But this ^ assumes that the collisions can only happen in one dimension, when
// really the objects could have collided on the x or y dimension.
// 
// Therefore, getting the angles of deflection of the two objects, and shifting
// the collision equation accordingly is the only way to apply the above equation.
// That allows you assume the movement is taking place on a single dimension.
// ..."the velocities of the objects can be calculated in one dimension by rotating 
// the x and y axis to be parallel with the contact angle of the objects, and
// then rotated back to the original orientation to get the true x and y 
// components of the velocities" - Wikipedia https://www.wikiwand.com/en/Elastic_collision
// 
// -->
// {\displaystyle {\begin{aligned}v'_{1x}&={\frac {v_{1}\cos(\theta _{1}-\varphi )(m_{1}-m_{2})+2m_{2}v_{2}\cos(\theta _{2}-\varphi )}{m_{1}+m_{2))}\cos(\varphi )+v_{1}\sin(\theta _{1}-\varphi )\sin(\varphi )\\
// [0.8em]v'_{1y}&={\frac {v_{1}\cos(\theta _{1}-\varphi )(m_{1}-m_{2})+2m_{2}v_{2}\cos(\theta _{2}-\varphi )}{m_{1}+m_{2))}\sin(\varphi )+v_{1}\sin(\theta _{1}-\varphi )\cos(\varphi )\end{aligned))}
// 
//////////////////////////////////////



// calculates collision on rotated axis to be able to use 1d newtonian eq.
export const rotate = (velocity, angle) => {
    const rotatedVelocities = {
      // angle =  collision angle between two objects in radians
      x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
      y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotatedVelocities;
}

export const getCollision = (token, otherToken) => {
  const xVelocityDiff = token.velocity.x - otherToken.velocity.x;
  const yVelocityDiff = token.velocity.y - otherToken.velocity.y;
  const xDist = otherToken.x - token.x;
  const yDist = otherToken.y - token.y;

  // Account for accidental overlap of tokens
    // this essentially ignores tokens that either
    // would overlap or somehow have managed to overlap
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Get angle between the colliding tokens
    const angle = -Math.atan2(otherToken.y - token.y, otherToken.x - token.x);

    // Token mass
    const m1 = token.mass;
    const m2 = otherToken.mass;

    // Token velocity
    const u1 = rotate(token.velocity, angle);
    const u2 = rotate(otherToken.velocity, angle);

    // Token velocity after right angle collision equation (1 dimensional)
    const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
    const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

    // Final velocity after reverting axis
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap token velocities for bounce animation
    token.velocity.x = vFinal1.x;
    token.velocity.y = vFinal1.y;

    otherToken.velocity.x = vFinal2.x;
    otherToken.velocity.y = vFinal2.y;
  }
}

export const distanceBetween = (pos1, pos2) => {
  debugger
  let xDiff = Math.round(pos2[0]) - Math.round(pos1[0]);
  let yDiff = Math.round(pos2[1]) - Math.round(pos1[1]);
  // a**2 + b**2 === c**2
  let distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2))
  debugger
  return distance;
}