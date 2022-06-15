import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function Delete(props) {
  const { editData, setSche } = props;

  const deletePost = async (e) => {
    //リンク移動の無効化
    e.preventDefault();
    //削除処理
    await axios
      .post('api/delete', {
        id: editData.id,
      })
      .then((res) => {
        // this.setState({
        //   posts: res.posts,
        // });
        setSche(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Button href="/dashboard" onClick={deletePost}>
      Delete
    </Button>
  );
}

export default Delete;
