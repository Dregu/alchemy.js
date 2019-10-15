module.exports = class Alchemy {
  constructor() {
    this.rand_state = 0
    this.LIQUIDS = ["water", "water_ice", "water_swamp",
  "oil", "alcohol", "swamp", "mud", "blood",
  "blood_fungi", "blood_worm", "radioactive_liquid",
  "cement", "acid", "lava", "urine",
  "poison", "magic_liquid_teleportation",
  "magic_liquid_polymorph", "magic_liquid_random_polymorph",
  "magic_liquid_berserk", "magic_liquid_charm",
  "magic_liquid_invisibility"]
    this.ORGANICS = ["sand", "bone", "soil", "honey",
  "slime", "snow", "rotten_meat", "wax",
  "gold", "silver", "copper", "brass", "diamond",
  "coal", "gunpowder", "gunpowder_explosive",
  "grass", "fungi"]
  }

  hax_prng_next(v) {
    let hi = Math.floor(v / 127773)
    let lo = v % 127773
    v = 16807 * lo - 2836 * hi
    if (v <= 0) {
      v += 2147483647
    }
    return v
  }

  shuffle(arr, seed) {
    let v = Math.floor(seed / 2) + 12534
    v = this.hax_prng_next(v)
    for (let i = arr.length; i > 0; i--) {
      v = this.hax_prng_next(v)
      let fidx = v / Math.pow(2, 31)
      let target = Math.floor(fidx * i)
      let temp = arr[i-1]
      arr[i] = arr[target]
      arr[target] = temp
    }
  }

  copy_arr(arr) {
    let ret = [...arr]
    return ret
  }

  random_material(mats) {
    for (let i = 0; i < 1000; i++) {
      this.rand_state = this.hax_prng_next(this.rand_state)
      let rval = this.rand_state / Math.pow(2, 31)
      let sel_idx = Math.floor(mats.length * rval)
      let selection = mats[sel_idx]
      if (selection) {
        mats[sel_idx] = false
        return selection
      }
    }
  }

  random_recipe(seed) {
    let liqs = this.copy_arr(this.LIQUIDS)
    let orgs = this.copy_arr(this.ORGANICS)
    let m1 = this.random_material(liqs)
    let m2 = this.random_material(liqs)
    let m3 = this.random_material(liqs)
    let m4 = this.random_material(orgs)
    let combo = [m1, m2, m3, m4]
    this.shuffle(combo, seed)
    return [combo[1], combo[2], combo[3]]
  }

  get_alchemy(world_seed) {
    let seed = parseInt(world_seed)
    this.rand_state = Math.floor(seed * 0.17127000 + 1323.59030000)

    for (let i = 0; i < 6; i++) {
      this.rand_state = this.hax_prng_next(this.rand_state)
    }

    let lc_combo = this.random_recipe(seed)
    this.rand_state = this.hax_prng_next(this.rand_state)
    this.rand_state = this.hax_prng_next(this.rand_state)
    let ap_combo = this.random_recipe(seed)
    return [lc_combo, ap_combo]
  }
}
