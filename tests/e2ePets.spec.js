import { test, expect } from '@playwright/test';
import { pets } from './data/pets.js';

import {
  createPet,
  getPetById,
  updatePet,
} from '../services/petFunctions.js';

pets.forEach((pet) => {

  test(`CRUD flow for pet: ${pet.name}`, async ({ request }) => {

    // CREATE
    const createResponse = await createPet(request, pet);
    expect(createResponse.status).toBe(200);
    expect(createResponse.body.id).toBe(pet.id);

    // GET
    const getResponse = await getPetById(request, pet.id);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe(pet.name);

    // UPDATE
    const updatedPet = {
      ...pet,
      name: `${pet.name} Updated`,
    };

    const updateResponse = await updatePet(request, updatedPet);
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe(updatedPet.name);
  });

});