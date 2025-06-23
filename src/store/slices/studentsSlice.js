import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const studentsAPI =
  "https://6855b19c1789e182b37c0fb4.mockapi.io/akadimi-dashboard/students";

export const fetchStudents = createAsyncThunk(
  "studentsSlice/fetchStudents",
  async () => {
    const res = await fetch(studentsAPI);
    return await res.json();
  }
);

export const addStudent = createAsyncThunk(
  "studentsSlice/addStudent",
  async (studentData) => {
    const res = await fetch(studentsAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });
    if (!res.ok) {
      throw new Error("Failed to add student");
    }
    const data = await res.json();
    return data;
  }
);

export const deleteStudent = createAsyncThunk(
  "studentsSlice/deleteStudent",
  async (studentID) => {
    const res = await fetch(`${studentsAPI}/${studentID}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed To Delete Student");
    }
    return studentID;
  }
);
const studentsSlice = createSlice({
  name: "studentsSlice",
  initialState: {
    students: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "success";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(addStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.status = "success";
        state.students.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    });
  },
});

export default studentsSlice.reducer;
