import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from 'react-toastify';
import axios from "axios";

const backendURL = 'https://7857-103-129-95-180.ngrok-free.app/api/v1';

export interface LoginPayload { 
  username: string;
  password: string;
}

interface ErrorResponse {
  response: {
    data: {
      message: string;
    }
  }
}

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ username, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }
      const { data } = await axios.post(
        `${backendURL}/auth/login`,
        { username, password },
        config
      )

      return {
        accessToken: data.accessToken,
        username: data.username,
      }
    } catch (error) {
      const err = error as ErrorResponse;
      toast.error(err.response.data.message);
    }
  }
)