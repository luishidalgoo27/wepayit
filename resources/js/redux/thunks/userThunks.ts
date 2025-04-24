import { User } from '@/types/user';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk<User>(
  'user/fetchUser',
  async () => {
    // Simulamos una API fake
    const res = await new Promise<User>((resolve) =>
      setTimeout(() => {
        resolve({ id: 1, name: 'Juan Pérez', email: 'juan@example.com' });
      }, 1000)
    );
    return res;
  }
);