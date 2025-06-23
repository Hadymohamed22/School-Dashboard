import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const teacherAPI =
  "https://6855b19c1789e182b37c0fb4.mockapi.io/akadimi-dashboard/teachers";
export const fetchTeachers = createAsyncThunk(
  "teachersSlice/fetchTeachers",
  async () => {
    const res = await fetch(teacherAPI);
    return await res.json();
  }
);

export const addTeacher = createAsyncThunk(
  "teachersSlice/addTeacher",
  async (studentData) => {
    const res = await fetch(teacherAPI, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify(studentData),
    });

    if (!res.ok) {
      throw new Error("Failed To Add Teacher");
    }

    return studentData;
  }
);

export const deleteTeacher = createAsyncThunk(
  "teachersSlice/deleteTeacher",
  async (teacherID) => {
    const res = await fetch(`${teacherAPI}/${teacherID}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed To Add Teacher");
    }

    return teacherID;
  }
);

export const updateTeacher = createAsyncThunk(
  "teachersSlice/updateTeacher",
  async ({ updatedData, id }) => {
    const res = await fetch(`${teacherAPI}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      throw new Error("Failed To Add Teacher");
    }

    return await res.json();
  }
);

const teachersSlice = createSlice({
  name: "teachersSlice",
  initialState: {
    teachers: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetch teachers data
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "success";
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    // add teacher
    builder.addCase(addTeacher.fulfilled, (state, action) => {
      state.teachers.push(action.payload);
    });

    // delete teacher
    builder.addCase(deleteTeacher.fulfilled, (state, action) => {
      state.teachers = state.teachers.filter(
        (teacher) => teacher.id !== action.payload
      );
    });

    // edit teacher
    builder.addCase(updateTeacher.fulfilled, (state, action) => {
      const updatedData = action.payload;
      const teacherIndex = state.teachers.findIndex(
        (teacher) => teacher.id === updatedData.id
      );
      if (teacherIndex !== -1) {
        state.teachers[teacherIndex] = updatedData;
      }
    });
  },
});

export default teachersSlice.reducer;
