import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function Example() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const last = new Date(year, month, 0).getDate();
  const prevlast = new Date(year, month - 1, 0).getDate();
  const calendar = createCalendar(year, month);

  const onClick = (n) => () => {
    const nextMonth = month + n;

    if (12 < nextMonth) {
      setMonth(1);
      setYear(year + 1);
    } else if (nextMonth < 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(nextMonth);
    }
  };

  //スケジュールのデータ
  const [schedules, setSche] = useState([]);

  //画面読み込み時に、1度だけ起動
  useEffect(() => {
    getPostData();
  }, []);

  //バックエンドからデータ一覧を取得
  const getPostData = () => {
    axios
      .post('/api/posts')
      .then((response) => {
        setSche(response.data); //バックエンドからのデータをセット
        console.log(response.data);
      })
      .catch(() => {
        console.log('通信に失敗しました');
      });
  };

  //データ格納の空配列を作成
  let rows = [];

  //スケジュールデータをrowに格納する
  schedules.map((post) =>
    rows.push({
      sch_id: post.id,
      sch_category: post.sch_category,
      sch_contents: post.sch_contents,
      sch_date: post.sch_date,
      sch_time: post.sch_time,
    })
  );

  //登録用ポップアップ開閉処理
  const [open, setOpen] = useState(false);

  const handleClickOpen = (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //新規登録用データ配列
  const [formData, setFormData] = useState({
    sch_category: '',
    sch_contents: '',
    sch_date: '',
    sch_hour: '',
    sch_min: '',
  });

  //入力値を一時保存
  const inputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    formData[key] = value;
    let datas = Object.assign({}, formData);
    setFormData(datas);
    console.log(formData);
  };

  //登録処理
  const createSchedule = async (e) => {
    //リンク移動の無効化
    e.preventDefault();

    //入力値を投げる
    await axios
      .post('/api/posts/create', {
        sch_category: formData.sch_category,
        sch_contents: formData.sch_contents,
        sch_date: formData.sch_date,
        sch_time: formData.sch_hour + ':' + formData.sch_min,
      })
      .then((res) => {
        //戻り値をtodosにセット
        const tempPosts = [...schedules];
        tempPosts.push(res.data);
        setSche(tempPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <div className="calendar-header">
        <h1>{`${year}年${month}月`}</h1>

        <div className="calendar-nav">
          <button onClick={onClick(-1)}>{'<先月'}</button>

          <button onClick={onClick(1)}>{'翌月>'}</button>
        </div>
      </div>

      <table className="calendar-table">
        <thead>
          <tr>
            <th>日</th>
            <th>月</th>
            <th>火</th>
            <th>水</th>
            <th>木</th>
            <th>金</th>
            <th>土</th>
          </tr>
        </thead>

        <tbody>
          {calendar.map((week, i) => (
            <tr key={week.join('')}>
              {week.map((day, j) => (
                <td key={`${i}${j}`} id={day} onClick={handleClickOpen}>
                  <div>
                    <div>{day > last ? day - last : day <= 0 ? prevlast + day : day}</div>
                    <div className="schedule-area">
                      {rows.map(
                        (schedule, k) =>
                          schedule.sch_date == year + '-' + zeroPadding(month) + '-' + zeroPadding(day) && (
                            <div className="schedule-title" key={k} id={schedule.sch_id}>
                              {schedule.sch_contents}
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>スケジュール登録</DialogContentText>
          <TextField
            margin="dense"
            id="sch_date"
            name="sch_date"
            label="予定日"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChange}
          />

          <InputLabel id="sch_time_label">時刻</InputLabel>

          <Select
            labelId="sch_hour"
            id="sch_hour_select"
            name="sch_hour"
            label="Hour"
            variant="standard"
            defaultValue="00"
            onChange={inputChange}
          >
            <MenuItem value="00">00</MenuItem>
            <MenuItem value="01">01</MenuItem>
            <MenuItem value="02">02</MenuItem>
            <MenuItem value="03">03</MenuItem>
            <MenuItem value="04">04</MenuItem>
            <MenuItem value="05">05</MenuItem>
            <MenuItem value="06">06</MenuItem>
            <MenuItem value="07">07</MenuItem>
            <MenuItem value="08">08</MenuItem>
            <MenuItem value="09">09</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="11">11</MenuItem>
            <MenuItem value="12">12</MenuItem>
            <MenuItem value="13">13</MenuItem>
            <MenuItem value="14">14</MenuItem>
            <MenuItem value="15">15</MenuItem>
            <MenuItem value="16">16</MenuItem>
            <MenuItem value="17">17</MenuItem>
            <MenuItem value="18">18</MenuItem>
            <MenuItem value="19">19</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="21">21</MenuItem>
            <MenuItem value="22">22</MenuItem>
            <MenuItem value="23">23</MenuItem>
          </Select>

          <Select
            labelId="sch_min"
            id="sch_min_select"
            name="sch_min"
            label="Min"
            variant="standard"
            defaultValue="00"
            onChange={inputChange}
          >
            <MenuItem value="00">00</MenuItem>
            <MenuItem value="01">01</MenuItem>
            <MenuItem value="02">02</MenuItem>
            <MenuItem value="03">03</MenuItem>
            <MenuItem value="04">04</MenuItem>
            <MenuItem value="05">05</MenuItem>
            <MenuItem value="06">06</MenuItem>
            <MenuItem value="07">07</MenuItem>
            <MenuItem value="08">08</MenuItem>
            <MenuItem value="09">09</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="11">11</MenuItem>
            <MenuItem value="12">12</MenuItem>
            <MenuItem value="13">13</MenuItem>
            <MenuItem value="14">14</MenuItem>
            <MenuItem value="15">15</MenuItem>
            <MenuItem value="16">16</MenuItem>
            <MenuItem value="17">17</MenuItem>
            <MenuItem value="18">18</MenuItem>
            <MenuItem value="19">19</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="21">21</MenuItem>
            <MenuItem value="22">22</MenuItem>
            <MenuItem value="23">23</MenuItem>
            <MenuItem value="24">24</MenuItem>
            <MenuItem value="25">25</MenuItem>
            <MenuItem value="26">26</MenuItem>
            <MenuItem value="27">27</MenuItem>
            <MenuItem value="28">28</MenuItem>
            <MenuItem value="29">29</MenuItem>
            <MenuItem value="30">30</MenuItem>
            <MenuItem value="31">31</MenuItem>
            <MenuItem value="32">32</MenuItem>
            <MenuItem value="33">33</MenuItem>
            <MenuItem value="34">34</MenuItem>
            <MenuItem value="35">35</MenuItem>
            <MenuItem value="36">36</MenuItem>
            <MenuItem value="37">37</MenuItem>
            <MenuItem value="38">38</MenuItem>
            <MenuItem value="39">39</MenuItem>
            <MenuItem value="40">40</MenuItem>
            <MenuItem value="41">41</MenuItem>
            <MenuItem value="42">42</MenuItem>
            <MenuItem value="43">43</MenuItem>
            <MenuItem value="44">44</MenuItem>
            <MenuItem value="45">45</MenuItem>
            <MenuItem value="46">46</MenuItem>
            <MenuItem value="47">47</MenuItem>
            <MenuItem value="48">48</MenuItem>
            <MenuItem value="49">49</MenuItem>
            <MenuItem value="50">50</MenuItem>
            <MenuItem value="51">51</MenuItem>
            <MenuItem value="52">52</MenuItem>
            <MenuItem value="53">53</MenuItem>
            <MenuItem value="54">54</MenuItem>
            <MenuItem value="55">55</MenuItem>
            <MenuItem value="56">56</MenuItem>
            <MenuItem value="57">57</MenuItem>
            <MenuItem value="58">58</MenuItem>
            <MenuItem value="59">59</MenuItem>
          </Select>

          <InputLabel id="sch_category_label">カテゴリー</InputLabel>

          <Select
            labelId="sch_category"
            id="sch_category_select"
            name="sch_category"
            label="Category"
            variant="standard"
            defaultValue="勉強"
            onChange={inputChange}
          >
            <MenuItem value="勉強">勉強</MenuItem>
            <MenuItem value="案件">案件</MenuItem>
            <MenuItem value="テスト">テスト</MenuItem>
          </Select>

          <TextField
            margin="dense"
            id="sch_contents"
            name="sch_contents"
            label="内容"
            type="text"
            fullWidth
            variant="standard"
            onChange={inputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button href="/dashboard" onClick={createSchedule}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

function createCalendar(year, month) {
  const first = new Date(year, month - 1, 1).getDay();

  return [0, 1, 2, 3, 4, 5].map((weekIndex) => {
    return [0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
      const day = dayIndex + 1 + weekIndex * 7;

      return day - first;
    });
  });
}

function zeroPadding(num) {
  return ('0' + num).slice(-2);
}

export default Example;

if (document.getElementById('app')) {
  ReactDOM.render(<Example />, document.getElementById('app'));
}
