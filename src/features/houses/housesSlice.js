import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchHouses = createAsyncThunk(
  'houses/fetchHouses',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, you'd fetch from your API
      // For now, we'll return hardcoded data
      return [
        {
          id: 'gryffindor',
          name: 'Gryffindor',
          founder: 'Godric Gryffindor',
          colors: ['Scarlet', 'Gold'],
          animal: 'Lion',
          element: 'Fire',
          traits: ['Bravery', 'Courage', 'Determination', 'Chivalry'],
          description: 'Gryffindor values bravery, daring, nerve, and chivalry. Its emblematic animal is the lion, and its colors are scarlet and gold. Minerva McGonagall is the most recent Head of Gryffindor.',
          commonRoom: 'Gryffindor Tower',
          imageUrl: '/assets/images/houses/gryffindor.jpg',
          famousMembers: ['Harry Potter', 'Hermione Granger', 'Ron Weasley', 'Albus Dumbledore']
        },
        {
          id: 'hufflepuff',
          name: 'Hufflepuff',
          founder: 'Helga Hufflepuff',
          colors: ['Yellow', 'Black'],
          animal: 'Badger',
          element: 'Earth',
          traits: ['Hard work', 'Patience', 'Loyalty', 'Fair play'],
          description: 'Hufflepuff values hard work, dedication, patience, loyalty, and fair play. Its emblematic animal is the badger, and its colors are yellow and black. Pomona Sprout is the Head of Hufflepuff.',
          commonRoom: 'Hufflepuff Basement',
          imageUrl: '/assets/images/houses/hufflepuff.jpg',
          famousMembers: ['Cedric Diggory', 'Newt Scamander', 'Nymphadora Tonks', 'Pomona Sprout']
        },
        {
          id: 'ravenclaw',
          name: 'Ravenclaw',
          founder: 'Rowena Ravenclaw',
          colors: ['Blue', 'Bronze'],
          animal: 'Eagle',
          element: 'Air',
          traits: ['Intelligence', 'Creativity', 'Learning', 'Wit'],
          description: 'Ravenclaw values intelligence, knowledge, curiosity, creativity and wit. Its emblematic animal is the eagle, and its colors are blue and bronze. Filius Flitwick is the Head of Ravenclaw.',
          commonRoom: 'Ravenclaw Tower',
          imageUrl: '/assets/images/houses/ravenclaw.jpg',
          famousMembers: ['Luna Lovegood', 'Cho Chang', 'Filius Flitwick', 'Garrick Ollivander']
        },
        {
          id: 'slytherin',
          name: 'Slytherin',
          founder: 'Salazar Slytherin',
          colors: ['Green', 'Silver'],
          animal: 'Serpent',
          element: 'Water',
          traits: ['Ambition', 'Cunning', 'Leadership', 'Resourcefulness'],
          description: 'Slytherin values ambition, cunning, leadership, and resourcefulness. Its emblematic animal is the serpent, and its colors are green and silver. Horace Slughorn is the Head of Slytherin.',
          commonRoom: 'Slytherin Dungeon',
          imageUrl: '/assets/images/houses/slytherin.jpg',
          famousMembers: ['Draco Malfoy', 'Severus Snape', 'Horace Slughorn', 'Merlin']
        }
      ];
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  houses: [],
  selectedHouse: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const housesSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    setSelectedHouse: (state, action) => {
      state.selectedHouse = action.payload;
    },
    clearSelectedHouse: (state) => {
      state.selectedHouse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHouses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.houses = action.payload;
      })
      .addCase(fetchHouses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Failed to fetch houses';
      });
  },
});

export const { setSelectedHouse, clearSelectedHouse } = housesSlice.actions;
export default housesSlice.reducer;
