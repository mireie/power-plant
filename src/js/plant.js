// This function stores our state.

export const storeState = () => {
  let currentState = {};

  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);

    currentState = { ...newState };
    return newState;
  }
}

export const stateControl = storeState();


// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

export const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    })
  }
}

// We create four functions using our function factory. We could easily create many more.

export const feed = changeState("soil")(1);
export const blueFood = changeState("soil")(5);

export const hydrate = changeState("water")(1);
export const superWater = changeState("water")(5);

// Create Plants

const currentState = stateControl(function (previousState) {
  return {
    ...previousState,
    soil: previousState.soil + 1
  }
})

// currently storestate represents a plant

export const allPlantStore = storeState()

export const resetAllPlantStore = () => {
  return allPlantStore(() => {
    return {
      plants: [],
      totalPlantsCreated: 0
    }
  })
}

// function initializeAllPlantStore () {
//   return allPlantStore(() => {
//     return {
//       plants: [],
//       totalPlantsCreated: 0,
//     }
//   })
// }

// const currentPlants = initializeAllPlantStore()

export function addPlant() {
  return allPlantStore((previous) => {
    const totalPlantsCreated = (previous.totalPlantsCreated || 0) + 1

    return {
      plants: [
        ...(previous.plants || []),
        { id: totalPlantsCreated },
      ],
      totalPlantsCreated,
    }
  })
}

// removes a plant by ID

// let totalPlantsCreated
// if ('totalPlantsCreated' in previous) {
//   totalPlantsCreated = previous.totalPlantsCreated
// } else {
//   totalPlantsCreated = 0
// }

export function removePlant(id) {
  return allPlantStore((previous) => {
    const { totalPlantsCreated = 0 } = previous
    // const totalPlantsCreated = previous.totalPlantsCreated || 0
    return {
      plants: (previous.plants || []).filter(plant => plant.id != id),
      totalPlantsCreated,
    }
  })
}

// Abilities

export function plantHealth(id, health) {
  return allPlantStore((previous) => {
    const { totalPlantsCreated = 0 } = previous
    // const totalPlantsCreated = previous.totalPlantsCreated || 0
    const updatedPlants = previous.plants.map((item) => {
      if (item.id === id) return { ...item, health }
      else return item

      // return item.id === id
      //   ? { ...item, health }
      //   : item
    })

    return {
      plants: updatedPlants,
      totalPlantsCreated,
    }
  })
}
// { id }
// { id, health }
