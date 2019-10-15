let rand_state

function hax_prng_next(v) {
  let hi = Math.floor(v / 127773)
  let lo = v % 127773
  v = 16807 * lo - 2836 * hi
  if (v <= 0) {
    v += 2147483647
  }
  return v
}

function shuffle(arr, seed) {
  let v = Math.floor(seed / 2) + 12534
  v = hax_prng_next(v)
  for (let i = arr.length; i > 0; i--) {
    v = hax_prng_next(v)
    let fidx = v / Math.pow(2, 31)
    let target = Math.floor(fidx * i)
    let temp = arr[i-1]
    arr[i] = arr[target]
    arr[target] = temp
  }
}

const LIQUIDS = ["water", "water_ice", "water_swamp",
"oil", "alcohol", "swamp", "mud", "blood",
"blood_fungi", "blood_worm", "radioactive_liquid",
"cement", "acid", "lava", "urine",
"poison", "magic_liquid_teleportation",
"magic_liquid_polymorph", "magic_liquid_random_polymorph",
"magic_liquid_berserk", "magic_liquid_charm",
"magic_liquid_invisibility"]

const ORGANICS = ["sand", "bone", "soil", "honey",
"slime", "snow", "rotten_meat", "wax",
"gold", "silver", "copper", "brass", "diamond",
"coal", "gunpowder", "gunpowder_explosive",
"grass", "fungi"]

function copy_arr(arr) {
  let ret = [...arr]
  return ret
}

function random_material(mats) {
  for (let i = 0; i < 1000; i++) {
    rand_state = hax_prng_next(rand_state)
    let rval = rand_state / Math.pow(2, 31)
    let sel_idx = Math.floor(mats.length * rval)
    let selection = mats[sel_idx]
    if (selection) {
      mats[sel_idx] = false
      return selection
    }
  }
}

function random_recipe(seed) {
  let liqs = copy_arr(LIQUIDS)
  let orgs = copy_arr(ORGANICS)
  let m1 = random_material(liqs)
  let m2 = random_material(liqs)
  let m3 = random_material(liqs)
  let m4 = random_material(orgs)
  let combo = [m1, m2, m3, m4]
  shuffle(combo, seed)
  //return combo
  return [combo[1], combo[2], combo[3]]
}

function get_alchemy(world_seed) {
  let seed = parseInt(world_seed)
  rand_state = Math.floor(seed * 0.17127000 + 1323.59030000)

  for (let i = 0; i < 6; i++) {
    rand_state = hax_prng_next(rand_state)
  }

  let lc_combo = random_recipe(seed)
  rand_state = hax_prng_next(rand_state)
  rand_state = hax_prng_next(rand_state)
  let ap_combo = random_recipe(seed)
  return [lc_combo, ap_combo]
}
