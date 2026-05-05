const baseUrl = 'https://petstore.swagger.io/v2';

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// ------------------------
// CREATE PET (POST)
// ------------------------
export async function createPet(request, pet) {
  const response = await request.post(`${baseUrl}/pet`, {
    data: pet,
    headers,
  });

  return {
    status: response.status(),
    body: await response.json(),
  };
}

// ------------------------
// GET PET BY ID (GET)
// ------------------------
export async function getPetById(request, petId) {
  const response = await request.get(`${baseUrl}/pet/${petId}`, {
    headers,
  });

  let body;
  try {
    body = await response.json();
  } catch (e) {
    body = null;
  }

  return {
    status: response.status(),
    body,
  };
}

// ------------------------
// UPDATE PET (PUT)
// ------------------------
export async function updatePet(request, pet) {
  const response = await request.put(`${baseUrl}/pet`, {
    data: pet,
    headers,
  });

  return {
    status: response.status(),
    body: await response.json(),
  };
}