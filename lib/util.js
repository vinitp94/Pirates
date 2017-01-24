const Util = {
  dir (vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },

  dist (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  calcVel (dir, speed) {
    return [dir[0] * speed, dir[1] * speed];
  },

  norm (vec) {
    return Util.dist([0, 0], vec);
  },

  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  speed (vel) {
    return Math.sqrt(
      Math.pow(vel[0], 2) + Math.pow(vel[1], 2)
    );
  },

  rotate (dir, rad) {
    let newX = (dir[0] * Math.cos(rad)) - (dir[1] * Math.sin(rad));
    let newY = (dir[1] * Math.cos(rad)) + (dir[0] * Math.sin(rad));
    return [newX, newY];
  }
};

module.exports = Util;
