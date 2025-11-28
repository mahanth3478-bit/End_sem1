import React, { useReducer } from 'react';

const initialState = {
  students: [
    { id: 1, name: 'Alice', status: 'Unknown' },
    { id: 2, name: 'Bob', status: 'Unknown' },
    { id: 3, name: 'Charlie', status: 'Unknown' },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'MARK_PRESENT':
      return {
        ...state,
        students: state.students.map((stu) =>
          stu.id === action.id ? { ...stu, status: 'Present' } : stu
        ),
      };

    case 'MARK_ABSENT':
      return {
        ...state,
        students: state.students.map((stu) =>
          stu.id === action.id ? { ...stu, status: 'Absent' } : stu
        ),
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export default function Attendance() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>Attendance</h2>

      <table border="1" width="60%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {state.students.map((stu) => (
            <tr key={stu.id}>
              <td>{stu.id}</td>
              <td>{stu.name}</td>
              <td>{stu.status}</td>
              <td>
                <button
                  onClick={() => dispatch({ type: 'MARK_PRESENT', id: stu.id })}
                >
                  Present
                </button>
                <button
                  onClick={() => dispatch({ type: 'MARK_ABSENT', id: stu.id })}
                >
                  Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset Attendance</button>
    </div>
  );
}
