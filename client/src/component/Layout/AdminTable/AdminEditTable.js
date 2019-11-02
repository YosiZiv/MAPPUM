import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from '../../../axiosApi';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'title', field: 'title' },
      { title: 'desc', field: 'desc' },
      { title: 'color', field: 'color' },
      { title: 'size', field: 'size' },
      { title: 'buyPrice', field: 'buy Price' },
      { title: 'sellPrice', field: 'sell Price' },
      { title: 'createAt', field: 'createAt' }
    ],
    data: [],
    loadingFinish: false
  });
  useEffect(() => {
    axios
      .get('/dashboard/getpitem') // NEED TO MAKE ROUTE FOR ADMIN GET ALL ITEM
      .then(response => {
        console.log(response);
        // const updatedState = response.data.posts.map(post => {
        //   return {
        //     title: post.title,
        //     desc: post.desc,
        //     content: post.content,
        //     createAt: post.createAt.slice(0, 10),
        //     postId: post._id
        //   };
        // });
        // setState({
        //   columns: state.columns,
        //   data: updatedState,
        //   loadingFinish: true
        // });
      })
      .catch(() => {
        setState({ loadingFinish: true });
      });
  }, [state.columns]);

  if (state.data) {
    return (
      <MaterialTable
        title="Edit Items"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data.push(newData);
                setState({ ...state, data });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
              axios.put(`/dashboard/editItem/${newData.postId}`, newData).then(() => {
                resolve();
              });
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
              axios
                .delete(`/dashboard/editItem/${oldData.postId}`)
                .then(() => {
                  resolve();
                })
                .catch(() => {
                  resolve();
                });
            })
        }}
      />
    );
  }
  return (
    <MaterialTable
    title="no Item Found"
    columns={state.columns}
    data={state.data}
  />
  )
}
