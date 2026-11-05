/**
 * API service for communicating with the Spring Boot Student REST endpoints.
 * In production (e.g. Render), set VITE_API_BASE_URL in your environment.
 * In local development, unset defaults to Vite dev proxy (/dizon/students -> http://localhost:8080/dizon/students).
 */

let rawBase = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/$/, '')
if (rawBase && !rawBase.startsWith('http://') && !rawBase.startsWith('https://')) {
  rawBase = `https://${rawBase}`
}
const BASE_URL = `${rawBase}/dizon/students`

async function handleResponse(response) {
  const contentType = response.headers.get('content-type')
  const isJson = contentType && contentType.includes('application/json')
  const data = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const errorMsg = typeof data === 'string' ? data : (data.message || 'Request failed')
    throw new Error(errorMsg)
  }

  return data
}

export const studentService = {
  /**
   * Fetch all students
   * @returns {Promise<Array>}
   */
  async getAll() {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    return handleResponse(response)
  },

  /**
   * Fetch single student by id
   * @param {number|string} id
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    return handleResponse(response)
  },

  /**
   * Create a new student record
   * @param {{ firstname: string, lastname: string, course: string, section: string }} studentData
   * @returns {Promise<Object>}
   */
  async create(studentData) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(studentData),
    })
    return handleResponse(response)
  },

  /**
   * Update an existing student record
   * @param {number|string} id
   * @param {{ firstname: string, lastname: string, course: string, section: string }} studentData
   * @returns {Promise<Object>}
   */
  async update(id, studentData) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(studentData),
    })
    return handleResponse(response)
  },

  /**
   * Delete student by id
   * @param {number|string} id
   * @returns {Promise<string>}
   */
  async delete(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })
    return handleResponse(response)
  },
}
