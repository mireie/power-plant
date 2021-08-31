import * as plant from '@/js/plant';
import { expect } from '@jest/globals';

// test what it should be when first initializating
// test to see if updating state works
// test to make sure state is consistent across multiple updates
// test that two states don't affect one another
// test that we can't update state outside function

describe('storeState', () => {
  test("should start with state as an empty object", () => {
    const stateControl = plant.storeState();
    const state = stateControl()
    expect(state).toEqual({});
  });

  test("should update", () => {
    const stateControl = plant.storeState();
    const state = stateControl((previousState) => {
      return {
        ...previousState,
        property: "test"
      }
    })
    expect(state).toEqual({ property: "test" });
  });

  test("should update state multiple times", () => {
    const stateControl = plant.storeState();

    stateControl((previousState) => {
      return {
        ...previousState,
        property: "test"
      }
    })
    const state2 = stateControl((previousState) => {
      return {
        ...previousState,
        property2: "another test"
      }
    })
    expect(state2).toEqual({ property: "test", property2: "another test" });
  });

  test("should update states separately without affecting eachother", () => {
    const stateControl = plant.storeState();
    const stateControl2 = plant.storeState();
    const state = stateControl((previousState) => {
      return {
        ...previousState,
        property: "test"
      }
    })
    const state2 = stateControl2((previousState) => {
      return {
        ...previousState,
        property2: "different test"
      }
    })
    expect(state).toEqual({ property: "test" });
    expect(state2).toEqual({ property2: "different test" });
  });

  test("should not update internal state outside of function", () => {
    const stateControl = plant.storeState();
    const state = stateControl((previousState) => {
      return {
        ...previousState,
        property: "test"
      }
    })
    state.otherProperty = 'something else'
    const state2 = stateControl((previousState) => {
      return {
        ...previousState,
        yetAnotherProperty: "hello"
      }
    })
    expect(state2).toEqual({ property: "test", yetAnotherProperty: "hello" })
  });
})

describe('allPlantStore', () => {

  beforeEach(() => {
    plant.resetAllPlantStore();
  });

  test("should begin empty", () => {
    expect(plant.allPlantStore()).toEqual({
      plants: [],
      totalPlantsCreated: 0
    });
  })

  describe('addPlant', () => {
    test("should add a plant", () => {
      const newPlant = plant.addPlant()
      expect(newPlant).toEqual({
        plants: [{
          id: 1
        }],
        totalPlantsCreated: 1
      })
    })

    test("should add multiple plants", () => {
      const newPlant = plant.addPlant()
      const newerPlant = plant.addPlant()
      expect(newerPlant).toEqual({
        plants: [
          { id: 1 },
          { id: 2 },
        ],
        totalPlantsCreated: 2
      })
    })
  })

  describe('removePlant', () => {
    test("should correctly remove a plant by id", () => {
      plant.addPlant()
      plant.addPlant()
      plant.addPlant()
      const state = plant.removePlant(2)

      expect(state).toEqual({
        plants: [
          { id: 1 },
          { id: 3 },
        ],
        totalPlantsCreated: 3,
      })
    })

    test("should do nothing if id not found", () => {
      plant.addPlant()
      plant.addPlant()
      plant.addPlant()
      const state = plant.removePlant(4)

      expect(state).toEqual({
        plants: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
        ],
        totalPlantsCreated: 3,
      })
    })

    test("should work on an empty state", () => {
      const state = plant.removePlant(1)

      expect(state).toEqual({
        plants: [],
        totalPlantsCreated: 0,
      })
    })
  })

  //Add functionality so different plants have different abilities.

  describe('plantHealth', () => {
    it('should correctly add plant health to the given plant', () => {
      plant.addPlant()
      plant.addPlant()

      const state = plant.plantHealth(2, 100)

      expect(state).toEqual({
        plants: [
          { id: 1 },
          { id: 2, health: 100 },
        ],
        totalPlantsCreated: 2,
      })
    })

    it('should work and do nothing if id doesnt exist', () => {
      plant.addPlant()
      plant.addPlant()

      const state = plant.plantHealth(3, 100)

      expect(state).toEqual({
        plants: [
          { id: 1 },
          { id: 2 },
        ],
        totalPlantsCreated: 2,
      })
    })

    it('should work multiple times', () => {
      plant.addPlant()
      plant.addPlant()

      plant.plantHealth(2, 100)
      const state = plant.plantHealth(2, 50)

      expect(state).toEqual({
        plants: [
          { id: 1 },
          { id: 2, health: 50 },
        ],
        totalPlantsCreated: 2,
      })
    })
  })
  
})