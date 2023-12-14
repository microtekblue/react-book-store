import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/redux/store';

export interface BookState {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
}

const initialState: BookState[] = [
  {
    id: 1,
    title: 'The Catcher in the Rye',
    price: 20.99,
    category: 'Classic Literature',
    description:
      'The Catcher in the Rye, novel by J.D. Salinger published in 1951. The novel details two days in the life of 16-year-old Holden Caulfield after he has been expelled from prep school. Confused and disillusioned, Holden searches for truth and rails against the “phoniness” of the adult world.',
  },
  {
    id: 2,
    title: 'How to Win Friends and Influence People',
    price: 19.5,
    category: 'Self-Help/Personal Development',
    description:
      'Written over 80 years ago, How to Win Friends and Influence People is a book that is as relative today as it was when it was first written. The principles are a broad mix of personal and professional advice based on the psychology of relationships.',
  },
];

let prevId = 2;

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      action.payload.id = prevId + 1;
      state.push(action.payload);
      prevId = action.payload.id;
      return state;
    },
    removeBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload.id);
    },
    updateBook: (state, action) => {
      return state.map((book) => {
        if (book.id === action.payload.id) {
          return {
            ...book,
            ...action.payload,
          };
        }
        return book;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBook, removeBook, updateBook } = booksSlice.actions;
export const getBooks = (state: RootState) => state.books;
export const getId = prevId;
export default booksSlice.reducer;
