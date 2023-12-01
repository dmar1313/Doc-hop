// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/trips'; // Update with the URL of your backend server

export const fetchTrips = async () => {
  return axios.get(API_URL);
};

export const fetchTripById = async (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createTrip = async (tripData) => {
  return axios.post(API_URL, tripData);
};

export const updateTrip = async (id, tripData) => {
  return axios.put(`${API_URL}/${id}`, tripData);
};

export const deleteTrip = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
